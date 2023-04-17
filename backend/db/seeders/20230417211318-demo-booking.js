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
        startDate: 12 / 25 / 23,
        endDate: 12 / 29 / 23
      },
      {
        spotId: 2,
        userId: 1,
        startDate: 1 / 2 / 24,
        endDate: 1 / 29 / 24
      },
      {
        spotId: 3,
        userId: 2,
        startDate: 1 / 25 / 24,
        endDate: 1 / 28 / 24
      },
      // {
      //   spotId: 4,
      //   userId: 1,
      //   startDate: 2 / 12 / 24,
      //   endDate: 2 / 29 / 24
      // },
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
