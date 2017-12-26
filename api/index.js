// Services
const events = require('./events');

const router = require('express').Router();

router.get('/events', events.getEvents);
router.get('/attendees/:id', events.getAttendees);
router.post('/attend', events.addParticipant);

module.exports = router;