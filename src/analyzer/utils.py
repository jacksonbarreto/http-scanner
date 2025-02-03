from src.analyzer.setup import DATA_SOURCE_DIRECTORY, FILE_TO_ANALYZE
import os
import re
import pandas as pd


def extract_country(filename):
    parts = filename.replace('.csv', '').split('_')
    if len(parts) < 2:
        raise ValueError(f"Invalid filename format: {filename}. Expected format: 'country_platform.csv'")
    return parts[0]


def consolidate_data():
    files = [f for f in os.listdir(DATA_SOURCE_DIRECTORY) if re.match(r'^[a-zA-Z]{2}_.*\.csv$', f)]
    print(f"Found {len(files)} result files to analyze.")

    if not files:
        print(f"No CSV files found in '{DATA_SOURCE_DIRECTORY}'. Please ensure the files are in the correct directory.")
        return []

    data_frames = []
    for file in files:
        file_path = os.path.join(DATA_SOURCE_DIRECTORY, file)
        try:
            country = extract_country(os.path.basename(file))
            print(f"Loading file: {file} (Country: {country})")

            df = pd.read_csv(file_path)
            df['country'] = country

            df = df.loc[df.groupby("ETER_ID")["final_score"].idxmin()]

            data_frames.append(df)
        except Exception as e:
            print(f"Error loading {file}: {e}")

    consolidate_df = pd.concat(data_frames, ignore_index=True) if data_frames else pd.DataFrame()
    consolidate_df.to_csv(FILE_TO_ANALYZE, index=False)
    print(f"Consolidated data saved in: {FILE_TO_ANALYZE}")
    return consolidate_df


def get_country(country):
    if country == "de":
        return "Germany"
    elif country == "fr":
        return "France"
    elif country == "it":
        return "Italy"
    return country

def get_reverse_country(country):
    if country == "Germany":
        return "de"
    elif country == "France":
        return "fr"
    elif country == "Italy":
        return "it"
    return country