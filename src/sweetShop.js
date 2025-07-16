const { getSweetList, setSweetList } = require('./dataStore');

function addSweet(sweet) {
  const list = getSweetList();
  console.log('Current sweet IDs:', list.map((s) => s.id));

  const exists = list.some((s) => s.id === sweet.id);
  if (exists) {
    throw new Error('Sweet with this ID already exists.');
  }

  list.push(sweet);
}

function __resetSweets() {
  setSweetList([]);
}

module.exports = {
  addSweet,
  __resetSweets
};
