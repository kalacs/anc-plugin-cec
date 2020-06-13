const CecController = require("cec-controller");
const { exec } = require("child_process");
const log = require("debug")("anc-plugin-cec");

module.exports = function ({ tvId = "dev0", keymap = new Map() } = {}) {
  let cecCtl = new CecController();
  return {
    init() {
      cecCtl.on("ready", readyHandler);
      cecCtl.on("error", errorHandler);
    },
    destroy() {
      cecCtl.removeListener("ready", readyHandler);
      cecCtl.removeListener("error", errorHandler);
      cecCtl = null;
    },
  };
};

function readyHandler(controller) {
  log("Turning ON TV...");

  cecCtl.on("keypress", (keyName) => {
    log(`User pressed: ${keyName}`);

    if (!keymap.has(keyName)) {
      log(`No mapping for this key: ${keyName}`);
    }

    exec(`xdotool key "${keymap.get(keyName)}"`);
  });
}
function errorHandler(error) {
  log(`Cec-controller error: ${error.message}`);
}
