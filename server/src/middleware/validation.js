import db from '../models/index';

const { User, Ride } = db;
/**
 * @class Exting
 */
export default class Exting {
  /**
     * @desc Check if an email is already existing
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static email(req, res, next) {
    const { email } = req.body;
    User.findOne({ where: { email }}).then((user) => {
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'Email already existed'
        });
      }
      next();
    });
  }

  /**
     * @desc Check if an username is already existing
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static username(req, res, next) {
    const { username } = req.body;
    const userNme = username.toLowerCase();
    User.findOne({ where: { userNme }}).then((user) => {
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'Username already existed, choose another username'
        });
      }
      next();
    });
  }

  /**
     * @desc Check if an ride is already existing
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static ride(req, res, next) {
    const { userId } = req.decoded;
    const { time, date } = req.body;
    Ride.findAll({ where: { userId }}).then((ride) => {
      const existRide = ride.filter(val => val.time === time && val.date === date);
      if (existRide) {
        return res.status(400).json({
          success: false,
          message: 'You cannot create a ride that has the same date and time'
        });
      }
      next();
    });
  }
}
