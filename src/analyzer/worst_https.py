import os

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt

from src.analyzer.setup import TABLE_DIRECTORY, CHART_DIRECTORY
from src.analyzer.utils import get_country

protocol_order = ["SSLv2", "SSLv3", "TLS1", "TLS1_1", "TLS1_2", "TLS1_3"]


def get_worst_https_stats(dataframe):
    def find_worst_protocol(row):
        for protocol in protocol_order:
            if row[protocol]:
                return protocol

    dataframe["worst_protocol"] = dataframe.apply(find_worst_protocol, axis=1)

    stats_by_nuts = dataframe.groupby(["country", "NUTS2_Label_2016", "worst_protocol"]).size().unstack(
        fill_value=0).reset_index()
    stats_by_nuts.rename(columns={"NUTS2_Label_2016": "nuts"}, inplace=True)
    stats_by_nuts["Category"] = None

    stats_by_nuts_category = dataframe.groupby(
        ["country", "NUTS2_Label_2016", "Category", "worst_protocol"]).size().unstack(fill_value=0).reset_index()
    stats_by_nuts_category.rename(columns={"NUTS2_Label_2016": "nuts"}, inplace=True)

    stats_by_country_category = dataframe.groupby(["country", "Category", "worst_protocol"]).size().unstack(
        fill_value=0).reset_index()
    stats_by_country_category["nuts"] = None

    stats_by_country = dataframe.groupby(["country", "worst_protocol"]).size().unstack(fill_value=0).reset_index()
    stats_by_country["nuts"] = None
    stats_by_country["Category"] = None

    for protocol in protocol_order:
        for df in [stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country]:
            if protocol not in df:
                df[protocol] = 0

    stats_by_nuts["total_schools"] = stats_by_nuts[protocol_order].sum(axis=1)
    stats_by_nuts_category["total_schools"] = stats_by_nuts_category[protocol_order].sum(axis=1)
    stats_by_country_category["total_schools"] = stats_by_country_category[protocol_order].sum(axis=1)
    stats_by_country["total_schools"] = stats_by_country[protocol_order].sum(axis=1)

    for protocol in protocol_order:
        stats_by_nuts[f"{protocol}_percent"] = (
                stats_by_nuts[protocol] / stats_by_nuts["total_schools"] * 100).round(2)
        stats_by_nuts_category[f"{protocol}_percent"] = (
                stats_by_nuts_category[protocol] / stats_by_nuts_category["total_schools"] * 100).round(2)
        stats_by_country_category[f"{protocol}_percent"] = (
                stats_by_country_category[protocol] / stats_by_country_category["total_schools"] * 100).round(2)
        stats_by_country[f"{protocol}_percent"] = (
                stats_by_country[protocol] / stats_by_country["total_schools"] * 100).round(2)

    stats_by_nuts["level"] = "nuts"
    stats_by_nuts_category["level"] = "nuts_category"
    stats_by_country_category["level"] = "country_category"
    stats_by_country["level"] = "country"

    consolidated_stats = pd.concat([stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country],
                                   axis=0, ignore_index=True)
    cols_to_remove = [col for col in protocol_order if consolidated_stats[col].sum() == 0]
    cols_to_remove += [f"{col}_percent" for col in cols_to_remove]
    consolidated_stats.drop(columns=cols_to_remove, inplace=True)

    return consolidated_stats


def latex_worst_http_table(dataframe, level, title, label):
    if level == "nuts":
        columns_to_display = ["nuts"] + [col for col in dataframe.columns if col.endswith("_percent")]
        dataframe = dataframe[dataframe["level"] == "nuts"]
        rename_map = {
            "nuts": "NUTS2",
        }
    elif level == "nuts_category":
        columns_to_display = ["nuts"] + [col for col in dataframe.columns if col.endswith("_percent")]
        dataframe = dataframe[dataframe["level"] == "nuts_category"]
        rename_map = {
            "nuts": "NUTS2",
        }
    elif level == "country":
        dataframe = dataframe[dataframe["level"] == "country"]
        columns_to_display = ["country"] + [col for col in dataframe.columns if col.endswith("_percent")]
        rename_map = {
            "country": "Country",
        }
    else:
        raise ValueError("Invalid level. Use 'nuts' or 'country'.")

    dataframe = dataframe.sort_values(
        by=[col for col in reversed([col for col in dataframe.columns if col.endswith("_percent")])],
        ascending=False)
    rename_map.update(**{f"{col}_percent": col.replace("_", ".") for col in protocol_order})
    dataframe = dataframe[columns_to_display].rename(columns=rename_map)

    column_headers = " & ".join(f"\\makecell{{{col}}}" for col in dataframe.columns)

    table_rows = "\n".join(
        f"            {row[0] if (level != 'country' and level != 'country_category') else get_country(row[0])} & " + " & ".join(
            "-" if pd.isna(value) or value == 0
            else f"{int(value)}" if isinstance(value, (float, int)) and value == int(value)
            else f"{value:.2f}" if isinstance(value, float)
            else str(value)
            for value in row[1:]
        ) + " \\\\"
        for row in dataframe.itertuples(index=False, name=None)
    )

    latex_table = f"""
\\begin{{table}}[H]
    \\centering
    \\caption{{{title}}}
    \\label{{tab:{label}}}
    \\rowcolors{{2}}{{white}}{{gray!15}}
    \\begin{{tabularx}}{{\\textwidth}}{{X{'c' * len(dataframe.columns)}}}
        \\toprule
        {column_headers} \\\\
        \\midrule
{table_rows}
        \\bottomrule
    \\end{{tabularx}}
\\end{{table}}
    """
    return latex_table


