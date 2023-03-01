const route = require('express').Router();
const {getAllUser, registerUser, loginUser, logoutUser, getUserById} = require('../controllers/userController');


route.get('/', getAllUser);
route.post('/', registerUser);
route.post('/login', loginUser);
route.get('/logout',logoutUser);
route.get('/:id', getUserById)


module.exports = route;