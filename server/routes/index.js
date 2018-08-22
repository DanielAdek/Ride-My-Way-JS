import express from 'express';
import usersController from '../src/controllers/userController';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Welcome to express router app');
});

router.get('/allUsers', usersController.getUsers);

router.post(
    '/auth/signup', usersController.createUser
);

router.post(
    '/auth/login', usersController.loginUser
);

export default router;