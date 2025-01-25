a = {
    "targetHost": "www.esmt.org",
    "ip": "193.175.6.15",
    "port": "443", "rDNS": "www.esmt.org.",
    "service": "HTTP",
    "pretest": [{"id": "pre_128cipher", "severity": "INFO", "finding": "No 128 cipher limit bug"}],
    "protocols": [
        {"id": "SSLv2", "severity": "OK", "finding": "not offered"},
        {
            "id": "SSLv3",
            "severity": "OK",
            "finding": "not offered"
        },
        {"id": "TLS1", "severity": "INFO", "finding": "not offered"}, {
            "id": "TLS1_1",
            "severity": "INFO",
            "finding": "not offered"
        },
        {"id": "TLS1_2", "severity": "OK", "finding": "offered"}, {
            "id": "TLS1_3",
            "severity": "OK",
            "finding": "offered with final"
        },
        {"id": "NPN", "severity": "INFO", "finding": "not offered"}, {
            "id": "ALPN_HTTP2",
            "severity": "OK",
            "finding": "h2"
        },
        {"id": "ALPN", "severity": "INFO", "finding": "http/1.1"}],
    "grease": [],
    "ciphers": [{"id": "cipherlist_NULL", "severity": "OK", "cwe": "CWE-327", "finding": "not offered"}, {
        "id": "cipherlist_aNULL",
        "severity": "OK",
        "cwe": "CWE-327",
        "finding": "not offered"
    }, {
        "id": "cipherlist_EXPORT",
        "severity": "OK",
        "cwe": "CWE-327",
        "finding": "not offered"
    }, {
        "id": "cipherlist_LOW",
        "severity": "OK",
        "cwe": "CWE-327",
        "finding": "not offered"
    }, {
        "id": "cipherlist_3DES_IDEA",
        "severity": "INFO",
        "cwe": "CWE-310",
        "finding": "not offered"
    }, {
        "id": "cipherlist_OBSOLETED",
        "severity": "LOW",
        "cwe": "CWE-310",
        "finding": "offered"
    }, {"id": "cipherlist_STRONG_NOFS", "severity": "INFO", "finding": "not offered"}, {
        "id": "cipherlist_STRONG_FS",
        "severity": "OK",
        "finding": "offered"
    }], "serverPreferences":
        [{"id": "cipher_order-tls1_2", "severity": "OK", "finding": "server"}, {
            "id": "cipher-tls1_2_xc030",
            "severity": "OK",
            "finding": "TLSv1.2   xc030   ECDHE-RSA-AES256-GCM-SHA384       ECDH 253   AESGCM      256      TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
        }, {
            "id": "cipher-tls1_2_xc02f",
            "severity": "OK",
            "finding": "TLSv1.2   xc02f   ECDHE-RSA-AES128-GCM-SHA256       ECDH 253   AESGCM      128      TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
        }, {
            "id": "cipher-tls1_2_xcca8",
            "severity": "OK",
            "finding": "TLSv1.2   xcca8   ECDHE-RSA-CHACHA20-POLY1305       ECDH 253   ChaCha20    256      TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
        }, {
            "id": "cipher-tls1_2_x9f",
            "severity": "OK",
            "finding": "TLSv1.2   x9f     DHE-RSA-AES256-GCM-SHA384         DH 2048    AESGCM      256      TLS_DHE_RSA_WITH_AES_256_GCM_SHA384"
        }, {
            "id": "cipher-tls1_2_xccaa",
            "severity": "OK",
            "finding": "TLSv1.2   xccaa   DHE-RSA-CHACHA20-POLY1305         DH 2048    ChaCha20    256      TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256"
        }, {
            "id": "cipher-tls1_2_x9e",
            "severity": "OK",
            "finding": "TLSv1.2   x9e     DHE-RSA-AES128-GCM-SHA256         DH 2048    AESGCM      128      TLS_DHE_RSA_WITH_AES_128_GCM_SHA256"
        }, {
            "id": "cipher-tls1_2_xc028",
            "severity": "LOW",
            "finding": "TLSv1.2   xc028   ECDHE-RSA-AES256-SHA384           ECDH 253   AES         256      TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384"
        }, {
            "id": "cipherorder_TLSv1_2",
            "severity": "INFO",
            "finding": "ECDHE-RSA-AES256-GCM-SHA384 ECDHE-RSA-AES128-GCM-SHA256 ECDHE-RSA-CHACHA20-POLY1305 DHE-RSA-AES256-GCM-SHA384 DHE-RSA-CHACHA20-POLY1305 DHE-RSA-AES128-GCM-SHA256 ECDHE-RSA-AES256-SHA384"
        }, {"id": "prioritize_chacha_TLSv1_2", "severity": "INFO", "finding": "false"}, {
            "id": "cipher_order-tls1_3",
            "severity": "OK",
            "finding": "server"
        }, {
            "id": "cipher-tls1_3_x1302",
            "severity": "OK",
            "finding": "TLSv1.3   x1302   TLS_AES_256_GCM_SHA384            ECDH 253   AESGCM      256      TLS_AES_256_GCM_SHA384"
        }, {
            "id": "cipher-tls1_3_x1303",
            "severity": "OK",
            "finding": "TLSv1.3   x1303   TLS_CHACHA20_POLY1305_SHA256      ECDH 253   ChaCha20    256      TLS_CHACHA20_POLY1305_SHA256"
        }, {
            "id": "cipher-tls1_3_x1301",
            "severity": "OK",
            "finding": "TLSv1.3   x1301   TLS_AES_128_GCM_SHA256            ECDH 253   AESGCM      128      TLS_AES_128_GCM_SHA256"
        }, {
            "id": "cipherorder_TLSv1_3",
            "severity": "INFO",
            "finding": "TLS_AES_256_GCM_SHA384 TLS_CHACHA20_POLY1305_SHA256 TLS_AES_128_GCM_SHA256"
        }, {"id": "prioritize_chacha_TLSv1_3", "severity": "INFO", "finding": "false"}, {
            "id": "cipher_order",
            "severity": "OK",
            "finding": "server"
        }], "fs":
        [{"id": "FS", "severity": "OK", "finding": "offered"}, {
            "id": "FS_ciphers",
            "severity": "INFO",
            "finding": "TLS_AES_256_GCM_SHA384 TLS_CHACHA20_POLY1305_SHA256 ECDHE-RSA-AES256-GCM-SHA384 ECDHE-RSA-AES256-SHA384 DHE-RSA-AES256-GCM-SHA384 ECDHE-RSA-CHACHA20-POLY1305 DHE-RSA-CHACHA20-POLY1305 TLS_AES_128_GCM_SHA256 ECDHE-RSA-AES128-GCM-SHA256 DHE-RSA-AES128-GCM-SHA256"
        }, {
            "id": "FS_ECDHE_curves",
            "severity": "OK",
            "finding": "prime256v1 secp384r1 secp521r1 X25519 X448"
        }, {
            "id": "DH_groups",
            "severity": "OK",
            "finding": "ffdhe2048 ffdhe3072 ffdhe4096 ffdhe6144 ffdhe8192"
        }, {
            "id": "FS_TLS12_sig_algs",
            "severity": "INFO",
            "finding": "RSA-PSS-RSAE+SHA256 RSA-PSS-RSAE+SHA384 RSA-PSS-RSAE+SHA512 RSA+SHA256 RSA+SHA384 RSA+SHA512 RSA+SHA224"
        }, {
            "id": "FS_TLS13_sig_algs",
            "severity": "INFO",
            "finding": "RSA-PSS-RSAE+SHA256 RSA-PSS-RSAE+SHA384 RSA-PSS-RSAE+SHA512"
        }],
    "serverDefaults":
        [
            {
                "id": "TLS_extensions",
                "severity": "INFO",
                "finding": "'renegotiation info/#65281' 'server name/#0' 'EC point formats/#11' 'status request/#5' 'supported versions/#43' 'key share/#51' 'supported_groups/#10' 'max fragment length/#1' 'application layer protocol negotiation/#16' 'encrypt-then-mac/#22' 'extended master secret/#23'"
            },
            {
                "id": "TLS_session_ticket",
                "severity": "INFO",
                "finding": "no -- no lifetime advertised"
            },
            {"id": "SSL_sessionID_support", "severity": "INFO", "finding": "yes"},
            {
                "id": "sessionresumption_ticket",
                "severity": "INFO",
                "finding": "not supported"
            },
            {"id": "sessionresumption_ID", "severity": "INFO", "finding": "supported"},
            {
                "id": "TLS_timestamp",
                "severity": "INFO",
                "finding": "random"
            },
            {"id": "certificate_compression", "severity": "INFO", "finding": "none"},
            {
                "id": "clientAuth",
                "severity": "INFO",
                "finding": "none"
            },
            {"id": "cert_numbers", "severity": "INFO", "finding": "1"},
            {
                "id": "cert_signatureAlgorithm",
                "severity": "OK",
                "finding": "SHA384 with RSA"
            },
            {
                "id": "cert_keySize",
                "severity": "INFO",
                "finding": "RSA 2048 bits (exponent is 65537)"
            },
            {
                "id": "cert_keyUsage",
                "severity": "INFO",
                "finding": "Digital Signature, Key Encipherment"
            },
            {
                "id": "cert_extKeyUsage",
                "severity": "INFO",
                "finding": "TLS Web Server Authentication, TLS Web Client Authentication"
            },
            {
                "id": "cert_serialNumber",
                "severity": "INFO",
                "finding": "98693164126113241999F77415E607CB"
            },
            {"id": "cert_serialNumberLen", "severity": "INFO", "finding": "16"}, {
            "id": "cert_fingerprintSHA1",
            "severity": "INFO",
            "finding": "73CDF12A8C40D9382D19B71B6FDCABC3FD282008"
        },
            {
                "id": "cert_fingerprintSHA256",
                "severity": "INFO",
                "finding": "266A11DBE17F19DD0FE1E1480076CCD95E5AF5E932E5F69A8E8077A987AEFF9E"
            },
            {
                "id": "cert",
                "severity": "INFO",
                "finding": "-----BEGIN CERTIFICATE-----\n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\n-----END CERTIFICATE-----"
            },
            {"id": "cert_commonName", "severity": "OK", "finding": "esmt.berlin"}, {
            "id": "cert_commonName_wo_SNI",
            "severity": "INFO",
            "finding": "esmt.berlin"
        },
            {
                "id": "cert_subjectAltName",
                "severity": "INFO",
                "finding": "esmt.berlin *.campus.esmt.org *.esmt.berlin *.esmt.org *.global.esmt.org esmt.org"
            },
            {
                "id": "cert_trust",
                "severity": "OK",
                "finding": "Ok via SAN wildcard (same w/o SNI)"
            },
            {
                "id": "cert_trust_wildcard",
                "severity": "LOW",
                "finding": "trust is via wildcard"
            },
            {"id": "cert_chain_of_trust", "severity": "OK", "finding": "passed."},
            {
                "id": "cert_certificatePolicies_EV",
                "severity": "INFO",
                "finding": "no"
            },
            {"id": "cert_expirationStatus", "severity": "OK", "finding": "234 >= 60 days"},
            {
                "id": "cert_notBefore",
                "severity": "INFO",
                "finding": "2024-09-16 00:00"
            },
            {"id": "cert_notAfter", "severity": "OK", "finding": "2025-09-16 23:59"},
            {
                "id": "cert_extlifeSpan",
                "severity": "OK",
                "finding": "certificate has no extended life time according to browser forum"
            }, {"id": "cert_eTLS", "severity": "INFO", "finding": "not present"},
            {
                "id": "cert_crlDistributionPoints",
                "severity": "INFO",
                "finding": "http://GEANT.crl.sectigo.com/GEANTOVRSACA4.crl"
            },
            {"id": "cert_ocspURL", "severity": "INFO", "finding": "http://GEANT.ocsp.sectigo.com"},
            {
                "id": "OCSP_stapling",
                "severity": "OK",
                "finding": "offered"
            },
            {"id": "cert_ocspRevoked", "severity": "OK", "finding": "not revoked"},
            {
                "id": "cert_mustStapleExtension",
                "severity": "INFO",
                "finding": "--"
            },
            {
                "id": "DNS_CAArecord",
                "severity": "OK",
                "finding": "issue=letsencrypt.org, issue=pki.dfn.de, issue=sectigo.com, issuemail=pki.dfn.de, issuemail=sectigo.com, issuewild=sectigo.com"
            },
            {
                "id": "certificate_transparency",
                "severity": "OK",
                "finding": "yes (certificate extension)"
            },
            {"id": "certs_countServer", "severity": "INFO", "finding": "3"},
            {
                "id": "certs_list_ordering_problem",
                "severity": "INFO",
                "finding": "no"
            },
            {
                "id": "cert_caIssuers",
                "severity": "INFO",
                "finding": "GEANT OV RSA CA 4 (GEANT Vereniging from NL)"
            },
            {
                "id": "intermediate_cert <#1>",
                "severity": "INFO",
                "finding": "-----BEGIN CERTIFICATE-----\n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\n-----END CERTIFICATE-----"
            },
            {
                "id": "intermediate_cert_fingerprintSHA256 <#1>",
                "severity": "INFO",
                "finding": "37834FA5EA40FBF7B61196955962E1CA0558872435E4206653D3F620DD8E988E"
            },
            {
                "id": "intermediate_cert_notBefore <#1>",
                "severity": "INFO",
                "finding": "2020-02-18 00:00"
            }, {
            "id": "intermediate_cert_notAfter <#1>",
            "severity": "OK",
            "finding": "2033-05-01 23:59"
        }, {
            "id": "intermediate_cert_expiration <#1>",
            "severity": "OK",
            "finding": "ok > 40 days"
        }, {
            "id": "intermediate_cert_chain <#1>",
            "severity": "INFO",
            "finding": "GEANT OV RSA CA 4 <-- USERTrust RSA Certification Authority"
        }, {
            "id": "intermediate_cert <#2>",
            "severity": "INFO",
            "finding": "-----BEGIN CERTIFICATE-----\nMIIFgTCCBGmgAwIBAgIQOXJEOvkit1HX02wQ3TE1lTANBgkqhkiG9w0BAQwFADB7MQswCQYDVQQGEwJHQjEbMBkGA1UECAwSR3JlYXRlciBNYW5jaGVzdGVyMRAwDgYDVQQHDAdTYWxmb3JkMRowGAYDVQQKDBFDb21vZG8gQ0EgTGltaXRlZDEhMB8GA1UEAwwYQUFBIENlcnRpZmljYXRlIFNlcnZpY2VzMB4XDTE5MDMxMjAwMDAwMFoXDTI4MTIzMTIzNTk1OVowgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpOZXcgSmVyc2V5MRQwEgYDVQQHEwtKZXJzZXkgQ2l0eTEeMBwGA1UEChMVVGhlIFVTRVJUUlVTVCBOZXR3b3JrMS4wLAYDVQQDEyVVU0VSVHJ1c3QgUlNBIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAgBJlFzYOw9sIs9CsVw127c0n00ytUINh4qogTQktZAnczomfzD2p7PbPwdzx07HWezcoEStH2jnGvDoZtF+mvX2do2NCtnbyqTsrkfjib9DsFiCQCT7i6HTJGLSR1GJk23+jBvGIGGqQIjy8/hPwhxR79uQfjtTkUcYRZ0YIUcuGFFQ/vDP+fmyc/xadGL1RjjWmp2bIcmfbIWax1Jt4A8BQOujM8Ny8nkz+rwWWNR9XWrf/zvk9tyy29lTdyOcSOk2uTIq3XJq0tyA9yn8iNK5+O2hmAUTnAU5GU5szYPeUvlM3kHND8zLDU+/bqv50TmnHa4xgk97Exwzf4TKuzJM7UXiVZ4vuPVb+DNBpDxsP8yUmazNt925H+nND5X4OpWaxKXwyhGNVicQNwZNUMBkTrNN9N6frXTpsNVzbQdcS2qlJC9/YgIoJk2KOtWbPJYjNhLixP6Q5D9kCnusSTJV882sFqV4Wg8y4Z+LoE53MW4LTTLPtW//e5XOsIzstAL81VXQJSdhJWBp/kjbmUZIO8yZ9HE0XvMnsQybQv0FfQKlERPSZ51eHnlAfV1SoPv10Yy+xUGUJ5lhCLkMaTLTwJUdZ+gQek9QmRkpQgbLevni3/GcV4clXhB4PY9bpYrrWX1Uu6lzGKAgEJTm4Diup8kyXHAc/DVL17e8vgg8CAwEAAaOB8jCB7zAfBgNVHSMEGDAWgBSgEQojPpbxB+zirynvgqV/0DCktDAdBgNVHQ4EFgQUU3m/WqorSs9UgOHYm8Cd8rIDZsswDgYDVR0PAQH/BAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wEQYDVR0gBAowCDAGBgRVHSAAMEMGA1UdHwQ8MDowOKA2oDSGMmh0dHA6Ly9jcmwuY29tb2RvY2EuY29tL0FBQUNlcnRpZmljYXRlU2VydmljZXMuY3JsMDQGCCsGAQUFBwEBBCgwJjAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AuY29tb2RvY2EuY29tMA0GCSqGSIb3DQEBDAUAA4IBAQAYh1HcdCE9nIrgJ7cz0C7M7PDmy14R3iJvm3WOnnL+5Nb+qh+cli3vA0p+rvSNb3I8QzvAP+u431yqqcau8vzY7qN7Q/aGNnwU4M309z/+3ri0ivCRlv79Q2R+/czSAaF9ffgZGclCKxO/WIu6pKJmBHaIkU4MiRTOok3JMrO66BQavHHxW/BBC5gACiIDEOUMsfnNkjcZ7Tvx5Dq2+UUTJnWvu6rvP3t3O9LEApE9GQDTF1w52z97GA1FzZOFli9d31kWTz9RvdVFGD/tSo7oBmF0Ixa1DVBzJ0RHfxBdiSprhTEUxOipakyAvGp4z7h/jnZymQyd/teRCBaho1+V\n-----END CERTIFICATE-----"
        }, {
            "id": "intermediate_cert_fingerprintSHA256 <#2>",
            "severity": "INFO",
            "finding": "68B9C761219A5B1F0131784474665DB61BBDB109E00F05CA9F74244EE5F5F52B"
        }, {
            "id": "intermediate_cert_notBefore <#2>",
            "severity": "INFO",
            "finding": "2019-03-12 00:00"
        }, {
            "id": "intermediate_cert_notAfter <#2>",
            "severity": "OK",
            "finding": "2028-12-31 23:59"
        }, {
            "id": "intermediate_cert_expiration <#2>",
            "severity": "OK",
            "finding": "ok > 40 days"
        }, {
            "id": "intermediate_cert_chain <#2>",
            "severity": "INFO",
            "finding": "USERTrust RSA Certification Authority <-- AAA Certificate Services"
        }, {
            "id": "intermediate_cert_badOCSP",
            "severity": "OK",
            "finding": "intermediate certificate(s) is/are ok"
        }], "headerResponse":
        [{"id": "HTTP_status_code", "severity": "INFO", "finding": "301 Moved Permanently ('/')"}, {
            "id": "HTTP_clock_skew",
            "severity": "INFO",
            "finding": "0 seconds from localtime"
        }, {"id": "HTTP_headerTime", "severity": "INFO", "finding": "1737799645"}, {
            "id": "HSTS",
            "severity": "LOW",
            "finding": "not offered"
        },
            {"id": "HPKP", "severity": "INFO", "finding": "No support for HTTP Public Key Pinning"},
            {
            "id": "banner_server",
            "severity": "INFO",
            "finding": "nginx"
        },
            {
            "id": "banner_application",
            "severity": "INFO",
            "finding": "No application banner found"
        },
            {
            "id": "cookie_count",
            "severity": "INFO",
            "finding": "0 at '/' (30x detected, better try target URL of 30x)"
        },
            {"id": "security_headers", "severity": "MEDIUM", "finding": "--"},
            {
            "id": "banner_reverseproxy",
            "severity": "INFO",
            "cwe": "CWE-200",
            "finding": "--"
        }], "vulnerabilities":
        [{"id": "secure_renego", "severity": "OK", "cwe": "CWE-310", "finding": "supported"}, {
            "id": "secure_client_renego",
            "severity": "OK",
            "cve": "CVE-2011-1473",
            "cwe": "CWE-310",
            "finding": "not vulnerable"
        }, {
            "id": "CRIME_TLS",
            "severity": "OK",
            "cve": "CVE-2012-4929",
            "cwe": "CWE-310",
            "finding": "not vulnerable"
        }, {
            "id": "BREACH",
            "severity": "OK",
            "cve": "CVE-2013-3587",
            "cwe": "CWE-310",
            "finding": "not vulnerable, no gzip/deflate/compress/br HTTP compression  - only supplied '/' tested"
        }, {
            "id": "POODLE_SSL",
            "severity": "OK",
            "cve": "CVE-2014-3566",
            "cwe": "CWE-310",
            "finding": "not vulnerable, no SSLv3"
        }, {"id": "fallback_SCSV", "severity": "OK", "finding": "no protocol below TLS 1.2 offered"}, {
            "id": "SWEET32",
            "severity": "OK",
            "cve": "CVE-2016-2183 CVE-2016-6329",
            "cwe": "CWE-327",
            "finding": "not vulnerable"
        }, {
            "id": "FREAK",
            "severity": "OK",
            "cve": "CVE-2015-0204",
            "cwe": "CWE-310",
            "finding": "not vulnerable"
        }, {
            "id": "DROWN",
            "severity": "OK",
            "cve": "CVE-2016-0800 CVE-2016-0703",
            "cwe": "CWE-310",
            "finding": "not vulnerable on this host and port"
        }, {
            "id": "DROWN_hint",
            "severity": "INFO",
            "cve": "CVE-2016-0800 CVE-2016-0703",
            "cwe": "CWE-310",
            "finding": "Make sure you don't use this certificate elsewhere with SSLv2 enabled services, see https://search.censys.io/search?resource=hosts&virtual_hosts=INCLUDE&q=266A11DBE17F19DD0FE1E1480076CCD95E5AF5E932E5F69A8E8077A987AEFF9E"
        }, {
            "id": "LOGJAM",
            "severity": "OK",
            "cve": "CVE-2015-4000",
            "cwe": "CWE-310",
            "finding": "not vulnerable, no DH EXPORT ciphers,"
        }, {
            "id": "LOGJAM-common_primes",
            "severity": "OK",
            "cve": "CVE-2015-4000",
            "cwe": "CWE-310",
            "finding": "--"
        }, {
            "id": "BEAST",
            "severity": "OK",
            "cve": "CVE-2011-3389",
            "cwe": "CWE-20",
            "finding": "not vulnerable, no SSL3 or TLS1"
        }, {
            "id": "LUCKY13",
            "severity": "LOW",
            "cve": "CVE-2013-0169",
            "cwe": "CWE-310",
            "finding": "potentially vulnerable, uses TLS CBC ciphers"
        }, {
            "id": "winshock",
            "severity": "OK",
            "cve": "CVE-2014-6321",
            "cwe": "CWE-94",
            "finding": "not vulnerable"
        }, {
            "id": "RC4",
            "severity": "OK",
            "cve": "CVE-2013-2566 CVE-2015-2808",
            "cwe": "CWE-310",
            "finding": "not vulnerable"
        }], "cipherTests":
        [], "browserSimulations":
        [{
            "id": "clientsimulation-android_60",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-android_70",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-android_81",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-android_90",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-android_X",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-android_11",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-android_12",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-chrome_79_win10",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-chrome_101_win10",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-firefox_66_win81",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-firefox_100_win10",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-ie_6_xp",
            "severity": "INFO",
            "finding": "No connection"
        }, {
            "id": "clientsimulation-ie_8_win7",
            "severity": "INFO",
            "finding": "No connection"
        }, {
            "id": "clientsimulation-ie_8_xp",
            "severity": "INFO",
            "finding": "No connection"
        }, {
            "id": "clientsimulation-ie_11_win7",
            "severity": "INFO",
            "finding": "TLSv1.2 DHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-ie_11_win81",
            "severity": "INFO",
            "finding": "TLSv1.2 DHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-ie_11_winphone81",
            "severity": "INFO",
            "finding": "No connection"
        }, {
            "id": "clientsimulation-ie_11_win10",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-edge_15_win10",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-edge_101_win10_21h2",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-safari_121_ios_122",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-safari_130_osx_10146",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-safari_154_osx_1231",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-java_7u25",
            "severity": "INFO",
            "finding": "No connection"
        }, {
            "id": "clientsimulation-java_8u161",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-java1102",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-java1703",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-go_1178",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-libressl_283",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-openssl_102e",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-openssl_110l",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-openssl_111d",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-openssl_303",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }, {
            "id": "clientsimulation-apple_mail_16_0",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-RSA-AES256-GCM-SHA384"
        }, {
            "id": "clientsimulation-thunderbird_91_9",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_256_GCM_SHA384"
        }], "rating":
        [{
            "id": "rating_spec",
            "severity": "INFO",
            "finding": "SSL Labs's 'SSL Server Rating Guide' (version 2009q from 2020-01-30)"
        }, {
            "id": "rating_doc",
            "severity": "INFO",
            "finding": "https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide"
        }, {"id": "protocol_support_score", "severity": "INFO", "finding": "100"}, {
            "id": "protocol_support_score_weighted",
            "severity": "INFO",
            "finding": "30"
        }, {"id": "key_exchange_score", "severity": "INFO", "finding": "90"}, {
            "id": "key_exchange_score_weighted",
            "severity": "INFO",
            "finding": "27"
        }, {"id": "cipher_strength_score", "severity": "INFO", "finding": "90"}, {
            "id": "cipher_strength_score_weighted",
            "severity": "INFO",
            "finding": "36"
        }, {"id": "final_score", "severity": "INFO", "finding": "93"}, {
            "id": "overall_grade",
            "severity": "OK",
            "finding": "A"
        }, {"id": "grade_cap_reason_1", "severity": "INFO", "finding": "Grade capped to A. HSTS is not offered"}]
}