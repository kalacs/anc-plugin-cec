const cecHandler = require("./lib/cec-client")();

process.on("SIGINT", destroy);
process.on("SIGTERM", destroy);

(() => {
  cecHandler.init();
})();

function destroy() {
  cecHandler.destroy();
}
