import db from '../models/index';

const { Request, Ride } = db;
/**
 * @class Rides
 */
export default class Rides {
  /**
   * requestRide();
     * @description request ride offers
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static requestRide(req, res) {
    const { userId, userName } = req.decoded;
    const { rideId } = req.params;
    const { message } = req.body;
    const action = 'Pending...';
    const passenger = userName;
    return Ride
      .findOne({ where: { rideId } }).then((rides) => {
        if (!rides) {
          return res.status(404).json({
            success: false,
            status: 'fail',
            message: 'No ride with this rideId'
          });
        }
        if (userId === rides.userId) {
          return res.status(400).json({
            success: false,
            status: 'fail',
            message: 'You cannnot request your own ride'
          });
        }
        if (rides.rideId === parseInt(rideId, 10)) {
          const {
            driver, departure, destination, time, date, cost, seats
          } = rides;
          Request
            .create({
              userId, rideId, passenger,
              driver, departure, destination, date, time, seats, cost, message, action
            })
            .then(() => {
              res.status(201).json({
                message: 'Your request has beean successfully sent!',
                success: true,
                status: 'pending....',
                request: {
                  userId,
                  rideId,
                  time,
                  date,
                  cost,
                  driver,
                  passenger,
                  startLocation: departure,
                  stopLocation: destination,
                  message
                }
              });
            });
        }
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getRequests();
     * @description get all requests
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getRequests(req, res) {
    const { rideId } = req.params;
    return Request
      .findAll({ where: { rideId } })
      .then((requests) => {
        if (requests.length < 1) {
          return res.status(200).json({
            status: 'success',
            message: 'Oops Sorry! no available request yet'
          });
        }
        return res.status(200).json({
          status: 'success',
          message: 'Found a ride for your request',
          requests: requests
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getOneUserRequests();
     * @description get all requests
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getOneUserRequests(req, res) {
    const { userId } = req.decoded;
    return Request
      .findAll({ where: { userId } })
      .then((requests) => {
        if (requests.length < 1) {
          return res.status(200).json({
            status: 'success',
            found: false,
            count: requests.length,
            message: 'You have not request any ride'
          });
        }
        return res.status(200).json({
          status: 'success',
          found: true,
          message: 'All your requests',
          requests,
          count: requests.length
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getAllRequestsToARide();
     * @description get all requests
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getAllRequestsToARide(req, res) {
    const { userName } = req.decoded;
    return Request
      .findAll({ where: { driver: userName } })
      .then((requests) => {
        if (requests.length < 1) {
          return res.status(200).json({
            status: 'success',
            found: false,
            count: requests.length,
            message: 'No passenger\'s requests to your ride'
          });
        }
        return res.status(200).json({
          status: 'success',
          found: true,
          message: 'Passengers requests',
          requests,
          count: requests.length
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * updateRequest();
     * @description get all rides
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static updateRequest(req, res) {
    const { rideId, requestId } = req.params;
    const { userId } = req.decoded;
    const { action } = req.body;
    let availableSeats;
    return Request
      .findOne({
        where: { requestId },
        include: [{ model: Ride }]
      }).then(((request) => {
        if (!request) {
          return res.status(400).json({
            success: false,
            status: 'fail',
            message: 'No request found!'
          });
        }
        if (action === 'Request Accepted' && request.userId !== userId) {
          if (request.action === 'Request Accepted') {
            res.status(400).json({
              success: false,
              status: 'fail',
              message: 'Cannot accept a request twice'
            });
          } else {
            request
              .update({ action }).then(() => {
                // QUERY TO DECREMENT SEATS
                availableSeats = request.Ride.seats;
                availableSeats -= 1;
                if (availableSeats > 1) {
                  request.Ride.update({ seats: availableSeats })
                } else {
                  request.Ride.update({ seats: 0 }).then(() => {
                    return res.json({
                      success: false,
                      status: 'fail',
                      message: 'No more slots in your car'
                    });
                  })
                }
                res.status(201).json({
                  success: true,
                  status: 'Success',
                  message: 'Request Accepted'
                });
              });
          }
        }
        if (action === 'Request Rejected' && request.action !== 'Pending...') {
          if (request.action === 'Request Rejected') {
            return res.status(400).json({
              success: false,
              status: 'fail',
              message: 'Cannot reject a request twice'
            });
          } else {
            let seats = request.Ride.seats;
            seats += 1;
            request
              .update({ action }).then(() => {
                request.Ride.update({ seats });
                return res.status(201).json({
                  success: true,
                  status: 'Success',
                  message: 'Request Rejected'
                });
              });
          }
        }
      })).catch(err => res.status(400).json({
        success: false,
        status: 'fail',
        message: err.message
      }));
  }
}