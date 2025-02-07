
document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('loginPage');
    const signupPage = document.getElementById('signupPage');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Strong password
    function isStrongPassword(password) {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    }

    // Show Sign pg
    document.getElementById("showSignup").addEventListener("click", (event) => {
        event.preventDefault();
        loginPage.style.display = "none";
        signupPage.style.display = "block";
    });

    // Show Login pg
    document.getElementById("showLogin").addEventListener("click", (event) => {
        event.preventDefault();
        signupPage.style.display = "none";
        loginPage.style.display = "block";
    });

    // Persist login session
    if (localStorage.getItem("loggedIn") === "true") {
        loginPage.style.display = "none";
        dashboard.style.display = "block";
    }

    // Login fun
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
            alert('Login successful!');
            localStorage.setItem("loggedIn", "true");
            loginPage.style.display = "none";
            dashboard.style.display = "block";
        } else {
            alert('Invalid credentials');
        }
    });

    // Signup fun
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();

        if (!isStrongPassword(newPassword)) {
            alert('Password must be at least 8 characters long, contain both upper and lowercase letters, a number, and a special character.');
            return;
        }

        if (newUsername && newPassword) {
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);
            alert('Account created! Please log in.');
            loginPage.style.display = 'block';
            signupPage.style.display = 'none';
        } else {
            alert('Please fill both fields.');
        }
    });


    // Logout fun
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem("loggedIn");
        loginPage.style.display = "block";
        dashboard.style.display = "none";
    });

    //chart data initialization if needed
    const initialData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Sales',
            data: [50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270],
            backgroundColor: 'rgb(6, 39, 100)',
            borderColor: 'rgb(9, 55, 139)',
            borderWidth: 1,
        }]
    };

    const barChart = new Chart(document.getElementById('barChart').getContext('2d'), { type: 'bar', data: initialData });
    const lineChart = new Chart(document.getElementById('lineChart').getContext('2d'), { type: 'line', data: initialData });

    // Date Filter
    flatpickr("#dateFilter", {
        mode: 'range',
        dateFormat: 'Y-m-d',
        onClose: (dates) => {
            if (dates.length === 2) {
                const newData = initialData.datasets[0].data.map(() => Math.random() * 100);
                barChart.data.datasets[0].data = newData;
                barChart.update();
                lineChart.data.datasets[0].data = newData;
                lineChart.update();
            }
        }
    });
});









