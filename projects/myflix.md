---
title:  "myflix"
excerpt: "A video subscription services."
description: "With the growing of modern broadcasting technology. Users tend to have more choices to access into video meterials. MyFlix is an application that solely permitting the admin team to have full control of their meterials, while subscriber need to make monthly payment to access the content. Suitable for entertainment industry and online classes."
tags: ["Frontend", "Backend", "Ruby on Rails", "CircleCI"]
link: "https://test.com"
others: "myflix"
permalink: /projects/myflix/
---

#### Introduction
One of a production quality that I built a way back for my graduation project in Coding bootcamp, after a couple update and implementation, the project itself illustrates many of potentials and requirement of essential tasks that could demonstrate the efficiency of Ruby on Rails.  

#### Planning phase  
The project was developed with Postgresql. The database was decided to be as shown below.  

![design image](/assets/img/{{page.title | downcase}}/banner.png )

###### App features 

{: .checked .split}
- Auth with bcypt (without devise)
- Email services
- Resetting password
- Subscription services
- Admin privilege

{: .checked .split}
- Search for videos
- Friend invitations
- Organizing videos lists
- Videos ratings
- Following between users

After the determination of what the database tables and associations would look like, as well as some features that the app would have, then we jump into front-end development.

#### Frontend 

Integrate Bootstrap, Jquery and Sass to Rails application. Then implement our mockup pages, these pages are nothing more than static pages, which would 
generally show an overall of how our frontend design would look like.  

> It would be generally a good idea to include guard and live-reload as well.

Ruby on rails comes with programming environment, as a result, we could set the route to display all of our pages in UI route, and it will be visibled when our application is in development environment only.  

{% highlight ruby %}
# config/route.rb
Myflix::Application.routes.draw do
  get 'ui(/:action)', controller: 'ui'
end
{% endhighlight %}

{% highlight ruby %}
# controllers/ui_controller.rb
class UiController < ApplicationController
  before_action do
    redirect_to :root if Rails.env.production?
  end
end
{% endhighlight %}

#### Test  
The application requires test for both frontend and backend. Below is the illustration of tests integration and the purposes of the implementation.

{: .table .table-responsive .table-bordered}  
| Integration        | Purpose                 |
|--------------------|-------------------------|
| Rspec-rails        | controller test         |
| shoulda-matchers   | rails library test      |
| capybara           | integration-test        |
| capybara-email     | integration mailer test |
| vcr                | record/capture api      |
| database_cleaner   | reset test database     |
| selenium-webdriver | automated tests         |
| fabricator         | Ruby object generator   |
| faker              | Fake data for fabricator|

> Alternatively, fabricator and faker could be use for application seed as well.

#### Development  
{: #tdd_workflow}
The development implementation is focusing on __TDD principles__; 
create view, write test for desired functionalily then integrate the code according to TDD.  

###### workflow example
The example would be for functionality at user new sign up.
Starting by copy code from our ui design, then revise form using bootstrap rails form helper

{% highlight haml %}
%section.register.container
  .row
    .col-sm-10.col-sm-offset-1
      = bootstrap_form_for(@user, layout: :horizontal, | 
      label_col: "control-label col-sm-2", control_col: "col-sm-6", html: { id: "payment-form" }) do |f|
        = f.email_field :email, label: "Email Address"
        = f.password_field :password, label: "Password"
        = hidden_field_tag :invitation_token, "#{@invitation_token}"
        = f.text_field :full_name, label: "Full Name"
        = f.submit "Sign Up", name: nil, class: "btn btn-success"
{% endhighlight %}

Config Rspec and start writing test, the sample test is for 'GET' request at users controller; new action. 

{% highlight ruby %}
# specs/controllers/users_controller.rb
describe UserssController do
  describe "GET new" do
    context "new user" do
      get :new
      expect(assigns[:user]).to be_instance_of(User)
    end
  end
end
{% endhighlight %}

When run `rspec` in terminal, test will fail. 
As a result, we would need to implement the rest of our functionlity to satisfy our test. 
The first step is to define route for our 'GET' new at users controller.

{% highlight ruby %}
# define route for testing controller
Myflix::Application.routes.draw do
  #... other code
  resources :users, only: [:new]
end
{% endhighlight %}

Then include our new action logic to create user instace, 
which will be used in our form helper.

{% highlight ruby %}
# Implement logic accordingly to satisfy the test
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def new
    @user = User.new
  end
end
{% endhighlight %}

Test still fails since we haven't define any associated User model.

{% highlight ruby %}
# Implement logic accordingly to satisfy the test
# app/model/user.rb
class User < ActiveRecord::Base
  #single validation
  has_secure_password validation: false
end
{% endhighlight %}

{% highlight ruby %}
# genarate migration in rails command
rails g migration create_users
{% endhighlight %}

{% highlight ruby %}
# config migration file to match design database
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :full_name
      t.timestamps
    end
  end
end
{% endhighlight %}

{% highlight ruby %}
# run migration in rails command
rake db:migrate
{% endhighlight %}

Our controller test would already passed at this point. 
additionally, we included Rails functionality in our model, which could be tested with 'shoulda-matcher'.

{% highlight ruby %}
# Implement test for user model
# spec/model/user.rb
describe User do
  it { should have_secure_password }
end
{% endhighlight %}

The workflow would be similar for POST request, all of the app functionality is implemented by TDD principle.
###### Development logic implementation.  

{: .checked .split}
- TDD workflow for controllers and models as per planning pharse.
- Include Stripe API
- Wrap Stripe API in Wrapper.
- Unobtrusive JS for form submit.
- Search for videos name
- Background job for mailer
- Concerns for logic reusing.
- Seed application with sample data.

#### Deploy
The app includes Puma as Rails thread concerrency, moreover, added Sidekiq and Resque for ruby background job processing.   

It also takes advantage of automate continuous integration and continuous delivery via circleCI.
CircleCI config is implemented with heroku command, it will run tests and deploy if passed.  

The environment for our application is setup to deploy to Heroku, with staging and production servers. Staging is set up as similar as production, the app work flow will deploy to staging server, if successfully passed, pulled requeseted will be made on github master branch, then CircleCI will automate tasks and deploy to production server.    
