import os

ROOT_DIRECTORY = os.path.join('..', '..')
DATA_SOURCE_DIRECTORY = os.path.join(ROOT_DIRECTORY, 'src', 'data', 'results')
ANALYSIS_BASE_DIRECTORY = os.path.join(ROOT_DIRECTORY, 'src', 'data', 'reports')
FILE_TO_ANALYZE = os.path.join(ANALYSIS_BASE_DIRECTORY, 'https_consolidate_result.csv')
RESULTS_FROM_SH = os.path.join(DATA_SOURCE_DIRECTORY,'sh', 'sh_final_result_with_scores_unique_hei.csv')
TABLE_DIRECTORY = os.path.join(ANALYSIS_BASE_DIRECTORY, 'tables')
CHART_DIRECTORY = os.path.join(ANALYSIS_BASE_DIRECTORY, 'charts')

def setup():
    os.makedirs(TABLE_DIRECTORY, exist_ok=True)
    os.makedirs(CHART_DIRECTORY, exist_ok=True)