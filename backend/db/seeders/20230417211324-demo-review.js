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
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: 'Rather disappointing. No landlady and no bumbling assistant. Neither violin nor syringe provided.',
        stars: 2
      },
      {
        spotId: 1,
        userId: 1,
        review: 'Not bad. Enjoyed the novelty, but no hansom cabs were made available by the owner.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Actually an amazing toilet, and so was the rest of the spot.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Brilliant! A lovely chip shop round the corner next to a proper discotheque.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Just average. Everything was average.',
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: 'My favorite spot in Chicago! Loses one star for lack of cows.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: 'A little pricey but really roomy!',
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: 'The quintessential NYC experience of excess!',
        stars: 5
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
