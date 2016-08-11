Feature: Download values to Excel
 
@selenium
  Scenario: Download values to Excel
    Given I visit the BSE stock exchange page
    And I click on S&P BSE SENSEX link
    Then I should be able to see "S&P BSE SENSEX"
    When I click on more link
	When I click on download icon of CSV File
	And I should be able to see file is downloaded
    And I should be able to verify downloaded spreadsheet table headers "Security Code" and "Security Name" with the webtable headers
    Then I should be able to validate data with web table
