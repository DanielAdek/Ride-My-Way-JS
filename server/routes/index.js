import express from 'express';
import usersController from '../src/controllers/userController';
import rides from '../src/controllers/rideController';
// import request from '../src/controllers/requestController';
import auth from '../src/middleware/auth';
// import checkInput from '../src/validations/rides';
// import validateInput from '../src/validations/users';
// import existing from '../src/midlewares/validation';
// import requestAction from '../src/midlewares/request';
const router = express.Router();

const { verifyUser } = auth;
/*
const { searchRide } = search;
const { userSignUpDetails, userLoginDetails, validEmail } = validateInput;
const { validateRequestAction, validateRequestMessage, requestExit } = requestAction;
*/

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

router.post(
    '/users/rides', verifyUser, rides.createRideOffer
);

router.get(
    '/user/rides', verifyUser,
    rides.getOneUserRides
);
// router.get(
//     '/user/requests', verifyUser,
//     request.getOneUserRequests
// );

// router.get(
//     '/user/passengers/requests', verifyUser,
//     request.getAllRequestsToARide
// );

// router.get('/rides', searchRide, rides.getAllRides);

router.get('/rides/:rideId', rides.getSingleRide);

// router.get('/users/rides/:rideId/requests', verifyUser, request.getRequests);

export default router;