'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: '2023-12-25',
        endDate: '2023-12-29'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2024-1-2',
        endDate: '2024-1-29'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2024-1-25',
        endDate: '2024-1-28'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2024-2-12',
        endDate: '2024-2-29'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
