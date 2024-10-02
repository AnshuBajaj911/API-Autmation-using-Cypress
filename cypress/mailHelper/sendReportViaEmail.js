import { getTestStatus } from './customReport.js'; // Adjust the path as necessary
import path from 'path';
import { sendEmail } from './emailSender.js';
import { config } from "dotenv";

config();

// After your Cypress tests run (in a separate script or at the end of your test file)
const reportDir = 'cypress/results';
const reportFilename = 'mochawesome.json'; // Change to your report filename if different
const reportPath = path.join(reportDir, reportFilename);

// Call the getTestStatus function
getTestStatus(reportPath)
  .then(({ totalTests, totalPassed, totalFailed, summaryTable }) => {
    // Now you can use these values to send your email
    console.log(`Total Tests: ${totalTests}, Total Passed: ${totalPassed}, Total Failed: ${totalFailed}`);

    // Prepare the email body with the test results
    const emailBody = `
      <h1>Test Report Summary</h1>
      <p>Total Tests: ${totalTests}</p>
      <p>Total Passed: ${totalPassed}</p>
      <p>Total Failed: ${totalFailed}</p>
      ${summaryTable}
    `;

    // Call the sendEmail function with the report
    sendEmail(process.env.TO_RECEPIENTS, 'anshuc3dual@gmail.com', 'Test Report', emailBody, [reportPath]) // Adjust recipient as needed
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error.message);
      });
  })
  .catch(error => {
    console.error(error.message);
  });
