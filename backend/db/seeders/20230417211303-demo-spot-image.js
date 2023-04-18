'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'SpotImages';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: "https://sherlock.com",
      preview: true
    },
    {
      spotId: 1,
      url: "https://sherlock.com",
      preview: false
    },
    {
      spotId: 2,
      url: "https://scotland.com",
      preview: true
    },
    {
      spotId: 2,
      url: "https://scotland.com",
      preview: false
    },
    {
      spotId: 3,
      url: "https://chicago.com",
      preview: true
    },
    {
      spotId: 3,
      url: "https://chicago.com",
      preview: false
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
