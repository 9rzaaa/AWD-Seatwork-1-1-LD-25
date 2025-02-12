const BALANCE_KEY = "user_balance";
const TRANSACTION_HISTORY_KEY = "transaction_history";
const ADMIN_USERNAME = "ADMIN";

const totalDepositElement = document.getElementById("total-deposit");
const totalWithdrawElement = document.getElementById("total-withdraw");
const totalBalanceElement = document.getElementById("total-balance");
const transactionChartElement = document.getElementById("transactionChart");

const depositInput = document.getElementById("deposit-amount");
const withdrawInput = document.getElementById("withdraw-amount");

function initializeDashboard() {
    const activeUser = localStorage.getItem("active_user");

    if (activeUser !== ADMIN_USERNAME) {
        alert("Unauthorized access! Redirecting to login...");
        window.location.href = "../../index.html"; // Redirect to login
        return;
    }

    updateUI();
}

function makeDeposit() {
    const amount = parseFloat(depositInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    let balance = parseFloat(localStorage.getItem(BALANCE_KEY)) || 0;
    balance += amount;
    localStorage.setItem(BALANCE_KEY, balance.toString());

    addTransaction("Deposit", amount);
    updateUI();
    depositInput.value = "";
}

function makeWithdrawal() {
    const amount = parseFloat(withdrawInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    let balance = parseFloat(localStorage.getItem(BALANCE_KEY)) || 0;
    if (amount > balance) {
        alert("Insufficient balance!");
        return;
    }

    balance -= amount;
    localStorage.setItem(BALANCE_KEY, balance.toString());

    addTransaction("Withdraw", amount);
    updateUI();
    withdrawInput.value = "";
}

function addTransaction(type, amount) {
    let transactions = JSON.parse(localStorage.getItem(TRANSACTION_HISTORY_KEY)) || [];
    transactions.push({
        type,
        amount,
        date: new Date().toLocaleString()
    });
    localStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(transactions));
}

function updateUI() {
    let balance = parseFloat(localStorage.getItem(BALANCE_KEY)) || 0;
    let transactions = JSON.parse(localStorage.getItem(TRANSACTION_HISTORY_KEY)) || [];

    let totalDeposit = transactions.filter(t => t.type === "Deposit").reduce((sum, t) => sum + t.amount, 0);
    let totalWithdraw = transactions.filter(t => t.type === "Withdraw").reduce((sum, t) => sum + t.amount, 0);

    totalDepositElement.textContent = `₱${totalDeposit.toLocaleString()}`;
    totalWithdrawElement.textContent = `₱${totalWithdraw.toLocaleString()}`;
    totalBalanceElement.textContent = `₱${balance.toLocaleString()}`;

    renderTransactionHistory(transactions);
}

function renderTransactionHistory(transactions) {
    transactionChartElement.innerHTML = transactions.length
        ? transactions.map(t => `<p><strong>${t.type}</strong> - ₱${t.amount.toLocaleString()} <small>${t.date}</small></p>`).join("")
        : "<p>No transactions yet.</p>";
}

document.addEventListener("DOMContentLoaded", initializeDashboard);
