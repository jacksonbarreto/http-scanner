from src.analyzer.algorithm import make_algorithm_report
from src.analyzer.setup import setup
from src.analyzer.utils import consolidate_data
from src.analyzer.worst_https import make_worst_https_reports

def main():
    setup()
    aggregated_df = consolidate_data()
    make_worst_https_reports(aggregated_df)
    print(aggregated_df.info())
    make_algorithm_report(aggregated_df)

if __name__ == "__main__":
    main()