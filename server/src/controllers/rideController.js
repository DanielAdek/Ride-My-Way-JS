import db from '../models/index';

const { Ride } = db;
/**
 * @class Rides
 */
export default class Rides {
  /**
   * getAllRides();
     * @description get all rides
     * @param {*} req
     * @param {*} res
     * @returns {object} json
     */
  static getAllRides(req, res) {
    Ride
    .findAll()
      .then((rides) => {
        if (rides.length < 1) {
          return res.status(200).json({
            message: 'Oops Sorry! no available rides yet'
          });
        }
        return res.status(200).json({
          message: `Here You Are!, ${rides.length} rides for You`,
          availableRides: rides
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getOneUserRides();
     * @description get all rides
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getOneUserRides(req, res) {
    const { userId } = req.decoded;
    Ride
    .findOne({ where: { userId }})
      .then((rides) => {
        if (rides.length < 1) {
          return res.status(200).json({
            status: 'success',
            found: false,
            count: rides.length,
            message: 'No Ride Found'
          });
        }
        return res.status(200).json({
          found: true,
          message: 'Success!',
          availableRides: rides,
          count: rides.length
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getSingleRide();
     * @description get one ride
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getSingleRide(req, res) {
    const { rideId } = req.params;
    Ride
    .findOne({ where: {rideId} })
      .then((ride) => {
        if (ride.length < 1) {
          return res.status(404).json({
            error: 'Oops Sorry!',
            message: 'Cannot find any ride from this driver'
          });
        }
        return res.status(200).json({
          message: 'Here You Are! good to go!',
          ride: ride
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * createRideOffer();
     * @description Create ride offers
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static createRideOffer(req, res) {
    const { userId, userName } = req.decoded;
    const driver = userName;
    const {
      departure, destination, time, date, seats, cost, message
    } = req.body;
    Ride
    .create({ userId, driver, departure, destination, date, time, seats, cost, message })
      .then(() => res.status(201).json({
        success: true,
        message: 'Successfully created!',
        ride: {
          userId,
          driver,
          departure,
          destination,
          time,
          date,
          seats,
          cost,
          message
        }
      })).catch(err => res.status(500).json({ message: err.message }));
  }
}