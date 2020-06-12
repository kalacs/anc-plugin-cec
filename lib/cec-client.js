const CecController = require("cec-controller");
const { exec } = require("child_process");
const log = require("debug")("anc-plugin-cec");

module.exports = function ({ tvId = "dev0", keymap } = {}) {
  return {
    init() {
      const cecCtl = new CecController();
      cecCtl.on("ready", readyHandler);
      cecCtl.on("error", errorHandler);
    },
    destroy() {
      cecCtl.removeListener("ready", readyHandler);
      cecCtl.removeListener("error", errorHandler);
    },
  };
};

function readyHandler(controller) {
  log("Turning ON TV...");
  cecCtl.on("keypress", (keyName) => {
    log(`User pressed: ${keyName}`);
    exec(`xdotool key "${keyName.charAt(0).toUpperCase() + keyName.slice(1)}"`);
  });
}
function errorHandler(error) {
  log(`Cec-controller error: ${error.message}`);
}
