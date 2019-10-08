package server;

import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URI;

@SuppressWarnings("ALL")
public class RedirectCodeListener {
    private static PaymentsMonitoringBot bot;
    private static Object monitor;

    public RedirectCodeListener() {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(2500), 0);
            HttpContext context = server.createContext("/");
            context.setHandler(RedirectCodeListener::handleRequest);
            bot = new PaymentsMonitoringBot();
            monitor = bot.getMonitor();
            server.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void handleRequest(HttpExchange exchange) throws IOException {
        URI requestURI = exchange.getRequestURI();
        String query = requestURI.getQuery();
        String code = "";
        for (String valuePairs : query.split("&")){
            if (valuePairs.split("=")[0].equals("code")){
                code = valuePairs.split("=")[1];
            }
        }
        Headers map = exchange.getResponseHeaders();
        String redirect = "http://localhost:3000/";
        map.add("Location", redirect);
        exchange.sendResponseHeaders(301, -1);
        exchange.close();
        if (!code.equals("")){
            bot.setTokens(code);
            bot.start();
            System.out.println(code);
        } else {
            System.out.println("Invalid code in redirect URL : " + query);
        }

    }
}
