const { ipcRenderer } = require("electron");
const output = document.getElementById("output");
const input = document.getElementById("input");

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const command = input.value;
    appendOutput("-> " + command);
    const result = await ipcRenderer.invoke("TerminalExec", command);
    if (result === "__CLEAR__") {
      output.textContent = "";
    } else {
      appendOutput(result);
    }
    input.value = "";
  }
});

function appendOutput(text) {
  output.textContent += text + "\n";
  output.scrollTop = output.scrollHeight;
}
