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

****



```typescript

```
</br>


****



```typescript

```
</br>


****



```typescript

```
</br>


****



```typescript

```
</br>


****



```typescript

```
</br>


****



```typescript

```
</br>