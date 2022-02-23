// Import des packages requis

const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/comments');
const JWT = require('../middlewares/auth');

// Creation des routes pour le CRUD des commentaires, puis exports router

router.post('/', [JWT.auth], Ctrl.createComment);
router.get('/:postId', [JWT.auth], Ctrl.readComment);
router.delete('/delete/:commentId', [JWT.auth], Ctrl.deleteComment);

module.exports = router;
