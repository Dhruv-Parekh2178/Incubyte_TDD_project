let addSweet,
  getAllSweets,
  deleteSweet,
  searchByName,
  searchByCategory,
  searchByPriceRange,
  searchSweets,
  sortSweets,
  purchaseSweet;

beforeEach(() => {
  jest.resetModules();
  const sweetShop = require("../src/sweetShop");
  sweetShop.__resetSweets();

  addSweet = sweetShop.addSweet;
  getAllSweets = sweetShop.getAllSweets;
  deleteSweet = sweetShop.deleteSweet;
  searchByName = sweetShop.searchByName;
  searchByCategory = sweetShop.searchByCategory;
  searchByPriceRange = sweetShop.searchByPriceRange;
  searchSweets = sweetShop.searchSweets;
  sortSweets = sweetShop.sortSweets;
  purchaseSweet = sweetShop.purchaseSweet;
});

test("should add a new sweet to the shop", () => {
  console.log("=== NEW TEST ===");
  const sweet = {
    id: 1001,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };

  addSweet(sweet);

  const sweets = getAllSweets();
  expect(sweets.length).toBe(1);
  expect(sweets[0]).toEqual(sweet);
});

test("should delete a sweet by ID", () => {
  console.log("=== NEW TEST ===");

  const sweet1 = {
    id: 1001,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };

  const sweet2 = {
    id: 1002,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 10,
    quantity: 50,
  };

  addSweet(sweet1);
  addSweet(sweet2);

  deleteSweet(1001);

  const sweets = getAllSweets();
  expect(sweets.length).toBe(1);
  expect(sweets[0].id).toBe(1002);
});

test("should throw error when adding sweet with duplicate ID", () => {
  console.log("=== NEW TEST ===");

  const sweet1 = {
    id: 1001,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };

  const sweet2 = {
    id: 1001,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 10,
    quantity: 50,
  };

  addSweet(sweet1);
  expect(() => addSweet(sweet2)).toThrow("Sweet with this ID already exists.");
});

test("should search sweets by name", () => {
  console.log("=== NEW TEST ===");

  const sweet1 = {
    id: 3001,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };

  const sweet2 = {
    id: 3002,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 10,
    quantity: 50,
  };

  const sweet3 = {
    id: 3003,
    name: "Gajar Halwa",
    category: "Vegetable-Based",
    price: 30,
    quantity: 15,
  };

  addSweet(sweet1);
  addSweet(sweet2);
  addSweet(sweet3);

  const result = searchByName("Gulab");

  expect(result.length).toBe(1);
  expect(result[0].name).toBe("Gulab Jamun");
});

test("should search sweets by category", () => {
  const sweet1 = {
    id: 4001,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };

  const sweet2 = {
    id: 4002,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 10,
    quantity: 50,
  };

  const sweet3 = {
    id: 4003,
    name: "Badam Barfi",
    category: "Nut-Based",
    price: 40,
    quantity: 25,
  };

  addSweet(sweet1);
  addSweet(sweet2);
  addSweet(sweet3);

  const result = searchByCategory("Nut-Based");

  expect(result.length).toBe(2);
  expect(result.map((s) => s.name)).toContain("Kaju Katli");
  expect(result.map((s) => s.name)).toContain("Badam Barfi");
});

test("should search sweets within a price range", () => {
  const sweet1 = {
    id: 5001,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };

  const sweet2 = {
    id: 5002,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 30,
    quantity: 50,
  };

  const sweet3 = {
    id: 5003,
    name: "Rasgulla",
    category: "Milk-Based",
    price: 20,
    quantity: 40,
  };

  addSweet(sweet1);
  addSweet(sweet2);
  addSweet(sweet3);

  const result = searchByPriceRange(20, 35);

  expect(result.length).toBe(2);
  expect(result.map((s) => s.name)).toContain("Gulab Jamun");
  expect(result.map((s) => s.name)).toContain("Rasgulla");
});

test("should search sweets using multiple filters", () => {
  const sweet1 = {
    id: 6001,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };
  const sweet2 = {
    id: 6002,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 30,
    quantity: 50,
  };
  const sweet3 = {
    id: 6003,
    name: "Badam Barfi",
    category: "Nut-Based",
    price: 40,
    quantity: 15,
  };
  const sweet4 = {
    id: 6004,
    name: "Mysore Pak",
    category: "Gram-Based",
    price: 35,
    quantity: 25,
  };

  addSweet(sweet1);
  addSweet(sweet2);
  addSweet(sweet3);
  addSweet(sweet4);

  const result = searchSweets({
    category: "Nut-Based",
    minPrice: 35,
    maxPrice: 50,
  });

  expect(result.length).toBe(2);
  expect(result.map((s) => s.name)).toContain("Kaju Katli");
  expect(result.map((s) => s.name)).toContain("Badam Barfi");
});

test("should sort sweets by price in ascending and descending order", () => {
  const sweet1 = {
    id: 7001,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };
  const sweet2 = {
    id: 7002,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 30,
    quantity: 50,
  };
  const sweet3 = {
    id: 7003,
    name: "Rasgulla",
    category: "Milk-Based",
    price: 40,
    quantity: 40,
  };

  addSweet(sweet1);
  addSweet(sweet2);
  addSweet(sweet3);

  const { sortSweets } = require("../src/sweetShop");

  const ascending = sortSweets("price", "asc");
  expect(ascending.map((s) => s.price)).toEqual([30, 40, 50]);

  const descending = sortSweets("price", "desc");
  expect(descending.map((s) => s.price)).toEqual([50, 40, 30]);
});

test("should purchase a sweet and reduce quantity", () => {
  const sweet = {
    id: 8001,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 30,
    quantity: 10,
  };

  addSweet(sweet);

  const { purchaseSweet, getAllSweets } = require("../src/sweetShop");

  purchaseSweet(8001, 3);
  const updated = getAllSweets().find((s) => s.id === 8001);
  expect(updated.quantity).toBe(7);
});

test('should not allow purchase if insufficient quantity', () => {
  const sweet = {
    id: 8002,
    name: 'Rasgulla',
    category: 'Milk-Based',
    price: 25,
    quantity: 5
  };

  addSweet(sweet);

  const { purchaseSweet } = require('../src/sweetShop');

  expect(() => purchaseSweet(8002, 10)).toThrow('Not enough stock available.');
});
