let addSweet,getAllSweets;

beforeEach(() => {
  jest.resetModules();
  const sweetShop = require('../src/sweetShop');
  sweetShop.__resetSweets();

  addSweet = sweetShop.addSweet;
  getAllSweets = sweetShop.getAllSweets;
});


  test('should add a new sweet to the shop', () => {
    console.log('=== NEW TEST ===');
 const sweet = {
    id: 1001,
    name: 'Kaju Katli',
    category: 'Nut-Based',
    price: 50,
    quantity: 20
  };

  addSweet(sweet)

  const sweets = getAllSweets();
expect(sweets.length).toBe(1);
expect(sweets[0]).toEqual(sweet);

  });

  