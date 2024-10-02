const {
  addMochawesomeReporter,
} = require("cypress-mochawesome-reporter/plugin");

module.exports = (on, config) => {
  addMochawesomeReporter(on);
  require("cypress-log-to-output").install(on);
};
