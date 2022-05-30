const bcrypt = require('bcrypt');

const users = [
    {
        Name:'Admin User',
        Password: bcrypt.hashSync('123456', 10),
        Email_id:'admin@example.com',
        Role:'admin',
    },
    {
        Name:'Manager User',
        Password: bcrypt.hashSync('123456', 10),
        Email_id:'manager@example.com',
        Role:'manager',
    },
    {
        Name:'John Doe',
        Password: bcrypt.hashSync('123456', 10),
        Email_id:'john@example.com',
        Role:'developer',
    },
    {
        Name:'Jane Doe',
        Password: bcrypt.hashSync('123456', 10),
        Email_id:'jane@example.com',
        Role:'developer',
    },
]

module.exports = users;