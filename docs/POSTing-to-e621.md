# POSTing to e621 API

## How-to

e621 requires you to use the `form` header for POSTing data:

```typescript
        let options = {
            uri: url,
            headers: {
                'User-Agent': 'my-user-agent',
                'content-type': 'application/x-www-form-urlencoded'
            },
            json: true,
            // this is your data you are POSTing to e621
            form: postObject
        };
```

## Typical Response

Responses from the e621 API typically look like this:

**On Error**
```JSON
{ success: false, reason: 'Error Reason' }
```


**On Success**
```JSON
{ success: true }
// ... Any additional information about the endpoint-specific POST results will also be returned
```


## Notes

- You **must** provide a meaningful User-Agent to the API or your POST request will be denied

- Sending POST messages to the e621 varies endpoint to endpoint but you need at provide two **required** properties in your `form` POST object:

```typescript
postObject.login = "YOUR_E621_USER_NAME";
postObject.password_hash = "YOUR_API_KEY";
```

This is typically not reuqired unless you are using this api-wrapper in a custom way, this is mostly so I don't forget how this API is finnicky with POSTing

- When POSTing with information, any properties that look like this: `post[source]` are to be used in the POST object like so:

```typescript
    formOptions = {
        "post[tags]": "your tags space_delimited",
        "post[source]": "source url where the image came from, can be blank but is required",
        "post[rating]": "rating string",
        "post[file]": "multipart form/file stream"
    };
```
