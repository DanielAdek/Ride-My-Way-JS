'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Rides', [{
    userId: 6,
    driver: 'Daniel',
    departure: 'Las Vegas',
    destination: 'San Francisco',
    time: '02:20 PM',
    date: '08-28-2018',
    seats:4,
    cost: 4,
    createdAt: '08-23-2018',
    updatedAt: '08-23-2018'
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Rides', null, {});
  }
};
