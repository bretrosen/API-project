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
      url: "https://imgur.com/QdNvr1z",
      preview: true
    },
    {
      spotId: 1,
      url: "https://imgur.com/uipwYZJ",
      preview: false
    },
    {
      spotId: 1,
      url: "https://imgur.com/pzkp4uC",
      preview: false
    },
    {
      spotId: 1,
      url: "https://imgur.com/pzkp4uC",
      preview: false
    },
    {
      spotId: 1,
      url: "https://imgur.com/X7Q1fCe",
      preview: true
    },
    {
      spotId: 2,
      url: "https://imgur.com/EsLnXPg",
      preview: true
    },
    {
      spotId: 2,
      url: "https://imgur.com/umctV9A",
      preview: false
    },
    {
      spotId: 2,
      url: "https://imgur.com/LakRV6C",
      preview: false
    },
    {
      spotId: 2,
      url: "https://imgur.com/dlE9644",
      preview: false
    },
    {
      spotId: 2,
      url: "https://imgur.com/KdganoL",
      preview: false
    },
    {
      spotId: 3,
      url: "https://imgur.com/1ARUyNa",
      preview: true
    },
    {
      spotId: 3,
      url: "https://imgur.com/7O26w19",
      preview: false
    },
    {
      spotId: 3,
      url: "https://imgur.com/HVeARcE",
      preview: false
    },
    {
      spotId: 3,
      url: "https://imgur.com/Z94CnGe",
      preview: false
    },
    {
      spotId: 3,
      url: "https://imgur.com/5Qi5Szn",
      preview: false
    },
    {
      spotId: 4,
      url: "https://imgur.com/lAkNH3w",
      preview: true
    },
    {
      spotId: 4,
      url: "https://imgur.com/oJ3gM4X",
      preview: false
    },
    {
      spotId: 4,
      url: "https://imgur.com/3RhPlwy",
      preview: false
    },
    {
      spotId: 4,
      url: "https://imgur.com/hperX8L",
      preview: false
    },
    {
      spotId: 4,
      url: "https://imgur.com/DVA1o5s",
      preview: false
    },
    {
      spotId: 5,
      url: "https://imgur.com/w2ssdV9",
      preview: true
    },
    {
      spotId: 5,
      url: "https://imgur.com/t0cYRIt",
      preview: false
    },
    {
      spotId: 5,
      url: "https://imgur.com/McIVIUS",
      preview: false
    },
    {
      spotId: 5,
      url: "https://imgur.com/AyQXrMP",
      preview: false
    },
    {
      spotId: 5,
      url: "https://imgur.com/QwgSQcW",
      preview: false
    },
    {
      spotId: 6,
      url: "https://imgur.com/6UgWFBL",
      preview: true
    },
    {
      spotId: 6,
      url: "https://imgur.com/3Jo5K3z",
      preview: false
    },
    {
      spotId: 6,
      url: "https://imgur.com/9ZnBR1k",
      preview: false
    },
    {
      spotId: 6,
      url: "https://imgur.com/KbWNWLj",
      preview: false
    },
    {
      spotId: 6,
      url: "https://imgur.com/haqvseI",
      preview: false
    },
    {
      spotId: 7,
      url: "https://imgur.com/Pty2u3R",
      preview: true
    },
    {
      spotId: 7,
      url: "https://imgur.com/puSCr8C",
      preview: false
    },
    {
      spotId: 7,
      url: "https://imgur.com/9AG6htQ",
      preview: false
    },
    {
      spotId: 7,
      url: "https://imgur.com/g2C7IYs",
      preview: false
    },
    {
      spotId: 7,
      url: "https://imgur.com/4AmRZQ5",
      preview: false
    },
    {
      spotId: 8,
      url: "https://imgur.com/3nKoBNu",
      preview: true
    },
    {
      spotId: 8,
      url: "https://imgur.com/NCFCJtw",
      preview: false
    },
    {
      spotId: 8,
      url: "https://imgur.com/fn98yOP",
      preview: false
    },
    {
      spotId: 8,
      url: "https://imgur.com/Oe3JVRE",
      preview: false
    },
    {
      spotId: 8,
      url: "https://imgur.com/F6fSEuc",
      preview: false
    },
    {
      spotId: 9,
      url: "https://imgur.com/HKjuA6b",
      preview: true
    },
    {
      spotId: 9,
      url: "https://imgur.com/Vj9m4xv",
      preview: false
    },
    {
      spotId: 9,
      url: "https://imgur.com/0uz7XsJ",
      preview: false
    },
    {
      spotId: 9,
      url: "https://imgur.com/iNmC4Eo",
      preview: false
    },
    {
      spotId: 9,
      url: "https://imgur.com/H2dD6Ri",
      preview: false
    },
    {
      spotId: 10,
      url: "https://imgur.com/wo6YwMw",
      preview: true
    },
    {
      spotId: 10,
      url: "https://imgur.com/ix9xTtM",
      preview: false
    },
    {
      spotId: 10,
      url: "https://imgur.com/QPEur2C",
      preview: false
    },
    {
      spotId: 10,
      url: "https://imgur.com/R4FZndi",
      preview: false
    },
    {
      spotId: 10,
      url: "https://imgur.com/TdwLzMv",
      preview: false
    },
    {
      spotId: 11,
      url: "https://imgur.com/nSrkDF0",
      preview: true
    },
    {
      spotId: 11,
      url: "https://imgur.com/TglJmNC",
      preview: false
    },
    {
      spotId: 11,
      url: "https://imgur.com/QJrhYlS",
      preview: false
    },
    {
      spotId: 11,
      url: "https://imgur.com/nfxVInl",
      preview: false
    },
    {
      spotId: 11,
      url: "https://imgur.com/j70jkPY",
      preview: false
    },
    {
      spotId: 12,
      url: "https://imgur.com/ng9vgck",
      preview: true
    },
    {
      spotId: 12,
      url: "https://imgur.com/eXP5A34",
      preview: false
    },
    {
      spotId: 12,
      url: "https://imgur.com/VdrcT1U",
      preview: false
    },
    {
      spotId: 12,
      url: "https://imgur.com/xbocFME",
      preview: false
    },
    {
      spotId: 12,
      url: "https://imgur.com/CDi9x32",
      preview: false
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4]}
    }, {});
  }
};
