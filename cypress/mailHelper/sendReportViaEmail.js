import { getTestStatus } from './customReport.js'; 
import path from 'path';
import { sendEmail } from './emailSender.js';
import { config } from "dotenv";

config();

const reportDir = 'cypress/results';
const reportFilename = 'mochawesome.json'; 
const reportPath = path.join(reportDir, reportFilename);

getTestStatus(reportPath)
  .then(({ totalTests, totalPassed, totalFailed, summaryTable }) => {
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
    sendEmail(process.env.TO_RECEPIENTS, 'anshuc3dual@gmail.com', 'Test Report', emailBody, [reportPath]) 
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
