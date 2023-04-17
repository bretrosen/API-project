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
   options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    // {
    //   ownerId: 1,
    //   address: '350 Fifth Avenue',
    //   city: 'New York',
    //   state: 'NY',
    //   country: 'USA',
    //   lat: 40.75,
    //   lng: -73.99,
    //   name: 'Empire State Building',
    //   description: 'A landmark destination built for a postcard',
    //   price: 500000.00,
    // },
    {
      ownerId: 1,
      address: '221B Baker Street',
      city: 'London',
      state: 'Greater London',
      country: 'UK',
      lat: 51.52,
      lng: -0.16,
      name: 'The Sherlock Holmes Museum',
      description: 'See and observe as you lounge in a Victorian relic',
      price: 800.00,
    },
    {
      ownerId: 2,
      address: '23A Pier Place',
      city: 'Edinbugh',
      state: 'Midlothian',
      country: 'UK',
      lat: 55.99,
      lng: -3.19,
      name: 'The Worst Toilet in Scotland',
      description: 'Totally renovated for the ultimate in a vacation home spa experience',
      price: 200.00,
    },
    {
      ownerId: 3,
      address: '137 West De Koven Street',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      lat: 41.87,
      lng: -87.64,
      name: 'The Barn that Started the Burn',
      description: 'Relax and contemplate the origins of the Great Chicago Fire',
      price: 100.00,
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Empire State Building', 'The Sherlock Holmes Museum', 'The Worst Toilet in Scotland', 'The Barn that Started the Burn']}
    }, {});
  }
};
