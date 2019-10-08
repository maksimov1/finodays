package server;

import FintechAPI.APIHandler;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class PaymentsMonitoringBot extends Thread {
    private final Object monitor;
    private String accessToken;
    private String refreshToken;
    private String idToken;
    private APIHandler handler;
    private QuorumHandler quorum;

    public Object getMonitor() {
        return monitor;
    }

    public PaymentsMonitoringBot() {
        monitor = new Object();
        handler = new APIHandler();
        quorum = new QuorumHandler();
        System.out.println("Bout to run");
        this.start();
    }

    public void setTokens(String code){
        synchronized (monitor){
            String tokens;
            if ((tokens = APIHandler.getTokens(code)) != null){
                JsonObject jsonObject = new JsonParser().parse(tokens).getAsJsonObject();
                this.accessToken = jsonObject.get("access_token").getAsString();
                this.refreshToken = jsonObject.get("refresh_token").getAsString();
                this.idToken = jsonObject.get("id_token").getAsString();
                System.out.println("ACCESS : " + accessToken);
                monitor.notify();
                System.out.println("Notify");
            }
        }
    }

    @Override
    public void run() {
        try {
            while (true){
                synchronized (monitor){
                    System.out.println("Waiting wait");
                    monitor.wait();
                    System.out.println("Waited");
                    boolean isRefreshTokenFresh = true;
                    int i = 1;
                    while(isRefreshTokenFresh){
                        String payments;
                        if ((payments = APIHandler.getPaymentsRegistry(accessToken)) != null){
                            System.out.println(payments);
                            quorum.put(payments);
                            System.out.println(i);
                            Thread.sleep(10000);
                            i++;
                        } else {
                            //isRefreshTokenFresh = false;
                            //System.out.println(payments);
                            System.out.println("ACCESS TOKEN IS NOT FRESH");
                            String result = APIHandler.refreshAccessToken(refreshToken);
                            if (result != null){
                                JsonObject jsonObject = new JsonParser().parse(result).getAsJsonObject();
                                this.accessToken = jsonObject.get("access_token").getAsString();
                                this.refreshToken = jsonObject.get("refresh_token").getAsString();
                                i = 1;
                                System.out.println("NEW ACESS, REFRESH: "+ accessToken + " " + refreshToken);
                            } else {
                                System.out.println("REFRESH TOKEN IS NOT FRESH");
                                isRefreshTokenFresh = false;
                            }
                        }
                    }
                }
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
