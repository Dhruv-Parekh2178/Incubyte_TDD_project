let sweetList = [];

export function getAllSweets() {
  return [...sweetList];
}

export function addSweet(sweet) {
  const exists = sweetList.some((s) => s.id === sweet.id);
  if (exists) {
    throw new Error('Sweet with this ID already exists.');
  }
  sweetList.push(sweet);
}

export function deleteSweet(id) {
  sweetList = sweetList.filter((s) => s.id !== id);
}

export function searchByName(name) {
  return sweetList.filter((s) =>
    s.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function searchByCategory(category) {
  return sweetList.filter(
    (s) => s.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchByPriceRange(min, max) {
  return sweetList.filter((s) => s.price >= min && s.price <= max);
}

export function searchSweets({ name, category, minPrice, maxPrice }) {
  return sweetList.filter((s) => {
    const matchName = name
      ? s.name.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchCategory = category
      ? s.category.toLowerCase() === category.toLowerCase()
      : true;
    const matchPrice =
      (minPrice === undefined || s.price >= minPrice) &&
      (maxPrice === undefined || s.price <= maxPrice);
    return matchName && matchCategory && matchPrice;
  });
}

export function sortSweets(field, order = 'asc') {
  const sorted = [...sweetList].sort((a, b) => {
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

    return 0;
  });

  return sorted;
}

export function purchaseSweet(id, quantityToBuy) {
  const sweet = sweetList.find((s) => s.id === id);
  if (!sweet) {
    throw new Error('Sweet not found.');
  }
  if (sweet.quantity < quantityToBuy) {
    throw new Error('Not enough stock available.');
  }
  sweet.quantity -= quantityToBuy;
}

export function restockSweet(id, quantityToAdd) {
  const sweet = sweetList.find((s) => s.id === id);
  if (!sweet) {
    throw new Error('Sweet not found.');
  }
  sweet.quantity += quantityToAdd;
}

export function __resetSweets() {
  sweetList = [];
}
