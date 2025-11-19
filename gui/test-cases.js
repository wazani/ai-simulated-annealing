function loadTestCase(key, index) {
  const test_case = test_cases[key][index];
  console.log(
    `The expected optimal solution for case ${key}-${index} is: ${test_case.expected_optimal_value}`
  );
  document.querySelector("#capacity").setAttribute("value", test_case.capacity);
  updateTableData(test_case.items);
}

//sm(5),md(2),lg(1),xl(1)
const test_cases = {
  sm: [
    {
      case_label: "1. Simple Base Case",
      capacity: 10,
      expected_optimal_value: 13,
      items: [
        {
          label: "Item 1",
          weight: 3,
          value: 4,
        },
        {
          label: "Item 2",
          weight: 4,
          value: 5,
        },
        {
          label: "Item 3",
          weight: 5,
          value: 8,
        },
        {
          label: "Item 4",
          weight: 8,
          value: 10,
        },
      ],
    },
    {
      case_label: "2. Fractional-Ratio Case (Greedy Trap)",
      capacity: 7,
      expected_optimal_value: 34,
      items: [
        {
          label: "Item 1 (Low Ratio)",
          weight: 4,
          value: 20,
        },
        {
          label: "Item 2 (Mid Ratio)",
          weight: 3,
          value: 18,
        },
        {
          label: "Item 3 (High Ratio)",
          weight: 2,
          value: 16,
        },
      ],
    },
    {
      case_label: "3. All Items Fit Case",
      capacity: 100,
      expected_optimal_value: 100,
      items: [
        {
          label: "Item 1",
          weight: 10,
          value: 10,
        },
        {
          label: "Item 2",
          weight: 20,
          value: 20,
        },
        {
          label: "Item 3",
          weight: 30,
          value: 30,
        },
        {
          label: "Item 4",
          weight: 15,
          value: 15,
        },
        {
          label: "Item 5",
          weight: 25,
          value: 25,
        },
      ],
    },
    {
      case_label: "4. Items Too Heavy Case (Zero Output)",
      capacity: 5,
      expected_optimal_value: 0,
      items: [
        {
          label: "Item 1",
          weight: 6,
          value: 10,
        },
        {
          label: "Item 2",
          weight: 7,
          value: 12,
        },
        {
          label: "Item 3",
          weight: 8,
          value: 15,
        },
      ],
    },
    {
      case_label: "5. High Density Case (Complex DP)",
      capacity: 15,
      expected_optimal_value: 50,
      items: [
        {
          label: "Item 1",
          weight: 2,
          value: 6,
        },
        {
          label: "Item 2",
          weight: 3,
          value: 10,
        },
        {
          label: "Item 3",
          weight: 4,
          value: 12,
        },
        {
          label: "Item 4",
          weight: 5,
          value: 15,
        },
        {
          label: "Item 5",
          weight: 7,
          value: 25,
        },
      ],
    },
  ],
  md: [
    {
      case_label: "6. High Density and Value Maximization (10 items)",
      capacity: 70,
      expected_optimal_value: 332,
      items: [
        {
          label: "Gold Bar",
          weight: 10,
          value: 60,
        },
        {
          label: "Silver Ingot",
          weight: 20,
          value: 100,
        },
        {
          label: "Diamond",
          weight: 30,
          value: 120,
        },
        {
          label: "Antique Clock",
          weight: 15,
          value: 45,
        },
        {
          label: "Rare Book",
          weight: 5,
          value: 15,
        },
        {
          label: "Painting 1",
          weight: 45,
          value: 90,
        },
        {
          label: "Statue",
          weight: 8,
          value: 40,
        },
        {
          label: "Coin Set",
          weight: 25,
          value: 75,
        },
        {
          label: "Jewel Box",
          weight: 12,
          value: 72,
        },
        {
          label: "Sapphire",
          weight: 3,
          value: 9,
        },
      ],
    },
    {
      case_label: "7. Close Weight/Value Ratios (10 items)",
      capacity: 80,
      expected_optimal_value: 84,
      items: [
        {
          label: "A",
          weight: 10,
          value: 11,
        },
        {
          label: "B",
          weight: 12,
          value: 13,
        },
        {
          label: "C",
          weight: 15,
          value: 16,
        },
        {
          label: "D",
          weight: 18,
          value: 20,
        },
        {
          label: "E",
          weight: 20,
          value: 22,
        },
        {
          label: "F",
          weight: 25,
          value: 27,
        },
        {
          label: "G",
          weight: 30,
          value: 33,
        },
        {
          label: "H",
          weight: 5,
          value: 6,
        },
        {
          label: "I",
          weight: 8,
          value: 9,
        },
        {
          label: "J",
          weight: 2,
          value: 2,
        },
      ],
    },
  ],
  lg: [
    {
      case_label: "8. Scaling and Complex Dependencies (20 items)",
      capacity: 200,
      expected_optimal_value: 386,
      items: [
        {
          label: "Item 1",
          weight: 10,
          value: 20,
        },
        {
          label: "Item 2",
          weight: 55,
          value: 50,
        },
        {
          label: "Item 3",
          weight: 20,
          value: 40,
        },
        {
          label: "Item 4",
          weight: 70,
          value: 60,
        },
        {
          label: "Item 5",
          weight: 5,
          value: 15,
        },
        {
          label: "Item 6",
          weight: 80,
          value: 70,
        },
        {
          label: "Item 7",
          weight: 15,
          value: 30,
        },
        {
          label: "Item 8",
          weight: 8,
          value: 18,
        },
        {
          label: "Item 9",
          weight: 12,
          value: 25,
        },
        {
          label: "Item 10",
          weight: 3,
          value: 10,
        },
        {
          label: "Item 11",
          weight: 1,
          value: 5,
        },
        {
          label: "Item 12",
          weight: 40,
          value: 35,
        },
        {
          label: "Item 13",
          weight: 7,
          value: 16,
        },
        {
          label: "Item 14",
          weight: 18,
          value: 38,
        },
        {
          label: "Item 15",
          weight: 2,
          value: 12,
        },
        {
          label: "Item 16",
          weight: 50,
          value: 45,
        },
        {
          label: "Item 17",
          weight: 9,
          value: 22,
        },
        {
          label: "Item 18",
          weight: 6,
          value: 14,
        },
        {
          label: "Item 19",
          weight: 1,
          value: 4,
        },
        {
          label: "Item 20",
          weight: 5,
          value: 12,
        },
      ],
    },
  ],

  xl: [
    {
      case_label: "9. Extreme Scaling and Density (100 items)",
      capacity: 1000,
      expected_optimal_value: 2500,
      items: [
        { label: "Item 1", weight: 10, value: 25 },
        { label: "Item 2", weight: 12, value: 30 },
        { label: "Item 3", weight: 5, value: 15 },
        { label: "Item 4", weight: 8, value: 20 },
        { label: "Item 5", weight: 15, value: 35 },
        { label: "Item 6", weight: 20, value: 45 },
        { label: "Item 7", weight: 6, value: 18 },
        { label: "Item 8", weight: 11, value: 28 },
        { label: "Item 9", weight: 13, value: 32 },
        { label: "Item 10", weight: 4, value: 12 },
        { label: "Item 11", weight: 7, value: 20 },
        { label: "Item 12", weight: 16, value: 40 },
        { label: "Item 13", weight: 9, value: 24 },
        { label: "Item 14", weight: 14, value: 34 },
        { label: "Item 15", weight: 10, value: 26 },
        { label: "Item 16", weight: 5, value: 16 },
        { label: "Item 17", weight: 22, value: 50 },
        { label: "Item 18", weight: 3, value: 10 },
        { label: "Item 19", weight: 18, value: 42 },
        { label: "Item 20", weight: 25, value: 55 },
        { label: "Item 21", weight: 10, value: 27 },
        { label: "Item 22", weight: 12, value: 32 },
        { label: "Item 23", weight: 5, value: 17 },
        { label: "Item 24", weight: 8, value: 22 },
        { label: "Item 25", weight: 15, value: 37 },
        { label: "Item 26", weight: 20, value: 47 },
        { label: "Item 27", weight: 6, value: 20 },
        { label: "Item 28", weight: 11, value: 30 },
        { label: "Item 29", weight: 13, value: 34 },
        { label: "Item 30", weight: 4, value: 14 },
        { label: "Item 31", weight: 7, value: 22 },
        { label: "Item 32", weight: 16, value: 42 },
        { label: "Item 33", weight: 9, value: 26 },
        { label: "Item 34", weight: 14, value: 36 },
        { label: "Item 35", weight: 10, value: 28 },
        { label: "Item 36", weight: 5, value: 18 },
        { label: "Item 37", weight: 22, value: 52 },
        { label: "Item 38", weight: 3, value: 12 },
        { label: "Item 39", weight: 18, value: 44 },
        {
          label: "Item 40",
          weight: 25,
          value: 57,
        },
        {
          label: "Item 41",
          weight: 10,
          value: 26,
        },
        {
          label: "Item 42",
          weight: 12,
          value: 31,
        },
        {
          label: "Item 43",
          weight: 5,
          value: 14,
        },
        {
          label: "Item 44",
          weight: 8,
          value: 19,
        },
        {
          label: "Item 45",
          weight: 15,
          value: 34,
        },
        {
          label: "Item 46",
          weight: 20,
          value: 44,
        },
        {
          label: "Item 47",
          weight: 6,
          value: 17,
        },
        {
          label: "Item 48",
          weight: 11,
          value: 27,
        },
        {
          label: "Item 49",
          weight: 13,
          value: 31,
        },
        {
          label: "Item 50",
          weight: 4,
          value: 11,
        },
        {
          label: "Item 51",
          weight: 7,
          value: 19,
        },
        {
          label: "Item 52",
          weight: 16,
          value: 39,
        },
        {
          label: "Item 53",
          weight: 9,
          value: 23,
        },
        {
          label: "Item 54",
          weight: 14,
          value: 33,
        },
        {
          label: "Item 55",
          weight: 10,
          value: 25,
        },
        {
          label: "Item 56",
          weight: 5,
          value: 15,
        },
        {
          label: "Item 57",
          weight: 22,
          value: 49,
        },
        {
          label: "Item 58",
          weight: 3,
          value: 9,
        },
        {
          label: "Item 59",
          weight: 18,
          value: 41,
        },
        {
          label: "Item 60",
          weight: 25,
          value: 54,
        },
        {
          label: "Item 61",
          weight: 10,
          value: 28,
        },
        {
          label: "Item 62",
          weight: 12,
          value: 33,
        },
        {
          label: "Item 63",
          weight: 5,
          value: 18,
        },
        {
          label: "Item 64",
          weight: 8,
          value: 23,
        },
        {
          label: "Item 65",
          weight: 15,
          value: 38,
        },
        {
          label: "Item 66",
          weight: 20,
          value: 48,
        },
        {
          label: "Item 67",
          weight: 6,
          value: 21,
        },
        {
          label: "Item 68",
          weight: 11,
          value: 31,
        },
        {
          label: "Item 69",
          weight: 13,
          value: 35,
        },
        {
          label: "Item 70",
          weight: 4,
          value: 15,
        },
        {
          label: "Item 71",
          weight: 7,
          value: 23,
        },
        {
          label: "Item 72",
          weight: 16,
          value: 43,
        },
        {
          label: "Item 73",
          weight: 9,
          value: 27,
        },
        {
          label: "Item 74",
          weight: 14,
          value: 37,
        },
        {
          label: "Item 75",
          weight: 10,
          value: 29,
        },
        {
          label: "Item 76",
          weight: 5,
          value: 19,
        },
        {
          label: "Item 77",
          weight: 22,
          value: 53,
        },
        {
          label: "Item 78",
          weight: 3,
          value: 13,
        },
        {
          label: "Item 79",
          weight: 18,
          value: 45,
        },
        {
          label: "Item 80",
          weight: 25,
          value: 58,
        },
        {
          label: "Item 81",
          weight: 10,
          value: 27,
        },
        { label: "Item 82", weight: 12, value: 32 },
        { label: "Item 83", weight: 5, value: 17 },
        { label: "Item 84", weight: 8, value: 22 },
        { label: "Item 85", weight: 15, value: 37 },
        { label: "Item 86", weight: 20, value: 47 },
        { label: "Item 87", weight: 6, value: 20 },
        { label: "Item 88", weight: 11, value: 30 },
        { label: "Item 89", weight: 13, value: 34 },
        { label: "Item 90", weight: 4, value: 14 },
        { label: "Item 91", weight: 7, value: 22 },
        { label: "Item 92", weight: 16, value: 42 },
        { label: "Item 93", weight: 9, value: 26 },
        { label: "Item 94", weight: 14, value: 36 },
        { label: "Item 95", weight: 10, value: 28 },
        { label: "Item 96", weight: 5, value: 18 },
        { label: "Item 97", weight: 22, value: 52 },
        { label: "Item 98", weight: 3, value: 12 },
        { label: "Item 99", weight: 18, value: 44 },
        { label: "Item 100", weight: 25, value: 57 },
      ],
    },
  ],
};
