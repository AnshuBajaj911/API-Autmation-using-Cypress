import { USERS_API, TODOS_API } from '../support/constants/constants.js';
import { isFanCodeCity, generateSummaryTable } from '../support/helpers/fanCodeHelper.js';

describe('FanCode City Users Todo Completion', () => {
  const userCompletionData = [];

  it('All FanCode users should have completed more than 50% of their todos', () => {
    cy.request(USERS_API).then(response => {
      const users = response.body;
      cy.task('log', `Fetched Users: ${JSON.stringify(users)}`);

      const fanCodeUsers = users.filter(isFanCodeCity);
      cy.task('log', `Filtered FanCode Users: ${JSON.stringify(fanCodeUsers)}`);

      const requests = fanCodeUsers.map(user => {
        return cy.request(`${TODOS_API}?userId=${user.id}`).then(todoResponse => {
          const todos = todoResponse.body;
          const completedTasks = todos.filter(todo => todo.completed).length;
          const completedPercentage = (completedTasks / todos.length) * 100;

          userCompletionData.push({
            name: user.name,
            completedTasks,
            totalTasks: todos.length,
            completedPercentage
          });

          cy.task('log', `User: ${user.name}, Completed Tasks: ${completedTasks}, Total Tasks: ${todos.length}, Completion Percentage: ${completedPercentage}%`);
          expect(completedPercentage).to.be.greaterThan(50);
        });
      });

      return Cypress.Promise.all(requests);
    }).then(() => {
      const summaryTable = generateSummaryTable(userCompletionData);

      // Write the summary table to a JSON file
      cy.task('writeSummaryTable', summaryTable).then(() => {
        cy.task('log', 'Summary table written to file successfully.');
      });
    });
  });
});
