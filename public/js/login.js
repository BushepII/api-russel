const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message;
            return;
        }

        sessionStorage.setItem('token', data.token);

        message.textContent = 'Login successful';
        message.style.color = 'green';
    } catch (error) {
        console.error(error);
        message.textContent = 'An error occurred';
        message.style.color = 'red';
    }
});