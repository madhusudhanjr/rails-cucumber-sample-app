Feature: Verify exchange rate

  @selenium
  Scenario: Verify exchange rate with valid input and output currency
    Given I am on the XE page
    Then I should be able to see the "XE Currency Converter"
    When I enter amount
    And I select input currency as euro
    And I select output currency as dollar
    And I click on submit
    Then I should be able to see the exchange rate "XE Currency Converter: USD to EUR"
	