import logging
import os

import daemon
from setproctitle import setproctitle

from src.scanner.http import scan

log_file = os.path.join('.', 'scan.log')


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
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )
    try:
        main()
        logging.info("Scan complete.")
    except Exception as e:
        logging.error(f"Unexpected error: {e}")


if __name__ == "__main__":
    with open(log_file, 'a') as log_stream:
        with daemon.DaemonContext(stdout=log_stream, stderr=log_stream, umask=0o002, working_directory='.',
                                  detach_process=True):
            start_daemon()
