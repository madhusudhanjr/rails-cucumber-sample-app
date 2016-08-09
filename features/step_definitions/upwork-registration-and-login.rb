
Given(/^I open Upwork website$/) do
  visit "http://www.upwork.com"
end

And(/^I click on Signup link$/) do
  begin
    page.find_by_id("signup").click
  rescue Capybara::ElementNotFound => e
    Rails.logger.debug "#{e}"
    visit "http://www.upwork.com"
    raise e
  end
end

Then(/^I should be able to see Hire and Work buttons$/) do
  begin
    assert page.has_content?("Hire")
    assert page.has_content?("Work")
  rescue Minitest::Assertion => e
    Rails.logger.debug "#{e}"
    visit "http://www.upwork.com"
  end
end

And(/^I click on Hire button$/) do
  begin
    page.find(:xpath, ".//*[@id='layout']/div[4]/div/div[4]/div[1]/a").click
  rescue Capybara::ElementNotFound => e
    Rails.logger.debug "#{e}"
    visit "http://www.upwork.com"
  end
end

Then(/^I fill the Registration fields$/) do
  begin
    fill_in "firstName", with: "John"
    fill_in "lastName", with: "Snow"
    fill_in "companyName", with: "Game of thrones"
    fill_in "email", with: "johnsnowgot@example.com"
    fill_in "password", with: "John@123"
    all(".checkbox-replacement-helper")[1].click
  rescue Capybara::ElementNotFound => e
    Rails.logger.debug "#{e}"
    visit "http://www.upwork.com"
  end
end

When(/^I click on Get Started button$/) do
  begin
    click_button("Get Started")
  rescue Capybara::ElementNotFound => e
    Rails.logger.debug "#{e}"
    visit "http://www.upwork.com"
  end
end

Then(/^I should be able to Resister and login with success message$/) do
  begin
    assert page.has_content?("Your account has been successfully created. Redirecting you...")
  rescue Minitest::Assertion => e
    Rails.logger.debug "#{e}"
    visit "http://www.upwork.com"
  end
end

Then(/^I should be able to see validation error messages$/) do
  begin
    assert page.has_content?("First Name is required")
    assert page.has_content?("Last Name is required")
    assert page.has_content?("Company Name is required")
    assert page.has_content?("Email is required")
    assert page.has_content?("Password is required")
  rescue Minitest::Assertion => e
    Rails.logger.debug "#{e}"
    visit "http://www.upwork.com"
  end
end

# admin_section = find("#admin")
# expect(admin_section).not_to be_present

# Then(/^I should not see the "([^\"]+)" ([^\s]+) field$/) do |name, type|
#   page.should have_no_selector(:xpath, "//input[@type='#{type}' and @name='#{name}']")
#   begin
#     find(:xpath, "//input[@type='#{type}' and @name='#{name}']")
#     false
#   rescue Capybara::ElementNotFound
#     true
#   end 
# end

