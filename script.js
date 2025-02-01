// document.addEventListener('DOMContentLoaded', () => {
//     const loginPage = document.getElementById('loginPage');
//     const signupPage = document.getElementById('signupPage');
//     const dashboard = document.getElementById('dashboard');
//     const barChartCanvas = document.getElementById('barChart');
//     const lineChartCanvas = document.getElementById('lineChart');

//     // lg fun
//     const loginForm = document.getElementById('loginForm');
//     const usernameInput = document.getElementById('username');
//     const passwordInput = document.getElementById('password');

//     loginForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         const username = usernameInput.value.trim();
//         const password = passwordInput.value.trim();

//         const storedUsername = localStorage.getItem('username');
//         const storedPassword = localStorage.getItem('password');

//         if (username === storedUsername && password === storedPassword) {
//             alert('Login successful!');
//             loginPage.style.display = 'none';
//             dashboard.style.display = 'block';
//         } else {
//             alert('Invalid username or password');
//         }
//     });

//     //signup
//     const showSignup = document.getElementById('showSignup');
//     showSignup.addEventListener('click', (event) => {
//         event.preventDefault();
//         loginPage.style.display = 'none';
//         signupPage.style.display = 'block';
//     });

//     // Signup
//     const signupForm = document.getElementById('signupForm');
//     const newUsernameInput = document.getElementById('newUsername');
//     const newPasswordInput = document.getElementById('newPassword');

//     signupForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         const newUsername = newUsernameInput.value.trim();
//         const newPassword = newPasswordInput.value.trim();

//         if (newUsername && newPassword) {
//             //localStorage
//             localStorage.setItem('username', newUsername);
//             localStorage.setItem('password', newPassword);
//             alert('Account created successfully. Please log in.');
//             signupPage.style.display = 'none';
//             loginPage.style.display = 'block';
//         } else {
//             alert('Please fill out both fields.');
//         }
//     });

//     // login
//     const showLogin = document.getElementById('showLogin');
//     showLogin.addEventListener('click', (event) => {
//         event.preventDefault();
//         signupPage.style.display = 'none';
//         loginPage.style.display = 'block';
//     });

//     // Chart
//     const ageFilter = document.getElementById('ageFilter');
//     const genderFilter = document.getElementById('genderFilter');
//     const dateFilter = document.getElementById('dateFilter');

//     const genderGroups = {
//         "male": [60, 80, 100, 120, 140],
//         "female": [40, 60, 80, 100, 120],
//         "all": [50, 70, 90, 110, 130]
//     };

//     // Bar
//     const ctxBar = barChartCanvas.getContext('2d');
//     const barChart = new Chart(ctxBar, {
//         type: 'bar',
//         data: {
//             labels: ['January', 'February', 'March', 'April', 'May'], // X
//             datasets: [{
//                 label: 'Sales', 
//                 data: genderGroups['all'], 
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgb(75, 192, 192)',
//                 borderWidth: 1,
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true, // Y
//                 }
//             }
//         }
//     });

    
//     const ctxLine = lineChartCanvas.getContext('2d');
//     const lineChart = new Chart(ctxLine, {
//         type: 'line',
//         data: {
//             labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
//             datasets: [{
//                 label: 'Sales Over Time',
//                 data: genderGroups['all'], 
//                 fill: false,
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 tension: 0.1
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                 }
//             }
//         }
//     });

//     // Update
//     ageFilter.addEventListener('change', updateCharts);
//     genderFilter.addEventListener('change', updateCharts);
//     dateFilter.addEventListener('input', updateCharts);

//     function updateCharts() {
//         const age = ageFilter.value;
//         const gender = genderFilter.value;

//         // Update
//         const barData = genderGroups[gender];
//         const lineData = genderGroups[gender];

        
//         barChart.data.datasets[0].data = barData;
//         barChart.update();

//         // Update
//         lineChart.data.datasets[0].data = lineData;
//         lineChart.update();
//     }

//     // date filter
//     flatpickr(dateFilter, {
//         mode: 'range',
//         dateFormat: 'Y-m-d'
//     });
// });






document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('loginPage');
    const signupPage = document.getElementById('signupPage');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Persist login session
    if (localStorage.getItem("loggedIn") === "true") {
        loginPage.style.display = "none";
        dashboard.style.display = "block";
    }

    // Login Function
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            alert('Login successful!');
            localStorage.setItem("loggedIn", "true");
            loginPage.style.display = "none";
            dashboard.style.display = "block";
        } else {
            alert('Invalid username or password');
        }
    });

    // Signup Function
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newUsername = document.getElementById('newUsername').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();

        if (newUsername && newPassword) {
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);
            alert('Account created successfully. Please log in.');
            signupPage.style.display = 'none';
            loginPage.style.display = 'block';
        } else {
            alert('Please fill out both fields.');
        }
    });

    // Logout Function
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem("loggedIn");
        dashboard.style.display = "none";
        loginPage.style.display = "block";
    });

    // Chart Filters
    const genderGroups = {
        "male": [60, 80, 100, 120, 140],
        "female": [40, 60, 80, 100, 120],
        "all": [50, 70, 90, 110, 130]
    };

    const barChartCanvas = document.getElementById('barChart').getContext('2d');
    const lineChartCanvas = document.getElementById('lineChart').getContext('2d');

    const barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Sales',
                data: genderGroups['all'],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            }]
        }
    });

    const lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
            datasets: [{
                label: 'Sales Over Time',
                data: genderGroups['all'],
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            }]
        }
    });

    // Filter Updates
    document.getElementById('genderFilter').addEventListener('change', function () {
        const gender = this.value;
        barChart.data.datasets[0].data = genderGroups[gender];
        barChart.update();
        lineChart.data.datasets[0].data = genderGroups[gender];
        lineChart.update();
    });

    // Date picker
    flatpickr("#dateFilter", { mode: 'range', dateFormat: 'Y-m-d' });
});


