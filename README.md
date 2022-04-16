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
- In config/routes.rb, add the routing constraints with root:
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
`belongs_to :user`
- In app/models/user.rb, add this:
`has_many :apartments`

## React Components
- Create three directories in app/javascript/component: assets, components, and pages.
- Create the following files: `pages/AboutUs.js`, `pages/Home.js`, `components/Navigation.js`
- Add an <h3> to each describing their intent
```jsx
import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <h3>This is the Home Page</h3>
    )
  }
}

export default Home
```

** Import components on App.js
```jsx
import Navigation from './components/Navigation'
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'
```

** Static routes on App.js
- Navigation will be on all pages
```jsx
<Router>
  <Navigation />
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={AboutUs} />
  </Switch>
</Router>
```

** Navigation.js 
```jsx
import React, { Component } from 'react'
import { Nav, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  render() {
    return(
      <>
        <Nav>
          <NavItem>
            <NavLink to="/" className="nav-link">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about" className="nav-link">About Us</NavLink>
          </NavItem>
        </Nav>
      </>
    )
  }
}
export default Navigation
```

** Devise data
- In app/views/home/index.html.erb add this:
```jsx
<%= react_component 'App', {
  logged_in: user_signed_in?,
  current_user: current_user,
  new_user_route: new_user_registration_path,
  sign_in_route: new_user_session_path,
  sign_out_route: destroy_user_session_path
} %>
```
- On App.js between render and return
```jsx
    const {
      logged_in,
      current_user,
      new_user_route,
      sign_in_route,
      sign_out_route
    } = this.props
    console.log("logged_in:", logged_in)
    console.log("current_user:", current_user)
    console.log("new_user_route:", new_user_route)
    console.log("sign_in_route:", sign_in_route)
    console.log("sign_out_route:", sign_out_route)
```

### Challenge
As a developer, I have been commissioned to create an application where a user can see apartments that are available for rent. As a user, I can see a list of apartments. I can click on an apartment listing and see more information about that apartment. As a user, I can create an account and log in to the application. If I am logged in, I can add an apartment to the list. As a logged in user, I can see a list of all the apartments as well as just the apartments I added. If my work is acceptable to my client, I may also be asked to add the ability to remove an apartment from the list as well as edit the apartment information.

Story: As an unregistered user, I can see a landing page with information about the application.
- Completed in the react components
- Completed in the rails routes/landing page
- Home was imported on App.js
- Updated Home.js with some html tags
- Add route on App.js and link on Navigation.js

Story: As an unregistered user, I can see the navigation options for a page with all the apartment listings, a page where I can create an account, and always get back to the home page.




Story: As an unregistered user, I can navigate to a page that shows me a list of all the apartments available for rent.

Story: As an unregistered user, I can select one available apartment and view its details.

Story: As a user, I can register to create an account on the web application, login to my existing account, and logout.

Story: As a logged in user, I can see a list of all the apartments I have available for rent.

Story: As a logged in user, I can fill out a form that will allow me to create a new listing of an apartment.

Story: As a logged in user, I can edit the information for the apartments I have created, but I cannot edit the information for apartments created by someone else.

Story: As a logged in user, I can delete an apartment I have created, but I cannot delete apartments created by someone else.


* How to run the test suite

* Deployment instructions

## Acknowledgements
https://www.foxinfotech.in/2019/12/github-markdown-add-an-image-to-readme-md-file.html

https://github.com/learn-academy-2022-alpha/Syllabus/blob/main/apartment-app/apartment-app.md

https://github.com/learn-academy-2022-alpha/Syllabus/blob/main/apartment-app/react-in-rails.md
