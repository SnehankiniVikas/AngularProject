import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the tasks tracker page', () => {
  cy.visit('/');
  cy.get('.tab-button').contains('TASKS & TRACKER').click();
});

When('I click on the {string} tab', (tabName: string) => {
  cy.get('.tab-button').contains(tabName).click();
});

Then('I should see a list of pending tasks', () => {
  cy.get('.accordion-item').should('exist');
});

Then('each task should have a title and date', () => {
  cy.get('.accordion-item').each(($task) => {
    cy.wrap($task).find('.accordion-title').should('exist');
    cy.wrap($task).find('.posted-column').should('exist');
  });
});

Then('I should see a list of completed tasks', () => {
  cy.get('.task-item').should('exist');
});

Then('each task should have a title and completion date', () => {
  cy.get('.task-item').each(($task) => {
    cy.wrap($task).find('.task-title').should('exist');
    cy.wrap($task).find('.posted-date').should('exist');
  });
});

Given('I am on the pending tasks tab', () => {
  cy.get('.tab-button').contains('PENDING').click();
});

When('I expand a task with title {string}', (title: string) => {
  cy.get('.accordion-title').contains(title).click();
});

When('I click the "UPLOAD" button for {string}', (subtaskTitle: string) => {
  cy.get('.subtask-title')
    .contains(subtaskTitle)
    .parents('.subtask-content')
    .find('.btn-upload')
    .click();
});

When('I select a valid Excel file', () => {
  cy.fixture('test.xlsx', 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName: 'test.xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
    });
});

Then('I should see the file details', () => {
  cy.get('.selected-file').should('exist');
  cy.get('.file-name').should('exist');
  cy.get('.file-meta').should('exist');
});

Then('the "RELEASE TO FM" button should be enabled if all required files are uploaded', () => {
  cy.get('.btn-release').should('not.be.disabled');
});

Given('I have uploaded all required files for {string}', (taskTitle: string) => {
  // Implementation depends on the application's state management
  // This is a placeholder that should be implemented based on the actual application
});

When('I click the "RELEASE TO FM" button', () => {
  cy.get('.btn-release').click();
});

When('I confirm the release', () => {
  cy.get('.confirm-button').click();
});

Then('the task should move to the completed tab', () => {
  cy.get('.tab-button').contains('COMPLETED').click();
  cy.get('.task-item').should('exist');
});

Then('I should see a success message', () => {
  cy.contains('Task has been successfully released to FM').should('be.visible');
});

When('I look at the inspection tracker', () => {
  cy.get('app-inspection-tracker').should('exist');
});

Then('I should see a timeline of inspections', () => {
  cy.get('.timeline').should('exist');
  cy.get('.timeline-item').should('have.length.at.least', 1);
});

Then('each inspection should show its status and dates', () => {
  cy.get('.timeline-item').each(($item) => {
    cy.wrap($item).find('.timeline-marker').should('exist');
    cy.wrap($item).find('.timeline-content').should('exist');
    cy.wrap($item).find('.date').should('exist');
  });
});