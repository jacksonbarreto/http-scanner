a = {
    "clientProblem1": [{
        "id": "engine_problem",
        "severity": "WARN",
        "finding": "No engine or GOST support via engine with your ../testssl.sh/bin/openssl.Linux.x86_64"
    }],
    "Invocation": "testssl.sh --assuming-http --ids-friendly --sneaky --jsonfile-pretty /tmp/2cc3d889-accf-4938-b1fe-1de8b0a85049.json www.uni-freiburg.de",
    "at": "vmi1773393:../testssl.sh/bin/openssl.Linux.x86_64",
    "version": "3.2rc3 e806f7a",
    "openssl": "OpenSSL 1.0.2-bad from Sep  1 14:03:44 2022",
    "startTime": "1737805510",
    "scanResult": [{
        "targetHost": "www.uni-freiburg.de",
        "ip": "132.230.100.27",
        "port": "443",
        "rDNS": "uni-freiburg.de. wp-prod.vm.uni-freiburg.de.",
        "service": "HTTP",
        "pretest": [{"id": "pre_128cipher", "severity": "INFO", "finding": "No 128 cipher limit bug"}],
        "protocols": [{"id": "SSLv2", "severity": "OK", "finding": "not offered"}, {
            "id": "SSLv3",
            "severity": "OK",
            "finding": "not offered"
        }, {"id": "TLS1", "severity": "INFO", "finding": "not offered"}, {
            "id": "TLS1_1",
            "severity": "INFO",
            "finding": "not offered"
        }, {"id": "TLS1_2", "severity": "OK", "finding": "offered"}, {
            "id": "TLS1_3",
            "severity": "OK",
            "finding": "offered with final"
        }, {"id": "NPN", "severity": "INFO", "finding": "not offered"}, {
            "id": "ALPN_HTTP2",
            "severity": "OK",
            "finding": "h2"
        }, {"id": "ALPN", "severity": "INFO", "finding": "http/1.1"}],
        "grease": [],
        "ciphers": [{
            "id": "cipherlist_NULL",
            "severity": "OK",
            "cwe": "CWE-327",
            "finding": "not offered"
        }, {
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
            "severity": "INFO",
            "cwe": "CWE-310",
            "finding": "not offered"
        }, {
            "id": "cipherlist_STRONG_NOFS",
            "severity": "INFO",
            "finding": "not offered"
        }, {"id": "cipherlist_STRONG_FS", "severity": "OK", "finding": "offered"}],
        "serverPreferences": [{
            "id": "cipher_order-tls1_2",
            "severity": "OK",
            "finding": "server -- server prioritizes ChaCha ciphers when preferred by clients"
        }, {
            "id": "cipher-tls1_2_xc02b",
            "severity": "OK",
            "finding": "TLSv1.2   xc02b   ECDHE-ECDSA-AES128-GCM-SHA256     ECDH 253   AESGCM      128      TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
        }, {
            "id": "cipher-tls1_2_xc02c",
            "severity": "OK",
            "finding": "TLSv1.2   xc02c   ECDHE-ECDSA-AES256-GCM-SHA384     ECDH 253   AESGCM      256      TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
        }, {
            "id": "cipher-tls1_2_xcca9",
            "severity": "OK",
            "finding": "TLSv1.2   xcca9   ECDHE-ECDSA-CHACHA20-POLY1305     ECDH 253   ChaCha20    256      TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256"
        }, {
            "id": "cipherorder_TLSv1_2",
            "severity": "INFO",
            "finding": "ECDHE-ECDSA-AES128-GCM-SHA256 ECDHE-ECDSA-AES256-GCM-SHA384 ECDHE-ECDSA-CHACHA20-POLY1305"
        }, {"id": "prioritize_chacha_TLSv1_2", "severity": "INFO", "finding": "true"}, {
            "id": "cipher_order-tls1_3",
            "severity": "OK",
            "finding": "server -- server prioritizes ChaCha ciphers when preferred by clients"
        }, {
            "id": "cipher-tls1_3_x1301",
            "severity": "OK",
            "finding": "TLSv1.3   x1301   TLS_AES_128_GCM_SHA256            ECDH 253   AESGCM      128      TLS_AES_128_GCM_SHA256"
        }, {
            "id": "cipher-tls1_3_x1302",
            "severity": "OK",
            "finding": "TLSv1.3   x1302   TLS_AES_256_GCM_SHA384            ECDH 253   AESGCM      256      TLS_AES_256_GCM_SHA384"
        }, {
            "id": "cipher-tls1_3_x1303",
            "severity": "OK",
            "finding": "TLSv1.3   x1303   TLS_CHACHA20_POLY1305_SHA256      ECDH 253   ChaCha20    256      TLS_CHACHA20_POLY1305_SHA256"
        }, {
            "id": "cipherorder_TLSv1_3",
            "severity": "INFO",
            "finding": "TLS_AES_128_GCM_SHA256 TLS_AES_256_GCM_SHA384 TLS_CHACHA20_POLY1305_SHA256"
        }, {"id": "prioritize_chacha_TLSv1_3", "severity": "INFO", "finding": "true"}, {
            "id": "cipher_order",
            "severity": "OK",
            "finding": "server"
        }],
        "fs": [{"id": "FS", "severity": "OK", "finding": "offered"}, {
            "id": "FS_ciphers",
            "severity": "INFO",
            "finding": "TLS_AES_256_GCM_SHA384 TLS_CHACHA20_POLY1305_SHA256 ECDHE-ECDSA-AES256-GCM-SHA384 ECDHE-ECDSA-CHACHA20-POLY1305 TLS_AES_128_GCM_SHA256 ECDHE-ECDSA-AES128-GCM-SHA256"
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
            "finding": "ECDSA+SHA256 ECDSA+SHA384 ECDSA+SHA512 ECDSA+SHA224"
        }, {"id": "FS_TLS13_sig_algs", "severity": "INFO", "finding": "ECDSA+SHA256"}],
        "serverDefaults": [{
            "id": "TLS_extensions",
            "severity": "INFO",
            "finding": "'renegotiation info/#65281' 'server name/#0' 'EC point formats/#11' 'supported versions/#43' 'key share/#51' 'supported_groups/#10' 'max fragment length/#1' 'application layer protocol negotiation/#16' 'extended master secret/#23'"
        }, {
            "id": "TLS_session_ticket",
            "severity": "INFO",
            "finding": "no -- no lifetime advertised"
        }, {"id": "SSL_sessionID_support", "severity": "INFO", "finding": "yes"}, {
            "id": "sessionresumption_ticket",
            "severity": "INFO",
            "finding": "not supported"
        }, {"id": "sessionresumption_ID", "severity": "INFO", "finding": "supported"}, {
            "id": "TLS_timestamp",
            "severity": "INFO",
            "finding": "random"
        }, {"id": "certificate_compression", "severity": "INFO", "finding": "none"}, {
            "id": "clientAuth",
            "severity": "INFO",
            "finding": "none"
        }, {"id": "cert_numbers", "severity": "INFO", "finding": "1"}, {
            "id": "cert_signatureAlgorithm",
            "severity": "OK",
            "finding": "ECDSA with SHA256"
        }, {"id": "cert_keySize", "severity": "OK", "finding": "EC 256 bits (curve P-256)"}, {
            "id": "cert_keyUsage",
            "severity": "INFO",
            "finding": "Digital Signature"
        }, {
            "id": "cert_extKeyUsage",
            "severity": "INFO",
            "finding": "TLS Web Server Authentication, TLS Web Client Authentication"
        }, {
            "id": "cert_serialNumber",
            "severity": "INFO",
            "finding": "065BF14A319E8238A31440BD00E08FBC"
        }, {"id": "cert_serialNumberLen", "severity": "INFO", "finding": "16"}, {
            "id": "cert_fingerprintSHA1",
            "severity": "INFO",
            "finding": "99FE8D5B278D4F512BC0E14DB5C0B77C404FE3B7"
        }, {
            "id": "cert_fingerprintSHA256",
            "severity": "INFO",
            "finding": "002AF874CC691D6C3FE2AA84DD74650CD7D812E19AD4D7F8948A109EA635A341"
        }, {
            "id": "cert",
            "severity": "INFO",
            "finding": "-----BEGIN CERTIFICATE-----\nMIIKyzCCCnKgAwIBAgIQBlvxSjGegjijFEC9AOCPvDAKBggqhkjOPQQDAjBEMQswCQYDVQQGEwJOTDEZMBcGA1UEChMQR0VBTlQgVmVyZW5pZ2luZzEaMBgGA1UEAxMRR0VBTlQgT1YgRUNDIENBIDQwHhcNMjQxMTE1MDAwMDAwWhcNMjUxMTE1MjM1OTU5WjBzMQswCQYDVQQGEwJERTEbMBkGA1UECAwSQmFkZW4tV8O8cnR0ZW1iZXJnMS0wKwYDVQQKDCRBbGJlcnQtTHVkd2lncy1Vbml2ZXJzaXTDpHQgRnJlaWJ1cmcxGDAWBgNVBAMTD3VuaS1mcmVpYnVyZy5kZTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABDLj/eHcXbY3mTg/2fjCB2mo1UjLBnUfG9rAc4GceoUilbQU391M4+fP6NKEpLXPa4qMHuHqkLTueRdTxz6ibmCjggkVMIIJETAfBgNVHSMEGDAWgBTttKAzahsIkba9+kGSvZqrq2P0UzAdBgNVHQ4EFgQUp7vWsTyFOfMzIxJhC4ICPf9EQ2gwDgYDVR0PAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMEkGA1UdIARCMEAwNAYLKwYBBAGyMQECAk8wJTAjBggrBgEFBQcCARYXaHR0cHM6Ly9zZWN0aWdvLmNvbS9DUFMwCAYGZ4EMAQICMD8GA1UdHwQ4MDYwNKAyoDCGLmh0dHA6Ly9HRUFOVC5jcmwuc2VjdGlnby5jb20vR0VBTlRPVkVDQ0NBNC5jcmwwdQYIKwYBBQUHAQEEaTBnMDoGCCsGAQUFBzAChi5odHRwOi8vR0VBTlQuY3J0LnNlY3RpZ28uY29tL0dFQU5UT1ZFQ0NDQTQuY3J0MCkGCCsGAQUFBzABhh1odHRwOi8vR0VBTlQub2NzcC5zZWN0aWdvLmNvbTCCAX4GCisGAQQB1nkCBAIEggFuBIIBagFoAHUA3dzKNJXX4RYF55Uy+sef+D0cUN/bADoUEnYKLKy7yCoAAAGTL3pnrgAABAMARjBEAiAY0Z+XpE8N2PJnP0ZF73aID+s6AWxwnuQOotqsz9UpfwIgdEa7eRB7OQNKH65NIXdExwTn9MydtcowiMYtXfVkYJsAdgDM+w9qhXEJZf6Vm1PO6bJ8IumFXA2XjbapflTA/kwNsAAAAZMveme6AAAEAwBHMEUCIQC/B+hGagmprUlJ5x3HjgLi65uS3A6OuX/l8zvi5TqNOwIgZ9N/wHRC9/BMch7rh3/9j6WosXT/pjzIU2LPc/LHgaoAdwAS8U40vVNyTIQGGcOPP3oT+Oe1YoeInG0wBYTr5YYmOgAAAZMvemeLAAAEAwBIMEYCIQC3oO9WzcnPPbH3qHdv1RA4E3UOIGyNBn8m+/IzWVqQJgIhALiDCT/mFf6RltUBPk77YpLypals+6FRMobuTFITTNEnMIIGCwYDVR0RBIIGAjCCBf6CD3VuaS1mcmVpYnVyZy5kZYIeYWx1bW5pLW1lZXRpbmcudW5pLWZyZWlidXJnLmRlghZhbHVtbmkudW5pLWZyZWlidXJnLmRlgh9kaWFsb2d3ZXJrc3RhdHQudW5pLWZyZWlidXJnLmRlghlleHplbGxlbnoudW5pLWZyZWlidXJnLmRlghRmcnNhLnVuaS1mcmVpYnVyZy5kZYIeaHVtYm9sZHQtbGFib3IudW5pLWZyZWlidXJnLmRlghVsZWhyZS51bmktZnJlaWJ1cmcuZGWCFXNlbmF0LnVuaS1mcmVpYnVyZy5kZYIfd3AtZXhwLWZlLTAxLnZtLnVuaS1mcmVpYnVyZy5kZYIfd3AtZXhwLWZlLTAyLnZtLnVuaS1mcmVpYnVyZy5kZYInd3AtZXhwLXdlYi0wMS5jbXMuaW50cmEudW5pLWZyZWlidXJnLmRlgid3cC1leHAtd2ViLTAyLmNtcy5pbnRyYS51bmktZnJlaWJ1cmcuZGWCJ3dwLWV4cC13ZWItMDMuY21zLmludHJhLnVuaS1mcmVpYnVyZy5kZYIZd3AtZXhwLnZtLnVuaS1mcmVpYnVyZy5kZYIgd3AtcHJvZC1mZS0wMS52bS51bmktZnJlaWJ1cmcuZGWCIHdwLXByb2QtZmUtMDIudm0udW5pLWZyZWlidXJnLmRlgih3cC1wcm9kLXdlYi0wMS5jbXMuaW50cmEudW5pLWZyZWlidXJnLmRlgih3cC1wcm9kLXdlYi0wMi5jbXMuaW50cmEudW5pLWZyZWlidXJnLmRlgih3cC1wcm9kLXdlYi0wMy5jbXMuaW50cmEudW5pLWZyZWlidXJnLmRlghp3cC1wcm9kLnZtLnVuaS1mcmVpYnVyZy5kZYIhd3Atc3RhZ2UtZmUtMDEudm0udW5pLWZyZWlidXJnLmRlgiF3cC1zdGFnZS1mZS0wMi52bS51bmktZnJlaWJ1cmcuZGWCKXdwLXN0YWdlLXdlYi0wMS5jbXMuaW50cmEudW5pLWZyZWlidXJnLmRlgil3cC1zdGFnZS13ZWItMDIuY21zLmludHJhLnVuaS1mcmVpYnVyZy5kZYIpd3Atc3RhZ2Utd2ViLTAzLmNtcy5pbnRyYS51bmktZnJlaWJ1cmcuZGWCG3dwLXN0YWdlLnZtLnVuaS1mcmVpYnVyZy5kZYIgd3AtdGVzdC1mZS0wMS52bS51bmktZnJlaWJ1cmcuZGWCIHdwLXRlc3QtZmUtMDIudm0udW5pLWZyZWlidXJnLmRlgih3cC10ZXN0LXdlYi0wMS5jbXMuaW50cmEudW5pLWZyZWlidXJnLmRlgih3cC10ZXN0LXdlYi0wMi5jbXMuaW50cmEudW5pLWZyZWlidXJnLmRlgih3cC10ZXN0LXdlYi0wMy5jbXMuaW50cmEudW5pLWZyZWlidXJnLmRlghp3cC10ZXN0LnZtLnVuaS1mcmVpYnVyZy5kZYIWd3BmLnZtLnVuaS1mcmVpYnVyZy5kZYIid3d3LmFsdW1uaS1tZWV0aW5nLnVuaS1mcmVpYnVyZy5kZYIad3d3LmFsdW1uaS51bmktZnJlaWJ1cmcuZGWCI3d3dy5kaWFsb2d3ZXJrc3RhdHQudW5pLWZyZWlidXJnLmRlgh13d3cuZXh6ZWxsZW56LnVuaS1mcmVpYnVyZy5kZYIYd3d3LmZyc2EudW5pLWZyZWlidXJnLmRlgiJ3d3cuaHVtYm9sZHQtbGFib3IudW5pLWZyZWlidXJnLmRlghl3d3cubGVocmUudW5pLWZyZWlidXJnLmRlghl3d3cuc2VuYXQudW5pLWZyZWlidXJnLmRlghN3d3cudW5pLWZyZWlidXJnLmRlgiV3d3cuenVrdW5mdHN3ZXJrc3RhdHQudW5pLWZyZWlidXJnLmRlghd3d3cuenV2LnVuaS1mcmVpYnVyZy5kZYIhenVrdW5mdHN3ZXJrc3RhdHQudW5pLWZyZWlidXJnLmRlghN6dXYudW5pLWZyZWlidXJnLmRlMAoGCCqGSM49BAMCA0cAMEQCIAyIPhFVAVWMz1cVUUU3HBpic5CgjAjHBoInJSEGAdVLAiAhffrusgHrGq8H2nzQ4SMIGgaZDf0mEBT6nzV41exN4w==\n-----END CERTIFICATE-----"
        }, {"id": "cert_commonName", "severity": "OK", "finding": "uni-freiburg.de"}, {
            "id": "cert_commonName_wo_SNI",
            "severity": "INFO",
            "finding": "uni-freiburg.de"
        }, {
            "id": "cert_subjectAltName",
            "severity": "INFO",
            "finding": "uni-freiburg.de alumni-meeting.uni-freiburg.de alumni.uni-freiburg.de dialogwerkstatt.uni-freiburg.de exzellenz.uni-freiburg.de frsa.uni-freiburg.de humboldt-labor.uni-freiburg.de lehre.uni-freiburg.de senat.uni-freiburg.de wp-exp-fe-01.vm.uni-freiburg.de wp-exp-fe-02.vm.uni-freiburg.de wp-exp-web-01.cms.intra.uni-freiburg.de wp-exp-web-02.cms.intra.uni-freiburg.de wp-exp-web-03.cms.intra.uni-freiburg.de wp-exp.vm.uni-freiburg.de wp-prod-fe-01.vm.uni-freiburg.de wp-prod-fe-02.vm.uni-freiburg.de wp-prod-web-01.cms.intra.uni-freiburg.de wp-prod-web-02.cms.intra.uni-freiburg.de wp-prod-web-03.cms.intra.uni-freiburg.de wp-prod.vm.uni-freiburg.de wp-stage-fe-01.vm.uni-freiburg.de wp-stage-fe-02.vm.uni-freiburg.de wp-stage-web-01.cms.intra.uni-freiburg.de wp-stage-web-02.cms.intra.uni-freiburg.de wp-stage-web-03.cms.intra.uni-freiburg.de wp-stage.vm.uni-freiburg.de wp-test-fe-01.vm.uni-freiburg.de wp-test-fe-02.vm.uni-freiburg.de wp-test-web-01.cms.intra.uni-freiburg.de wp-test-web-02.cms.intra.uni-freiburg.de wp-test-web-03.cms.intra.uni-freiburg.de wp-test.vm.uni-freiburg.de wpf.vm.uni-freiburg.de www.alumni-meeting.uni-freiburg.de www.alumni.uni-freiburg.de www.dialogwerkstatt.uni-freiburg.de www.exzellenz.uni-freiburg.de www.frsa.uni-freiburg.de www.humboldt-labor.uni-freiburg.de www.lehre.uni-freiburg.de www.senat.uni-freiburg.de www.uni-freiburg.de www.zukunftswerkstatt.uni-freiburg.de www.zuv.uni-freiburg.de zukunftswerkstatt.uni-freiburg.de zuv.uni-freiburg.de"
        }, {"id": "cert_trust", "severity": "OK", "finding": "Ok via SAN (same w/o SNI)"}, {
            "id": "cert_chain_of_trust",
            "severity": "OK",
            "finding": "passed."
        }, {"id": "cert_certificatePolicies_EV", "severity": "INFO", "finding": "no"}, {
            "id": "cert_expirationStatus",
            "severity": "OK",
            "finding": "294 >= 60 days"
        }, {"id": "cert_notBefore", "severity": "INFO", "finding": "2024-11-15 00:00"}, {
            "id": "cert_notAfter",
            "severity": "OK",
            "finding": "2025-11-15 23:59"
        }, {
            "id": "cert_extlifeSpan",
            "severity": "OK",
            "finding": "certificate has no extended life time according to browser forum"
        }, {"id": "cert_eTLS", "severity": "INFO", "finding": "not present"}, {
            "id": "cert_crlDistributionPoints",
            "severity": "INFO",
            "finding": "http://GEANT.crl.sectigo.com/GEANTOVECCCA4.crl"
        }, {
            "id": "cert_ocspURL",
            "severity": "INFO",
            "finding": "http://GEANT.ocsp.sectigo.com"
        }, {"id": "OCSP_stapling", "severity": "LOW", "finding": "not offered"}, {
            "id": "cert_mustStapleExtension",
            "severity": "INFO",
            "finding": "--"
        }, {"id": "DNS_CAArecord", "severity": "LOW", "finding": "--"}, {
            "id": "certificate_transparency",
            "severity": "OK",
            "finding": "yes (certificate extension)"
        }, {"id": "certs_countServer", "severity": "INFO", "finding": "3"}, {
            "id": "certs_list_ordering_problem",
            "severity": "INFO",
            "finding": "no"
        }, {
            "id": "cert_caIssuers",
            "severity": "INFO",
            "finding": "GEANT OV ECC CA 4 (GEANT Vereniging from NL)"
        }, {
            "id": "intermediate_cert <#1>",
            "severity": "INFO",
            "finding": "-----BEGIN CERTIFICATE-----\nMIIDeTCCAv+gAwIBAgIRAOuOgRlxKfSvZO+BSi9QzukwCgYIKoZIzj0EAwMwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpOZXcgSmVyc2V5MRQwEgYDVQQHEwtKZXJzZXkgQ2l0eTEeMBwGA1UEChMVVGhlIFVTRVJUUlVTVCBOZXR3b3JrMS4wLAYDVQQDEyVVU0VSVHJ1c3QgRUNDIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTIwMDIxODAwMDAwMFoXDTMzMDUwMTIzNTk1OVowRDELMAkGA1UEBhMCTkwxGTAXBgNVBAoTEEdFQU5UIFZlcmVuaWdpbmcxGjAYBgNVBAMTEUdFQU5UIE9WIEVDQyBDQSA0MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEXYkvGrfrMs2IwdI5+IwpEwPh+igW/BOWetmOwP/ZIXC8fNeC3/ZYPAAMyRpFS0v3/c55FDTE2xbOUZ5zeVZYQqOCAYswggGHMB8GA1UdIwQYMBaAFDrhCYbUzxnClnZ0SXbc4DXGY2OaMB0GA1UdDgQWBBTttKAzahsIkba9+kGSvZqrq2P0UzAOBgNVHQ8BAf8EBAMCAYYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwOAYDVR0gBDEwLzAtBgRVHSAAMCUwIwYIKwYBBQUHAgEWF2h0dHBzOi8vc2VjdGlnby5jb20vQ1BTMFAGA1UdHwRJMEcwRaBDoEGGP2h0dHA6Ly9jcmwudXNlcnRydXN0LmNvbS9VU0VSVHJ1c3RFQ0NDZXJ0aWZpY2F0aW9uQXV0aG9yaXR5LmNybDB2BggrBgEFBQcBAQRqMGgwPwYIKwYBBQUHMAKGM2h0dHA6Ly9jcnQudXNlcnRydXN0LmNvbS9VU0VSVHJ1c3RFQ0NBZGRUcnVzdENBLmNydDAlBggrBgEFBQcwAYYZaHR0cDovL29jc3AudXNlcnRydXN0LmNvbTAKBggqhkjOPQQDAwNoADBlAjAfs9nsM0qaJGVu6DpWVy4qojiOpwV1h/MWZ5GJxy6CKv3+RMB3STkaFh0+Hifbk24CMQDRf/ujXAQ1b4nFpZGaSIKldygcdCDAxbAd9tlxcN/+J534CJDblzd/40REzGWwS5k=\n-----END CERTIFICATE-----"
        }, {
            "id": "intermediate_cert_fingerprintSHA256 <#1>",
            "severity": "INFO",
            "finding": "083799E8B2B9016E44702EBF9BF369CE253FE1FBEB650E5DF10EF44D87BF3BAE"
        }, {
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
            "finding": "GEANT OV ECC CA 4 <-- USERTrust ECC Certification Authority"
        }, {
            "id": "intermediate_cert <#2>",
            "severity": "INFO",
            "finding": "-----BEGIN CERTIFICATE-----\nMIID0zCCArugAwIBAgIQVmcdBOpPmUxvEIFHWdJ1lDANBgkqhkiG9w0BAQwFADB7MQswCQYDVQQGEwJHQjEbMBkGA1UECAwSR3JlYXRlciBNYW5jaGVzdGVyMRAwDgYDVQQHDAdTYWxmb3JkMRowGAYDVQQKDBFDb21vZG8gQ0EgTGltaXRlZDEhMB8GA1UEAwwYQUFBIENlcnRpZmljYXRlIFNlcnZpY2VzMB4XDTE5MDMxMjAwMDAwMFoXDTI4MTIzMTIzNTk1OVowgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpOZXcgSmVyc2V5MRQwEgYDVQQHEwtKZXJzZXkgQ2l0eTEeMBwGA1UEChMVVGhlIFVTRVJUUlVTVCBOZXR3b3JrMS4wLAYDVQQDEyVVU0VSVHJ1c3QgRUNDIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEGqxUWqn5aCPnetUkb1PGWthLq8bVttHmc3Gu3ZzWDGH926CJA7gFFOxXzu5dP+Ihs8731Ip54KODfi2X0GHE8ZncJZFjq38wo7Rw4sehM5zzvy5cU7Ffs30yf4o043l5o4HyMIHvMB8GA1UdIwQYMBaAFKARCiM+lvEH7OKvKe+CpX/QMKS0MB0GA1UdDgQWBBQ64QmG1M8ZwpZ2dEl23OA1xmNjmjAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zARBgNVHSAECjAIMAYGBFUdIAAwQwYDVR0fBDwwOjA4oDagNIYyaHR0cDovL2NybC5jb21vZG9jYS5jb20vQUFBQ2VydGlmaWNhdGVTZXJ2aWNlcy5jcmwwNAYIKwYBBQUHAQEEKDAmMCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5jb21vZG9jYS5jb20wDQYJKoZIhvcNAQEMBQADggEBABns652JLCALBIAdGN5CmXKZFjK9Dpx1WywV4ilAbe7/ctvbq5AfjJXyij0IckKJUAfiORVsAYfZFhr1wHUrxeZWEQff2Ji8fJ8ZOd+LygBkc7xGEJuTI42+FsMuCIKchjN0djsoTI0DQoWz4rIjQtUfenVqGtF8qmchxDM6OW1TyaLtYiKou+JVbJlsQ2uRl9EMC5MCHdK8aXdJ5htN978UeAOwproLtOGFfy/cQjutdAFI3tZs4RmYCV4Ks2dH/hzg1cEo70qLRDEmBDeNiXQ2Lu+lIg+DdEmSx/cQwgwp+7e9un/jX9Wf8qn0dNW44bOwgeThpWOjzOoEeJBuv/c=\n-----END CERTIFICATE-----"
        }, {
            "id": "intermediate_cert_fingerprintSHA256 <#2>",
            "severity": "INFO",
            "finding": "A6CF64DBB4C8D5FD19CE48896068DB03B533A8D1336C6256A87D00CBB3DEF3EA"
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
            "finding": "USERTrust ECC Certification Authority <-- AAA Certificate Services"
        }, {"id": "intermediate_cert_badOCSP", "severity": "OK", "finding": "intermediate certificate(s) is/are ok"}],
        "headerResponse": [{
            "id": "HTTP_status_code",
            "severity": "INFO",
            "finding": "301 Moved Permanently ('/')"
        }, {
            "id": "HTTP_clock_skew",
            "severity": "INFO",
            "finding": "-1 seconds from localtime"
        }, {"id": "HTTP_headerTime", "severity": "INFO", "finding": "1737805636"}, {
            "id": "HSTS",
            "severity": "LOW",
            "finding": "not offered"
        }, {
            "id": "HPKP",
            "severity": "INFO",
            "finding": "No support for HTTP Public Key Pinning"
        }, {"id": "banner_server", "severity": "INFO", "finding": "Apache"}, {
            "id": "banner_application",
            "severity": "INFO",
            "finding": "No application banner found"
        }, {
            "id": "cookie_count",
            "severity": "INFO",
            "finding": "0 at '/' (30x detected, better try target URL of 30x)"
        }, {"id": "Cache-Control", "severity": "INFO", "finding": "max-age=3600"}, {
            "id": "banner_reverseproxy",
            "severity": "INFO",
            "cwe": "CWE-200",
            "finding": "--"
        }],
        "vulnerabilities": [{
            "id": "secure_renego",
            "severity": "OK",
            "cwe": "CWE-310",
            "finding": "supported"
        }, {
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
            "finding": "no RSA certificate, can't be used with SSLv2 elsewhere"
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
            "finding": "no DH key with <= TLS 1.2"
        }, {
            "id": "BEAST",
            "severity": "OK",
            "cve": "CVE-2011-3389",
            "cwe": "CWE-20",
            "finding": "not vulnerable, no SSL3 or TLS1"
        }, {
            "id": "LUCKY13",
            "severity": "OK",
            "cve": "CVE-2013-0169",
            "cwe": "CWE-310",
            "finding": "not vulnerable"
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
        }],
        "cipherTests": [],
        "browserSimulations": [{
            "id": "clientsimulation-android_60",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-android_70",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-android_81",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-android_90",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-android_X",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-android_11",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-android_12",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-chrome_79_win10",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-chrome_101_win10",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-firefox_66_win81",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-firefox_100_win10",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
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
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-ie_11_win81",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-ie_11_winphone81",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-ie_11_win10",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-edge_15_win10",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-edge_101_win10_21h2",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-safari_121_ios_122",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_CHACHA20_POLY1305_SHA256"
        }, {
            "id": "clientsimulation-safari_130_osx_10146",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_CHACHA20_POLY1305_SHA256"
        }, {
            "id": "clientsimulation-safari_154_osx_1231",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-java_7u25",
            "severity": "INFO",
            "finding": "No connection"
        }, {
            "id": "clientsimulation-java_8u161",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-java1102",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-java1703",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-go_1178",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-libressl_283",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-CHACHA20-POLY1305"
        }, {
            "id": "clientsimulation-openssl_102e",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-openssl_110l",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-openssl_111d",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-openssl_303",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }, {
            "id": "clientsimulation-apple_mail_16_0",
            "severity": "INFO",
            "finding": "TLSv1.2 ECDHE-ECDSA-AES128-GCM-SHA256"
        }, {
            "id": "clientsimulation-thunderbird_91_9",
            "severity": "INFO",
            "finding": "TLSv1.3 TLS_AES_128_GCM_SHA256"
        }],
        "rating": [{
            "id": "rating_spec",
            "severity": "INFO",
            "finding": "SSL Labs's 'SSL Server Rating Guide' (version 2009q from 2020-01-30)"
        }, {
            "id": "rating_doc",
            "severity": "INFO",
            "finding": "https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide"
        }, {
            "id": "protocol_support_score",
            "severity": "INFO",
            "finding": "100"
        }, {"id": "protocol_support_score_weighted", "severity": "INFO", "finding": "30"}, {
            "id": "key_exchange_score",
            "severity": "INFO",
            "finding": "100"
        }, {"id": "key_exchange_score_weighted", "severity": "INFO", "finding": "30"}, {
            "id": "cipher_strength_score",
            "severity": "INFO",
            "finding": "90"
        }, {"id": "cipher_strength_score_weighted", "severity": "INFO", "finding": "36"}, {
            "id": "final_score",
            "severity": "INFO",
            "finding": "96"
        }, {"id": "overall_grade", "severity": "OK", "finding": "A"}, {
            "id": "grade_cap_reason_1",
            "severity": "INFO",
            "finding": "Grade capped to A. HSTS is not offered"
        }]
    }],
    "scanTime": 191
}