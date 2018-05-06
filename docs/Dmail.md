# Dmail

Dmail is e621's personal emailing/message sending system. It's internal to the site but can provide a lot of functionality. Dmail is a very odd and special endpoint, it redirects on success which is very abnormal.

You must be logged in for any and all Dmail opersations

</br>

## GET Methods

**getAllMail**

List all of your mail (inbox and outbox). Parameters are `page?`

```typescript
wrapper.dmail.getAllMail()
    .then((response) => {
        console.log(response[0].body);
    })
```
</br>


**getDmailByID**

Get a single dmail by ID. Parameters are `dmailID`

```typescript
wrapper.dmail.getDmailByID(1145)
    .then((response) => {
        console.log(response.from);
    })
```
</br>


**getHidden**

Get all of your hidden mail. Parameters are `page?`

```typescript
wrapper.dmail.getHidden(2)
    .then((response) => {
        console.log(response[0];
    })
```
</br>


**getInbox**

Get all dmail in your inbox. Parameters are `page?`

```typescript
wrapper.dmail.getInbox()
    .then((response) => {
        console.log(response);
    })
```
</br>


**getOutbox**

Get all mail in your outbox. Parameters are `page?`

```typescript
wrapper.dmail.getOutbox(2)
    .then((response) => {
        console.log(response);
    })

```
</br>


**searchAllMail**

Search all of your mail for any damil that matches the given query. Parameters are `query` and `page?`

```typescript
wrapper.dmail.searchAllMail('fox')
    .then((response) => {
        console.log(response);
    })
```
</br>


**searchInbox**

Search your inbox for any damil that matches the given query. Parameters are `query` and `page?`

```typescript
wrapper.dmail.searchInbox('bear', 2)
    .then((response) => {
        console.log(response);
    })
```
</br>


**searchOutbox**

Search your outbox for any damil that matches the given query. Parameters are `query` and `page?`


```typescript
wrapper.dmail.searchOutbox('tiger', 1)
    .then((response) => {
        console.log(response);
    })
```
</br>
</br>

## POST Methods

**create**

Create a dmail (that is not a reply to a previous dmail). Parameters are `to`, `title` and `body`

```typescript
wrapper.dmail.create('you', 'hello', 'how are you?')
    .then((response) => {
        console.log(response);
    })
```
</br>


**hideAll**

Hide all of your mail. 

```typescript
wrapper.dmail.hideAll()
    .then((response) => {
        console.log(response);
    })
```
</br>


**hideDmail**

Hide a single dmail by ID. Parameters are `dmailID`

```typescript
wrapper.dmail.hideDmail(12345)
    .then((response) => {
        console.log(response);
    })
```
</br>


**markAllAsRead**

Mark all of your inbox mail as read

```typescript
wrapper.dmail.markAllAsRead()
    .then((response) => {
        console.log(response);
    })
```
</br>


**responsdToParent**

Respond to a prent dmail. Parameters are `to`, `title`,`body` and `parentID`

```typescript
wrapper.dmail.responsdToParent('you', 'hey', 'I\'m doing okay', 12234)
    .then((response) => {
        console.log(response);
    })
```
</br>


**unhideAll**

Unhide any hidden dmail messages.

```typescript
wrapper.dmail.unhideAll()
    .then((response) => {
        console.log(response);
    })
```
</br>


**unhideDmail**

Unhide a single dmail by ID. Parameters are `dmailID`

```typescript
wrapper.dmail.unhideDmail(12345)
    .then((response) => {
        console.log(response);
    })
```
</br>
</br>

## Unavailable Endpoints

Some dmail endpoints aren't exposed through the wrapper for sorting mail.

<br>

You can always access these using the `requestServices` part of the wrapper.


### List

The following List parameters are not yet supported

**from_name**  - Returns dmails sent from the user with the given username.
**to_name**  - Returns dmails sent to the user with the given username.
**date_start**  - Returns dmails sent on or after the given date. Format is yyyy-mm-dd.
**date_end** - Returns dmails sent before the given date. Format is yyyy-mm-dd.