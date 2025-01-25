COL_RAW_RESULTS = "raw_result"
COL_ASSESSMENT_DATETIME = "assessment_datetime"
COL_IP = "ip"
COL_FINAL_SCORE = "final_score"
COL_GRADE = "grade"
COL_CA = "certificate_authority"
COL_CERTIFICATE_ALGORITHM = "certificate_signature_algorithm"
COL_KEY_SIZE = "key_size"
COL_OCSP_STAPLING = "ocsp_stapling"
COL_OCSP_MUST_STAPLE = "ocsp_must_staple"
COL_DNS_CAA = "dns_caa"
COL_CERTIFICATE_TRANSPARENCY = "certificate_transparency"
COL_BANNER_SERVER = "banner_server"
COL_BANNER_APPLICATION = "banner_application"
COL_HTTP_STATUS_CODE = "http_status_code"
COL_VALID_CERTIFICATE = "valid_certificate"

config = {
    "max_workers": 10,
    "test_ssl_path": ['..', 'testssl.sh', 'testssl.sh'],
}
