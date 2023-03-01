const router = require('express').Router();
const {getAllUser, registerUser, loginUser, logoutUser, getUserById} = require('../controllers/userController');


router.get('/', getAllUser);
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/logout',logoutUser);
router.get('/:id', getUserById)


module.exports = router;