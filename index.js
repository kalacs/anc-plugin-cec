const keymap = require("./keymap.json");
const cecHandler = require("./lib/cec-client")({
  keymap: new Map(Object.entries(keymap)),
});

process.on("SIGINT", destroy);
process.on("SIGTERM", destroy);

(() => {
  cecHandler.init();
})();

function destroy() {
  cecHandler.destroy();
}
