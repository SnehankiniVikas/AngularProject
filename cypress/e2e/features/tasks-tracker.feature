Feature: Tasks Tracker
  As a user
  I want to manage tasks and inspections
  So that I can track property inspections and related tasks

  Background:
    Given I am on the tasks tracker page

  Scenario: View pending tasks
    When I click on the "PENDING" tab
    Then I should see a list of pending tasks
    And each task should have a title and date

  Scenario: View completed tasks
    When I click on the "COMPLETED" tab
    Then I should see a list of completed tasks
    And each task should have a title and completion date

  Scenario: Upload inspection form
    Given I am on the pending tasks tab
    When I expand a task with title "Annual Inspection Upload 2025"
    And I click the "UPLOAD" button for "Upload Annual Inspection Form (MBA Form)"
    And I select a valid Excel file
    Then I should see the file details
    And the "RELEASE TO FM" button should be enabled if all required files are uploaded

  Scenario: Release task to Freddie Mac
    Given I am on the pending tasks tab
    And I have uploaded all required files for "Annual Inspection Upload 2025"
    When I click the "RELEASE TO FM" button
    And I confirm the release
    Then the task should move to the completed tab
    And I should see a success message

  Scenario: View inspection tracker
    When I look at the inspection tracker
    Then I should see a timeline of inspections
    And each inspection should show its status and dates