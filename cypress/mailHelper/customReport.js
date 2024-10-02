import fs from "fs/promises";

export async function getTestStatus(reportPath) {
  try {
    // Read the Mochawesome report data
    const data = await fs.readFile(reportPath, "utf-8");
    const json = JSON.parse(data);

    // Extract total tests, passed, and failed
    const totalTests = json.stats.testsRegistered;
    const totalPassed = json.stats.passes;
    const totalFailed = json.stats.failures;

    // Read the summary table from the JSON file
    let summaryTable = "";
    try {
      const summaryData = await fs.readFile(
        "cypress/results/summaryTable.json",
        "utf-8"
      );
      const summaryJson = JSON.parse(summaryData);
      summaryTable = summaryJson.summaryTable.summaryTable || ""; // Get summary table if available
    } catch (error) {
      console.error("Error reading summary table:", error);
    }

    return {
      totalTests,
      totalPassed,
      totalFailed,
      summaryTable, // Include summary table in the return object
    };
  } catch (error) {
    console.error("Error reading report:", error);
    throw error;
  }
}
