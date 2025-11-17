let nextId = 1;
let table;

function updateTableData(items) {
  table.clear().rows.add(items).draw();
  nextId = items.length + 1;
}

$(document).ready(function () {
  table = $("#itemTable").DataTable({
    data: [],
    searching: false,
    sort: false,
    pageLength: 25,
    layout: {
      topEnd: $("<button>", {
        id: "addRowBtn",
        class: "add-new-btn",
        text: "+ Add New",
      })[0],
      topStart: { info: { text: "Available Items" } },
      bottomEnd: "paging",
      bottomStart: "pageLength",
    },
    columns: [
      {
        data: "label",
        render: function (data, type, row) {
          return `<input class="data-table-input p-2 border border-gray-300 rounded text-sm" type="text" value="${data}" data-field="label" id="label-${row.id}" data-id="${row.id}">`;
        },
      },
      {
        data: "weight",
        render: function (data, type, row) {
          return `<input class="data-table-input p-2 border border-gray-300 rounded text-sm" type="number" value="${data}" data-field="weight" id="weight-${row.id}" data-id="${row.id}">`;
        },
      },
      {
        data: "value",
        render: function (data, type, row) {
          return `<input class="data-table-input p-2 border border-gray-300 rounded text-sm" type="number" value="${data}" data-field="value" id="value-${row.id}" data-id="${row.id}">`;
        },
      },
      {
        data: null,
        defaultContent:
          '<button class="action-button delete-btn">Delete</button>',
        orderable: false,
      },
    ],
  });

  $("#itemTable tbody").on("input", "input", function () {
    const input = $(this);
    const value = input.val();
    const field = input.data("field");
    const row = table.row(input.closest("tr"));
    const rowData = row.data();

    rowData[field] = value;
  });

  $("#itemTable tbody").on("click", ".delete-btn", function () {
    table.row($(this).parents("tr")).remove().draw();
  });

  $("#addRowBtn").on("click", function () {
    const newData = Array.from(table.data());
    newData.unshift({
      id: nextId,
      label: "New Item",
      weight: 1,
      value: 1,
    });
    updateTableData(newData);
  });
});
