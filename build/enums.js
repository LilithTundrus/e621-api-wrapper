"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var e621ResponseCodes;
(function (e621ResponseCodes) {
    /**200, Everything worked out ok
 * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["OK"] = 200] = "OK";
    /**403, You don't have access to that resource
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    /**404, this is not the address you were looking for
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    /**420, Record could not be saved
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["INVALID_RECORD"] = 420] = "INVALID_RECORD";
    /**421, User is throttled, try again later
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["USER_THROTTLED"] = 421] = "USER_THROTTLED";
    /**422, The resource is locked and cannot be modified
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["LOCKED"] = 422] = "LOCKED";
    /**423, Resource already exists
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["ALREADY_EXISTS"] = 423] = "ALREADY_EXISTS";
    /**424, The given parameters were invalid
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["INVALID_PARAMETERS"] = 424] = "INVALID_PARAMETERS";
    /**500, Something went wrong
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["INTERNAL_SERVERERROR"] = 500] = "INTERNAL_SERVERERROR";
    /**502, Gateway received invalid response from server
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    /**503, Server cannot currently handle the request or you have exceeded the request rate limit. Try again later or decrease your rate of request
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    /**520, Unexpected server response which violates protocol
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["UNKNOWN_ERROR"] = 520] = "UNKNOWN_ERROR";
    /**522, CloudFlare's attempt to connect to the e621 servers timed out
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["ORIGIN_CONNECTION_TIMEOUT_BEFORE"] = 522] = "ORIGIN_CONNECTION_TIMEOUT_BEFORE";
    /**524, A connection was established between CloudFlare and the e621 servers, but it timed out before an HTTP response was received
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["ORIGIN_CONNECTION_TIMEOUT_AFTER"] = 524] = "ORIGIN_CONNECTION_TIMEOUT_AFTER";
    /**525, The SSL handshake between CloudFlare and the e621 servers failed
     * @memberof e621ResponseCodes*/
    e621ResponseCodes[e621ResponseCodes["SLL_HANDSHAKE_FAILED"] = 525] = "SLL_HANDSHAKE_FAILED";
})(e621ResponseCodes = exports.e621ResponseCodes || (exports.e621ResponseCodes = {}));
var e621TagTypes;
(function (e621TagTypes) {
    /** General tag, anything NOT a character, artist or species
 * @memberof e621TagTypes
*/
    e621TagTypes[e621TagTypes["general"] = 0] = "general";
    /** Artist name tag (EX= zonk_punch)
     * @memberof e621TagTypes
    */
    e621TagTypes[e621TagTypes["artist"] = 1] = "artist";
    /** Type of copyright the work falls under
     * @memberof e621TagTypes
    */
    e621TagTypes[e621TagTypes["copyright"] = 3] = "copyright";
    /** Name of a character in the post (EX= lucario)
     * @memberof e621TagTypes
    */
    e621TagTypes[e621TagTypes["character"] = 4] = "character";
    /** Type of species in the post (EX= fox, )
     * @memberof e621TagTypes
    */
    e621TagTypes[e621TagTypes["species"] = 5] = "species";
})(e621TagTypes = exports.e621TagTypes || (exports.e621TagTypes = {}));
var e621PopularityEndpointTypes;
(function (e621PopularityEndpointTypes) {
    /** Daily popularity endpoint
     * @memberof e621PopularityEndpointTypes
    */
    e621PopularityEndpointTypes[e621PopularityEndpointTypes["daily"] = 0] = "daily";
    /** Weekly popularity endpoint
     * @memberof e621PopularityEndpointTypes
    */
    e621PopularityEndpointTypes[e621PopularityEndpointTypes["weekly"] = 1] = "weekly";
    /** Monthly popularity endpoint
     * @memberof e621PopularityEndpointTypes
    */
    e621PopularityEndpointTypes[e621PopularityEndpointTypes["monthly"] = 2] = "monthly";
})(e621PopularityEndpointTypes = exports.e621PopularityEndpointTypes || (exports.e621PopularityEndpointTypes = {}));
var e621PopularityStrings;
(function (e621PopularityStrings) {
    e621PopularityStrings[e621PopularityStrings["daily"] = 0] = "daily";
    e621PopularityStrings[e621PopularityStrings["wwekly"] = 1] = "wwekly";
    e621PopularityStrings[e621PopularityStrings["monthly"] = 2] = "monthly";
    e621PopularityStrings[e621PopularityStrings["alltime"] = 3] = "alltime";
})(e621PopularityStrings = exports.e621PopularityStrings || (exports.e621PopularityStrings = {}));
