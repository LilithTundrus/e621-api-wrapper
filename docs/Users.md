# Users

Relatively few methods are exposed for users, below is **all** user methods for the API

</br>

## GET Methods

**getUserInfoByID**

Get a user's info by their `userID`

```typescript
wrapper.users.getUserInfoByID(12345)
    .then((response) => {
        console.log(response[0].name);
    })
```
</br>

**getUserInfoByName**

Get a user's info by their `userName`

```typescript
wrapper.users.getUserInfoByName('test')
    .then((response) => {
        console.log(response[0].name);
    })
```
</br>

**listUsers**

List users that match an optional `level?` or `order?`

```typescript
wrapper.users.listUsers(e621UserLevels.Member, 'date')
    .then((response) => {
        console.log(response);
    })
```
</br>
</br>

## POST methods

### NONE