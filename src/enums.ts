
export enum e621ResponseCodes {
    /**200, Everything worked out ok
 * @memberof e621ResponseCodes*/
    OK = 200,
    /**403, You don't have access to that resource
     * @memberof e621ResponseCodes*/
    FORBIDDEN = 403,
    /**404, this is not the address you were looking for
     * @memberof e621ResponseCodes*/
    NOT_FOUND = 404,
    /**420, Record could not be saved
     * @memberof e621ResponseCodes*/
    INVALID_RECORD = 420,
    /**421, User is throttled, try again later
     * @memberof e621ResponseCodes*/
    USER_THROTTLED = 421,
    /**422, The resource is locked and cannot be modified
     * @memberof e621ResponseCodes*/
    LOCKED = 422,
    /**423, Resource already exists
     * @memberof e621ResponseCodes*/
    ALREADY_EXISTS = 423,
    /**424, The given parameters were invalid
     * @memberof e621ResponseCodes*/
    INVALID_PARAMETERS = 424,
    /**500, Something went wrong
     * @memberof e621ResponseCodes*/
    INTERNAL_SERVERERROR = 500,
    /**502, Gateway received invalid response from server
     * @memberof e621ResponseCodes*/
    BAD_GATEWAY = 502,
    /**503, Server cannot currently handle the request or you have exceeded the request rate limit. Try again later or decrease your rate of request
     * @memberof e621ResponseCodes*/
    SERVICE_UNAVAILABLE = 503,
    /**520, Unexpected server response which violates protocol
     * @memberof e621ResponseCodes*/
    UNKNOWN_ERROR = 520,
    /**522, CloudFlare's attempt to connect to the e621 servers timed out
     * @memberof e621ResponseCodes*/
    ORIGIN_CONNECTION_TIMEOUT_BEFORE = 522,
    /**524, A connection was established between CloudFlare and the e621 servers, but it timed out before an HTTP response was received
     * @memberof e621ResponseCodes*/
    ORIGIN_CONNECTION_TIMEOUT_AFTER = 524,
    /**525, The SSL handshake between CloudFlare and the e621 servers failed
     * @memberof e621ResponseCodes*/
    SLL_HANDSHAKE_FAILED = 525,
}

export enum e621TagTypes {
    /** General tag, anything NOT a character, artist or species
    * @memberof e621TagTypes
    */
    general = 0,

    /** Artist name tag (EX= zonk_punch)
     * @memberof e621TagTypes
    */
    artist = 1,

    /** Type of copyright the work falls under
     * @memberof e621TagTypes
    */
    copyright = 3,

    /** Name of a character in the post (EX= lucario)
     * @memberof e621TagTypes
    */
    character = 4,

    /** Type of species in the post (EX= fox, )
     * @memberof e621TagTypes
    */
    species = 5
}

export enum e621TagStrings {
    'general',
    'artist',
    'copyright',
    'character',
    'species'
}

export enum e621PopularityEndpointTypes {
    /** Daily popularity endpoint
     * @memberof e621PopularityEndpointTypes
    */
    daily = 0,
    /** Weekly popularity endpoint
     * @memberof e621PopularityEndpointTypes
    */
    weekly = 1,
    /** Monthly popularity endpoint
     * @memberof e621PopularityEndpointTypes
    */
    monthly = 2,
}

export enum e621PopularityStrings {
    'daily' = 0,
    'weekly' = 1,
    'monthly' = 2,
    'alltime' = 3
}

// These tag types are for the method getRelatedTagsByName from e721-api.ts
export enum e621RelatedTagArrayTypes {
    'name' = 0,
    'count' = 1,
    'type' = 2
}

export enum e621UserLevels {
    'Unactivated' = 0,
    'Blocked' = 10,
    'Member' = 20,
    'Privileged' = 30,
    'Former Staff' = 34,
    'Contributor' = 33,
    'Janitor' = 35,
    'Mode' = 40,
    'Admin' = 50
}

export enum e621ForumPostReasons {
    'General' = 1,
    'Site Bug Reports & Feature Requests' = 11,
    'Tag Alias and Implication Suggestions' = 2,
    'Tag/Wiki Projects and Questions' = 10,
    'Art Talk' = 3,
    'Off Topic' = 5,
    'e621 Tools and Applications' = 9
}