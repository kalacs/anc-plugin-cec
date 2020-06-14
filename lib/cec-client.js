const CecController = require("cec-controller");
const { exec } = require("child_process");
const log = require("debug")("anc-plugin-cec");

module.exports = function ({ tvId = "dev0", keymap = new Map() } = {}) {
  let cecCtl = new CecController();
  const keypressHandler = createKeypressHandler(keymap);
  const readyHandler = createReadyHandler(cecCtl, keypressHandler);
  return {
    init() {
      cecCtl.on("ready", readyHandler);
      cecCtl.on("error", errorHandler);
    },
    destroy() {
      cecCtl.removeListener("ready", readyHandler);
      cecCtl.removeListener("error", errorHandler);
      cecCtl.removeListener("keypress", keypressHandler);
      cecCtl.closeClient();
      cecCtl = null;
    },
  };
};

function createReadyHandler(cecCtl, onKeypress) {
  return function readyHandler() {
    log("Turning ON TV...");

    cecCtl.on("keypress", onKeypress);
  };
}

function createKeypressHandler(keymap) {
  return function keypressHandler(keyName) {
    log(`User pressed: ${keyName}`);

    if (!keymap.has(keyName)) {
      log(`No mapping for this key: ${keyName}`);
    }

    exec(`xdotool key "${keymap.get(keyName)}"`);
  };
}

function errorHandler(error) {
  log(`Cec-controller error: ${error.message}`);
}
