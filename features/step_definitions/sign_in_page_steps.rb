Given(/^I am on the sign in page$/) do
  visit new_user_session_path
end

Then(/^I should be able to see the sign in form$/) do
  page.has_content?("Sign in")
end

And(/^I fill valid sign in details$/) do
  @username = Faker::Internet.user_name
  @email = Faker::Internet.email
  @user = User.create(email: @email, name: @username, password: 12345678, password_confirmation: 12345678)
  fill_in "user_email", with: @user.email
  fill_in "user_password", with: 12345678
end

And(/^I click on sign in button$/) do
  click_button("Sign in")
end

Then(/^I should be able to see successful sign in message as "(.*?)"$/) do |sign_in_success_message|
  assert page.has_content?(sign_in_success_message)
end

And(/^I fill invalid sign in details$/) do
  @username = Faker::Internet.user_name
  @email = Faker::Internet.email
  @user = User.create(email: @email, name: @username, password: 12345678, password_confirmation: 12345678)
  fill_in "user_email", with: @user.email
  fill_in "user_password", with: 1234567891
end

Then(/^I should be able to see error message as "(.*?)"$/) do |sign_in_error_message|
  assert page.has_content?(sign_in_error_message)
end

And(/^I click on Sign out link$/) do
  click_link("Sign out")
end

Then(/^I should be able to see successful sign out message as "(.*?)"$/) do |sign_out_success_message|
  assert page.has_content?(sign_out_success_message)
end
