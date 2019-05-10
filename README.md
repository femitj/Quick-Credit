# Quick-Credit

[![Build Status](https://travis-ci.com/femitj/Quick-Credit.svg?branch=develop)](https://travis-ci.com/femitj/Quick-Credit)
[![Coverage Status](https://coveralls.io/repos/github/femitj/Quick-Credit/badge.svg?branch=develop&service=github)](https://coveralls.io/github/femitj/Quick-Credit?branch=develop&service=github)
[![Maintainability](https://api.codeclimate.com/v1/badges/11dfaa7124ce16a7752b/maintainability)](https://codeclimate.com/github/femitj/Quick-Credit/maintainability)

## Application Description
Quick Credit is an online lending platform that provides short term soft loans to individuals with the purpose to help solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

<b> View UI template:</b>https://femitj.github.io/Quick-Credit/<br/>
<b> Test API Endpoint: </b> https://quick-credit.herokuapp.com/api/v1/ <br/>
<b> Pivotal Tracker: </b> https://www.pivotaltracker.com/n/projects/2326747<br/>

## Table of content

 * [Features](#features)
 * [Technologies](#technologies)
 * [Installation](#installation)
 * [Testing](#testing)
 * [API Routes](#api-routes)

 ## Features

1. Clients can sign up.
2. Clients can login.
3. Clients can create loan applications.
4. Clients can view loan repayment history.
5. Admin can verify a client after investigations.
6. Admin can view all loan applications.
7. Admin can view all repaid loans.
8. Admin can view all current loans.
9. Admin can view a specific loan with loanId.
10. Admin can approve a loan application.
11. Admin can post a loan repayment record in respect of a client.

## Technologies
HTML

CSS

Modern JavaScript technologies were adopted for this project

ES2015: Also known as ES6 or ES2015 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more infromation.

## Installation
- Clone this repository into your local machine:

`git clone https://github.com/femitj/Quick-Credit.git`

- Install dependencies

`npm install`

`npm start`

- Open your browser and Navigate to

`localhost:8080`

- Install postman to test all endpoints

## Testing

- run test using `npm test`

## API Routes

<table>
<tr>
<th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th>
<tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td> <td>Signup client</td></tr>

<tr><td>POST</td> <td>api/v1/auth/signin</td> <td>Sign in clients</td></tr>

<tr><td>PATCH</td> <td>api/v1/users/<:useremail>/verify</td> <td>Verify clients</td></tr>

<tr><td>POST</td> <td>api/v1/loans</td> <td>Create loan application</td></tr>

<tr><td>GET</td> <td>api/v1/loans</td> <td>Get all loan applications</td></tr>

<tr><td>GET</td> <td>api/v1/currentloans</td> <td>Get current loan applications</td></tr>

<tr><td>GET</td> <td>api/v1/loan</td> <td>Get repaid loan applications</td></tr>

<tr><td>PATCH</td> <td>api/v1/loans/<:id></td> <td>Get a specific loan application</td></tr>

<tr><td>POST</td> <td>api/v1/loans/<:loanid>/repayment</td> <td>Create loan repayment record</td></tr>

<tr><td>GET</td> <td>api/v1/loans/<:loanid>/repayments</td> <td>Get loan repayment history</td></tr>

</table>
