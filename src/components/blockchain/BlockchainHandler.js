import Web3 from 'web3'
import compiledContract from './build/contracts/Qiwi'

export class BlockchainHandler {
    #contract; #role; #web3_window; #browserStatus; #address; #isMetamask;

    constructor() {
        this.web3_node = new Web3("http://35.158.25.152:22000");
        if (window.ethereum) {
            window.ethereum.enable();
            this.freshBrowserInit();
            this.#contract = new this.#web3_window.eth.Contract(compiledContract.abi, "0x16327fdcaa502b4d150dcf75c86a9719371047c0");
        } else if (window.web3) {// Legacy dapp browsers...
            this.legacyBrowserInit();
            this.#contract = new this.#web3_window.eth.Contract(compiledContract.abi, "0x16327fdcaa502b4d150dcf75c86a9719371047c0");
        } else {// Non-dapp browsers...
            this.#browserStatus = 3;
            this.#contract = new this.web3_node.eth.Contract(compiledContract.abi, "0x16327fdcaa502b4d150dcf75c86a9719371047c0");
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    setup() {//никто 0
        return this.getMetamaskAddress();
    }


    legacyBrowserInit() {
        console.log("Loading blockchain data ...");
        this.#browserStatus = 2;
        this.#web3_window = new Web3(window.web3.currentProvider);
        if (this.#web3_window.currentProvider.constructor.name === "MetamaskInpageProvider") {
            this.#isMetamask = true;
        } else {
            this.#isMetamask = false;
        }
    }

    freshBrowserInit() {
        this.#web3_window = new Web3(window.ethereum);
        if (this.#web3_window.currentProvider.constructor.name === "MetamaskInpageProvider") {
            this.#isMetamask = true;
        } else {
            this.#isMetamask = false;
        }
        this.#browserStatus = 1;
    }
    get getAddress(){
        return this.#address;
    }

    get getRole(){
        return this.#role;
    }

    onGettingAddress(addr, error) {
        this.#address = addr[0];
        //console.log(this.#address);
        return Promise.resolve(this.#address);
    }

    getMetamaskAddress() {
        if (this.#browserStatus !== 3) {
            try{
                return this.#web3_window.eth.getAccounts().then((val, err) => this.onGettingAddress(val, err))
                    .catch(() => this.onGettingRole("0"))
                    .then((val, err) => this.loadRole())
            } catch (e) {
                this.#role = "0";
                return Promise.resolve("0");
            }
        } else {
            this.#role = "0";
            return Promise.resolve("0");
        }
    }

    onGettingRole(role) {
        this.#role = role;
        return Promise.resolve(role);
    }

    loadRole() {
        //console.log(this.#address);
        if (this.#address){
            return this.#contract.methods.roles(this.#address).call()
                .catch(() => this.onGettingRole("0"))
                .then((value, error) => this.onGettingRole(value))
        } else {
            return this.onGettingRole("0");
        }
    }


    loadTasks(){
        return this.#contract.methods.tree().call()
            .then((val) => this.onGettingTree(val))
    }

    onGettingTree(tree){
        let arr = [];
        for (let i = 0; i < tree.amountOfTasks; i++){
            (Promise.all([
                this.#contract.methods.getTaskName(i).call(),
                this.#contract.methods.getTaskDescription(i).call(),
                this.#contract.methods.getTaskTimeStart(i).call(),
                this.#contract.methods.getTaskTimeEnd(i).call(),
                this.#contract.methods.getTaskMoney(i).call(),
                this.#contract.methods.getTaskWorkerName(i).call(),
                this.#contract.methods.getTaskPreviousNumbers(i).call(),
                this.#contract.methods.getTaskStatus(i).call()
            ]).then((data) => arr[i] = this.packData(data, i)));
        }
        return Promise.resolve(arr);
    }

    packData(arr, i){
        return {
          id : i,
          text : arr[0],
          description : arr[1],
          start_date: arr[2],
          duration : arr[3] - arr[2],
          end_date : arr[3],
          price : arr[4],
          worker : arr[5],
          previous_ids: arr[6],
          progress : arr[7],
          status : arr[7]
        };
    }
}