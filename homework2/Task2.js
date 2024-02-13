const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
    { username: 'admin', password: 'admin123' }
];

function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            resolve(user);
        } else {
            reject(new Error('Invalid username or password'));
        }
    });
}
authenticateUser('user1', 'password3')
.then(user => {
    console.log('user authenticated', user);
})
.catch(error => {
    console.error('Authentication failed:', error.message);
});



