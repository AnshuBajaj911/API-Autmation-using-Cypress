const { defineConfig } = require("cypress");
const fs = require("fs/promises"); // Import fs for file operations

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/integration/**/*.spec.js", // Pattern for spec files
    baseUrl: "http://jsonplaceholder.typicode.com", // Base URL for API requests
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on("task", {
        log(message) {
          console.log(message); // Custom logging task
          return null;
        },

        // Task to write the summary table to a JSON file
        writeSummaryTable(summaryTable) {
          return fs.writeFile('cypress/results/summaryTable.json', JSON.stringify({ summaryTable: summaryTable }, null, 2))
            .then(() => null) // Indicate successful write
            .catch((error) => {
              console.error('Error writing summary table:', error);
              throw error; // Propagate the error
            });
        },        
      });
    },
  },

  // Reporter configuration for generating test reports
  reporters: {
    mochawesome: {
      reportDir: "cypress/results", // Directory to store test results
      overwrite: false, // Don't overwrite existing reports
      html: false, // Disable HTML report generation
      json: true, // Enable JSON report generation
    },
  },

  // Disable video and screenshot capturing
  video: false,
  screenshot: false,
});
