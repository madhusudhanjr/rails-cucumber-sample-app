source 'https://rubygems.org'
ruby '2.2.5'
gem 'rails', '~> 5.0.0'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'jquery-rails'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'

# Below gemset used resolving dependencies on Windows OS
group :development, :test do
  gem 'byebug', platform: :mri
end

# Below gemset used for resolving rails dependencies
group :development do
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'bootstrap-sass'
gem 'devise'
gem 'high_voltage'
gem 'pg'
gem 'therubyracer', platform: :ruby
gem 'thin'
gem 'spreadsheet'

# Below gemset used for integrating better error logging
group :development do
  gem 'better_errors'
  gem 'foreman'
  gem 'rails_layout'
end

# Below gemset used for integrating debugger and code vallidator
group :development, :test do
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'rubocop'
end

# Below gemset used for integrating cucumber and selenium with rails
group :test do
  gem 'cucumber-rails', require: false
  gem 'selenium'
  gem 'selenium-webdriver'
  gem 'simplecov', require: false
  gem 'vcr'
  gem 'vcr_cable'
  gem 'webmock'
  gem 'database_cleaner'
  gem 'shoulda-matchers'
  gem 'headless'
  gem 'faker'  
end