def generate_worst_http_tables(stats_dataframe):
    countries = stats_dataframe["country"].unique()
    for country in countries:
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) & (stats_dataframe["level"] == "nuts")]
        nuts2_table = latex_worst_http_table(nuts_data, "nuts",
                                             f"Worst SSL/TLS Protocol Adoption in {get_country(country)} by NUTS2 (\\%)",
                                             f"worst_https_{country.lower()}")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"worst_https_in_{country}_by_nuts2.tex")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) &
                                    (stats_dataframe["level"] == "nuts_category") &
                                    (stats_dataframe["Category"] == "private")]
        nuts2_table = latex_worst_http_table(nuts_data, "nuts_category",
                                             f"Worst SSL/TLS Protocol Adoption at Private HEIs in {get_country(country)} by NUTS2 (\\%)",
                                             f"worst_https_{country.lower()}_private")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"worst_https_in_{country}_by_nuts2_private.tex")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) &
                                    (stats_dataframe["level"] == "nuts_category") &
                                    (stats_dataframe["Category"] == "public")]
        nuts2_table = latex_worst_http_table(nuts_data, "nuts_category",
                                             f"Worst SSL/TLS Protocol Adoption at Public HEIs in {get_country(country)} by NUTS2 (\\%)",
                                             f"worst_https_{country.lower()}_public")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"worst_https_in_{country}_by_nuts2_public.tex")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)

    country_data = stats_dataframe[stats_dataframe["level"] == "country"]
    country_table = latex_worst_http_table(country_data, "country", "Worst SSL/TLS Protocol Adoption by Country (\\%)",
                                           "worst_https_by_country")
    path_to_save = os.path.join(TABLE_DIRECTORY, "worst_https_by_country.tex")
    with open(path_to_save, "w", encoding="utf-8") as tex_file:
        tex_file.write(country_table)


def create_radar_chart(dataframe):
    protocols = [col for col in dataframe.columns if col.endswith("_percent")]
    total_protocols = len(protocols)
    angles = np.linspace(0, 2 * np.pi, total_protocols, endpoint=False).tolist()
    angles.append(angles[0])

    countries = dataframe["country"].unique()

    for country in countries:
        country_data = dataframe[(dataframe["country"] == country) & (dataframe["level"] == "country_category")]
        fig, ax = plt.subplots(subplot_kw=dict(polar=True), figsize=(8, 8))

        data_cols = [col for col in country_data.columns if col.endswith("_percent")]
        private_usage = country_data[country_data["Category"] == "private"][data_cols].values.flatten()
        public_usage = country_data[country_data["Category"] == "public"][data_cols].values.flatten()

        def log_transform(data):
            return np.log10(1 + data)

        private_usage = log_transform(private_usage)
        private_usage = np.append(private_usage, private_usage[0])
        public_usage = log_transform(public_usage)
        public_usage = np.append(public_usage, public_usage[0])

        ax.plot(angles, private_usage, label="Private HEIs", color="orange", linestyle="--")
        ax.fill(angles, private_usage, color="orange", alpha=0.25)
        ax.plot(angles, public_usage, label="Public HEIs", color="blue")
        ax.fill(angles, public_usage, color="blue", alpha=0.25)

        ax.set_xticks(angles[:-1])

        ax.set_xticklabels([protocol.replace("_percent", "").replace("_", ".") for protocol in data_cols], fontsize=10,
                           rotation=30)
        # ax.set_yticks([20, 40, 60, 80, 100])
        ax.set_yticks(np.log10([1, 5, 10, 25, 50, 100]))
        ax.set_yticklabels(["1%", "5%", "10%", "25%", "50%", "100%"], fontsize=8)
        # ax.set_yticklabels(["20%", "40%", "60%", "80%", "100%"], fontsize=8)
        ax.set_title(f"Worst SSL/TLS Protocol Adoption in {get_country(country)} by Category", fontsize=12, pad=15,
                     y=1.05)

        # ax.xaxis.set_tick_params(labelcolor='none')
        ax.grid(True)
        ax.legend(loc="upper right", bbox_to_anchor=(1.2, 1.1))

        plt.tight_layout()
        filename = os.path.join(CHART_DIRECTORY, f"worst_https_radar_in_{country.lower()}.pdf")
        fig.savefig(filename, format="pdf", bbox_inches="tight")
        plt.show()
        plt.close(fig)


def make_worst_https_reports(dataframe):
    stats = get_worst_https_stats(dataframe)
    generate_worst_http_tables(stats)
    create_radar_chart(stats)



if __name__ == "__main__":
    pass
