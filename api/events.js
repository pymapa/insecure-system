var query = require('../db_connection').getQuery;
var moment = require('moment');

module.exports = {
    getAll: (req, res) => {
        query("SELECT * FROM events")
        .then(events => {
            res.json({success: true, data: events});
        })
        .catch(err => {
            res.json({success: false, data: err});
        })
    },

    getOne: (req, res) => {
        query("SELECT events.name as name, events.date as date, event_info.into_text as info FROM events LEFT JOIN event_info ON events.id = event_info.event_id WHERE events.id = " + req.params.id)
        .then(_data => {
            console.log(_data)
            res.json({success: true, data: _data[0]})
        })
        .catch(err => {
            res.json({success: false, data: err})
        })
    },

    newEvent: (req, res) => {
        const sqlDate = moment(req.body.date).format("YYYY-MM-DD HH:mm:ss");
        query("INSERT INTO events (name, date) VALUES ('" + req.body.name + "', '" + sqlDate + "')")
        .then(data => {
            res.json({success: true, data: data})
            console.log(data)
        })
        .catch(err => {
            res.json({success: false, data: err})
            console.log(err)
        })
    },

    getAttendees: (req, res) => {
        query("´SELECT * FROM attendees WHERE event_id = ´" + req.params.id)
        .then(attendees => {
            res.json({success: true, data: JSON.stringify(attendees)});
        })
        .catch(err => {
            res.json({success: false, data: err});
        })
    },

    attend: (req, res) => {
        query("INSERT INTO attendees (fname, lname, age, event_id) VALUES ('" + req.body.fname + "', '" + req.body.lname + "', " + req.body.age + ", " + req.body.eventId + ")")
        .then(_data => {
            res.json({success: true, data: _data})
        })
        .catch(err => {
            res.json({success: false, data: err});
        })
    }
}