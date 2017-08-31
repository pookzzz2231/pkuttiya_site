---
title:  "photogram"
excerpt: "Photos social media"
description: "Internet web base application, focusing on photo sharing and user interacting.
"
tags: ["Frontend", "Backend", "Ruby on Rails", "UX/UI design"]
link: "https://test.com"
others: "myflix"
permalink: /projects/photogram/
---

#### Introduction
My employee has a chance to demonstrate a Ruby on rails's potentials as per our client's request for a social network photo sharing prototype sample app, hence the photogram was created.  

Although the application still has a lot of room to contribute, it has most of modern social network requirements, and could also demonstrate the efficiency of Ruby on Rails.

#### Research and ideas
Most of modern social network applications share some of the common components, such as followings, likes, upload photos and comments. The building process for photogram would break into backend part which interact between users request and server response, and front-end part, which mostly interacts with Jquery and Ajax. For further implementation, React or other front-end framework could come into use, if preferred.

As stated above, photogram was decided to be built with Rails TDD principle for the back-end, and Jquery/Ajax on the front-end. Below is the tests that are used for the app.

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

> [Find out more on how I normally work with TDD workflow.]({{"/projects/myflix#tdd_workflow"}})

#### Features