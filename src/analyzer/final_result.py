import os

import pandas as pd

from src.analyzer.setup import RESULTS_FROM_SH, FILE_TO_ANALYZE, DATA_SOURCE_DIRECTORY, TABLE_DIRECTORY
from src.analyzer.utils import get_country


def merge_ande_calculate_final_score(df_sh, df_https):
    merged_df = df_https.merge(df_sh, on="ETER_ID", suffixes=("", "_sh"), how="inner")

    merged_df.rename(columns={"assessment_datetime": "assessment_datetime_https", "final_score": "final_score_https",
                              "grade": "grade_https"}, inplace=True)

    merged_df["score"] = ((merged_df["final_score_https"] * 0.6) + (merged_df["final_score_sh"] * 0.4)).round(2)
    bins = [0, 20, 35, 50, 65, 80, 101]
    labels = ["F", "E", "D", "C", "B", "A"]
    merged_df["grade"] = pd.cut(merged_df["score"], bins=bins, labels=labels, right=False)

    final_df = merged_df[["ETER_ID", "country", "Name", "Category", "Institution_Category_Standardized",
    "Member_of_European_University_alliance", "NUTS2", "NUTS2_Label_2016", "NUTS2_Label_2021", "NUTS3",
    "NUTS3_Label_2016", "NUTS3_Label_2021", "assessment_datetime_https", "assessment_datetime_sh", "score", "grade"]].reset_index(drop=True)
    return final_df

def save_final_results_by_country(final_df):
    for country in final_df["country"].unique():
        country_df = final_df[final_df["country"] == country]
        country_df.to_csv(f"{DATA_SOURCE_DIRECTORY}/final_result_{country}.csv", index=False)

def aggregate_scores_by_nuts(final_df):
    for country in final_df["country"].unique():
        country_df = final_df[final_df["country"] == country]
        aggregated_df = country_df.groupby(["NUTS2_Label_2016"], as_index=False)["score"].mean().round(2)
        aggregated_df.to_csv(f"{TABLE_DIRECTORY}/choropleth_map_{country}.csv", index=False)


def get_score_stats(dataframe):
    stats_by_nuts = dataframe.groupby(["country", "NUTS2_Label_2016"]).agg(
        {"score": "mean", "ETER_ID": "count"}).reset_index()
    stats_by_nuts.rename(columns={"NUTS2_Label_2016": "nuts", "ETER_ID": "total_schools"}, inplace=True)
    stats_by_nuts["Category"] = None

    stats_by_nuts_category = dataframe.groupby(["country", "NUTS2_Label_2016", "Category"]).agg(
        {"score": "mean", "ETER_ID": "count"}).reset_index()
    stats_by_nuts_category.rename(columns={"NUTS2_Label_2016": "nuts", "ETER_ID": "total_schools"}, inplace=True)

    stats_by_country_category = dataframe.groupby(["country", "Category"]).agg(
        {"score": "mean", "ETER_ID": "count"}).reset_index()
    stats_by_country_category["nuts"] = None
    stats_by_country_category.rename(columns={"ETER_ID": "total_schools"}, inplace=True)

    stats_by_country = dataframe.groupby(["country"]).agg(
        {"score": "mean", "ETER_ID": "count"}).reset_index()
    stats_by_country["nuts"] = None
    stats_by_country["Category"] = None
    stats_by_country.rename(columns={"ETER_ID": "total_schools"}, inplace=True)

    for df in [stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country]:
        df["score"] = df["score"].round(2)

    stats_by_nuts["level"] = "nuts"
    stats_by_nuts_category["level"] = "nuts_category"
    stats_by_country_category["level"] = "country_category"
    stats_by_country["level"] = "country"

    consolidated_stats = pd.concat([stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country],
                                   axis=0, ignore_index=True)

    return consolidated_stats


def latex_score_table(dataframe, level, title, label):
    if level == "nuts":
        columns_to_display = ["nuts", "score"]
        dataframe = dataframe[dataframe["level"] == "nuts"]
        rename_map = {
            "nuts": "NUTS2",
        }
    elif level == "nuts_category":
        columns_to_display = ["nuts", "score"]
        dataframe = dataframe[dataframe["level"] == "nuts_category"]
        rename_map = {
            "nuts": "NUTS2",
        }
    elif level == "country":
        dataframe = dataframe[dataframe["level"] == "country"]
        columns_to_display = ["country", "score"]
        rename_map = {
            "country": "Country",
        }
    else:
        raise ValueError("Invalid level. Use 'nuts' or 'country'.")

    dataframe = dataframe.sort_values(
        by=["score"],
        ascending=False)

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


def generate_score_tables(stats_dataframe):
    countries = stats_dataframe["country"].unique()
    for country in countries:
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) & (stats_dataframe["level"] == "nuts")]
        nuts2_table = latex_score_table(nuts_data, "nuts",
                                            f"HTTPS Average Score in {get_country(country)} by NUTS2 (\\%)",
                                            f"http_avg_score_{country.lower()}_nuts")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"http_avg_score_in_{country}_by_nuts2.tex")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) &
                                    (stats_dataframe["level"] == "nuts_category") &
                                    (stats_dataframe["Category"] == "private")]
        nuts2_table = latex_score_table(nuts_data, "nuts_category",
                                            f"HTTPS Average Score at Private HEIs in {get_country(country)} by NUTS2 (\\%)",
                                            f"http_avg_score_{country.lower()}_nuts_private")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"http_avg_score_in_{country}_by_nuts2_private.tex")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)
        nuts_data = stats_dataframe[(stats_dataframe["country"] == country) &
                                    (stats_dataframe["level"] == "nuts_category") &
                                    (stats_dataframe["Category"] == "public")]
        nuts2_table = latex_score_table(nuts_data, "nuts_category",
                                            f"HTTPS Average Score at Public HEIs in {get_country(country)} by NUTS2 (\\%)",
                                            f"http_avg_score_{country.lower()}_nuts_public")
        path_to_save = os.path.join(TABLE_DIRECTORY, f"http_avg_score_in_{country}_by_nuts2_public.tex")
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(nuts2_table)

    country_data = stats_dataframe[stats_dataframe["level"] == "country"]
    country_table = latex_score_table(country_data, "country", "HTTPS Average Score by Country (\\%)",
                                          "http_avg_score_by_country")
    path_to_save = os.path.join(TABLE_DIRECTORY, "http_avg_score_by_country.tex")
    with open(path_to_save, "w", encoding="utf-8") as tex_file:
        tex_file.write(country_table)


def make_final_result_report():
    sh_df = pd.read_csv(RESULTS_FROM_SH)
    https_df = pd.read_csv(FILE_TO_ANALYZE)
    final_result_df = merge_ande_calculate_final_score(sh_df, https_df)
    save_final_results_by_country(final_result_df)
    aggregate_scores_by_nuts(final_result_df)
    final_result_stats = get_score_stats(final_result_df)
    generate_score_tables(final_result_stats)
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    print(final_result_stats.head())
    print(final_result_stats.tail())


if __name__ == "__main__":
    make_final_result_report()
