function loadUserInfo() {
    const username = localStorage.getItem("username");
    const balance = parseFloat(localStorage.getItem("balance")) || 0;

    document.querySelector("header h1").innerText = `Welcome, ${username}`;

    document.getElementById("total-balance").innerText = `₱${balance.toFixed(2)}`;

    localStorage.setItem("currentBalance", balance);

    localStorage.setItem("totalDeposit", 0);
    localStorage.setItem("totalWithdraw", 0);
}

function makeDeposit() {
    const depositAmount = parseFloat(document.getElementById("deposit-amount").value);
    if (!depositAmount || depositAmount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    let currentBalance = parseFloat(localStorage.getItem("currentBalance"));
    currentBalance += depositAmount;

    let totalDeposit = parseFloat(localStorage.getItem("totalDeposit")) || 0;
    totalDeposit += depositAmount;

    localStorage.setItem("currentBalance", currentBalance);
    localStorage.setItem("totalDeposit", totalDeposit);

    document.getElementById("total-balance").innerText = `₱${currentBalance.toFixed(2)}`;
    document.getElementById("total-deposit").innerText = `₱${totalDeposit.toFixed(2)}`;

    logTransaction("Deposit", depositAmount);

    document.getElementById("deposit-amount").value = "";
}

function makeWithdrawal() {
    const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);
    if (!withdrawAmount || withdrawAmount <= 0) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    let currentBalance = parseFloat(localStorage.getItem("currentBalance"));
    if (withdrawAmount > currentBalance) {
        alert("Insufficient balance!");
        return;
    }

    currentBalance -= withdrawAmount;

    let totalWithdraw = parseFloat(localStorage.getItem("totalWithdraw")) || 0;
    totalWithdraw += withdrawAmount;

    localStorage.setItem("currentBalance", currentBalance);
    localStorage.setItem("totalWithdraw", totalWithdraw);

    document.getElementById("total-balance").innerText = `₱${currentBalance.toFixed(2)}`;
    document.getElementById("total-withdraw").innerText = `₱${totalWithdraw.toFixed(2)}`;

    logTransaction("Withdrawal", withdrawAmount);

    document.getElementById("withdraw-amount").value = "";
}

function logTransaction(action, amount) {
    const transactionHistory = document.getElementById("transactionChart");
    const now = new Date();
    const dateTime = now.toLocaleString(); // Format: MM/DD/YYYY, HH:MM:SS

    const transactionEntry = document.createElement("p");
    transactionEntry.innerText = `${dateTime} - ${action}: ₱${amount.toFixed(2)}`;
    transactionEntry.classList.add("transaction-entry");

    transactionHistory.appendChild(transactionEntry);
}

window.onload = () => {
    loadUserInfo();
};
