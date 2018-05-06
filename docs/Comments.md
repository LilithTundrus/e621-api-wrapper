# Comments

### Comments

Comments are related to posts, but have their own special API endpoints

All comments methods have a max per page of 25

</br>

## GET Methods

**list**

List a set of comments by post ID, parameters are `postID`, `page?` `commentStatus?`

```typescript
wrapper.comments.lsit(391224, 2, 'visible')
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
        console.log(results[0].creator)
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

Some comment endpoints aren't exposed through the wrapper/

<br>

You can always access these using the `requestServices` part of the wrapper.


