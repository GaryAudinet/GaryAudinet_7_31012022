// Import des packages requis

const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/posts');
const JWT = require('../middlewares/auth');
const upload = require('../middlewares/multer');

// Creation des routes pour le CRUD des posts, puis exports router

router.post('/', [JWT.auth], upload.single('image'), Ctrl.createPost);
router.get('/', [JWT.auth], Ctrl.readAllPosts);
router.get('/:id', [JWT.auth], Ctrl.readOnePost);
router.put('/update/:id', [JWT.auth], upload.single('image'), Ctrl.updatePost);
router.delete('/delete/:id', [JWT.auth], Ctrl.deletePost);

module.exports = router;
