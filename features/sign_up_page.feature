Feature: Sign Up page

  @selenium
  @no-database-cleaner
  Scenario: sign up a valid user
    Given I am on the sign up page
    Then I should be able to see the sign up form
    And I fill in the form details
    And I click on sign up button
    Then I should be able to see successful sign up message as "Welcome! You have signed up successfully."

  @selenium
  @no-database-cleaner
  Scenario: Invalid user sign up
    Given I am on the sign up page
    Then I should be able to see the sign up form
    And I click on sign up button
    Then I should be able to see email vaildation error message as "Email can't be blank"
    Then I should be able to see password vaildation error message as "Password can't be blank"