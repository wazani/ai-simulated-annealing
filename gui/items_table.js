let itemsGrid;

class ActionsCellRenderer {
  init(params) {
    this.params = params;
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = `<button class="delete-button delete-btn">Delete</button>`;
    this.deleteButton = this.eGui.querySelector(".delete-button");
    this.deleteButton.addEventListener("click", this.onDeleteClick.bind(this));
  }

  getGui() {
    return this.eGui;
  }

  onDeleteClick() {
    const record = this.params.data;
    const transaction = {
      remove: [record],
    };
    this.params.api.applyTransaction(transaction);
  }

  destroy() {
    if (this.deleteButton) {
      this.deleteButton.removeEventListener("click", this.onDeleteClick);
    }
  }
}

const columnDefs = [
  {
    headerName: "Label",
    field: "label",
    editable: true,
    flex: 1,
    cellEditor: "agTextCellEditor", // Standard text input for the label
  },
  {
    headerName: "Weight",
    field: "weight",
    editable: true,
    cellEditor: "agNumberCellEditor",
    flex: 1,
    valueFormatter: (params) =>
      params.value != null ? Number(params.value).toFixed(0) : "",
  },
  {
    headerName: "Value",
    field: "value",
    editable: true,
    cellEditor: "agNumberCellEditor",
    flex: 1,
    valueFormatter: (params) =>
      params.value != null ? `$${Number(params.value).toFixed(0)}` : "",
  },
  {
    headerName: "Actions",
    minWidth: 100,
    cellRenderer: ActionsCellRenderer,
    editable: false,
    sortable: false,
    filter: false,
    flex: 1,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const gridOptions = {
    columnDefs: columnDefs,
    rowData: [],
    domLayout: "auto",
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 30, 40],
    defaultColDef: {
      resizable: false,
      sortable: true,
      pagination: true,
      filter: true,
      suppressMovable: true,
      suppressMovableColumns: true,
      suppressDragLeaveHidesColumns: true,
    },
  };

  const gridDiv = document.querySelector("#items-grid");
  itemsGrid = new agGrid.createGrid(gridDiv, gridOptions);
});

function updateTableData(items) {
  itemsGrid.setGridOption("rowData", items);
  itemsGrid.sizeColumnsToFit();
}

function readDataFromTable() {
  //return itemsGrid.getGridOption("rowData");
  const rowData = [];
  itemsGrid.forEachNode(function (node) {
    rowData.push(node.data);
  });
  return rowData;
}

function addNewItem() {
  const transaction = {
    add: [{ label: "New item", weight: 1, value: 1 }],
    addIndex: 0,
  };
  itemsGrid.applyColumnState({
    defaultState: { sort: null },
  });
  itemsGrid.setFilterModel(null);
  itemsGrid.applyTransaction(transaction);
}

window.addEventListener("resize", () => {
  if (itemsGrid) {
    itemsGrid.sizeColumnsToFit();
  }
});
