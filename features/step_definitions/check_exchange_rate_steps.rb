
Given(/^I am on the XE page$/) do
  visit "http://www.xe.com/"
end

When(/^I enter amount$/) do
  fill_in "amount", with: "10"
end

And(/^I select input currency$/) do
  fill_in "from", with: "EUR - Euro"
end

And(/^I select output currency$/) do
  fill_in "to", with: "USD - US Dollar"
end

And(/^I click on submit$/) do
 page.find(:css, ".gobtn-svg-wrap a").click
end

Then(/^I should be able to see the exchange rate "(.*?)"$/) do |exchange_rate|
  assert page.has_content?(exchange_rate)
end
