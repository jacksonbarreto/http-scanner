import logging
import os

import daemon
from setproctitle import setproctitle

from src.scanner.http import scan


def main():
    input_directory = os.path.join('.', 'src', 'data', 'source')
    files = [f for f in os.listdir(input_directory) if f.endswith('.csv')]
    logging.info(f"Found {len(files)} files to scan.")

    if not files:
        logging.warning(
            f"No CSV files found in '{input_directory}'. Please ensure the files are in the correct directory.")
        return

    for file in files:
        file_path = os.path.join(input_directory, file)
        try:
            scan(file_path)
        except Exception as e:
            logging.error(f"Error scanning {file}: {e}")


def start_daemon():
    setproctitle("http_scanner")
    log_file = os.path.join('.', 'scan.log')
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )
    logging.info("Starting scan...")
    main()
    logging.info("Scan complete.")


if __name__ == "__main__":
    with daemon.DaemonContext():
        start_daemon()
