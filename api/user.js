var query = require('../db_connection').getQuery;
var jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        console.log(req.body);
        query("SELECT * FROM users LEFT JOIN roles ON users.role_id = roles.id WHERE users.name = '" + req.body.username + "'")
        .then(data => {
            if(data.length<1) 
                res.json({success: false, data: "No user found"})
            if(data[0].password !== req.body.password)
                res.json({success: false, data: "Wrong password"})
            if(data[0].password === req.body.password) {
                const json = JSON.parse(JSON.stringify(data[0]));
                const token = jwt.sign(json, process.env.JWT_KEY, {
                    expiresIn: '1h', // expires in 1 hours
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user: {
                        name: data[0].name,
                        role: data[0].role_id
                    }
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.json({success: false, data: err});
        })
    },
}