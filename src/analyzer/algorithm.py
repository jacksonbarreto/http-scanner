import os

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from src.analyzer.setup import TABLE_DIRECTORY, CHART_DIRECTORY
from src.analyzer.utils import get_country


def get_algorithm_stats(dataframe):
    def extract_algorithm_size(value):
        if pd.isna(value):
            return "Unknown"
        parts = value.split()
        return " ".join(parts[:2]) if len(parts) > 1 else value

    dataframe["key_algorithm"] = dataframe["key_size"].apply(extract_algorithm_size)
    dataframe.sort_values(by=["key_algorithm"], inplace=True, ascending=False)
    stats_by_nuts = dataframe.groupby(["country", "NUTS2_Label_2016", "key_algorithm"]).size().unstack(
        fill_value=0).reset_index()
    stats_by_nuts.rename(columns={"NUTS2_Label_2016": "nuts"}, inplace=True)
    stats_by_nuts["Category"] = None

    stats_by_nuts_category = dataframe.groupby(
        ["country", "NUTS2_Label_2016", "Category", "key_algorithm"]).size().unstack(fill_value=0).reset_index()
    stats_by_nuts_category.rename(columns={"NUTS2_Label_2016": "nuts"}, inplace=True)

    stats_by_country_category = dataframe.groupby(["country", "Category", "key_algorithm"]).size().unstack(
        fill_value=0).reset_index()
    stats_by_country_category["nuts"] = None

    stats_by_country = dataframe.groupby(["country", "key_algorithm"]).size().unstack(fill_value=0).reset_index()
    stats_by_country["nuts"] = None
    stats_by_country["Category"] = None

    key_algorithms = dataframe["key_algorithm"].unique()
    for df in [stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country]:
        for key in key_algorithms:
            if key not in df:
                df[key] = 0

    for df in [stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country]:
        df["total_schools"] = df[key_algorithms].sum(axis=1)

    for key in key_algorithms:
        stats_by_nuts[f"{key}_percent"] = (stats_by_nuts[key] / stats_by_nuts["total_schools"] * 100).round(2)
        stats_by_nuts_category[f"{key}_percent"] = (
                stats_by_nuts_category[key] / stats_by_nuts_category["total_schools"] * 100).round(2)
        stats_by_country_category[f"{key}_percent"] = (
                stats_by_country_category[key] / stats_by_country_category["total_schools"] * 100).round(2)
        stats_by_country[f"{key}_percent"] = (stats_by_country[key] / stats_by_country["total_schools"] * 100).round(2)

    stats_by_nuts["level"] = "nuts"
    stats_by_nuts_category["level"] = "nuts_category"
    stats_by_country_category["level"] = "country_category"
    stats_by_country["level"] = "country"

    consolidated_stats = pd.concat([stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country],
                                   axis=0, ignore_index=True)

    cols_to_remove = [col for col in key_algorithms if consolidated_stats[col].sum() == 0]
    cols_to_remove += [f"{col}_percent" for col in cols_to_remove]
    consolidated_stats.drop(columns=cols_to_remove, inplace=True)

    return consolidated_stats


def latex_algorithm_table(dataframe, level, title, label):
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
    rename_map.update(**{col: col.replace("_percent", "") for col in dataframe.columns if col.endswith("_percent")})
    cols_to_remove = [c for c in [col for col in dataframe.columns if col.endswith("_percent")] if
                      dataframe[c].sum() == 0]
    columns_to_display = [col for col in columns_to_display if col not in cols_to_remove]
    dataframe = dataframe[columns_to_display].rename(columns=rename_map)
    column_headers = " & ".join(f"\\makecell{{{col.replace(' ', '\\\\')}}}" for col in dataframe.columns)

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


