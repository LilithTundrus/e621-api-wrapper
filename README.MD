# e621-api
[![Build Status](https://travis-ci.org/LilithTundrus/e621-api-wrapper.svg?branch=master)](https://travis-ci.org/LilithTundrus/e621-api-wrapper)
</br>
</br>

## About

This is an API wrapper for the site [e621](https://e621.net) to assist in any projects you might have that need API use.

A project to better document the general API can be found [here](https://github.com/LilithTundrus/e621-api-docs)

If you're here, you know what this site is for.

**PLEASE NOTE:**

This is still in **BETA** development, if something doesn't work or isn't defined correctly, please let me know!
</br>
</br>


## Getting Started

This project is available via NPM:

```
npm install e621-api --save
```

You should have `Node 8.9.4` and `tsc 2.1` or higher to be safely running this.

**Note**: When calling the wrapper class you __must__ provide a user-agent or e621 will deny your API requests.
</br>

**For typeScript setup is easy:**

```typescript
import e621 from 'e621-api'
import { e621PostData } from 'e621-api/build/interfaces';
import { e621TagTypes, e621PopularityStrings } from 'e621-api/build/enums';
 
// First argument is your user-agent, the second is your optional user_name login. The third is your optional passwrod and the last is the page limit per search result (pageLimit * 50 = maximum number of results returned)
let wrapper = new e621('Node-test-1.0', null, null, 3);
 
wrapper.posts.getPopularPosts(e621PopularityStrings.daily)
.then((data) => {
    console.log(data[0].file_url);
})
```
</br>



**ES6 requires slightly different setup**

```javascript
let e621 = require('e621-api').default;
let enums = require('e621-api/build/enums');
let wrapper = new e621('Node-test-1.0', null, null, 3);
 
// First argument is your user-agent, the second is your optional user_name login. The third is your optional passwrod and the last is the page limit per search result (pageLimit * 50 = maximum number of results returned)
wrapper.posts.getPopularPosts(enums.e621PopularityStrings.daily)
.then((data) => {
    console.log(data[0].file_url);
})
```
</br>
</br>


## Available Method Endpoints

If you want more information for any method, check the `docs/` folder. Not all methods per endpoint are listed here.

Any time a `GET` request is made (you receiving data), if invalid parameters are given they will typically be ignored by the API.

**Note**: the `wrapper` const used here is representative of your instanced e621 class, for simplicity
</br>
</br>

### Tags

Tags help classify posts and allow you to narrow down any searches


**getAliases**

Get a given tag's aliases, parameters are `query`, `page?`, `order?`, and `approved?`

```typescript
wrapper.tags.getAliases('fox')
    .then((response) => {
        console.log(response[0].alias_id);
    })
```
</br>

**getByID**

Get a tag's information by its ID, parameters are `tagID`

```typescript
wrapper.tags.getByID(1)
    .then((results) => {
        console.log(results.name);
    })
```
</br>

**getByName**

Get a tag's information by its name, parameters are `tagName`

```typescript
wrapper.tags.getByName('fox')
    .then((results) => {
        console.log(results[0].name);
    })
```
</br>

**getRelatedTagsByName**

Get a tag's related tags by its name, parameters are `tagName`

```typescript
wrapper.tags.getRelatedTagsByName('fox')
    .then((results) => {
        console.log(results[0].type);
    })
```
</br>

**listAllTags**

A more advanced version of `getByName`, allowing you to filter tags more percisely, parameters are `limit?`, `page?`, `order?`, `tag?`, `tagPattern?`, `afterID?`

```typescript
wrapper.tags.listAllTags(5, 1, null, 'fox')
    .then((results) => {
        console.log(results);
    })
```
</br>

**updateTag**

Update a tag's type by its name. You **must** be logged in to be able to make changes. Parameters are `name` and `tagType`, string enums are labeled `e621TagTypes` in `enums`

```typescript
wrapper.tags.updateTag('fox', 5)
    .then((results) => {
        console.log(results.success);
    })
```
</br>
</br>

### Posts

**Posts have a lot of endpoints, some common endpoints are below**. Posts are the main data type of e621, these can be pictures, videos or flash animations
<br>

**generatePostUrl**

Generate a post's URL by ID, parameters are `postID`

```typescript
let postURL = wrapper.posts.generatePostUrl(12345);
console.log(postURL);
```
</br>

**getIndexPaginate**

Get the post index of e621, using pagination to iterate over a set of pages. Useful for getting a lot of images. Parameters are `tags?`,  `start?`, `limitPerPage?`, `pageLimit?`. Providing no arguments paginates over e621's index (most recent).

```typescript
wrapper.posts.getIndexPaginate('fox bear order:favcount', 1, 35, 3)
    .then((results) => {
        console.log(results[0][0].file_url);
    })
```
</br>

**getPopularPosts**

Get a set of the popular posts using the `e621PopularityStrings` enum, parameter is `typeArg`

```typescript
wrapper.posts.getPopularPosts(e621PopularityStrings.daily)
    .then((results) => {
        console.log(results[0].artist);
    })
```
</br>
</br>

### Pools

Pools contain sets of posts related to a specific topic or series. **Note that locking pools through the wrapper is supported, as it required moderator+ access**. These are just common examples.
<br>

**addPost**

Add a post to a pool by both the `poolID` and `postID`

```typescript
wrapper.pools.addPost(12345, 56789)
    .then((response) => {
        console.log(response.success);
    })
```
</br>

**create**

Create a pool to insert a set of posts into, parameters are `poolName` and `poolDescription`

```typescript
wrapper.pools.create('A new Pool Pt. 2', 'Some very descriptive description')
    .then((response) => {
        console.log(response);
    })
```
</br>

**destroy** 

Delete a pool by its ID, parameters are `poolID`

```typescript
wrapper.pools.destroy(12463)
    .then((response) => {
        console.log(response);
    })
```
</br>

**listPoolPosts**

List the posts contained in a pool, parameters are `poolID` and `page?`. `page` is typically not needed if the pool's number of posts is under 25. you can get the count from the API using the `response.post_count` property from the returned JSON

```typescript
wrapper.pools.listPoolPosts(12463)
    .then((response) => {
        console.log(response.post_count);
    })
```
</br>

**removePost**

Remove a post to a pool by both the `poolID` and `postID`

```typescript
wrapper.pools.removePost(12345, 56789)
    .then((response) => {
        console.log(response.success);
    })
```
</br>

**updatePoolDescription**

Update a pool's description, parameters are `poolID` and `poolDescription`

```typescript
wrapper.pools.updatePoolDescription(123456, 'Some very descriptive update')
    .then((response) => {
        console.log(response);
    })
```
</br>
</br>


### Artists

To get a list of  supported `artists` methods, check out [Artists](/docs/Artists.md) in the `docs/` folder.
</br>
</br>

### Blips

To get a list of  supported `blips` methods, check out [Blips](/docs/Blips.md) in the `docs/` folder.
</br>
</br>

### Comments

To get a list of  supported `comments` methods, check out [Comments](/docs/Comments.md) in the `docs/` folder.
</br>
</br>

### Dmail

To get a list of  supported `dmail` methods, check out [Dmail](/docs/Dmail.md) in the `docs/` folder.
</br>
</br>

### Notes

To get a list of  supported `notes` methods, check out [Notes](/docs/Notes.md) in the `docs/` folder.
</br>
</br>

### Sets

To get a list of  supported `set` methods, check out [Sets](/docs/Sets.md) in the `docs/` folder.
</br>
</br>

### Users

To get a list of  supported `users` methods, check out [Users](/docs/Users.md) in the `docs/` folder.
</br>
</br>

### Wiki

To get a list of  supported `wiki` methods, check out [Wiki](/docs/Wiki.md) in the `docs/` folder.
</br>
</br>


## Logging in through the API

Some API actions require you to log in.
</br>

Logging in through the wrapper is required at the `new` keyword creation:

```typescript
// arguments are your user-agent, your login name and your API key (not the same as your password)
let wrapper = new e621('my-user-agent', 'my-user-name', 'my-api-key');
```
</br>

### Getting your API key

You can obtain your API key through your user settings on e621 or by using this url:

```
e621.net/user/login.json?name=USERNAME_HERE&password=PASSWORD_HERE
```
</br>
</br>


## Interacting directly with the request layer

You can use the `requestServices` part of the API wrapper to access any endpoints that are not yet available through the wrapper:
</br>

```typescript
wrapper.requestservices.get(`https://e621.net/comment/index.json?post_id=8595`)
    .then((results) => {
        console.log(results)
    })
```

Any POST calls you make to the API through `requestServices` will use your login information if it was passed to the class
</br>
</br>


## History
</br>

- **v0.3.9**
    - Fixed the project not working on *nix Operating Systems


- **v0.3.8**
    - Minor doc updates
    - Internal pagination system now returns `<any>`


- **v0.3.7**
    - Added support for `Set` endpoints
    - Automatically converting `set` endpoints into JSON as the XML endpoints are 30x faster but are harder to parse
    - Improved the XML conversion engine + per-class support for special cases
    - Removed debug GET/POST logging


- **v0.3.6**
    - Added support for `Wiki` endpoints (what actually works, anyway)


- **v0.3.5**
    - Added support for `Notes`
    - Added `getFavorites` method to `Posts`
    - Moving closer to completing the API wrapping


- **v0.3.4**
    - Added support for `Dmail`
    - Modified the `RequestServices` get method to support API-key form submission (required for personal info GET requests)


- **v0.3.3**
    - Added support for `Blips`


- **v0.3.2**
    - Fixed a really bad typings issue (Thanks node)


- **v0.3.1**
    - Added support for all `Pools` endpoints
    - Improved interface definitions for the wrapper (less any: keyword)


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
</br>
</br>


## Donating

Like what I do?
</br>
</br>
<a href='https://ko-fi.com/J3J1CYJ2' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
</br>

Please consider donating even a little. These projects do take time and effort to maintain and aren't exactly mass-marketable
</br>
</br>


## Issues


Do you have any issues or recommendations for this package? Feel free to open an issue in the [issue](https://github.com/LilithTundrus/e621-api/issues) section. I'm always happy to help :D
</br>
</br>


## Contributing

If you would like to contribute to this project feel free to make some changes and open a pull request! I'm not very good at Typescript just yet.
</br>
</br>


## License

This project is licensed under the MIT License - see the LICENSE file for details