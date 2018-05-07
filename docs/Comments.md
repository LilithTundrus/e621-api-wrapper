# Comments

### Comments

Comments are related to posts, but have their own special API endpoints

All comments methods have a max per page of 25

</br>

## GET Methods

**getRecentComments**

Get all recent comments made on e621. Parameters are `page?`

```typescript
wrapper.comments.getRecentComments(2)
    .then((response) => {
        console.log(response[0].body);
    })
```
</br>


**list**

List a set of comments by post ID, parameters are `postID`, `page?` `commentStatus?`

```typescript
wrapper.comments.list(391224, 2, 'visible')
    .then((results) => {
        console.log(results[0].body);
    })
```
</br>


**searchByCommentText**

Search for comments matching the given `query` text. Parameters are `query`, `fuzzy?`, `page?` and `order?`

```typescript
wrapper.comments.searchByCommentText('test', true, 1, 'date_asc')
    .then((results) => {
        console.log(results[0].creator);
    })
```
</br>


**searchByCommentCreatorID**

Search for comments matching the given creator ID. Parameters are `userID`, `page?` and `order?`

```typescript
wrapper.comments.searchByCommentCreatorID(1145, true, 1, 'date_asc')
    .then((results) => {
        console.log(results[0].creator);
    })
```
</br>


**searchByCommentCreatorName**

Search for comments matching the given creator's name. Parameters are `userName`, `page?` and `order?`

```typescript
wrapper.comments.searchByCommentCreatorName('test', true, 1, 'date_asc')
    .then((results) => {
        console.log(results[0].creator);
    })
```
</br>


**show**

Get a single comment's data by ID, parameter is `commentID`

```typescript
wrapper.comments.show(12345)
    .then((results) => {
        console.log(results.body);
    })
```
</br>
</br>

## POST Methods

**create**

Create a comment for a given post, parameters are `postID`, `commentText` and `annonymous?`

```typescript
wrapper.comments.create(12345, 'test comment through the api!', true)
    .then((results) => {
        console.log(results);
    })
```
</br>


**destroy**

Destroy a comment by its ID. You **must** be logged in for this operation, parameter is `commentID`

```typescript
wrapper.comments.destroy(12345)
    .then((results) => {
        console.log(results);
    })
```
</br>
</br>


## Unavailable Endpoints

Some comment endpoints aren't exposed through the wrapper

<br>

You can always access these using the `requestServices` part of the wrapper.


### Search

The following Search parameters are not yet supported

**post_id** - The ID number of the post to retrieve comments for.
**status** - Returns hidden comments when set to hidden, visible comments when set to active, or both when set to any. Note that whether or not you can see other user's hidden comments is affected by your permission levels.
</br>

### Hide

The base URL is /comment/hide.json.

**id** Hides the comment with the given ID number.
</br>


### Unhide

The base URL is /comment/unhide.json.

**id** Unhides the comment with the given ID number.
</br>


### Vote 

The base URL is /comment/vote.json. This action requires an AJAX-like call. That is, your request header must contain X-Requested-With: XMLHttpRequest

**id** Vote on the comment with the given ID number.
**score** can be `up` or `down`

To remove a vote, send a request using the same score given previously (e.g. if it was voted up, vote up again to return to neutral).