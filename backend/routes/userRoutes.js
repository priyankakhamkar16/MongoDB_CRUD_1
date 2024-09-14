const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:serialNumber', userController.getUser);
router.put('/:serialNumber', userController.updateUser);
router.delete('/:serialNumber', userController.deleteUser);

module.exports = router;
