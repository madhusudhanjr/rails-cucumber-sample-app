
# Integrated generating coverage report
require 'simplecov'
SimpleCov.start
SimpleCov.coverage_dir 'coverage/cucumber'

# Initializing selenium and cucumber
require "selenium-webdriver"
require 'cucumber/rails'

# Initializing vcr
require 'vcr'
require 'webmock/cucumber'

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
  http_client = Selenium::WebDriver::Remote::Http::Default.new
  http_client.timeout = 20000

  browser_array = ['chrome']
  if browser_array.include? ENV['BROWSER']
    browser = ENV['BROWSER'].to_sym
  else 
    browser = :firefox
  end
  Capybara::Selenium::Driver.new(app, :browser => browser, :http_client => http_client)
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

# Configuration of VCR recordings
VCR.configure do |c|
  c.cassette_library_dir = 'features/vcr_cassettes'
  c.hook_into :webmock
  c.ignore_localhost = true
end

# Creating tags for scenarios
VCR.cucumber_tags do |t|
  t.tag '@record_scenario'
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
