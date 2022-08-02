const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/EventsController');

/**
 * App Routes 
*/
router.get('/', EventsController.homepage);
router.post('/update-event/', EventsController.PostupdateEvent);
router.get('/analytics', EventsController.ViewAnalytics);
router.get('/event/:id', EventsController.ViewEvent );
router.get('/categories', EventsController.ViewCategories);
router.get('/categories/:id', EventsController.ViewCategoriesIds);
router.post('/search', EventsController.searchByCountry);
router.get('/latest', EventsController.exploreLatest);
router.get('/submit-event', EventsController.PostEvent);
router.post('/submit-event', EventsController.SubmitPostEvent);
router.get('/update-event', EventsController.updateEvent);
router.post('/event/_id', EventsController.deleteEvent);



module.exports = router;