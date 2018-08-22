import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from '../models/index';

config();
const secret = process.env.SECRET;
const { User, Ride, Request } = db;

/**
 * @class Users
 */
export default class Users {

  /**
    * getUsers();
      * @description Create ride offers
      * @param {*} req Express request object
      * @param {*} res Express response object
      * @returns {object} json
      */

  static getUsers(req, res) {
    return User.findAll({
      include: [{
        model: Ride,
        include: [{ model: Request }]
      }]
    })
      .then(users => res.json({ users }));
  }
  /**
   * createUser();
     * @description Create ride offers
     * @param {*} req Express request object
     * @param {*} res Express response object
     * @returns {object} json
     */
  static createUser(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const {
      fullName, userName, email
    } = req.body;

    User
      .create({ fullName, userName, email, password })
      .then((newUser) => {
        const { userId } = newUser;
        const token = jwt.sign({ userId, email, userName }, secret, { expiresIn: '24h' });
        res.status(201).json({
          success: true,
          message: 'Success',
          user: { userName, email, token }
        });
      })
      .catch(err => res.status(500).json({
        success: false,
        message: `There was an internal error! ${err.message}`
      }));
  }

  /**
     * @returns {object} loginUser
     * @param {*} req
     * @param {*} res
     */
  static loginUser(req, res) {
    const { email, password } = req.body;
    User
      .findOne({ where: { email } })
      .then((user) => {
        if (user && bcrypt.compareSync(password.trim(), user.password)) {
          const { userId, userName } = user;
          const token = jwt.sign({ userId, email, userName }, secret, { expiresIn: '24h' });
          return res.status(200).json({
            success: true,
            message: `${userName} is successfully logged in`,
            result: { userName, email, token },
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Your email or password is incorrect'
        });
      }).catch((err) => {
        res.status(500).json({
          success: false,
          message: `There was an internal/server error ${err.message} `
        });
      });
  }
}