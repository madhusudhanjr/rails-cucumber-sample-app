Feature: Exchange rate page

  @selenium
  Scenario: Viewing XE page
    Given I am on the XE page
    Then I should be able to see the "XE Currency Converter"
    When I enter amount
    And I select input currency
    And I select output currency
    And I click on submit
    Then I should be able to see the exchange rate "XE Currency Converter: USD to EUR"