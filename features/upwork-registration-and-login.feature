Feature: Upwork_Registration

  @selenium
  @record_scenario
  Scenario: valid Registration on Upwork

    Given I open Upwork website
	And I click on Signup link
	Then I should be able to see Hire and Work buttons
	And I click on Hire button
	Then I fill the Registration fields
	When I click on Get Started button
	Then I should be able to Resister and login with success message

  @selenium
  Scenario: invalid Registration on Upwork

	Given I open Upwork website
	And I click on Signup link
	Then I should be able to see Hire and Work buttons
	And I click on Hire button
	When I click on Get Started button
	Then I should be able to see validation error messages
  
