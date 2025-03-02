import os.path

from src.analyzer.setup import DATA_SOURCE_DIRECTORY, TABLE_DIRECTORY
import pandas as pd

from src.analyzer.utils import get_country

HTTPS_WEIGHT = 0.8
DNSSEC_WEIGHT = 0.2

def latex_table(dataframe, title, label):
    dataframe.rename(columns={"NUTS2_Label_2016": "NUTS2"}, inplace=True)
    column_headers = " & ".join(f"\\makecell{{{col}}}" for col in dataframe.columns)
    table_rows = "\n".join(
        f"            {row[0]} & " + " & ".join(
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

if __name__ == "__main__":
    countries = ["de", "fr", "it"]
    filenames = []
    dnssec_df = pd.read_csv(os.path.join(DATA_SOURCE_DIRECTORY, "dnssec", "dnssec_consolidated_result.csv"))
    for country in countries:
        dnssec_df_by_country = dnssec_df[dnssec_df["country"] == country]
        http_df = pd.read_csv(os.path.join(DATA_SOURCE_DIRECTORY, f"final_result_{country}.csv"))
        merge_df = http_df.merge(dnssec_df_by_country, on="ETER_ID", suffixes=("", "_dnssec"), how="inner")
        merge_df.rename(columns={"score": "score_https", "grade": "grade_https"}, inplace=True)
        merge_df["score"] = round((merge_df["score_https"] * HTTPS_WEIGHT) + (merge_df["score_dnssec"] * DNSSEC_WEIGHT),
                                  2)
        bins = [0, 20, 35, 50, 65, 80, 101]
        labels = ["F", "E", "D", "C", "B", "A"]
        merge_df["grade"] = pd.cut(merge_df["score"], bins=bins, labels=labels, right=False)
        final_df = merge_df[["NUTS2_Label_2016", "score"]].reset_index(drop=True)
        final_df = final_df.groupby(["NUTS2_Label_2016"]).agg({"score": lambda x: round(x.mean(), 2)}).reset_index()
        final_df = final_df.sort_values(by=["score"], ascending=False)
        final_df.to_csv(os.path.join(DATA_SOURCE_DIRECTORY, f"final_classification_{country}.csv"), encoding="utf-8",
                        index=False)
        label = f"heis_rating_score_in_{get_country(country).lower()}_by_nuts2"
        table= latex_table(final_df, f"HEIs Score Rating in {get_country(country)} by NUTS2 (\\%)", label)
        filename = f"{label}.tex"
        path_to_save = os.path.join(TABLE_DIRECTORY, filename)
        with open(path_to_save, "w", encoding="utf-8") as tex_file:
            tex_file.write(table)
        filenames.append(filename)
    input_text: str = "".join(f"\\input{{tables/overview/{f.split(".")[0]}}} \n\n" for f in filenames)
    path_to_save = os.path.join(TABLE_DIRECTORY, "heis_rating_score_INPUTS.txt")
    with open(path_to_save, "w", encoding="utf-8") as tex_file:
        tex_file.write(input_text)


