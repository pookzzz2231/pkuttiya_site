---
title:  "myyelp"
excerpt: "A business review website."
description: "An application that focuses on local business review and networking site."
tags: ["Frontend", "Backend", "Ruby on Rails"]
link: "https://test.com"
others: "myflix"
---

#### Introduction
I came across one of the assignments while i was attending my coding school, 
and had an opportunity to challenge myself to build a website that could educate myself 
as well as get accustomed with Rubu on Rails's performance.  

MyYelp is a mocking website inspired by Yelp that intended to show the benefits of Ruby on Rails,
it consists of basic CRUD functionality and integrated with Rspec tests.

#### Planning and research
The app stores data for users, businesses and reviews.  
Thus, it also has the models and controller according to database tables.
The database tables and associations can be illustrated as shown. 

![design image](/assets/img/{{page.title | downcase}}/banner.png )

Additionally, the controller needs `sessions_controller` to control user `sign_in` and `sign_out` action, 
however it wouldn't have any model associated with it,
since there is no any table that needs to store data for users session.  

###### Test
Test tools: 

{: .table .table-responsive .table-bordered}  
{% include project/test.md %}

> The seed data uses fabricator and faker as well.

#### Development  
###### App features 
The app has CRUD functionality for users, reviews and businesses.

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

{: #tdd_workflow}
The development implementation is focusing on __TDD principles__; 
create view, write test for desired functionalily then integrate the code according to TDD.  
> [Find out more on how I normally work with TDD workflow.]({{"/projects/myflix#tdd_workflow"}})


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
