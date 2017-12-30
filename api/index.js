// Services
const events = require('./events');
const user = require('./user');

const router = require('express').Router();

router.all('/admin*', user.authenticateAndNext);
router.get('/authenticate', user.authenticate);

router.get('/events', events.getAll);
router.get('/events/:id', events.getOne);
router.put('/admin/event', events.newEvent);
router.post('/admin/event/info', events.saveInfo);

router.get('/attendees/:id', events.getAttendees);
router.put('/attend', events.attend);


router.get('/admin/users', user.getAll);

router.post('/login', user.login);

module.exports = router;