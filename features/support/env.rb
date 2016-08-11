
# Integrated generating coverage report
require 'simplecov'
SimpleCov.start
SimpleCov.coverage_dir 'coverage/cucumber'

# Initializing selenium and cucumber
require "selenium-webdriver"
require 'cucumber/rails'

# Output scenario definition in logs before starting execution
Before do |scenario|
  Rails.logger.debug "Starting scenario: #{scenario.name}"
end

# Output scenario definition in logs after execution
After do |scenario|
  if scenario.failed?
    Rails.logger.debug "Scenario #{scenario.name} failed : #{scenario.exception.message}"
    # Cucumber.wants_to_quit = true
    # raise scenario.exception
  end
end

# Allowing handling exceptions
ActionController::Base.allow_rescue = false

# Registration of webdriver for firefox and chrome

Capybara.register_driver :selenium do |app|
  if ENV['BROWSER'].eql?('chrome')
    browser = ENV['BROWSER'].to_sym
    prefs = {
      "download" => { 
        "default_directory" => FileDownloadHelpers::PATH.to_s 
      }
    }
    Capybara::Selenium::Driver.new(app, :browser => browser, :prefs => prefs, :detach => :unspecified)
  else 
    browser = :firefox
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.dir'] = FileDownloadHelpers::PATH.to_s 
    profile['browser.helperApps.neverAsk.saveToDisk'] = "text/csv" # content-type of file that will be downloaded
    Capybara::Selenium::Driver.new(app, :browser => browser, :profile => profile)
  end  
end

# Setting up default selector for finding elements in dom
Capybara.default_selector = :css

# Setting up default webdriver as selenium
Capybara.default_driver = Capybara.javascript_driver = :selenium

# Waiting for ajax loading on page
def wait_for_ajax
  Timeout.timeout(Capybara.default_wait_time) do
    loop do
      active = page.evaluate_script('jQuery.active')
      break if active == 0
    end
  end
end

# Maximizing browser window before execution of scenario
Before('@selenium') do
  page.driver.browser.manage.window.maximize
end

# generic method for finding elements in DOM
def find_element(type, element_id, is_mandate)
  begin
    @element = page.find(type, element_id)
    return @element
  rescue Capybara::ElementNotFound => e
    Rails.logger.debug "#{e.backtrace.join("\n\t")}"
    if is_mandate
      raise e.message
    else
      return true
    end
  end
end
