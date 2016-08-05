require 'csv'
require 'spreadsheet'
Spreadsheet.client_encoding = 'UTF-8'

Given(/^I am on the sign up page$/) do
  visit new_user_registration_path
end

Then(/^I should be able to see the sign up form$/) do
  page.has_content?("Sign up")
end

And(/^I fill in the form details$/) do

  # Below code is for CSV files
  # @data = []
  # CSV.foreach("#{Rails.root}/public/sample_data.csv", headers: true) do |row|
  #   @data << row.to_hash
  # end
  
  # Below code to use microsoft excel spredsheets
  headers = nil
  begin
    Spreadsheet.open "#{Rails.root}/public/sample_data.xls" do |book|        
      book.worksheet(0).each_with_index do |row, i|
        if i == 0
          headers = row
          next
        end
        row_hash = HashWithIndifferentAccess.new
        row.each_with_index { |value, j| row_hash[headers[j]] = value }
        row_hash.each do |key, value|
          if key.strip == "name"
            @username = value
          elsif key.strip == "email"
            @email = value
          end
        end
      end
    end
  rescue => e
    Rails.logger.info "error in import xlx massage is #{e}"
  end

  # @username = Faker::Internet.user_name
  # @email = Faker::Internet.email

  # @username = @data.first["name"]
  # @email = @data.first["email"]

  fill_in "user_name", with: @username
  fill_in "user_email", with: @email
  fill_in "user_password", with: 12345678
  fill_in "user_password_confirmation", with: 12345678
end

And(/^I click on sign up button$/) do
  click_button("Sign up")
end

Then(/^I should be able to see successful sign up message as "(.*?)"$/) do |sign_up_success_message|
  assert page.has_content?(sign_up_success_message)
end

Then(/^I should be able to see email vaildation error message as "(.*?)"$/) do |email_validation_error_message|
  assert page.has_content?(email_validation_error_message)
end

Then(/^I should be able to see password vaildation error message as "(.*?)"$/) do |password_validation_error_message|
  assert page.has_content?(password_validation_error_message)
end
