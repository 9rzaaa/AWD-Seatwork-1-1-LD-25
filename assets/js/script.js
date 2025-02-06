const form = document.getElementById('login-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const balance = document.getElementById('balance').value;

    if (username && password && balance) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('balance', balance);

        window.location.href = '/pages/page1/index.html';
    } else {
        alert('Please fill in all fields.');
    }
});


