function showErrorDialog(message) {
  const dialog = document.getElementById("error-dialog");
  const messageContent = document.getElementById("error-message-content");
  messageContent.innerText = message;
  dialog.showModal();
}

function hideErrorDialog() {
  const dialog = document.getElementById("error-dialog");
  dialog.close();
}
