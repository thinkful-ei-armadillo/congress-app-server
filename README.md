<p align="center">
  <img src="https://user-images.githubusercontent.com/45650065/57548986-5862b880-7330-11e9-86f8-49cb7cb586b1.png" height="100" />
</p>
<hr>

For an example of how to implement this API in a front end client, please visit the [Client Repository](https://github.com/thinkful-ei-armadillo/congress-app-client)

## Endpoints

### Authorization Endpoints

###### `post /api/auth/login`
Verifies credentials for logins

###### `get /api/auth/refresh`
Allows automatic refreshing of token

### User Endpoints
###### `post /api/user`
Handles registration/sign-up

###### `get /api/user/:id/followed`
Retrieve members followed by currently logged in user

###### `post /api/user/:id/followed`
Add a new member to followed members for logged in user

###### `delete /api/user/:id/followed`
Removes a follow for the logged in user

###### `get /api/user/:id/favorites`
Retrieve id of already followed member by currently logged in user

### Bills Endpoints

###### `get /api/bills?filter=active` 
###### `get /api/bills?filter=introduced`
Retrieves all active or introduced bills in database for user

###### `get /api/bills/seedBills`
Retrieves all active and introduced bills from ProPublica API

### Committees Endpoints

###### `get /api/committees`
Retrieves all congressional committees in database for user

###### `get /api/committees/seedCommittees`
Retrieves all congressional committees from ProPublica API

### Members Endpoints

###### `get /api/members`
Retrieves all congressional members in database for user

###### `get /api/members/search?query=''`
Retrieves all congressional members that match given query in either first or last name field

###### `get /api/members/seedMembers`
Retrieves all congressional members from ProPublica API

###### `get /api/members/:id`
Retrieves congressional member matching Bioguide ID

### Top3s Endpoints

###### `get /api/top3s`
Returns the top 3 members from database by % of Missed Votes

## Tech Stack

### Server
- [Node](https://github.com/nodejs/node)
- [NPM](https://www.npmjs.com/)
- [Express](https://github.com/expressjs/express)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)
- [Mocha](https://mochajs.org/) - Testing
- [Chai](https://www.chaijs.com/) - Testing
- [Supertest](https://www.npmjs.com/package/supertest) - Testing

## Team

- Project Manager - [Daniel Ors](https://github.com/danielors)
- Product Manager - [Ali Lahrime](https://github.com/lahrime)
- Testing Lead - [Owen Cyr](https://github.com/owencyr)
- Design Lead - [Secil Reel](https://github.com/secilreel)
- Marketing Lead - [Payman Kossari](https://github.com/paypay43)

## Twitter

Follow us on [Twitter](https://twitter.com/mycongressio)!
