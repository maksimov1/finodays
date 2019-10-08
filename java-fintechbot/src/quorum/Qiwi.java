package quorum;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;
import org.web3j.tuples.generated.Tuple3;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.5.5.
 */
@SuppressWarnings("rawtypes")
public class Qiwi extends Contract {
    private static final String BINARY = "Bin file was not provided";

    public static final String FUNC_CLOSETASK = "closeTask";

    public static final String FUNC_GETTASKWORKERNAME = "getTaskWorkerName";

    public static final String FUNC_GETTASKPREVIOUSNUMBERS = "getTaskPreviousNumbers";

    public static final String FUNC_SETJOB = "setJob";

    public static final String FUNC_JOBSET = "jobSet";

    public static final String FUNC_TREECLOSED = "treeClosed";

    public static final String FUNC_ADDCLIENT = "addClient";

    public static final String FUNC_ADDTRANSACTION = "addTransaction";

    public static final String FUNC_GETTASKSTATUS = "getTaskStatus";

    public static final String FUNC_GETTASKNAME = "getTaskName";

    public static final String FUNC_JOB = "job";

    public static final String FUNC_ADDPREVIOUSTASK = "addPreviousTask";

    public static final String FUNC_ADDWORKER = "addWorker";

    public static final String FUNC_ADDTASK = "addTask";

    public static final String FUNC_ROLES = "roles";

    public static final String FUNC_TRANSACTIONS = "transactions";

    public static final String FUNC_GETTASKMONEY = "getTaskMoney";

    public static final String FUNC_CLOSETREE = "closeTree";

    public static final String FUNC_GETTASKTIMESTART = "getTaskTimeStart";

    public static final String FUNC_ADDCONSTRUCTOR = "addConstructor";

    public static final String FUNC_GETTASKDESCRIPTION = "getTaskDescription";

    public static final String FUNC_GETTASKTIMEEND = "getTaskTimeEnd";

    public static final String FUNC_TREE = "tree";

    public static final String FUNC_TRANSACTIONSCOUNT = "transactionsCount";

    public static final String FUNC_ADDBOT = "addBot";

    @Deprecated
    protected Qiwi(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Qiwi(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Qiwi(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Qiwi(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> closeTask(BigInteger taskNumber) {
        final Function function = new Function(
                FUNC_CLOSETASK, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(taskNumber)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> getTaskWorkerName(BigInteger number) {
        final Function function = new Function(FUNC_GETTASKWORKERNAME, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(number)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<List> getTaskPreviousNumbers(BigInteger number) {
        final Function function = new Function(FUNC_GETTASKPREVIOUSNUMBERS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(number)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Uint256>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> setJob(String result, BigInteger money, BigInteger time) {
        final Function function = new Function(
                FUNC_SETJOB, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(result), 
                new org.web3j.abi.datatypes.generated.Uint256(money), 
                new org.web3j.abi.datatypes.generated.Uint256(time)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> jobSet() {
        final Function function = new Function(FUNC_JOBSET, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Boolean> treeClosed() {
        final Function function = new Function(FUNC_TREECLOSED, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> addClient(String addr) {
        final Function function = new Function(
                FUNC_ADDCLIENT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, addr)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addTransaction(String transactionData) {
        final Function function = new Function(
                FUNC_ADDTRANSACTION, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(transactionData)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> getTaskStatus(BigInteger number) {
        final Function function = new Function(FUNC_GETTASKSTATUS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(number)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> getTaskName(BigInteger number) {
        final Function function = new Function(FUNC_GETTASKNAME, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(number)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<Tuple3<String, BigInteger, BigInteger>> job() {
        final Function function = new Function(FUNC_JOB, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple3<String, BigInteger, BigInteger>>(function,
                new Callable<Tuple3<String, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple3<String, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<String, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> addPreviousTask(BigInteger thisTask, BigInteger prevTask) {
        final Function function = new Function(
                FUNC_ADDPREVIOUSTASK, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(thisTask), 
                new org.web3j.abi.datatypes.generated.Uint256(prevTask)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addWorker(String addr) {
        final Function function = new Function(
                FUNC_ADDWORKER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, addr)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addTask(String name, String description, BigInteger timeStart, BigInteger timeEnd, BigInteger money, String workerAddr) {
        final Function function = new Function(
                FUNC_ADDTASK, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(name), 
                new org.web3j.abi.datatypes.Utf8String(description), 
                new org.web3j.abi.datatypes.generated.Uint256(timeStart), 
                new org.web3j.abi.datatypes.generated.Uint256(timeEnd), 
                new org.web3j.abi.datatypes.generated.Uint256(money), 
                new org.web3j.abi.datatypes.Utf8String(workerAddr)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> roles(String param0) {
        final Function function = new Function(FUNC_ROLES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> transactions(BigInteger param0) {
        final Function function = new Function(FUNC_TRANSACTIONS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> getTaskMoney(BigInteger number) {
        final Function function = new Function(FUNC_GETTASKMONEY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(number)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> closeTree() {
        final Function function = new Function(
                FUNC_CLOSETREE, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> getTaskTimeStart(BigInteger number) {
        final Function function = new Function(FUNC_GETTASKTIMESTART, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(number)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> addConstructor(String addr) {
        final Function function = new Function(
                FUNC_ADDCONSTRUCTOR, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, addr)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> getTaskDescription(BigInteger number) {
        final Function function = new Function(FUNC_GETTASKDESCRIPTION, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(number)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> getTaskTimeEnd(BigInteger number) {
        final Function function = new Function(FUNC_GETTASKTIMEEND, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(number)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple2<BigInteger, BigInteger>> tree() {
        final Function function = new Function(FUNC_TREE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple2<BigInteger, BigInteger>>(function,
                new Callable<Tuple2<BigInteger, BigInteger>>() {
                    @Override
                    public Tuple2<BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<BigInteger, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue());
                    }
                });
    }

    public RemoteFunctionCall<BigInteger> transactionsCount() {
        final Function function = new Function(FUNC_TRANSACTIONSCOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> addBot(String addr) {
        final Function function = new Function(
                FUNC_ADDBOT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, addr)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static Qiwi load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Qiwi(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Qiwi load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Qiwi(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Qiwi load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Qiwi(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Qiwi load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Qiwi(contractAddress, web3j, transactionManager, contractGasProvider);
    }
}
