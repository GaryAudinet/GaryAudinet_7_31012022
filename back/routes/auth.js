// Import des packages requis

const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/auth');
const JWT = require('../middlewares/auth');

// Creation des routes pour le signup et login , puis exports router

router.post('/signup', Ctrl.signup);
router.post('/signin', Ctrl.signin);

router.get('/auth', [JWT.auth], Ctrl.auth);

module.exports = router;
