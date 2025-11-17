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
  const items = table.data().toArray();
  const capacity = document.querySelector("#capacity").value;

  eel.start({
    max_iteration,
    initial_temperature,
    cooling_factor,
    capacity,
    items,
    is_log_cooling,
  });

  disableButton(startBtn, true);
  disableButton(stopBtn, false);
  disableButton(closeDialogBtn, true);

  searchingProgress = null;
  updateTimeout = setInterval(updateGUI, 90);
  dialog.showModal();
}

function stopOptimization() {
  console.log("SA stopped");
  eel.stop();
  disableButton(startBtn, false);
  disableButton(stopBtn, true);
  disableButton(closeDialogBtn, false);
  clearInterval(updateTimeout);
}

function progress(progress) {
  console.log("progress:", progress);
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
    if (status == -1) {
      disableButton(startBtn, false);
      disableButton(stopBtn, true);
      disableButton(closeDialogBtn, false);
      clearInterval(updateTimeout);
    }
  }
}

//global dom elements
let startBtn,
  stopBtn,
  dialog,
  bestStateDisplay,
  currentStateDisplay,
  iterDisplay,
  itemsSummaryTable;

$(document).ready(function () {
  dialog = document.getElementById("myDialog");
  startBtn = document.querySelector("#start-btn");
  stopBtn = document.querySelector("#stop-btn");
  closeDialogBtn = document.querySelector("#closeDialogButton");
  bestStateDisplay = document.querySelector("#best-display");
  currentStateDisplay = document.querySelector("#current-display");
  iterDisplay = document.querySelector("#iter-display");
  itemsSummaryTable = document.querySelector("#best-items-summary-container");
  disableButton(startBtn, false);
  disableButton(stopBtn, true);
  disableButton(closeDialogBtn, false);
  itemsSummaryTable.innerHTML = generateScrollableTableHTML([]);
  generateKnapsackItems();
});
