import { e621ResponseCodes, e621TagTypes, e621PopularityStrings, e621RelatedTagArrayTypes } from './enums';
import { e621PostData, e621TagJSON } from './interfaces';
import * as request from 'request';
declare const Promise: any;

// TODO: Fill in ALL API endpoints
// TODO: Actually allow for class-external definitions for page limits/etc.
// TODO: Document all of the class endpoints so the user knows what they do

export default class e621 {
    private userAgent: string;
    private pageLimit: number;
    public constructor(userAgent: string, pageLimit?: number) {
        this.userAgent = userAgent;
        if (pageLimit) {
            this.pageLimit = pageLimit;
        } else {
            this.pageLimit = 3;
        }
    }

    /**
     * Used to get the api key
     * 
     * WARNING: This is dangerous to use without encryption and can lead to user data leakage. Only use via enrypted methods.
     * @param {String} username e621 username
     * @param {String} password password (only needed to generate the key)
     */
    getApiKey(username: string, password: string): Promise<string> {
        let userAgent = this.userAgent
        return new Promise(function (resolve, reject) {
            const url = generateAPIKeyURL(username, password);
            requestUrl(url, userAgent).then((response) => {
                resolve(response.password_hash);
            });
        });
    }

    /**
     * Get an e621 tag's JSON by name
     * @param {string} tagName 
     * @memberof e621
     */
    getTagJSONByName(tagName: string): Promise<e621TagJSON[]> {
        return requestUrl(`https://e621.net/tag/index.json?name=${tagName}`, this.userAgent)
            .then((response: e621TagJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /**
     * Get a set of related tags by providing a valid e621 tag. Returns a 2D array. This may change in the future
     * @param {string} tagName the tag to get related results for
     * @memberof e621
     */
    getRelatedTagsByName(tagName: string): Promise<Array<Array<string>> | null> {
        return requestUrl(`https://e621.net/tag/related.json?tags=${tagName}`, this.userAgent)
            .then((response) => {
                // We are going to have to modify this a bit before giving it to the user
                let key = Object.keys(response)[0];
                let data: Array<Array<string>> = response[key];
                return data;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    // #region POST Endpoints

    /**
     * Generate a post's URL by its ID
     * @param {(string | number)} postID ID of the e621 post (Can be pulled from the API)
     * @returns {string} 
     * @memberof e621
     */
    generateE621PostUrl(postID: string | number): string {
        return `https://e621.net/post/show/${postID}/`;
    }

    /**
     * Get popular posts for a given timeframe by providing a *e621PopularityStrings* typeArg
     * @param {e621PopularityStrings} typeArg 
     * @returns {Promise<[e621PostData]>}
     * @memberof e621
     */
    getPopularPosts(typeArg: e621PopularityStrings) {
        let url: string;
        switch (typeArg) {
            case 0:
                url = `https://e621.net/post/popular_by_day.json`;
                break;
            case 1:
                url = `https://e621.net/post/popular_by_week.json`;
                break;
            case 2:
                url = `https://e621.net/post/popular_by_month.json`;
                break;
            // Not ready yet
            case 3:
                url = `https://e621.net/post/index.json?tags= order:favcount`;
                break;
            default:
                throw Error(`Unsupported popularURLHandler typeArg: ${typeArg}`);
        }
        return requestUrl(url, this.userAgent)
            .then((response: [e621PostData]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /**
     * Get a post's data by its ID using the e621 API
     * @param {number} postID 
     */
    getE621PostByID(postID: string) {
        return getPostByID(postID, this.userAgent);
    }

    /**
     * Get a set of e621 pages via pagination
     * @param {string} tags The tags to filter results by
     * @param {number} start Page number to start at
     * @param {number} limitPerPage Number of results per page (Max of 75)
     * @param {number} pageLimit Number of pages to get (Max of 750)
     * @memberof e621
     */
    getE621PostIndexPaginate(tags: string, start: number, limitPerPage: number, pageLimit: number) {
        var tagsString: string;
        var pageStart: number;
        var limitString;
        var pageLimitTemp: number;
        if (!tags) {
            tagsString = '';
        } else {
            tagsString = `tags=${tags}`;
        }
        if (!start) {
            pageStart = 1;
        } else {
            pageStart = start;
        }
        if (!limitPerPage) {
            limitString = '50';
        } else {
            limitString = limitPerPage;
        }
        if (!pageLimit) {
            pageLimitTemp = this.pageLimit;
        } else {
            pageLimitTemp = pageLimit;
        }
        var dataArray = [];                                         // Empty array, likely not needed but eh?
        return paginateE621Endpoint(`https://e621.net/post/index.json?${tagsString}&limit=${limitString}`, start, pageLimit, dataArray, this.userAgent);
    }

    // #endregion
}

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
function paginateE621Endpoint(urlWithoutPageNum: string, start: number, limit: number, pageArray: Array<Array<e621PostData>>, userAgent: string): Promise<Array<Array<e621PostData>>> {
    return requestUrl(`${urlWithoutPageNum}&page=${start}`, userAgent)
        .then((response: Array<e621PostData>) => {
            if (response.length !== 0 && limit !== start) {
                pageArray.push(response);
                return paginateE621Endpoint(urlWithoutPageNum, start + 1, limit, pageArray, userAgent);
            } else {
                // still push the last response!
                if (response.length !== 0) {
                    pageArray.push(response);
                }
                return pageArray;
            }
        })
        .catch((err) => {
            throw Error(err);
        })
}

/**
 * Get a post's data by its ID using the e621 API
 * @param {number} postID 
 * @param {string} userAgent 
 * @returns {Promise}
 */
function getPostByID(postID: string, userAgent: string) {
    return requestUrl(`https://e621.net/post/show.json?id=${postID}`, userAgent)
        .then((response: e621PostData[]) => {
            return response;
        })
        .catch((err) => {
            throw Error(err);
        })
}

/**
 * Request an e621 URL using constant headers (user-agent, etc.)
 * @param {URL} url 
 * @returns {Promise<any>}
 */
function requestUrl(url: string, userAgent: string): Promise<any> {
    // set up the options so we don't have to constantly redefine our user agent
    let options = {
        uri: url,
        headers: {
            'User-Agent': userAgent
        },
        json: true
    };
    return new Promise((resolve, reject) => {
        request.get(options, function (err: Error, response, body) {
            if (err) {
                return reject(err);
            }
            if (response.statusCode !== e621ResponseCodes.OK) {
                return reject('GET did not return OK');
            }
            // typescript wouldn't leave me alone on this
            if (response.statusCode == e621ResponseCodes.FORBIDDEN.valueOf()) {
                return reject('Incorrect password given');
            }
            return resolve(body);
        })
    })
}

/**
 * Generate the e621 URL for getting a user's API key
 * @param {String} username 
 * @param {String} password 
 * @returns {String}
 */
function generateAPIKeyURL(username: string, password: string): string {
    return `https://e621.net/user/login.json?name="${username}"&password="${password}"`;
}