def generate_algorithm_tables(stats_dataframe):
    countries = stats_dataframe["country"].unique()
    for country in countries:
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) & (stats_dataframe["level"] == "nuts")]
        nuts2_table = latex_algorithm_table(nuts_data, "nuts",
                                            f"Key Algorithm Distribution in {get_country(country)} by NUTS2 (\\%)",
                                            f"key_algorithm_distribution_{country.lower()}_nuts")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"key_algorithm_distribution_in_{country}_by_nuts2.txt")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) &
                                    (stats_dataframe["level"] == "nuts_category") &
                                    (stats_dataframe["Category"] == "private")]
        nuts2_table = latex_algorithm_table(nuts_data, "nuts_category",
                                            f"Key Algorithm Distribution at Private HEIs in {get_country(country)} by NUTS2 (\\%)",
                                            f"key_algorithm_distribution_{country.lower()}_nuts_private")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"key_algorithm_distribution_in_{country}_by_nuts2_private.txt")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) &
                                    (stats_dataframe["level"] == "nuts_category") &
                                    (stats_dataframe["Category"] == "public")]
        nuts2_table = latex_algorithm_table(nuts_data, "nuts_category",
                                            f"Key Algorithm Distribution at Public HEIs in {get_country(country)} by NUTS2 (\\%)",
                                            f"key_algorithm_distribution_{country.lower()}_nuts_public")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"key_algorithm_distribution_in_{country}_by_nuts2_public.txt")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)

    country_data = stats_dataframe[stats_dataframe["level"] == "country"]
    country_table = latex_algorithm_table(country_data, "country", "Key Algorithm Distribution by Country (\\%)",
                                          "key_algorithm_distribution_by_country")
    path_to_save = os.path.join(TABLE_DIRECTORY, "key_algorithm_distribution_by_country.txt")
    with open(path_to_save, "w", encoding="utf-8") as tex_file:
        tex_file.write(country_table)


def create_radar_chart(dataframe):
    algorithms = [col for col in dataframe.columns if col.endswith("_percent")]
    total_algorithms = len(algorithms)
    angles = np.linspace(0, 2 * np.pi, total_algorithms, endpoint=False).tolist()
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

        ax.set_xticklabels([protocol.replace("_percent", "") for protocol in data_cols], fontsize=10,
                           rotation=30)
        # ax.set_yticks([20, 40, 60, 80, 100])
        ax.set_yticks(np.log10([1, 5, 10, 25, 50, 100]))
        ax.set_yticklabels(["1%", "5%", "10%", "25%", "50%", "100%"], fontsize=8)
        # ax.set_yticklabels(["20%", "40%", "60%", "80%", "100%"], fontsize=8)
        ax.set_title(f"Key Algorithm in {get_country(country)} by Category", fontsize=12, pad=15,
                     y=1.05)

        # ax.xaxis.set_tick_params(labelcolor='none')
        ax.grid(True)
        ax.legend(loc="upper right", bbox_to_anchor=(1.2, 1.1))

        plt.tight_layout()
        filename = os.path.join(CHART_DIRECTORY, f"key_algorithm_radar_in_{country.lower()}.pdf")
        fig.savefig(filename, format="pdf", bbox_inches="tight")
        plt.show()
        plt.close(fig)


