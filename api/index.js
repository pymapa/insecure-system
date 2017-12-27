// Services
const events = require('./events');
const user = require('./user');

const router = require('express').Router();

router.get('/events', events.getAll);
router.get('/events/:id', events.getOne);
router.put('/event', events.newEvent);
router.get('/attendees/:id', events.getAttendees);
router.put('/attend', events.attend);


router.post('/login', user.login);

module.exports = router;