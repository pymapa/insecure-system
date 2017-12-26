var query = require('../db_connection').getQuery;

module.exports = {
    getEvents: (req, res) => {
        query("SELECT * FROM events")
        .then(events => {
            res.json({success: true, data: events});
        })
        .catch(err => {
            res.json({success: false, data: err});
        })
    },

    getAttendees: (req, res) => {
        query("SELECT * FROM attendees WHERE event_id = " + req.params.id)
        .then(attendees => {
            res.json({success: true, data: attendees});
        })
        .catch(err => {
            res.json({success: false, data: err});
        })
    },

    addParticipant: (req, res) => {
        query("INSERT INTO attendees (fname, lname, age, event_id) VALUES ('" + req.body.fname + "', '" + req.body.lname + "', " + req.body.age + ", " + req.body.eventId + ")")
        .then(_data => {
            res.json({success: true, data: _data})
        })
        .catch(err => {
            res.json({success: false, data: err});
        })
    }
}