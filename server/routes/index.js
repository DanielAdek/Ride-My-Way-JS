import express from 'express';
import usersController from '../src/controllers/userController';
import rides from '../src/controllers/rideController';
import request from '../src/controllers/requestController';
import auth from '../src/middleware/auth';
import checkInput from '../src/validations/rides';
import validateInput from '../src/validations/users';
import existing from '../src/middleware/validation';
import requestAction from '../src/middleware/request';
import search from '../src/middleware/singleRoute';

const router = express.Router();

const { verifyUser } = auth;

const { searchRide } = search;
const { email, username, ride } = existing;
const { userSignUpDetails, userLoginDetails, validEmail } = validateInput;
const { validateRequestAction, validateRequestMessage, requestExit } = requestAction;

router.get('/', (req, res) => {
    res.status(200).send('Welcome to express router app');
});

router.get('/allUsers', usersController.getUsers);

router.post(
    '/auth/signup', userSignUpDetails,
    auth.validateInput, email, username, usersController.createUser
);

router.post(
    '/auth/login', userLoginDetails, 
    auth.validateInput, usersController.loginUser
);

router.post(
    '/users/rides',  verifyUser, checkInput.validOfferRide,
    auth.validateInput, ride, rides.createRideOffer
);

router.get(
    '/user/rides', verifyUser,
    rides.getOneUserRides
);

router.get('/rides', searchRide, rides.getAllRides);

router.post(
    '/rides/:rideId/request', verifyUser, 
    requestExit, validateRequestMessage,
    request.requestRide
);

router.get(
    '/users/rides/:rideId/requests', verifyUser,
    request.getRequests
);

router.get(
    '/user/requests', verifyUser,
    request.getOneUserRequests
);

router.get(
    '/user/passengers/requests', verifyUser,
    request.getAllRequestsToARide
);

  

router.get('/rides/:rideId', rides.getSingleRide);

router.put(
    '/users/rides/:rideId/requests/:requestId',
    verifyUser,
    checkInput.request, auth.validateInput,
    validateRequestAction, request.updateRequest
);

export default router;