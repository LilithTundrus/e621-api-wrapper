# Notes

In e621, Notes are small notes about posts that can contain any information related to the post. The reside on the post with a given `x` and `y` position on the post
</br>

## GET Methods

**getNoteHistory**

Get the history of a note. Parameters are `noteID`

```typescript
wrapper.notes.getNoteHistory(210955)
    .then((response) => {
        console.log(response);
    })
```
</br>


**getPostNotes**

Get a post's notes by its ID. Parameters are `postID`

```typescript
wrapper.notes.getPostNotes(1432815)
    .then((response) => {
        console.log(response[0].body);
    })
```
</br>


**searchNotes**

Search all notes for a match on a given query. Parameters are `query`

```typescript
wrapper.notes.searchNotes('fox')
    .then((response) => {
        console.log(response);
    })
```
</br>
</br>

## POST Methods

**create**

Create a note. Parameters are `postID`, `body`, `x`, `y` `width` and `height`

```typescript
wrapper.notes.create(12345, 'test', 0, 0, 100, 100)
    .then((response) => {
        console.log(response);
    })
```
</br>


**revertNote**

Revert a note to a previous version. parameters are `noteID` and `version`

```typescript
wrapper.notes.revertNote(12345, 2)
    .then((response) => {
        console.log(response);
    })
```
</br>


**updateNoteBody**

Update a note's body. Parameters are `noteID` and `body`

```typescript
wrapper.notes.updateNoteBody(12345, 'fox goes here')
    .then((response) => {
        console.log(response);
    })
```
</br>


**updateNoteLocation**

Update a note's location on the associated post. Parameters are `noteID`, `x` and `y`

```typescript
wrapper.notes.updateNoteLocation(11675, 50, 50)
    .then((response) => {
        console.log(response);
    })
```
</br>


**updateNoteWidthAndHeight**

Update a note's width/height by ID. Parameters are `noteID`, `width` and `height`

```typescript
wrapper.notes.updateNoteWidthAndHeight(11675, 50, 50)
    .then((response) => {
        console.log(response);
    })
```
</br>


**updateNoteVisibility**

Update a note's visibility status by ID. Parameters are `noteID` and `isVisible`

```typescript
wrapper.notes.updateNoteVisibility(11675, true)
    .then((response) => {
        console.log(response);
    })
```
</br>
</br>

## Unavailable Endpoints

<br>
Note endpoints that are not yet supported should be added in the future, for now they'll be listed below.

<br>

You can always access these using the `requestServices` part of the wrapper.


### History

History is not yet supported for filtering by `post_id`, `user_id`, nor  is there `page?` support
</br>

### Create/Update

Updating the `note[post_id]` (the post the note belongs to) is not yet supported