# Blips

Blips are something like public comments/disucssion that aren't forum related.

</br>

## GET Methods

**getBlipByID**

Get a blip's information by ID. Parameters are `blipID`

```typescript
wrapper.blips.getBlipByID(1132)
    .then((response) => {
        console.log(response.body);
    })
```
</br>


**getBlipByText**

Get a set of blips that match a given query. Parameters are `textToMatch` and `page?`

```typescript
wrapper.blips.getBlipByText('fox', 2)
    .then((response) => {
        console.log(response[0]);
    })
```
</br>


**getBlipResponses**

Get all responses (if any) of a blip by ID. Parameters are `blipID` and `page?`

```typescript
wrapper.blips.getBlipResponses(1145, 1)
    .then((response) => {
        console.log(response);
    })
```
</br>


**getRecentBlips**

Get recent blips posted to e621. Parameters are `page?`

```typescript
wrapper.blips.getRecentBlips(3)
    .then((response) => {
        console.log(response);
    })
```
</br>
</br>

## POST methods

**create**

Create a blip. Parameters are `bodyText` and `responseID?`

```typescript
wrapper.blips.create('I have an idea!')
    .then((response) => {
        console.log(response);
    })
```
</br>

**update**

Update a blip. Parameters are `blipID` and `bodyText`

```typescript
wrapper.blips.update(1145, 'I have another idea!')
    .then((response) => {
        console.log(response);
    })
```
</br>
</br>

## Unavailable Endpoints

</br>
Blip endpoints that are not supported are listed below
</br>

You can always access these using the `requestServices` part of the wrapper.


### List 

**status** - Returns hidden blips when set to hidden, visible blips when set to active, or both when set to any. Note that whether or not you can see other user's hidden blips is affected by your permission levels.


### Hide

The base URL is /blip/hide.json.

id Hides the blip with the given ID number.


### Unhide

The base URL is /blip/unhide.json.

id Unhides the blip with the given ID number.