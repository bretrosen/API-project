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
   options.tableName = 'ReviewImages';
   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://googlify.com/hamsters'
    },
    {
      reviewId: 2,
      url: 'https://googlify.com/houses'
    },
    {
      reviewId: 3,
      url: 'https://googlify.com/hotels'
    },
    {
      reviewId: 4,
      url: 'https://googlify.com/horses'
    },
    {
      reviewId: 5,
      url: 'https://googlify.com/hansoms'
    },
    {
      reviewId: 6,
      url: 'https://googlify.com/hotplates'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
