
Given(/^I open Upwork website$/) do
  visit "http://www.upwork.com"
end

And(/^I click on Signup link$/) do
  begin
    page.find_by_id("signup").click
  rescue Capybara::ElementNotFound => e
    Rails.logger.debug "#{e.backtrace.join("\n\t")}"
  end
end

Then(/^I should be able to see Hire and Work buttons$/) do
  begin
    assert page.has_content?("Hire")
    assert page.has_content?("Work")
  rescue Minitest::Assertion => e
    Rails.logger.debug "#{e.backtrace.join("\n\t")}"
  end
end

And(/^I click on Hire button$/) do
  find_element(:xpath, ".//*[@id='layout']/div[4]/div/div[4]/div[1]/a", true)
  @element.click
end

Then(/^I fill the Registration fields$/) do
  begin
    find_element(:xpath, "//*[contains(@id,'firstName_')]", true)
    if @element.present?
      @element.set("John")
    end
    fill_in "lastName", with: "Snow"
    fill_in "companyName", with: "Game of thrones"
    fill_in "email", with: Faker::Internet.email
    fill_in "password", with: "John@123"
    all(".checkbox-replacement-helper")[1].click
  rescue Capybara::ElementNotFound => e
    Rails.logger.debug "#{e.backtrace.join("\n\t")}"
  end
end

When(/^I click on Get Started button$/) do
  begin
    click_button("Get Started")
  rescue Capybara::ElementNotFound => e
    Rails.logger.debug "#{e.backtrace.join("\n\t")}"
  end
end

Then(/^I should be able to Resister and login with success message$/) do
  begin
    assert page.has_content?("Your account has been successfully created. Redirecting you...")
  rescue Minitest::Assertion => e
    Rails.logger.debug "#{e.backtrace.join("\n\t")}"
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
    Rails.logger.debug "#{e.backtrace.join("\n\t")}"
  end
end
