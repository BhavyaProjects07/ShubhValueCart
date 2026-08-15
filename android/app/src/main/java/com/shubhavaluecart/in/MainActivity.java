package com.shubhavaluecart.in;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private ConnectivityManager connectivityManager;

    private ConnectivityManager.NetworkCallback networkCallback;

    private boolean showingOfflineScreen = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        connectivityManager =
                (ConnectivityManager)
                        getSystemService(Context.CONNECTIVITY_SERVICE);

        checkInternet();

        monitorNetwork();
    }

    private boolean hasInternet() {

        Network network =
                connectivityManager.getActiveNetwork();

        if (network == null) {
            return false;
        }

        NetworkCapabilities capabilities =
                connectivityManager.getNetworkCapabilities(network);

        if (capabilities == null) {
            return false;
        }

        return capabilities.hasCapability(
                NetworkCapabilities.NET_CAPABILITY_INTERNET
        )
        &&
        capabilities.hasCapability(
                NetworkCapabilities.NET_CAPABILITY_VALIDATED
        );
    }

    private void checkInternet() {

        if (!hasInternet()) {

            showingOfflineScreen = true;

            getBridge()
                    .getWebView()
                    .loadUrl(
                            "file:///android_asset/offline.html"
                    );
        }
    }

    private void monitorNetwork() {

        NetworkRequest request =
                new NetworkRequest.Builder()
                        .addCapability(
                                NetworkCapabilities.NET_CAPABILITY_INTERNET
                        )
                        .build();

        networkCallback =
                new ConnectivityManager.NetworkCallback() {

                    @Override
                    public void onAvailable(Network network) {

                        runOnUiThread(() -> {

                            if (showingOfflineScreen) {

                                showingOfflineScreen = false;

                                getBridge()
                                        .getWebView()
                                        .loadUrl(
                                                "https://www.shubhavaluecart.in"
                                        );
                            }
                        });
                    }

                    @Override
                    public void onLost(Network network) {

                        runOnUiThread(() -> {

                            if (!hasInternet()) {

                                showingOfflineScreen = true;

                                getBridge()
                                        .getWebView()
                                        .loadUrl(
                                                "file:///android_asset/offline.html"
                                        );
                            }
                        });
                    }
                };

        connectivityManager.registerNetworkCallback(
                request,
                networkCallback
        );
    }

    @Override
    public void onDestroy() {

        if (
                connectivityManager != null &&
                networkCallback != null
        ) {

            connectivityManager.unregisterNetworkCallback(
                    networkCallback
            );
        }

        super.onDestroy();
    }
}