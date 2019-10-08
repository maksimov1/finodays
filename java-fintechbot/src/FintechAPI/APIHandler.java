package FintechAPI;

import javax.net.ssl.*;
import java.io.*;
import java.net.URL;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Scanner;

public class APIHandler {
    public APIHandler() {
        try{
            setSSLCerts();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void setSSLCerts() throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException, UnrecoverableKeyException, KeyManagementException {
        KeyStore clientStore = KeyStore.getInstance("PKCS12");
        clientStore.load(new FileInputStream("CHANGEME"), "CHANGEME".toCharArray());
        KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        kmf.init(clientStore, "CHANGEME".toCharArray());
        KeyManager[] kms = kmf.getKeyManagers();
        TrustManager[] tms = new TrustManager[] {   //TODO CHECK CERTIFICATE !!!!!!!!!!!!!!!!!!!!!!!!!
                new X509TrustManager() {
                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }
                    public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                    public void checkServerTrusted(X509Certificate[] certs, String authType) {}
                }};
        SSLContext sslContext = null;
        sslContext = SSLContext.getInstance("SSL");
        sslContext.init(kms, tms, new SecureRandom());
        HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
    }

    public static String getTokens(String code) {
        try {
            URL url = new URL("https://edupir.testsbi.sberbank.ru:9443/ic/sso/api/oauth/token?grant_type=authorization_code&code="+ code +"&client_id=CHANGEME&client_secret=CHANGEME&redirect_uri=http%3A%2F%2Flocalhost%3A2500%2F");
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            InputStream stream = connection.getInputStream();
            Scanner s = new Scanner(stream).useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getPaymentsRegistry(String accessToken) {
        try{
            URL url = new URL("https://edupirfintech.sberbank.ru:9443/fintech/api/v1/payments/implemented-info/?datetimeSince=2019-01-01T01:01:01&datetimeUntil=2019-09-28T01:01:01");
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);
            InputStream stream = connection.getInputStream();
            Scanner s = new Scanner(stream).useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String refreshAccessToken(String refreshToken) {
        try {
            URL url = new URL("https://edupir.testsbi.sberbank.ru:9443/ic/sso/api/oauth/token?grant_type=refresh_token&refresh_token="+ refreshToken+"&client_id=CHANGEME&client_secret=CHANGEME");
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            InputStream stream = connection.getInputStream();
            Scanner s = new Scanner(stream).useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
