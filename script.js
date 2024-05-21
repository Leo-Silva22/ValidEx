const loginButton = document.getElementById('login');
const signupButton = document.getElementById('signup');
const container = document.querySelector('.container');

loginButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

signupButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
