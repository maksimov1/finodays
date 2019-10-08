pragma solidity >=0.5.0 <0.6.0;

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * NOTE: This is a feature of the next version of OpenZeppelin Contracts.
     * @dev Get it via `npm install @openzeppelin/contracts@next`.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     * NOTE: This is a feature of the next version of OpenZeppelin Contracts.
     * @dev Get it via `npm install @openzeppelin/contracts@next`.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * NOTE: This is a feature of the next version of OpenZeppelin Contracts.
     * @dev Get it via `npm install @openzeppelin/contracts@next`.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

contract Qiwi{

    using SafeMath for uint;

    struct task{
        string name;
        string description;
        uint timeStart;
        uint timeEnd;
        uint money;
        string workerAddr;
        mapping (uint => uint) previousNumbers;
        uint amountOfPreviousNumbers;
        uint status;
        // 0 - not done
        // 1 - done
    }


    struct clientJob{
        string result;
        uint money;
        uint expectingTime;
    }

    struct taskTree{
        mapping (uint => task) tasks;
        uint status;
        /*
        0 empty;
        1 creating;
        2 created;
        */
        uint amountOfTasks;
    }

    mapping (address => uint) public roles;
    mapping (uint => string) public transactions;
    uint public transactionsCount;

    /* ROLES
        1 - contract owner
        2 - client (Ген. заказчик)
        3 - contractor (Ген. подрядчик)
        4 - worker (Субподрядчик)
        5 - bot

    */
    constructor() public{
        roles[msg.sender] = 1;
        roles[0xE4864a2E8415F78E3a8E35a07cD92c6cF7636F98] = 1;
        roles[0x0606bEa3Cf8586c2AFE57c705eE8C93D7baB67D7] = 2;
        roles[0x862A447f1cB84a61f1b8442fBc60D80e6ec1BF2d] = 3;
        roles[0xAc556767FFc7b3dA5f095BbaA31016aA2aEd758f] = 4;
        roles[0x24431d4472826F9F6F461004DFb8836e2E1512f2] = 5;
        tree = taskTree(0, 0);
    }

    modifier owner{
        require(roles[msg.sender] == 1);
        _;
    }

    modifier client{
        require(roles[msg.sender] == 2);
        _;
    }

    modifier contractor{
        require(roles[msg.sender] == 3);
        _;
    }

    modifier worker{
        require(roles[msg.sender] == 4);
        _;
    }

    modifier bot{
        require(roles[msg.sender] == 5);
        _;
    }

    clientJob public job;
    bool public jobSet;
    taskTree public tree;
    bool public treeClosed;

    function addClient(address addr) external owner{
        require(roles[addr] == 0);
        roles[addr] = 2;
    }

    function addConstructor(address addr) external owner{
        require(roles[addr] == 0);
        roles[addr] = 3;
    }

    function addWorker(address addr) external owner{
        require(roles[addr] == 0);
        roles[addr] = 4;
    }

    function addBot(address addr) external owner{
        require(roles[addr] == 0);
        roles[addr] = 5;
    }

    function addTransaction(string calldata transactionData) external bot{
        transactions[transactionsCount] = transactionData;
        transactionsCount+=1;
    }

    function setJob(string calldata result, uint money, uint time) external client{
        require(!jobSet);
        job = clientJob(result, money, time);
        jobSet = true;
    }


    function addTask(string calldata name, string calldata description, uint timeStart, uint timeEnd,
    uint money, string calldata workerAddr) external contractor{
        require(!treeClosed && jobSet);
        tree
        .tasks[tree.amountOfTasks] = task(
            name,
            description,
            timeStart,
            timeEnd,
            money,
            workerAddr,
            0,
            0
            );
        tree.amountOfTasks+=1;
    }

    function addPreviousTask(uint thisTask, uint prevTask) external contractor{
        tree.tasks[thisTask].previousNumbers[tree.tasks[thisTask].amountOfPreviousNumbers] = prevTask;
        tree.tasks[thisTask].amountOfPreviousNumbers+=1;
    }

    function closeTree() external contractor{
        require(!treeClosed);
        treeClosed = true;
    }

    function closeTask(uint taskNumber) external worker{
        require(tree.tasks[taskNumber].status == 0);
        tree.tasks[taskNumber].status = 1;
    }

    function getTaskName(uint number) external view returns (string memory){
        return tree.tasks[number].name;
    }

    function getTaskDescription(uint number) external view returns (string memory){
        return tree.tasks[number].description;
    }

    function getTaskTimeStart(uint number) external view returns (uint){
        return tree.tasks[number].timeStart;
    }

    function getTaskTimeEnd(uint number) external view returns (uint){
        return tree.tasks[number].timeEnd;
    }

    function getTaskMoney(uint number) external view returns (uint){
        return tree.tasks[number].money;
    }

    function getTaskWorkerName(uint number) external view returns (string memory){
        return tree.tasks[number].workerAddr;
    }
    function getTaskPreviousNumbers(uint number) external view returns (uint[] memory){
        uint[] memory ret = new uint[](tree.tasks[number].amountOfPreviousNumbers);
        for (uint i = 0; i < tree.tasks[number].amountOfPreviousNumbers; i++){
            ret[i] = tree.tasks[number].previousNumbers[i];
        }
        return ret;
    }

    function getTaskStatus(uint number) external view returns (uint){
        return tree.tasks[number].status;
    }
}