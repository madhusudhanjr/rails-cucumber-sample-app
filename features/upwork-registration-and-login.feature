Feature: Upwork_Registration
	
  @selenium
  Scenario: Validation message verification Registration on Upwork

	Given I open Upwork website
	And I click on Signup link
	Then I should be able to see Hire and Work buttons
	And I click on Hire button
	When I click on Get Started button
	Then I should be able to see validation error messages

  @selenium
  Scenario: Unsuccessfull Registration on Upwork

    Given I open Upwork website
	And I click on Signup link
	Then I should be able to see Hire and Work buttons
	And I click on Hire button
	Then I fill the Registration fields only first name
	When I click on Get Started button
	Then I should be able to Resister and login with success message
  
  
  @selenium
  Scenario: Successfull Registration on Upwork

    Given I open Upwork website
	And I click on Signup link
	Then I should be able to see Hire and Work buttons
	And I click on Hire button
	Then I fill the Registration fields
	When I click on Get Started button
	Then I should be able to Resister and login with success message

  
