Feature: Home page

  @selenium
  Scenario: Viewing application's about page
    Given I am on the about page
    Then I should be able to see the "About the Website"