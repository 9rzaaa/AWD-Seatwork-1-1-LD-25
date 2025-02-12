const BALANCE_KEY = "user_balance";
const TRANSACTION_HISTORY_KEY = "transaction_history";
const ADMIN_USERNAME = "ADMIN";
const ADMIN_PASSWORD = "admin123"; // You can change this password

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }
});

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim().toUpperCase();
    const password = document.getElementById("password").value.trim();

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        alert("Invalid username or password! Only 'ADMIN' is allowed.");
        return;
    }

    if (localStorage.getItem(BALANCE_KEY) === null) {
        localStorage.setItem(BALANCE_KEY, "5000");
    }

    if (localStorage.getItem(TRANSACTION_HISTORY_KEY) === null) {
        localStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify([]));
    }

    localStorage.setItem("active_user", ADMIN_USERNAME);

    alert("Login successful! Redirecting to dashboard...");
    window.location.href = '/AWD-Seatwork-1-1-LD-25/pages/page1/index.html';
}
