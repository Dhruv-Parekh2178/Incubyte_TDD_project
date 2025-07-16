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

module.exports = {
  addSweet,
  getAllSweets,
  deleteSweet,
  searchByName,
  searchByCategory,
  __resetSweets,
};
