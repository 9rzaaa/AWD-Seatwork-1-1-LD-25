const form = document.getElementById('login-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const balance = parseInt(document.getElementById('balance').value, 10);

    if (username && password && balance) {
        if (balance != 5000) {
            alert('The only allowed balance is 5000.');
            return;
        }
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('balance', balance);

        window.location.href = './pages/page1/index.html';
    } else {
        alert('Please fill in all fields.');
    }
});


