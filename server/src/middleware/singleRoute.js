import db from '../models/index';

const { Ride } = db;
/**
 * @class Search
 */
export default class Search {
  /**
    * searchRide()
     * @returns {object} json
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @param {function} next
     */
  static searchRide(req, res, next) {
    const { departure, destination, date } = req.query;
    if (!departure || !destination || !date) {
      next();
    } else {
      Ride
        .findAll({where: { departure, destination, date }})
        .then((rides) => {
          if (rides.length < 1) {
            return res.status(200).json({
              success: false,
              message: 'No Record Found'
            });
          }
          return res.status(200).json({
            success: true,
            message: 'Success',
            result: rides,
            count: rides.length
          });
        }).catch((err) => {
          res.status(500).json({
            success: false,
            message: `There was an internal problem ${err.message}`
          });
        });
    }
  }
}
