# FanCode Assignment

## Overview

This project is an automation assignment for checking the completion status of todos for users from FanCode City. It utilizes Cypress for end-to-end testing and Nodemailer to send email reports of the test results.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup Email Credentials](#setup-email-credentials)
- [Running Tests](#running-tests)
- [Scripts](#scripts)

## Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- **npm**: This is included with Node.js.

## Installation

1. Clone the repository to your local machine:

   - ***git clone https://github.com/AnshuBajaj911/API-Autmation-using-Cypress***
   - ***cd fancode-assignment***
  

2. Install the required dependencies:

   - ***npm install***
   - ***npm install cypress --save-dev*** (For Safe Side command to install cypress has been added)

## Setup Email Credentials

   To send email reports, you need to configure your email credentials:
   Create a .env file in the root directory of the project if it doesn’t exist.
   Add your Outlook email credentials and the recipient email in the .env file:

   - ***USERNAME=your_email@domain.com***
   - ***PASSWORD=your_password***
   - ***TO_RECEPIENTS=recipient_email@domain.com***

Important: If you do not fill out the .env file, you will need to run the tests without emailing the reports.

## Running Tests
   **Option 1: With Email Reports**
   If you have configured the .env file with your email credentials, run the following command to execute the tests and send the email report:

   ***npm run fancodeAssignment***

   **Option 2: Without Email Reports**
   If you choose not to set up the email credentials, run the tests without sending an email report using:

   ***npm run test***

## Scripts
   - **npm run test**: Runs the Cypress tests and generates a Mochawesome report. No email will be sent.
   - **npm run fancodeAssignment**: Runs the tests and sends the email report if the .env file is properly configured.
