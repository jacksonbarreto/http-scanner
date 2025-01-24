import json
import os
import subprocess
import tempfile
import threading
from concurrent.futures.thread import ThreadPoolExecutor

import pandas as pd
from uuid import uuid4

from src import config
from src.config import config, col_raw_result, columns_for_results

errors = []
results = []
lock = threading.Lock()

def scan(file_path):
    global errors
    global results
    errors = []
    results = []
    df = pd.read_csv(file_path)
    filename = os.path.basename(file_path)
    country_code = filename[:2]
    url_column_name = next((col for col in df.columns if col.lower() == 'url'), None)
    if url_column_name is None:
        raise ValueError(f"No 'url' column found in CSV ({filename}).")

    create_columns_for_results(df)

    with ThreadPoolExecutor(max_workers=config["max_workers"]) as executor:
        futures = [executor.submit(scan_row, row, url_column_name) for index, row in df.iterrows()]
        for future in futures:
            try:
                future.result()
            except Exception as e:
                print(f"Thread error in CSV ({filename}): {e}")

    output_filename = f"{country_code}_https_scanner{'_errors_' if False else ''}.csv"
    output_dir = os.path.join('.', 'src', 'data', "results")
    output_path = os.path.join(output_dir, output_filename)
    results_df = pd.DataFrame(results)
    results_df.to_csv(output_path, index=False)

def scan_row(row, url_column_name):
    url = row[url_column_name]
    temp_file_path = os.path.join(tempfile.gettempdir(), f"{str(uuid4())}.json")
    test_ssl_path = os.path.join(*config["test_ssl_path"])
    try:
        result = subprocess.run(
            [test_ssl_path, '--assuming-http', '--ids-friendly', '--sneaky', '--jsonfile-pretty', temp_file_path,  url],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if result.returncode != 0:
            raise RuntimeError(f"Error running testssl.sh for {url}: {result.stderr}")
        with open(temp_file_path, 'r') as json_file:
            raw_json = json.load(json_file)
        print(f"o raw_json: {raw_json}")
        print(f"o tipo raw_json: {type(raw_json)}")
        result = {
            col_raw_result: json.dumps(raw_json),
            "ip": raw_json["scanResult"][0]["ip"],
        }
        with lock:
            results.append({**row.to_dict(), **result})

    except Exception as e:
        print(f"Error scanning URL {url}: {e}")
        with lock:
            errors.append({**row.to_dict(), 'error': str(e)})

    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)






def create_columns_for_results(df):
    for col in columns_for_results:
        if col not in df.columns:
            df[col] = None