// Import des packages requis

const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/likes');
const JWT = require('../middlewares/auth');

// Creation des routes pour le like, puis exports router

router.post('/', [JWT.auth], Ctrl.likeOrNot);

module.exports = router;
