import os

import pandas as pd
import matplotlib.pyplot as plt

from src.analyzer.setup import TABLE_DIRECTORY, CHART_DIRECTORY
from src.analyzer.utils import get_country


def get_valid_certificates_stats(dataframe):
    stats_by_nuts = dataframe.groupby(["country", "NUTS2_Label_2016", "valid_certificate"]).size().unstack(
        fill_value=0).reset_index()
    stats_by_nuts.rename(columns={"NUTS2_Label_2016": "nuts"}, inplace=True)
    stats_by_nuts["Category"] = None

    stats_by_nuts_category = dataframe.groupby(
        ["country", "NUTS2_Label_2016", "Category", "valid_certificate"]).size().unstack(fill_value=0).reset_index()
    stats_by_nuts_category.rename(columns={"NUTS2_Label_2016": "nuts"}, inplace=True)

    stats_by_country_category = dataframe.groupby(["country", "Category", "valid_certificate"]).size().unstack(
        fill_value=0).reset_index()
    stats_by_country_category["nuts"] = None

    stats_by_country = dataframe.groupby(["country", "valid_certificate"]).size().unstack(fill_value=0).reset_index()
    stats_by_country["nuts"] = None
    stats_by_country["Category"] = None

    for df in [stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country]:
        if True not in df:
            df[True] = 0
        if False not in df:
            df[False] = 0

    stats_by_nuts["total_schools"] = stats_by_nuts[True] + stats_by_nuts[False]
    stats_by_nuts_category["total_schools"] = stats_by_nuts_category[True] + stats_by_nuts_category[False]
    stats_by_country_category["total_schools"] = stats_by_country_category[True] + stats_by_country_category[False]
    stats_by_country["total_schools"] = stats_by_country[True] + stats_by_country[False]

    stats_by_nuts["invalid_percent"] = (stats_by_nuts[False] / stats_by_nuts["total_schools"] * 100).round(2)
    stats_by_nuts["valid_percent"] = (stats_by_nuts[True] / stats_by_nuts["total_schools"] * 100).round(2)

    stats_by_nuts_category["invalid_percent"] = (
            stats_by_nuts_category[False] / stats_by_nuts_category["total_schools"] * 100).round(2)
    stats_by_nuts_category["valid_percent"] = (
            stats_by_nuts_category[True] / stats_by_nuts_category["total_schools"] * 100).round(2)

    stats_by_country_category["valid_percent"] = (
            stats_by_country_category[True] / stats_by_country_category["total_schools"] * 100).round(2)
    stats_by_country_category["invalid_percent"] = (
            stats_by_country_category[False] / stats_by_country_category["total_schools"] * 100).round(2)

    stats_by_country["valid_percent"] = (stats_by_country[True] / stats_by_country["total_schools"] * 100).round(2)
    stats_by_country["invalid_percent"] = (
            stats_by_country[False] / stats_by_country["total_schools"] * 100).round(2)

    stats_by_nuts["level"] = "nuts"
    stats_by_nuts_category["level"] = "nuts_category"
    stats_by_country_category["level"] = "country_category"
    stats_by_country["level"] = "country"

    consolidated_stats = pd.concat(
        [stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country],
        axis=0, ignore_index=True
    )

    return consolidated_stats


def latex_algorithm_table(dataframe, level, title, label):
    if level == "nuts":
        columns_to_display = ["nuts"] + [col for col in dataframe.columns if
                                         isinstance(col, str) and col.endswith("_percent")]
        dataframe = dataframe[dataframe["level"] == "nuts"]
        rename_map = {
            "nuts": "NUTS2",
        }
    elif level == "nuts_category":
        columns_to_display = ["nuts"] + [col for col in dataframe.columns if
                                         isinstance(col, str) and col.endswith("_percent")]
        dataframe = dataframe[dataframe["level"] == "nuts_category"]
        rename_map = {
            "nuts": "NUTS2",
        }
    elif level == "country":
        dataframe = dataframe[dataframe["level"] == "country"]
        columns_to_display = ["country"] + [col for col in dataframe.columns if
                                            isinstance(col, str) and col.endswith("_percent")]
        rename_map = {
            "country": "Country",
        }
    else:
        raise ValueError("Invalid level. Use 'nuts' or 'country'.")

    dataframe = dataframe.sort_values(
        by=[col for col in
            reversed([col for col in dataframe.columns if isinstance(col, str) and col.endswith("_percent")])],
        ascending=False)
    rename_map.update(**{col: col.replace("_percent", "") for col in dataframe.columns if
                         isinstance(col, str) and col.endswith("_percent")})
    cols_to_remove = [c for c in [col for col in dataframe.columns if isinstance(col, str) and col.endswith("_percent")]
                      if
                      dataframe[c].sum() == 0]
    columns_to_display = [col for col in columns_to_display if col not in cols_to_remove]
    dataframe = dataframe[columns_to_display].rename(columns=rename_map)
    column_headers = " & ".join(f"\\makecell{{{col.capitalize()}}}" for col in dataframe.columns)

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


