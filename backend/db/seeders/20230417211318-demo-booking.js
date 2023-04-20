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
        startDate: new Date (2023, 11, 25),
        endDate: new Date (2023, 11, 29)
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date (2024, 0, 2),
        endDate: new Date (2024, 0, 29)
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date (2024, 0, 25),
        endDate: new Date (2024, 0, 28)
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date (2024, 1, 12),
        endDate: new Date (2024, 1, 28)
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
