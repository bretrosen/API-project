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
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 2,
        address: '221B Baker Street',
        city: 'London',
        state: 'Greater London',
        country: 'England',
        lat: 51.523880,
        lng: -0.158577,
        name: '221B Baker Street',
        description: 'See and observe the hustle and bustle of London from this charming Georgian terrace. A fully equpped laboratory adjoins the study. Please do not interact with the irregular children in the street below.',
        price: 300.00,
      },
      {
        ownerId: 2,
        address: 'Strada General Traian Mosoiu 24',
        city: 'Bran',
        state: 'Brasov',
        country: 'Romania',
        lat: 45.515000,
        lng: 25.367132,
        name: 'Castle Dracula',
        description: 'A charmer of a 13th century fortress. Decked out equally well for lavish dinner parties and intimate nights in. Please keep all windows closed during daylight hours.',
        price: 2000.00,
      },
      {
        ownerId: 1,
        address: '33 Harbour Rd',
        city: 'Great Neck',
        state: 'NY',
        country: 'USA',
        lat: 40.823127,
        lng: -73.727646,
        name: 'Gatsby Mansion',
        description: 'Travel back to the Roaring Twenties in this 18-bedroom colonial-style mansion. Spectacular views of Manhattan and dock space for a 200-foot yacht. Find your inner boat and let yourself be borne back ceaselessly into the past.',
        price: 4000.00,
      },
      {
        ownerId: 1,
        address: '333 E Wonderview Ave',
        city: 'Estes Park',
        state: 'CO',
        country: 'USA',
        lat: 40.383316,
        lng: -105.518970,
        name: 'Overlook Hotel',
        description: "Feeling like your life is all work and no play? Book a getaway in one our brand-new premium suites. Stop by the fully stocked bar and enjoy the most ethereal libations you'll ever encounter.",
        price: 500.00,
      },
      {
        ownerId: 3,
        address: 'The End of Bagshot Row',
        city: 'Hobbiton',
        state: 'The Shire',
        country: 'Eriador',
        lat: 49.138381,
        lng: -90.123414,
        name: 'Bag End',
        description: "In a hole in the ground there lived… you! Eat and drink to your heart's content. A fully stocked pantry awaits your stay and will easily provide for any unexpected guests. Please do not chip glasses, crack plates, blunt knives, or bend forks.",
        price: 200.00,
      },
      {
        ownerId: 2,
        address: 'Kronborg 1B',
        city: 'Helsingor',
        state: 'Hovedstaden',
        country: 'Denmark',
        lat: 56.039713,
        lng: 12.621868,
        name: 'Elsinore',
        description: "To stay, or not to stay, is no question at all! Visit a magnificent Renaissance castle in stately Denmark. There are more things in heaven and Elsinore than are dreamt of in your philosophy.",
        price: 3000.00,
      },
      {
        ownerId: 3,
        address: '1 Dragonstone Isle',
        city: 'Dragonstone',
        state: 'Crownlands',
        country: 'Westeros',
        lat: 36.888183,
        lng: -81.328813,
        name: 'Dragonstone',
        description: "A true monument to Valyrian arts. Take in the briny seaside air and feel the might of the dragon architecture surrounding you. Meet at the Painted Table for dragon-riding lessons some mornings.",
        price: 1000.00,
      },
      {
        ownerId: 3,
        address: '999 Kingsroad',
        city: "Castle Black",
        state: 'The North',
        country: 'Westeros',
        lat: 67.321228,
        lng: -81.513828,
        name: 'Castle Black',
        description: "Brothers in arms, and hospitality! Come enjoy the fruits of the labors of the men of the Night's Watch. Take in the grandeur of The Wall as you dine on Three-Finger Hobb's rich lamprey pie. Stay until your watch is ended.",
        price: 100.00,
      },
      {
        ownerId: 3,
        address: '1 Kingsroad',
        city: "King's Landing",
        state: 'Crownlands',
        country: 'Westeros',
        lat: 34.143822,
        lng: -84.313213,
        name: 'Red Keep',
        description: "A stately home for a king! Take your turn on the Iron Throne, and then retire to the security of Maegor's Holdfast. Tour the secret passages at your leisure, but no recording of conversations, please.",
        price: 3000.00,
      },
      {
        ownerId: 1,
        address: '12 Tumnus Way',
        city: "The Lamp-post",
        state: 'Western Woods',
        country: 'Narnia',
        lat: 56.818818,
        lng: -114.231121,
        name: 'Tumnus House',
        description: "Experience forest living in your own secluded cavern. Sit by the fireplace and crack open a book as you nibble on Turkish Delight. Let Mr. Tumnus lull you to sleep with a lullaby.",
        price: 200.00,
      },
      {
        ownerId: 1,
        address: '1407 Graymalkin Lane',
        city: "Salem Center",
        state: 'NY',
        country: 'USA',
        lat: 41.329406,
        lng: -73.598226,
        name: 'Xavier House',
        description: "Drop all your cares and settle in for a stay at this Neoclassical mansion overlooking the tranquility of Breakstone Lake. For your own safety, please vacate the grounds when school is in session.",
        price: 900.00,
      },
      {
        ownerId: 3,
        address: '2 Fork Path',
        city: "Green Fork",
        state: 'Riverlands',
        country: 'Westeros',
        lat: 41.328283,
        lng: -94.184188,
        name: 'The Twins',
        description: "Truly a castle built for a celebration unlike any other! Well equipped to host your wedding or other large gathering. Please leave retainers outside and let the feasting commence!",
        price: 500.00,
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
