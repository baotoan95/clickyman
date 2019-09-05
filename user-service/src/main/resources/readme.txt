Generate public key from .jks file
keytool -list -rfc --keystore clickyman.jks | openssl x509 -inform pem -pubkey