// Import des packages requis

const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/users');
const JWT = require('../middlewares/auth');
const upload = require('../middlewares/multer');

// Creation des routes pour les modifications utilisateur, puis exports router

router.get('/:id', [JWT.auth], Ctrl.readUser);
router.put('/update/:id', upload.single('image'), [JWT.auth], Ctrl.updateUser);
router.delete('/delete/:id', [JWT.auth], Ctrl.deleteUser);

module.exports = router;
