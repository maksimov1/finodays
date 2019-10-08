package quorum;

import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;
//import org.web3j.quorum.Quorum;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

public class QuorumHandler {
//    private String clientVersion;
//    private Quorum quorum;
//    private  Web3ClientVersion web3ClientVersion;
    private Qiwi qiwi;
    private BigInteger amountOfRequests;
    public QuorumHandler() throws Exception {
        Web3j web3 = Web3j.build(new HttpService("CHANGEIP"));  // defaults to http://localhost:8545/
        Credentials credentials = WalletUtils.loadCredentials("CHANGEME", "walletbot/UTC--2019-09-27T14-52-52.162404000Z--24431d4472826f9f6f461004dfb8836e2e1512f2.json");
        qiwi =  Union.load("0x16327fdcaa502b4d150dcf75c86a9719371047c0", web3, credentials, new ContractGasProvider() {
            @Override
            public BigInteger getGasPrice(String s) {
                return new BigInteger("0");
            }

            @Override
            public BigInteger getGasPrice() {
                return new BigInteger("0");
            }

            @Override
            public BigInteger getGasLimit(String s) {
                return new BigInteger("0");
            }

            @Override
            public BigInteger getGasLimit() {
                return new BigInteger("0");
            }
        });

    }


    public void put(String payments) throws Exception {
        qiwi.addTransaction(payments);
    }

    public void initLoad() throws Exception {

    }
}
