// Import des packages requis

const multer = require('multer');

// Types d'images, suivi d'une vérification, puis leur creation, et enfin l'export de multer

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const imageFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback('Seulement les images sont acceptées.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'image');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

const upload = multer({ imageFilter: imageFilter, storage: storage });
module.exports = upload;
