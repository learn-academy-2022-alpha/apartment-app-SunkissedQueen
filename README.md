# README
## Table of Contents
* [General Info](#general-information)
* [Initial Setup](#initial-setup)
* [Features](#features)
* [GHCR Assignment](#ghcr-assignment)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)

## GHCR Assignment
![GHCR Assignment](/app/assets/images/GHCR%20Assignment.png)

** When being assigned an empty repository in the GHCR, please follow the proceeding steps to connect your local repo with a remote gitHub repo
- copy the entire git remote add origin line
- This line will be ran in the terminal after your rails app has been created

## Initial Setup
- $ rails new apartment-app -d postgresql -T
- $ cd apartment-app
- $ rails db:create
- $ git remote add origin https://github.com/learn-academy-2022-alpha/apartment-app-SunkissedQueen.git
- $ git checkout -b main
- $ git add .
- $ git commit -m "initial commit"
- $ git push origin main
- $ rails s

## System Dependencies
** Adding RSpec
- $ bundle add rspec-rails
- $ rails generate rspec:install

** Adding React
- $ bundle add webpacker
- $ bundle add react-rails
- $ rails webpacker:install
- $ rails webpacker:install:react
- $ yarn add @babel/preset-react
- $ yarn add @rails/activestorage
- $ yarn add @rails/ujs
- $ rails generate react:install
- $ rails generate react:component App

** Adding Devise
- $ bundle add devise
- $ rails generate devise:install
- $ rails generate devise User
- $ rails db:migrate

** Updating files in the apartment-app
- Add following code to config/environments/development.rb
`config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }`

- config/initializers/devise.rb
- Find this line:
`config.sign_out_via = :delete`
- And replace it with this:
`config.sign_out_via = :get`

## Troubleshooting
- Stop the server and start it again.
- Did all the setup commands run properly? The commands can be rerun if something isn't working.
- Seeing a blank page? Look for errors in the terminal or inspect your page.
- Errors? Always look at the first error in the list.

** DS_Store
- update gitignore to ensure no more issues with .DS_store 
- If .DS_Store was never added to your git repository, simply add it to your .gitignore file.
- If you don't have one, create a file called .gitignore in your the root directory of your app and add this:
`**/.DS_Store`

## Routes and Views
** Rails Controller
- $ rails generate controller Home

** Rails View
- In app/views/home/index.html.erb add this:
`<%= react_component 'App' %>`

** Webpacker compiling javascript
- In app/views/layouts/application.html.erb, find this line:
`<%= javascript_importmap_tags %>`
- And replace it with this:
`<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>`

** Rails Routes/Landing page
- In config/routes.rb, add this:
```jsx
get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
root 'home#index'
```

** Check browser
- Ensure server is running in terminal
- Refresh browser to see any updates on the JSX in App.js

** React Routing
- $ yarn add react-router-dom@5.3.0
- In app/javascript/components/App.js add this:
```jsx
import {
  BrowserRouter as  Router,
  Route,
  Switch
} from 'react-router-dom'
```
** Adding Reactstrap
- $ bundle add bootstrap
- $ mv app/assets/stylesheets/application.css app/assets/stylesheets/application.scss
- $ yarn add reactstrap
- In app/assets/stylesheets/application.scss, add this:
`@import 'bootstrap';`
- stop and restart server

## Database creation
** Apartment Resource
- $ rails g resource Apartment street:string city:string state:string manager:string email:string price:string bedrooms:integer bathrooms:integer pets:string image:text user_id:integer
- $ rails db:migrate

** Rails Association
- In app/models/apartment.rb, add this:
```jsx
class Apartment < ApplicationRecord
  belongs_to :user
end
```
- In app/models/user.rb, add this:
```jsx
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :apartments
end
```

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

## Acknowledgements
https://www.foxinfotech.in/2019/12/github-markdown-add-an-image-to-readme-md-file.html

https://github.com/learn-academy-2022-alpha/Syllabus/blob/main/apartment-app/apartment-app.md
