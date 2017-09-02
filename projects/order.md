---
title:  "order"
excerpt: "Single page online sushi order app"
description: "With the popularity or online applications and services.  Restaurants would be more compatible having its own clean and simple interface online ordering routine for customers.  Order is a user-friendly interface, production-ready application, built on single page application technology, which is extremely fast and easy for user to navigate."
tags: ["Frontend", "Node.js", "Express.js", "Backbone.js", "Handlebar.js", "Pug"]
link: "https://test.com"
others: "myflix"
---

#### Introduction
Often times, there is a requirement for an application to be lightweight, event-driven, fast and simple to use. Order is the app that create as an experiment, of which is serve as an one page application, which has purposes of viewing, selecting and ordering items.

#### Planning and research  
As mentioned in introduction, Node.js(Javascript runtime environment) integrated with Node Library/APIs and frontend framework are the best candidate for creating Order app.

###### Node.js is good for:

{: .checked}  
- handle asynchronous I/O, take less RAM
- Javascript on Back-end and Front-end 
- Fast performance, high scalability

> Noted that `Backbone.js` was one of the first front-end framework that came out, and `React.js` wasn't around at the time. Modern front-end developer might prefer `Angular.js` or `React.js`, however, the concept of single page application, and the process of its implementation are still pretty much the same idea.  

> Backbone.js is packaged with the concept of models, collections, views and routers out of the box.

###### Tools

{: .table .table-responsive .table-bordered}
| middleware    | purpose                          |
|---------------|----------------------------------|
| body-parser   | make req.body request available  |
| cookie-parser | parse req.cookies for header     |
| express       | web framework for node.js        |
| pug           | back-end template engine         |
| jasmine-node  | test Integration spec Javascript |
| morgan        | HTTP request logger middleware   |
| request       | http call middleware             |
| grunt         | JavaScript Task Runner           |
| bower         | Web package manager              |
| handlebars    | front-end templating languages   |
| uglify        | Javascript minifier              |
| nodemon       | Server change monitor            |

#### UX/UI
Simplify interface with the ability to add item to cart without refreshing the page(re-rendering the whole page based on event trigger fire from Backbone.js).

!add to cart photo

Checkout and cart details summary.

> Backbone.js is implemented with `Backbone router` which triggers the window to navigate at destinated url without reloading page.

!cart view url highlight photo

Attached other events to the view, such as empty cart, edit amount, or item details slideshow.

!empty cart photo  
!slideshow photo

