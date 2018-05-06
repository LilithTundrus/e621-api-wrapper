# Wiki

In e621, _wiki_ pages are an informational post about a given topic
</br>

## GET Methods

**getRecentChanges**

Get recent changes made to the wiki section of e621. Parameter are `page?`

```typescript
wrapper.wiki.getRecentChanges(2)
    .then((response) => {
        console.log(response[0].body);
    })
```
</br>


**getWikiByTitle**

Get a wiki page by its title. Parameters are `wikiTitle` 

```typescript
wrapper.wiki.getWikiByTitle('fox')
    .then((response) => {
        console.log(response.id);
    })
```
</br>


**list**

List ALL wiki pages, sorted by name. Parameters are `page?`

```typescript
wrapper.wiki.list(1)
    .then((response) => {
        console.log(response[0]);
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
        console.log(response);
    })
```
</br>


**destroy**

Delete a wiki page by name. Parameters are `wikiTitle`

```typescript
wrapper.wiki.destroy('fox')
    .then((response) => {
        console.log(response);
    })
```
</br>


**lockWiki**

Lock a wiki by title. Parameters are `wikiTitle`

```typescript
wrapper.wiki.lockWiki('fox')
    .then((response) => {
        console.log(response);
    })

```
</br>


**revertWiki**

Revert a wiki back to a previous version by title. Parameters are `wikiTitle` and `version`

```typescript
wrapper.wiki.revertWiki('fox', 15)
    .then((response) => {
        console.log(response);
    })

```
</br>


**updateWikiBody**

Update a wiki page's body. Parameters are `wikiTitle` and `newBody`

```typescript
wrapper.wiki.updateWikiBody('fox', 'I think foxes are pretty cool')
    .then((response) => {
        console.log(response);
    })
```
</br>


**updateWikiTitle**

Update a wiki page's title. Parameters are `currentTitle` and `newTitle`

```typescript

wrapper.wiki.updateWikiTitle('fox', 'fox(species)')
    .then((response) => {
        console.log(response);
    })
```
</br>


**unlockWiki**

Unlock a wiki by title. Parameters are `wikiTitle`

```typescript
wrapper.wiki.unlockWiki('fox')
    .then((response) => {
        console.log(response);
    })

```
</br>
</br>

## Unavailable Endpoints

Most of the `Wiki` endpoints that are not supported are due to the fact that they cause internal server errors or do not actually work like they state.

### History

**History**
The base URL is /wiki/history.xml.
</br>

### List

**List**
The base URL is /wiki/index.json. This retrieves a list of every wiki page.

The API documentation states the `queries` are supported but this is **false**