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
      url: 'https://watson.com/1'
    },
    {
      reviewId: 1,
      url: 'https://lestrade.com/1'
    },
    {
      reviewId: 2,
      url: 'https://watson.com/2'
    },
    {
      reviewId: 4,
      url: 'https://leith.com'
    },
    {
      reviewId: 6,
      url: 'https://cubs.com'
    },
    {
      reviewId: 3,
      url: 'https://chippy.com'
    },
    {
      reviewId: 5,
      url: 'https://artinstitute.com'
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
