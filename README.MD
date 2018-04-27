# e621-api

[![Build Status](https://travis-ci.org/LilithTundrus/e621-api-wrapper.svg?branch=master)](https://travis-ci.org/LilithTundrus/e621-api-wrapper)


## About

This is an API wrapper for the site [e621](https://e621.net) to assist in any projects you might have that need API use.

If you're here, you know what this site is for.

**PLEASE NOTE:**
This is still in ALPHA development, if something doesn't work or isn't defined correctly, please let me know!


## Getting Started

This project is available via NPM:

```
npm install e621-api --save
```

You should have `Node 8.9.4` and `tsc 2.1` or higher to be safely running this.

**Note**: When calling the wrapper class you __must__ provide a user-agent or e621 will deny your API requests.


**For typeScript setup is easy:**

```typescript
import e621 from 'e621-api'
import { e621PostData } from 'e621-api/build/interfaces';
import { e621TagTypes, e621PopularityStrings } from 'e621-api/build/enums';
 
// First argument is your user agent, the second is the page limit per search result (pageLimit * 50 = maximum number of results returned)
let wrapper = new e621('Node-test-1.0', null, null, 3);
 
wrapper.posts.getPopularPosts(e621PopularityStrings.daily)
.then((data) => {
    console.log(data[0].file_url);
})
```


**ES6 requires slightly different setup**

```javascript
let e621 = require('e621-api').default;
let enums = require('e621-api/build/enums');
let wrapper = new e621('Node-test-1.0', null, null, 3);
 
// First argument is your user agent, the second is the page limit per search result (pageLimit * 50 = maximum number of results returned)
wrapper.posts.getPopularPosts(enums.e621PopularityStrings.daily)
.then((data) => {
    console.log(data[0].file_url);
})
```


## Available methods


### Tags

**getAliases**

Get a given tag's aliases, parameters are `query`, `page?`, `order?`, and `approved?`

```typescript
wrapper.tags.getAliases('fox')
    .then((response) => {
        console.log(response[0].alias_id)
    })
```


**getByID**

Get a tag's information by its ID, parameters are `tagID`

```typescript
wrapper.tags.getByID(1)
    .then((results) => {
        console.log(results.name)
    })
```

**getByName**

Get a tag's information by its name, parameters are `tagName`

```typescript
wrapper.tags.getByName('fox')
    .then((results) => {
        console.log(results[0].name);
    })
```


**getRelatedTagsByName**

Get a tag's related tags by its name, parameters are `tagName`

```typescript
wrapper.tags.getRelatedTagsByName('fox')
    .then((results) => {
        console.log(results[0].type);
    })
```


**listAllTags**

A more advanced version of `getByName`, allowing you to filter tags more percisely, parameters are `limit?`, `page?`, `order?`, `tag?`, `tagPattern?`, `afterID?`

```typescript
wrapper.tags.listAllTags(5, 1, null, 'fox')
    .then((results) => {
        console.log(results);
    })
```


**updateTag**

Update a tag's type by its name. You **must** be logged in to be able to make changes

```typescript
wrapper.tags.updateTag('fox', 5)
    .then((results) => {
        console.log(results.success);
    })
```


### Artists


**createArtist**

Create an artist, parameters are `name`, `artistURLs`, `groupNames?` `otherNames?`

```typescript
wrapper.artists.createArtist('test', 'artist_url other_url', 'artistGroupName', 'otherTestName')
    .then((results) => {
        console.log(results)
    })
```

**deleteArtist**

Delete an artist by their id, parameters are `artistID`. You **must** be logged in for this to work

```typescript
wrapper.artists.deleteArtist(12345)
    .then((results) => {
        console.log(results)
    })
```


**listArtists**

List all artists by a set of options, parameters are `name?`, `limit?`, `order?`, `page?`

```typescript
wrapper.artists.listArtists('test', 25, 'date', 1)
    .then((results) => {
        console.log(results)
    })
```


**updateArtist**

Update an artist's information, parameters are `artistID`, `name?`, `artistURLs?`. `isActive?`, `groupName?`, `otherName?`

```typescript
wrapper.artists.updateArtist(12345, 'new_name', null, true, null, 'other_new_test')
    .then((results) => {
        console.log(results)
    })
```


### Posts

**Posts have a lot of endpoints, some common endpoints are below**




## Logging in 

Logging in through the wrapper is required at the `new` keyword creation:

```typescript
// arguments are your user-agent, your login name and your API key (not the same as your password)
let wrapper = new e621('my-user-agent', 'my-user-name', 'my-api-key');
```


### Getting your API key

You can obtain your API key through your user settings on e621 or by using this url:

```
e621.net/user/login.json?name=USERNAME_HERE&password=PASSWORD_HERE
```

## Interacting directly with the request layer

You can use the `requestServices` part of the API wrapper to access any endpoints that are not yet available through the API:

```typescript
wrapper.requestservices.get(`https://e621.net/comment/index.json?post_id=8595`)
    .then((results) => {
        console.log(results)
    })
```

Any POST calls you make to the API through `requestServices` will use your login information it it's given

## History

- **v0.3.0**
    - `Artist`, `Tags`, and `Posts` are mostly available for use. Posts do not yet support Create/Update/Deletes
    - Major changes, improved code structure and readability
    - Created a way to GET and POST to the API when a certain endpoint is not supported
    - Updated the docs and methods to be clearer


- **v0.2.9**
    - Created a lot more support for e621 endpoints, starting to pull the project in a broader directions
    - Improved typings slightly


- **v0.1.8-0.2.8**
    - Chased after a ton of NPM deployment related bugs


- **v0.1.7**
    - Added a method for getting related tags


- **v0.1.6**
    - Fixed tag data calls not returning as an array


- **v0.1.4**
    - Added support for getting tag data through the wrapper


## Issues

Do you have any issues or recommendations for this package? Feel free to open an issue in the [issue](https://github.com/LilithTundrus/e621-api/issues) section. I'm always happy to help :D


## Contributing

If you would like to contribute to this project feel free to make some changes and open a pull request! I'm not very good at Typescript just yet.


## License

This project is licensed under the MIT License - see the LICENSE.md file for details