require 'simplecov'
SimpleCov.start
SimpleCov.coverage_dir 'coverage/cucumber'

require "selenium-webdriver"
require 'cucumber/rails'

Before do
  if ENV['HEADLESS']
    require 'headless'
    @headless = Headless.new
    @headless.start
    at_exit do
      @headless.destroy if @headless.present?
    end
  end
end

Before do |scenario|
  Rails.logger.debug "Starting scenario: #{scenario.name}"
end

# scenario.test_steps.last.name

# Before do |scenario|
#   # Feature name
#   binding.pry
#   case scenario
#     when Cucumber::Core::Ast::Scenario
#       @feature_name = scenario.feature.name
#     # when Cucumber::Core::Ast::OutlineStep
#       # @feature_name = scenario.test_steps.feature.name
#   end

#    # Scenario name
#   case scenario
#     when Cucumber::Core::Ast::Scenario
#       @scenario_name = scenario.name
#     when Cucumber::Core::Ast::OutlineTable::ExampleRow
#       @scenario_name = scenario.scenario_outline.name
#    end

#   # Tags (as an array)
#   # @scenario_tags = scenario.source_tag_names
# end

After do |scenario|
  if scenario.failed?
    Rails.logger.debug "Scenario #{scenario.name} failed : #{scenario.exception.message}"
    # Cucumber.wants_to_quit = true
    # raise scenario.exception
  end
end

# AfterStep do |step|
#   binding.pry
# end

ActionController::Base.allow_rescue = false

# begin
#   require 'database_cleaner'
#   require 'database_cleaner/cucumber'
#   DatabaseCleaner.strategy = :truncation
# rescue NameError
#   raise "You need to add database_cleaner to your Gemfile (in the :test group) if you wish to use it."
# end

# Around do |scenario, block|
#   DatabaseCleaner.cleaning(&block)
# end

Cucumber::Rails::Database.javascript_strategy = :truncation

Capybara.register_driver :selenium do |app|
  http_client = Selenium::WebDriver::Remote::Http::Default.new
  http_client.timeout = 20000

  browser_array = ['chrome', 'safari', 'ie']
  if browser_array.include? ENV['BROWSER']
    browser = ENV['BROWSER'].to_sym
  else 
    browser = :firefox
  end
  Capybara::Selenium::Driver.new(app, :browser => browser, :http_client => http_client)
end

Capybara.default_selector = :css
Capybara.default_driver = Capybara.javascript_driver = :selenium

def wait_for_ajax
  Timeout.timeout(Capybara.default_wait_time) do
    loop do
      active = page.evaluate_script('jQuery.active')
      break if active == 0
    end
  end
end

Before('@selenium') do
  page.driver.browser.manage.window.maximize
end