def plot_key_algorithm_chart(dataframe, level, title, country_filter=None):
    if level == "nuts":
        if not country_filter:
            raise ValueError("Country filter is required for NUTS level.")
        dataframe = dataframe[(dataframe["country"] == country_filter) & (dataframe["level"] == "nuts")]
        y_column = "nuts"
        num_rows = dataframe[y_column].nunique()
        size_box = (10, max(6, num_rows * 0.35))
    elif level == "country":
        dataframe["country"] = dataframe["country"].apply(get_country)
        dataframe = dataframe[dataframe["level"] == "country"]
        y_column = "country"
        num_rows = dataframe[y_column].nunique()
        size_box = (10, max(3, num_rows * 0.8))
    else:
        raise ValueError("Invalid level. Use 'nuts' or 'country'.")
    rename_map = {col: col.replace("_percent", "") for col in dataframe.columns if col.endswith("_percent")}

    columns_to_display = [col for col in dataframe.columns if col.endswith("_percent")]
    cols_to_remove = [c for c in [col for col in dataframe.columns if col.endswith("_percent")] if
                      dataframe[c].sum() == 0]
    columns_to_plot = [col for col in columns_to_display if col not in cols_to_remove]
    dataframe = dataframe[[y_column] + columns_to_display].rename(columns=rename_map)
    algorithm_order = [
        "RSA 1024", "RSA 2048", "RSA 3072", "RSA 4096",
        "EC 256", "EC 384", "EC 521"
    ]
    columns_to_plot = sorted(
        [col.replace("_percent", "") for col in columns_to_plot],
        key=lambda x: algorithm_order.index(x) if x in algorithm_order else len(algorithm_order)
    )
    dataframe = dataframe[[y_column] + columns_to_plot].set_index(y_column)
    fig, ax = plt.subplots(figsize=size_box)

    # colorblind-friendly do ggplot2
    custom_colors = {
        "EC 521": "#117733",  # Verde escuro - mais forte
        "EC 384": "#44AA99",  # Azul esverdeado
        "EC 256": "#88CCEE",  # Azul claro
        "RSA 4096": "#DDCC77",  # Amarelo ouro
        "RSA 3072": "#E69F00",  # Laranja
        "RSA 2048": "#D55E00",  # Vermelho escuro
        "RSA 1024": "#999999",  # Cinza - mais fraco
        "Unknown": "#0072B2",  # Azul
    }
    color_list = [custom_colors.get(col, "#BBBBBB") for col in columns_to_plot]

    dataframe.plot(kind='barh', stacked=True, color=color_list,
                   edgecolor="black", ax=ax)

    for container in ax.containers:
        for rect, value in zip(container, container.datavalues):
            if value > 0:
                height = rect.get_height()
                width = rect.get_width()
                xpos = rect.get_x() + width / 2
                ypos = rect.get_y() + height / 2

                if width > 3:
                    face_color = rect.get_facecolor()[:3]
                    brightness = sum([c * w for c, w in zip(face_color, [0.299, 0.587, 0.114])])
                    text_color = "black" if brightness > 0.5 else "white"
                    ax.text(xpos, ypos, f"{value:.1f}", ha="center", va="center",
                            fontsize=8, color=text_color)

    ax.set_xlabel("Key Algorithms (%)", fontsize=12)
    ax.set_ylabel("NUTS2" if level == "nuts" else "Country", fontsize=12)
    ax.set_title(title, fontsize=16, pad=55, y=1)
    ax.legend(columns_to_plot, title="Key Algorithms", loc="lower left", bbox_to_anchor=(0, 1), ncol=6, frameon=False)
    ax.grid(axis="x", linestyle="--", alpha=0.5)

    plt.tight_layout()
    return fig


def generate_key_algorithm_chart(dataframe):
    total_countries = dataframe["country"].unique()
    for country in total_countries:
        fig = plot_key_algorithm_chart(dataframe, "nuts",
                                       f"Key Algorithm in {get_country(country)} by NUTS2",
                                       country)
        file_name = f"key_algorithm_distribution_in_{country}_by_nuts2.pdf"
        path_to_save = os.path.join(CHART_DIRECTORY, file_name)
        fig.savefig(path_to_save, format="pdf", bbox_inches="tight")
        plt.show()

    fig = plot_key_algorithm_chart(dataframe, "country", "Key Algorithm by Country")
    file_name = "key_algorithm_distribution_by_country.pdf"
    path_to_save = os.path.join(CHART_DIRECTORY, file_name)
    fig.savefig(path_to_save, format="pdf", bbox_inches="tight")
    plt.show()


def make_algorithm_report(dataframe):
    stats = get_algorithm_stats(dataframe)
    generate_algorithm_tables(stats)
    create_radar_chart(stats)
    generate_key_algorithm_chart(stats)
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    print(stats.tail(10))


if __name__ == "__main__":
    pass
