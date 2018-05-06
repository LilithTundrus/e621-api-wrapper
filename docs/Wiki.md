# Wiki

In e621, _wiki_ pages are an informational post about a given topic
</br>

## GET Methods

**getRecentChanges**

Get recent changes made to the wiki section of e621. Parameter are `page?`

```typescript
wrapper.wiki.getRecentChanges(2)
    .then((response) => {
        console.log(response[0].body)
    })
```
</br>


**getWikiByTitle**

Get a wiki page by its title. Parameters are `wikiTitle` 

```typescript
wrapper.wiki.getWikiByTitle('fox')
    .then((response) => {
        console.log(response.id)
    })
```
</br>


**list**

List ALL wiki pages, sorted by name. Parameters are `page?`

```typescript
wrapper.wiki.list(1)
    .then((response) => {
        console.log(response[0])
    })
```
</br>
</br>

## POST Methods


**create**

Create a wiki page. Parameters are `title` and `body`

```typescript
wrapper.wiki.create('fox', 'foxes are cool')
    .then((response) => {
        console.log(response)
    })
```
</br>



**destroy**

Delete a wiki page by name

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