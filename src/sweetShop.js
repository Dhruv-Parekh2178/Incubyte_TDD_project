const { getSweetList, setSweetList } = require("./dataStore");

function addSweet(sweet) {
  const list = getSweetList();
  console.log(
    "Current sweet IDs:",
    list.map((s) => s.id)
  );

  const exists = list.some((s) => s.id === sweet.id);
  if (exists) {
    throw new Error("Sweet with this ID already exists.");
  }

  list.push(sweet);
}

function __resetSweets() {
  setSweetList([]);
}

function getAllSweets() {
  return getSweetList();
}
function deleteSweet(id) {
  const updated = getSweetList().filter((s) => s.id !== id);
  setSweetList(updated);
}

function searchByName(name) {
  return getSweetList().filter((s) =>
    s.name.toLowerCase().includes(name.toLowerCase())
  );
}

function searchByCategory(category) {
  return getSweetList().filter(
    (s) => s.category.toLowerCase() === category.toLowerCase()
  );
}

function searchByPriceRange(min, max) {
  return getSweetList().filter((s) => s.price >= min && s.price <= max);
}

function searchSweets({ name, category, minPrice, maxPrice }) {
  return getSweetList().filter((sweet) => {
    const matchName = name ? sweet.name.toLowerCase().includes(name.toLowerCase()) : true;
    const matchCategory = category ? sweet.category.toLowerCase() === category.toLowerCase() : true;
    const matchPrice =
      (minPrice === undefined || sweet.price >= minPrice) &&
      (maxPrice === undefined || sweet.price <= maxPrice);

    return matchName && matchCategory && matchPrice;
  });
}

function sortSweets(field, order = 'asc') {
  const sorted = [...getSweetList()].sort((a, b) => {
    if (field === 'price' || field === 'quantity') {
      return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
    }

    if (field === 'name' || field === 'category') {
      const valA = a[field].toLowerCase();
      const valB = b[field].toLowerCase();
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    }

    return 0; // Default case
  });

  return sorted;
}


module.exports = {
  addSweet,
  getAllSweets,
  deleteSweet,
  searchByName,
  searchByCategory,
  searchByPriceRange,
    searchSweets,
    sortSweets,
  __resetSweets,
};
