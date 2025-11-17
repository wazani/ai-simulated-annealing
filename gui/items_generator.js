function generateRandomItemList(numItems, maxWeight) {
  const items = [];

  const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  for (let i = 0; i < numItems; i++) {
    const itemWeight = getRandomInteger(1, maxWeight);
    const itemValue = getRandomInteger(5, 100);
    items.push({
      id: i + 1,
      label: `Item ${i + 1}`,
      weight: itemWeight,
      value: itemValue,
    });
  }

  return items;
}

function generateKnapsackItems() {
  const capacity = Number(document.querySelector("#capacity").value);
  const itemsNumber = Number(document.querySelector("#num_items").value);
  const items = generateRandomItemList(itemsNumber, capacity);
  updateTableData(items);
}
