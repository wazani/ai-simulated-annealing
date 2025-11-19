updateTimeout = null;
searchingProgress = null;

eel.expose(progress);

function disableButton(btn, status) {
  if (status) {
    btn.setAttribute("disabled", "");
    btn.classList.add("cursor-not-allowed");
  } else {
    btn.removeAttribute("disabled", "");
    btn.classList.remove("cursor-not-allowed");
  }
}

function closeDialog() {
  dialog.close();
  clearDialog();
}

function clearDialog() {
  updateState(iterDisplay, "-", "-");
  updateState(currentStateDisplay, "-", "-");
  updateState(bestStateDisplay, "-", "-");
  itemsSummaryTable.innerHTML = generateScrollableTableHTML([]);
  searchingProgress = null;
}

function startOptimization() {
  console.log("SA Started");
  const max_iteration = document.querySelector("#max_iter").value;
  const initial_temperature = document.querySelector("#initial_temp").value;
  const cooling_factor = document.querySelector("#cooling_factor").value;
  const is_log_cooling =
    document.querySelector('input[name="cooling-schedule"]:checked').value ==
    "logarithmic";
  const is_objective =
    document.querySelector('input[name="successor-function"]:checked').value ==
    "objective";
  const items = readDataFromTable();
  const capacity = document.querySelector("#capacity").value;

  eel.start({
    max_iteration,
    initial_temperature,
    cooling_factor,
    capacity,
    items,
    is_log_cooling,
    is_objective,
  });

  clearDialog();

  disableButton(startBtn, true);
  disableButton(retryBtn, true);
  disableButton(stopBtn, false);
  disableButton(closeDialogBtn, true);

  searchingProgress = null;
  updateTimeout = setInterval(updateGUI, 90);
  updateConfigSummary(
    max_iteration,
    initial_temperature,
    cooling_factor,
    capacity,
    is_log_cooling,
    is_objective
  );
  updateProgressMessage(true, "Sending");
  dialog.showModal();
}

function updateProgressMessage(spin, msg) {
  progressStatusMsg.innerHTML = msg;
  if (spin) {
    progressStatusSpinner.classList.remove("hidden");
  } else {
    progressStatusSpinner.classList.add("hidden");
  }
}

function updateConfigSummary(
  max_iteration,
  initial_temperature,
  cooling_factor,
  capacity,
  is_log_cooling,
  is_objective
) {
  const data = {
    capacity: capacity,
    "Max Iter.": max_iteration,
    "Initial Temp.": initial_temperature,
    Cooling: is_log_cooling ? "Algorithmic " : "Geometric",
    Successor: is_objective ? "Objective" : "Random",
    Factor: cooling_factor,
  };

  let dataItemsHTML = "";

  for (const [label, value] of Object.entries(data)) {
    dataItemsHTML += `<div class="p-2 bg-gray-50 border border-gray-200 rounded shadow">
                <p class="text-xs font-medium text-gray-500">${label}</p>
                <p class="text-sm font-semibold text-gray-900">${value}</p>
            </div>`;
  }

  document.querySelector(".run-configs").innerHTML = dataItemsHTML;
}

function stopOptimization() {
  console.log("SA stopped");
  eel.stop();
  uiStop();
}

function uiStop() {
  disableButton(startBtn, false);
  disableButton(retryBtn, false);
  disableButton(stopBtn, true);
  disableButton(closeDialogBtn, false);
  clearInterval(updateTimeout);
  updateProgressMessage(false, "Finished");
}

function progress(progress) {
  //console.log("progress:", progress);
  if (progress.i < 0) {
    uiStop();
    closeDialog();
    showErrorDialog(
      progress.message || "An Error occurred, Please check logs and try again"
    );
  }
  searchingProgress = progress;
}

function updateState(stateDiv, value, weight) {
  stateDiv.querySelector(".value").innerHTML = value;
  stateDiv.querySelector(".weight").innerHTML = weight;
}

function updateGUI() {
  if (searchingProgress) {
    const { i, current_temp, current_state, best_state, status } =
      searchingProgress;
    updateState(
      iterDisplay,
      `${Math.round(current_temp * 100) / 100} &#8451;`,
      i
    );
    updateState(
      currentStateDisplay,
      `$${current_state.value}`,
      `${current_state.weight}kg`
    );
    updateState(
      bestStateDisplay,
      `$${best_state.value}`,
      `${best_state.weight}kg`
    );
    itemsSummaryTable.innerHTML = generateScrollableTableHTML(best_state.items);
    updateProgressMessage(true, "Optimizing");

    if (status == -1) {
      disableButton(startBtn, false);
      disableButton(retryBtn, false);
      disableButton(stopBtn, true);
      disableButton(closeDialogBtn, false);
      clearInterval(updateTimeout);
      updateProgressMessage(false, "Finished");
    }
  }
}

function handleCoolingMethodChange(radio) {
  const coolingFactorInput = document.querySelector("#cooling_factor");
  if (radio.value === "logarithmic") {
    coolingFactorInput.value = 0.001;
  } else {
    coolingFactorInput.value = 0.99;
  }
}

function preventDialogFromClose() {
  document.addEventListener("keydown", (event) => {
    if (dialog && dialog.open) {
      if (event.key === "Escape") {
        event.preventDefault();
      }
    }
  });
}

//global dom elements
let startBtn,
  stopBtn,
  retryBtn,
  dialog,
  bestStateDisplay,
  currentStateDisplay,
  iterDisplay,
  itemsSummaryTable,
  progressStatusMsg,
  progressStatusSpinner;

document.addEventListener("DOMContentLoaded", () => {
  dialog = document.getElementById("myDialog");
  startBtn = document.querySelector("#start-btn");
  retryBtn = document.querySelector("#retry-btn");
  stopBtn = document.querySelector("#stop-btn");
  closeDialogBtn = document.querySelector("#closeDialogButton");
  bestStateDisplay = document.querySelector("#best-display");
  currentStateDisplay = document.querySelector("#current-display");
  iterDisplay = document.querySelector("#iter-display");
  itemsSummaryTable = document.querySelector("#best-items-summary-container");
  progressStatusMsg = document.querySelector(".progress-status");
  progressStatusSpinner = document.querySelector(".progress-status-spinner");
  disableButton(startBtn, false);
  disableButton(retryBtn, false);
  disableButton(stopBtn, true);
  disableButton(closeDialogBtn, false);
  itemsSummaryTable.innerHTML = generateScrollableTableHTML([]);
  generateKnapsackItems();
  preventDialogFromClose();
});
