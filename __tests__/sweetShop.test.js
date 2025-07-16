let addSweet,getAllSweets, deleteSweet, searchByName;

beforeEach(() => {
  jest.resetModules();
  const sweetShop = require('../src/sweetShop');
  sweetShop.__resetSweets();

  addSweet = sweetShop.addSweet;
  getAllSweets = sweetShop.getAllSweets;
   deleteSweet = sweetShop.deleteSweet;
   searchByName = sweetShop.searchByName;
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

  test('should delete a sweet by ID', () => {
    console.log('=== NEW TEST ===');

    const sweet1 = {
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };

    const sweet2 = {
      id: 1002,
      name: 'Gulab Jamun',
      category: 'Milk-Based',
      price: 10,
      quantity: 50
    };

    addSweet(sweet1);
    addSweet(sweet2);

    deleteSweet(1001);

    const sweets = getAllSweets();
    expect(sweets.length).toBe(1);
    expect(sweets[0].id).toBe(1002);
  });

test('should throw error when adding sweet with duplicate ID', () => {
    console.log('=== NEW TEST ===');

    const sweet1 = {
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };

    const sweet2 = {
      id: 1001,
      name: 'Gulab Jamun',
      category: 'Milk-Based',
      price: 10,
      quantity: 50
    };

    addSweet(sweet1);
    expect(() => addSweet(sweet2)).toThrow('Sweet with this ID already exists.');
  });

  test('should search sweets by name', () => {
    console.log('=== NEW TEST ===');

  const sweet1 = {
    id: 3001,
    name: 'Kaju Katli',
    category: 'Nut-Based',
    price: 50,
    quantity: 20
  };

  const sweet2 = {
    id: 3002,
    name: 'Gulab Jamun',
    category: 'Milk-Based',
    price: 10,
    quantity: 50
  };

  const sweet3 = {
    id: 3003,
    name: 'Gajar Halwa',
    category: 'Vegetable-Based',
    price: 30,
    quantity: 15
  };

  addSweet(sweet1);
  addSweet(sweet2);
  addSweet(sweet3);

  const result = searchByName('Gulab');

  expect(result.length).toBe(1);
  expect(result[0].name).toBe('Gulab Jamun');
});

