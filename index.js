"use strict";
exports.__esModule = true;
var enums_1 = require("./enums");
var request = require("request");
var e621 = /** @class */ (function () {
    function e621(userAgent, pageLimit) {
        this.userAgent = userAgent;
        if (pageLimit) {
            this.pageLimit = pageLimit;
        }
        else {
            this.pageLimit = 3;
        }
    }
    e621.prototype.generateE621PostUrl = function (postID) {
        return "https://e621.net/post/show/" + postID + "/";
    };
    e621.prototype.getPopularPosts = function (typeArg) {
        var url;
        switch (typeArg) {
            case 0:
                url = "https://e621.net/post/popular_by_day.json";
                break;
            case 1:
                url = "https://e621.net/post/popular_by_week.json";
                break;
            case 2:
                url = "https://e621.net/post/popular_by_month.json";
                break;
            // Not ready yet
            case 3:
                url = "https://e621.net/post/index.json?tags= order:favcount";
                break;
            default:
                throw Error("Unsupported popularURLHandler typeArg: " + typeArg);
        }
        return requestUrl(url, this.userAgent)
            .then(function (response) {
            return response;
        })["catch"](function (err) {
            throw Error(err);
        });
    };
    /**
     * Get a post's data by its ID using the e621 API
     * @param {number} postID
    */
    e621.prototype.getE621PostByID = function (postID) {
        return getPostByID(postID, this.userAgent);
    };
    e621.prototype.getE621PostIndexPaginate = function (tags, start, limitPerPage, pageLimit) {
        var tagsString;
        var pageStart;
        var limitString;
        var pageLimitTemp;
        if (!tags) {
            tagsString = '';
        }
        else {
            tagsString = "tags=" + tags;
        }
        if (!start) {
            pageStart = 1;
        }
        else {
            pageStart = start;
        }
        if (!limitPerPage) {
            limitString = '50';
        }
        else {
            limitString = limitPerPage;
        }
        if (!pageLimit) {
            pageLimitTemp = this.pageLimit;
        }
        else {
            pageLimitTemp = pageLimit;
        }
        var dataArray = []; // Empty array, likely not needed but eh?
        return paginateE621Endpoint("https://e621.net/post/index.json?" + tagsString + "&limit=" + limitString, start, pageLimit, dataArray, this.userAgent);
    };
    /**
     * Used to get the api key
     * @param {String} username e621 username
     * @param {String} password password (only needed to generate the key)
    */
    e621.prototype.getApiKey = function (username, password) {
        var userAgent = this.userAgent;
        return new Promise(function (resolve, reject) {
            var url = generateAPIKeyURL(username, password);
            requestUrl(url, userAgent).then(function (response) {
                resolve(response.password_hash);
            });
        });
    };
    return e621;
}());
exports.e621 = e621;
/**
 * Request an E621 URL endpoint and recursively get all pages of information up to the limit set
 *
 * Note: Page 0 and 1 are the same results so we start at 1, not 0 (Sorry)
 *
 * Note: For some endpoints the maximum is 750 pages (which should be fine)
 * @param {String} urlWithoutPageNum
 * @param {Number} start
 * @param {Number} limit
 * @param {Array<Array<e621PostData>>} pageArray
 * @param {string} userAgent
 * @returns {Array<Array<e621PostData>>} Returns a 2D array
 */
function paginateE621Endpoint(urlWithoutPageNum, start, limit, pageArray, userAgent) {
    return requestUrl(urlWithoutPageNum + "&page=" + start, userAgent)
        .then(function (response) {
        if (response.length !== 0 && limit !== start) {
            pageArray.push(response);
            return paginateE621Endpoint(urlWithoutPageNum, start + 1, limit, pageArray, userAgent);
        }
        else {
            // still push the last response!
            if (response.length !== 0) {
                pageArray.push(response);
            }
            return pageArray;
        }
    })["catch"](function (err) {
        throw Error(err);
    });
}
/**
 * Get a post's data by its ID using the e621 API
 * @param {number} postID
 * @param {string} userAgent
 * @returns {Promise}
 */
function getPostByID(postID, userAgent) {
    return requestUrl("https://e621.net/post/show.json?id=" + postID, userAgent)
        .then(function (response) {
        return response;
    })["catch"](function (err) {
        throw Error(err);
    });
}
/**
 * Request an e621 URL using constant headers (user-agent, etc.)
 * @param {URL} url
 * @returns {Promise<any>}
 */
function requestUrl(url, userAgent) {
    // set up the options so we don't have to constantly redefine our user agent
    var options = {
        uri: url,
        headers: {
            'User-Agent': userAgent
        },
        json: true
    };
    return new Promise(function (resolve, reject) {
        request.get(options, function (err, response, body) {
            if (err) {
                return reject(err);
            }
            if (response.statusCode !== enums_1.e621ResponseCodes.OK) {
                return reject('GET did not return OK');
            }
            // typescript wouldn't leave me alone on this
            if (response.statusCode == enums_1.e621ResponseCodes.FORBIDDEN.valueOf()) {
                return reject('Incorrect password given');
            }
            return resolve(body);
        });
    });
}
/**
 * Generate the e621 URL for getting a user's API key
 * @param {String} username
 * @param {String} password
 * @returns {String}
 */
function generateAPIKeyURL(username, password) {
    return "https://e621.net/user/login.json?name=\"" + username + "\"&password=\"" + password + "\"";
}
