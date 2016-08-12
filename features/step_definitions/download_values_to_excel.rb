
Given(/^I visit the BSE stock exchange page$/) do
  visit "http://www.bseindia.com/"  
end

And(/^I click on S&P BSE SENSEX link$/) do
  first('#Ind1 > a').click
end

Then(/^I should be able to see "(.*?)"$/) do |label_text|
  assert page.has_content?(label_text)
end

When(/^I click on more link$/) do
  new_window = window_opened_by { first('.morediv2 > a').click }
  within_window new_window do
    page.driver.browser.manage.window.maximize
  end
end

When(/^I click on download icon of CSV File$/) do
  within_window(switch_to_window(windows.last)) do
    page.find("#ctl00_ContentPlaceHolder1_imgDownload").click
    sleep(5)
  end
end

And(/^I should be able to see file is downloaded$/) do
  @downloaded_file_contents = File.read("#{FileDownloadHelpers::PATH.to_s}/MarketWatch_#{Time.now.strftime("%d")}-00-#{Time.now.strftime("%Y")}.csv").split("\r\n")[0].split(",")
end

And(/^I should be able to verify downloaded spreadsheet table headers "(.*?)" and "(.*?)" with the webtable headers$/) do |security_code, security_name|
  assert @downloaded_file_contents[0].eql?(security_code)
  assert @downloaded_file_contents[1].eql?(security_name)
end

Then(/^I should be able to validate data with web table$/) do
  @csv_complete_data = File.read("#{FileDownloadHelpers::PATH.to_s}/MarketWatch_#{Time.now.strftime("%d")}-00-#{Time.now.strftime("%Y")}.csv").split("\r\n")
  Rails.logger.info "\n\n Downloaded spreadsheet data array : \n\n #{@csv_complete_data} \n\n"
  @webtable_data_array = []
  webtable_page1_data = page.all(:css, "#ctl00_ContentPlaceHolder1_grd1 tbody tr")
  webtable_page1_data.each do |webtable_data|
    webtable_data_object = webtable_data.text.gsub(",", "").split(" ").join(",")
    @webtable_data_array << webtable_data_object
  end
  
  # Click on page 2 to get the next page data
  page.all(:css, "tr.pgr tbody tr td a").last.click

  webtable_page2_data = page.all(:css, "#ctl00_ContentPlaceHolder1_grd1 tbody tr")
  webtable_page2_data.each do |webtable_data|
    webtable_data_object = webtable_data.text.gsub(",", "").split(" ").join(",")
    @webtable_data_array << webtable_data_object
  end
  
  # Deleteing unwanted page numbers from array
  @webtable_data_array = @webtable_data_array.delete_if{|x| x=="1,2"}
  Rails.logger.info "Webapp table data array : \n\n #{@webtable_data_array}"
  @webtable_data_array == @csv_complete_data

end