def generate_valid_certificates_tables(stats_dataframe):
    countries = stats_dataframe["country"].unique()
    for country in countries:
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) & (stats_dataframe["level"] == "nuts")]
        nuts2_table = latex_algorithm_table(nuts_data, "nuts",
                                            f"Valid Certificate Distribution in {get_country(country)} by NUTS2 (\\%)",
                                            f"valid_certificate_distribution_{country.lower()}_nuts")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"valid_certificate_distribution_in_{country}_by_nuts2.txt")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) &
                                    (stats_dataframe["level"] == "nuts_category") &
                                    (stats_dataframe["Category"] == "private")]
        nuts2_table = latex_algorithm_table(nuts_data, "nuts_category",
                                            f"Valid Certificate Distribution at Private HEIs in {get_country(country)} by NUTS2 (\\%)",
                                            f"valid_certificate_distribution_{country.lower()}_nuts_private")
        path_to_save = os.path.join(TABLE_DIRECTORY,
                                    f"valid_certificate_distribution_in_{country}_by_nuts2_private.txt")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) &
                                    (stats_dataframe["level"] == "nuts_category") &
                                    (stats_dataframe["Category"] == "public")]
        nuts2_table = latex_algorithm_table(nuts_data, "nuts_category",
                                            f"Valid Certificate Distribution at Public HEIs in {get_country(country)} by NUTS2 (\\%)",
                                            f"valid_certificate_distribution_{country.lower()}_nuts_public")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"valid_certificate_distribution_in_{country}_by_nuts2_public.txt")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)

    country_data = stats_dataframe[stats_dataframe["level"] == "country"]
    country_table = latex_algorithm_table(country_data, "country", "Valid Certificate Distribution by Country (\\%)",
                                          "valid_certificate_distribution_by_country")
    path_to_save = os.path.join(TABLE_DIRECTORY, "valid_certificate_distribution_by_country.txt")
    with open(path_to_save, "w", encoding="utf-8") as tex_file:
        tex_file.write(country_table)


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
    rename_map = {col: col.replace("_percent", "").capitalize() for col in dataframe.columns if isinstance(col, str) and col.endswith("_percent")}

    columns_to_display = [col for col in dataframe.columns if isinstance(col, str) and col.endswith("_percent")]

    columns_to_plot = [col.replace("_percent", "").capitalize() for col in columns_to_display]
    dataframe = dataframe[[y_column] + columns_to_display].rename(columns=rename_map)

    dataframe = dataframe[[y_column] + columns_to_plot].set_index(y_column)
    dataframe.sort_values(by="Valid", ascending=True, inplace=True)
    fig, ax = plt.subplots(figsize=size_box)

    # colorblind-friendly do ggplot2
    custom_colors = {
        "Valid": "#117733",  # Dark green
        "Invalid": "#D55E00",  # Dark red
    }
    color_list = [custom_colors.get(col, "#BBBBBB") for col in columns_to_plot]

    dataframe.plot(kind='barh', stacked=True, color=color_list,
                   edgecolor="black", ax=ax)

    for container in ax.containers:
        for rect, value in zip(container, container.datavalues):
            if value > 0:
                height = rect.get_height()
                width = rect.get_width()
                x_pos = rect.get_x() + width / 2
                y_pos = rect.get_y() + height / 2

                if width > 3:
                    face_color = rect.get_facecolor()[:3]
                    brightness = sum([c * w for c, w in zip(face_color, [0.299, 0.587, 0.114])])
                    text_color = "black" if brightness > 0.5 else "white"
                    ax.text(x_pos, y_pos, f"{value:.1f}", ha="center", va="center",
                            fontsize=8, color=text_color)

    ax.set_xlabel("Valid Certificates (%)", fontsize=12)
    ax.set_ylabel("NUTS2" if level == "nuts" else "Country", fontsize=12)
    ax.set_title(title, fontsize=16, pad=55, y=1)
    ax.legend(columns_to_plot, title="Status", loc="lower left", bbox_to_anchor=(0, 1), ncol=6, frameon=False)
    ax.grid(axis="x", linestyle="--", alpha=0.5)

    plt.tight_layout()
    return fig


def generate_valid_certificate_chart(dataframe):
    total_countries = dataframe["country"].unique()
    for country in total_countries:
        fig = plot_key_algorithm_chart(dataframe, "nuts",
                                       f"Valid Certificates in {get_country(country)} by NUTS2",
                                       country)
        file_name = f"valid_certificate_distribution_in_{country}_by_nuts2.pdf"
        path_to_save = os.path.join(CHART_DIRECTORY, file_name)
        fig.savefig(path_to_save, format="pdf", bbox_inches="tight")
        plt.show()

    fig = plot_key_algorithm_chart(dataframe, "country", "Valid Certificates by Country")
    file_name = "valid_certificate_distribution_by_country.pdf"
    path_to_save = os.path.join(CHART_DIRECTORY, file_name)
    fig.savefig(path_to_save, format="pdf", bbox_inches="tight")
    plt.show()


def make_valid_certificate_report(dataframe):
    stats = get_valid_certificates_stats(dataframe)

    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    print(stats.head(10))
    print(stats.tail(10))

    generate_valid_certificates_tables(stats)
    generate_valid_certificate_chart(stats)


if __name__ == "__main__":
    pass
