# features/step_definitions/home_page_steps.rb

Given(/^I am on the homepage$/) do
  visit root_path
end

Then(/^I should be able to see the "(.*?)"$/) do |title|
  page.has_content?(title)
end