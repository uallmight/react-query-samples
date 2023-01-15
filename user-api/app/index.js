const express = require('express');
const cors = require('cors'); 
const {isNil} = require('lodash');
const {v4} = require('uuid');

const app = express();
const users = [];

app.use(cors({
    optionsSuccessStatus: 200,
    origin: 'http://localhost:3000'
}));

app.get('/users', function(request, response) {
    const {username} = request.query;
    if (!isNil(username)) {
        const usersfiltered = users.filter((user) => user.username === username);
        response.json({
            data: usersfiltered,
            total_count: usersfiltered.length, 
        }).status(200);
        return;
    }
    response.json({
        data: users,
        total_count: users.length,
    }).status(200)
});

app.get('/ussers/:userId', function(request, response) {
    const {userId} = request.params;
    const user = users.find((user) => user.id === userId);
    if (isNil(user)) {
        response.status(404);
        return;
    }
    response.status(200).json(user);
})

app.post('/users', function(request, response) {
    const {username, email} = request.body;
    const user = {
        id: v4(),
        username,
        email,
    };
    users.push(user);
    response.json(user).status(201);
});

app.listen(9000, () => {
    console.log('listening on :9000');
});
