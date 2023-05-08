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
      url: "https://i.imgur.com/QdNvr1z.jpg",
      preview: true
    },
    {
      spotId: 1,
      url: "https://i.imgur.com/uipwYZJ.jpg",
      preview: false
    },
    {
      spotId: 1,
      url: "https://i.imgur.com/pzkp4uC.jpg",
      preview: false
    },
    {
      spotId: 1,
      url: "https://i.imgur.com/pzkp4uC.jpg",
      preview: false
    },
    {
      spotId: 1,
      url: "https://i.imgur.com/X7Q1fCe.jpg",
      preview: true
    },
    {
      spotId: 2,
      url: "https://i.imgur.com/EsLnXPg.jpg",
      preview: true
    },
    {
      spotId: 2,
      url: "https://i.imgur.com/umctV9A.jpg",
      preview: false
    },
    {
      spotId: 2,
      url: "https://i.imgur.com/LakRV6C.jpg",
      preview: false
    },
    {
      spotId: 2,
      url: "https://i.imgur.com/dlE9644.jpg",
      preview: false
    },
    {
      spotId: 2,
      url: "https://i.imgur.com/KdganoL.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://i.imgur.com/1ARUyNa.jpg",
      preview: true
    },
    {
      spotId: 3,
      url: "https://i.imgur.com/7O26w19.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://i.imgur.com/HVeARcE.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://i.imgur.com/Z94CnGe.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://i.imgur.com/5Qi5Szn.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://i.imgur.com/lAkNH3w.jpg",
      preview: true
    },
    {
      spotId: 4,
      url: "https://i.imgur.com/oJ3gM4X.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://i.imgur.com/3RhPlwy.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://i.imgur.com/hperX8L.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://i.imgur.com/DVA1o5s.jpg",
      preview: false
    },
    {
      spotId: 5,
      url: "https://i.imgur.com/w2ssdV9.jpg",
      preview: true
    },
    {
      spotId: 5,
      url: "https://i.imgur.com/t0cYRIt.jpg",
      preview: false
    },
    {
      spotId: 5,
      url: "https://i.imgur.com/McIVIUS.jpg",
      preview: false
    },
    {
      spotId: 5,
      url: "https://i.imgur.com/AyQXrMP.jpg",
      preview: false
    },
    {
      spotId: 5,
      url: "https://i.imgur.com/QwgSQcW.jpg",
      preview: false
    },
    {
      spotId: 6,
      url: "https://i.imgur.com/6UgWFBL.jpg",
      preview: true
    },
    {
      spotId: 6,
      url: "https://i.imgur.com/3Jo5K3z.jpg",
      preview: false
    },
    {
      spotId: 6,
      url: "https://i.imgur.com/9ZnBR1k.jpg",
      preview: false
    },
    {
      spotId: 6,
      url: "https://i.imgur.com/KbWNWLj.jpg",
      preview: false
    },
    {
      spotId: 6,
      url: "https://i.imgur.com/haqvseI.jpg",
      preview: false
    },
    {
      spotId: 7,
      url: "https://i.imgur.com/Pty2u3R.jpg",
      preview: true
    },
    {
      spotId: 7,
      url: "https://i.imgur.com/puSCr8C.jpg",
      preview: false
    },
    {
      spotId: 7,
      url: "https://i.imgur.com/9AG6htQ.jpg",
      preview: false
    },
    {
      spotId: 7,
      url: "https://i.imgur.com/g2C7IYs.jpg",
      preview: false
    },
    {
      spotId: 7,
      url: "https://i.imgur.com/4AmRZQ5.jpg",
      preview: false
    },
    {
      spotId: 8,
      url: "https://i.imgur.com/3nKoBNu.jpg",
      preview: true
    },
    {
      spotId: 8,
      url: "https://i.imgur.com/NCFCJtw.jpg",
      preview: false
    },
    {
      spotId: 8,
      url: "https://i.imgur.com/fn98yOP.jpg",
      preview: false
    },
    {
      spotId: 8,
      url: "https://i.imgur.com/Oe3JVRE.jpg",
      preview: false
    },
    {
      spotId: 8,
      url: "https://i.imgur.com/F6fSEuc.jpg",
      preview: false
    },
    {
      spotId: 9,
      url: "https://i.imgur.com/HKjuA6b.jpg",
      preview: true
    },
    {
      spotId: 9,
      url: "https://i.imgur.com/Vj9m4xv.jpg",
      preview: false
    },
    {
      spotId: 9,
      url: "https://i.imgur.com/0uz7XsJ.jpg",
      preview: false
    },
    {
      spotId: 9,
      url: "https://i.imgur.com/iNmC4Eo.jpg",
      preview: false
    },
    {
      spotId: 9,
      url: "https://i.imgur.com/H2dD6Ri.jpg",
      preview: false
    },
    {
      spotId: 10,
      url: "https://i.imgur.com/wo6YwMw.jpg",
      preview: true
    },
    {
      spotId: 10,
      url: "https://i.imgur.com/ix9xTtM.jpg",
      preview: false
    },
    {
      spotId: 10,
      url: "https://i.imgur.com/QPEur2C.jpg",
      preview: false
    },
    {
      spotId: 10,
      url: "https://i.imgur.com/R4FZndi.jpg",
      preview: false
    },
    {
      spotId: 10,
      url: "https://i.imgur.com/TdwLzMv.jpg",
      preview: false
    },
    {
      spotId: 11,
      url: "https://i.imgur.com/nSrkDF0.jpg",
      preview: true
    },
    {
      spotId: 11,
      url: "https://i.imgur.com/TglJmNC.jpg",
      preview: false
    },
    {
      spotId: 11,
      url: "https://i.imgur.com/QJrhYlS.jpg",
      preview: false
    },
    {
      spotId: 11,
      url: "https://i.imgur.com/nfxVInl.jpg",
      preview: false
    },
    {
      spotId: 11,
      url: "https://i.imgur.com/j70jkPY.jpg",
      preview: false
    },
    {
      spotId: 12,
      url: "https://i.imgur.com/ng9vgck.jpg",
      preview: true
    },
    {
      spotId: 12,
      url: "https://i.imgur.com/eXP5A34.jpg",
      preview: false
    },
    {
      spotId: 12,
      url: "https://i.imgur.com/VdrcT1U.jpg",
      preview: false
    },
    {
      spotId: 12,
      url: "https://i.imgur.com/xbocFME.jpg",
      preview: false
    },
    {
      spotId: 12,
      url: "https://i.imgur.com/CDi9x32.jpg",
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
    }, {});
  }
};
