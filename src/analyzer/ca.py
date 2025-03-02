import os

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from src.analyzer.setup import CHART_DIRECTORY
from src.analyzer.utils import get_country


def get_ca_stats(dataframe):
    dataframe["certificate_authority"] = dataframe["certificate_authority"].fillna("Unknown")

    ca_counts = dataframe["certificate_authority"].value_counts()

    top_5_cas = ca_counts.nlargest(5).index.tolist()

    dataframe["ca_grouped"] = dataframe["certificate_authority"].apply(lambda x: x if x in top_5_cas else "Others")

    def compute_stats(groupby_cols, level_name):
        stats = dataframe.groupby(groupby_cols)["ca_grouped"].value_counts().unstack(fill_value=0).reset_index()
        stats["total_certificates"] = stats[top_5_cas + ["Others"]].sum(axis=1)

        for ca in top_5_cas + ["Others"]:
            stats[f"{ca}_percent"] = (stats[ca] / stats["total_certificates"] * 100).round(2)

        stats["level"] = level_name
        return stats

    stats_by_nuts = compute_stats(["country", "NUTS2_Label_2016"], "nuts")
    stats_by_nuts.rename(columns={"NUTS2_Label_2016": "nuts"}, inplace=True)
    stats_by_nuts["Category"] = None

    stats_by_nuts_category = compute_stats(["country", "NUTS2_Label_2016", "Category"], "nuts_category")
    stats_by_nuts_category.rename(columns={"NUTS2_Label_2016": "nuts"}, inplace=True)

    stats_by_country_category = compute_stats(["country", "Category"], "country_category")
    stats_by_country_category["nuts"] = None

    stats_by_country = compute_stats(["country"], "country")
    stats_by_country["nuts"] = None
    stats_by_country["Category"] = None

    consolidated_stats = pd.concat([stats_by_nuts, stats_by_nuts_category, stats_by_country_category, stats_by_country],
                                   axis=0, ignore_index=True)

    return consolidated_stats



def plot_ca_pie_charts(dataframe, level, title, country_filter=None):
    if level == "country_category":
        dataframe = dataframe[(dataframe["level"] == "country_category") & (dataframe["country"] == country_filter)]
        fig, axes = plt.subplots(1, 2, figsize=(12, 7))  # Dois gráficos lado a lado
        categories = ["private", "public"]
    elif level == "country":
        dataframe = dataframe[dataframe["level"] == "country"]
        fig = plt.figure(figsize=(12, 5 * len(dataframe)))
        gs = fig.add_gridspec(len(dataframe), 2, width_ratios=[2, 3])  # 4 partes gráfico, 1 parte legenda
        axes = [fig.add_subplot(gs[i, 0]) for i in range(len(dataframe))]  # Caso tenha apenas um país
        categories = None
    else:
        raise ValueError("Invalid level. Use 'country_category', or 'country'.")

    ca_columns = [col for col in dataframe.columns if col.endswith("_percent") and col != "total_certificates"]
    ca_labels = [col.replace("_percent", "").capitalize() for col in ca_columns]
    default_palette = ["#117733", "#DDCC77", "#E69F00", "#0072B2", "#CC79A7", "#999999"]
    unique_ca = sorted(set(ca_labels), key=ca_labels.index)
    if len(unique_ca) <= len(default_palette):
        color_mapping = {label: default_palette[i] for i, label in enumerate(unique_ca)}
    else:
        cmap = plt.get_cmap('tab20')
        color_mapping = {label: cmap(i / len(unique_ca)) for i, label in enumerate(unique_ca)}

    if level == "country_category":
        for i, category in enumerate(categories):
            row = dataframe[dataframe["Category"] == category].iloc[0]  # Apenas uma linha por categoria

            values = row[ca_columns].values
            valid_indices = values > 0
            filtered_values = values[valid_indices]
            filtered_labels = [ca_labels[i] for i in range(len(ca_labels)) if valid_indices[i]]
            colors = [color_mapping[label] for label in filtered_labels]
            ax = axes[i]
            ax.pie(
                filtered_values, labels=None, autopct="%1.1f%%",
                colors=colors, startangle=140,
                wedgeprops={"edgecolor": "black"}
            )
            ax.set_title(f"{category.capitalize()}", fontsize=10, pad=1)
        legend_columns = 2
        bbox_to_anchor = (0.0, -0.01)
        loc="lower left"
        patches = [mpatches.Patch(color=color_mapping[label], label=label) for label in sorted(color_mapping.keys())]

        fig.legend(handles=patches, title="Certificate Authorities", loc=loc, ncol=legend_columns,
                   frameon=False, bbox_to_anchor=bbox_to_anchor)

    elif level == "country":
        for i, row in enumerate(dataframe.iterrows()):
            row = row[1]

            values = row[ca_columns].values
            valid_indices = values > 0
            filtered_values = values[valid_indices]
            filtered_labels = [ca_labels[i] for i in range(len(ca_labels)) if valid_indices[i]]
            colors = [color_mapping[label] for label in filtered_labels]
            ax = axes[i]
            ax.pie(
                filtered_values, labels=None, autopct="%1.1f%%",
                colors=colors, startangle=140,
                wedgeprops={"edgecolor": "black"}
            )
            ax.set_title(get_country(row["country"]), fontsize=10)
        legend_columns = 1
        bbox_to_anchor = (1.2, 0.5)
        loc = "upper right"
        legend_ax = fig.add_subplot(gs[:, 1])  # Criar um eixo único para a legenda
        legend_ax.axis("off")
        patches = [mpatches.Patch(color=color_mapping[label], label=label) for label in sorted(color_mapping.keys())]
        fig.legend(handles=patches, title="Certificate Authorities", loc=loc, ncol=legend_columns,
                   frameon=False, bbox_to_anchor=(1, 0.95))



    fig.suptitle(title, fontsize=16, y=0.99)
    plt.tight_layout()
    #plt.tight_layout(rect=[0, 0, 1, 1])
    return fig

def generate_ca_pie_charts(dataframe):
    total_countries = dataframe["country"].unique()
    for country in total_countries:
        cols_to_remove = [col for col in dataframe.columns if col.endswith("_percent") and dataframe[col].sum() == 0]
        dataframe.drop(columns=cols_to_remove, inplace=True)

        fig = plot_ca_pie_charts(dataframe, "country_category", f"Certificate Authorities Distribution in {get_country(country)} by Category", country)
        file_name = f"ca_distribution_in_{country}_by_category.pdf"
        path_to_save = os.path.join(CHART_DIRECTORY, file_name)
        fig.savefig(path_to_save, format="pdf", bbox_inches="tight")
        plt.show()
        plt.close(fig)
    fig = plot_ca_pie_charts(dataframe, "country", "Certificate Authorities Distribution by Country")
    file_name = "ca_distribution_by_country.pdf"
    path_to_save = os.path.join(CHART_DIRECTORY, file_name)
    fig.savefig(path_to_save, format="pdf", bbox_inches="tight")
    plt.show()
    plt.close(fig)


def make_ca_report(dataframe):
    stats = get_ca_stats(dataframe)
    print("------------------CA-----------------")
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    print(stats.head(10))
    print(stats.tail(10))

    generate_ca_pie_charts(stats)


if __name__ == "__main__":
    pass
