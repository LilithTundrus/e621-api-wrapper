# Artists

Artists are part of e621 _post_ types but are an individual endpoint. ALL methods available through the API are wrapped

</br>

## GET Methods

**listArtists**

List all artists by a set of options, parameters are `name?`, `limit?`, `order?`, `page?`

```typescript
wrapper.artists.listArtists('test', 25, 'date', 1)
    .then((results) => {
        console.log(results);
    })
```
</br>
</br>

## POST Methods

**create**

Create an artist, parameters are `name`, `artistURLs`, `groupNames?` `otherNames?`

```typescript
wrapper.artists.create('test', 'artist_url other_url', 'artistGroupName', 'otherTestName')
    .then((results) => {
        console.log(results);
    })
```
</br>


**delete**

Delete an artist by their id, parameters are `artistID`. You **must** be logged in for this to work

```typescript
wrapper.artists.delete(12345)
    .then((results) => {
        console.log(results);
    })
```
</br>

**update**

Update an artist's information, parameters are `artistID`, `name?`, `artistURLs?`. `isActive?`, `groupName?`, `otherName?`

```typescript
wrapper.artists.update(12345, 'new_name', null, true, null, 'other_new_test')
    .then((results) => {
        console.log(results);
    })
```