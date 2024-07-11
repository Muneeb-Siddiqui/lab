document.getElementById('resumeForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;

    const response = await fetch('/api/person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, education, experience })
    });

    const data = await response.json();

    if (response.status === 201) {
        document.getElementById('message').innerText = 'Resume generated and sent to your email!';
    } else {
        document.getElementById('message').innerText = 'Error: ' + data.error;
    }
});