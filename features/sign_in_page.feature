Feature: Sign In page

  @selenium
  @no-database-cleaner
  Scenario: Sign in a valid user
    Given I am on the sign in page
    Then I should be able to see the sign in form
    And I fill valid sign in details
    And I click on sign in button
    Then I should be able to see successful sign in message as "Signed in successfully."

  @selenium
  @no-database-cleaner
  Scenario: Validation aginst invalid user
    Given I am on the sign in page
    Then I should be able to see the sign in form
    And I fill invalid sign in details
    And I click on sign in button
    Then I should be able to see error message as "Invalid Email or password."

  @selenium
  @no-database-cleaner
  Scenario: Sign out valid user
    Given I am on the sign in page
    Then I should be able to see the sign in form
    And I fill valid sign in details
    And I click on sign in button
    Then I should be able to see successful sign in message as "Signed in successfully."
    And I click on Sign out link
    Then I should be able to see successful sign out message as "Signed out successfully."