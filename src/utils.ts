import { e621ResponseCodes, e621TagTypes, e621PopularityStrings, e621RelatedTagArrayTypes } from './enums';
import { e621PostData, e621TagJSON, e621MD5CheckJSON } from './interfaces';
import * as request from 'request';
declare const Promise: any;

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
export function paginateE621Endpoint(urlWithoutPageNum: string, start: number, limit: number, pageArray: Array<Array<e621PostData>>, userAgent: string): Promise<Array<Array<e621PostData>>> {
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
export function getPostByID(postID: string, userAgent: string) {
    return requestUrl(`https://e621.net/post/show.json?id=${postID}`, userAgent)
        .then((response: e621PostData[]) => {
            return response;
        })
        .catch((err) => {
            throw Error(err);
        })
}

/**
 * Get a post's data by its MD5 using the e621 API
 * @param {number} md5String 
 * @param {string} userAgent 
 * @returns {Promise}
 */
export function getPostByMD5(md5String: string, userAgent: string) {
    return requestUrl(`https://e621.net/post/show.json?md5=${md5String}`, userAgent)
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
export function requestUrl(url: string, userAgent: string): Promise<any> {
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

export function postUrl(url: string, userAgent: string, postObject: Object): Promise<Object> {
    let options = {
        uri: url,
        headers: {
            'User-Agent': userAgent
        },
        json: true,
        body: postObject
    };
    return new Promise((resolve, reject) => {
        request.post(options, function (err: Error, response, body) {
            if (err) {
                return reject(err);
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
export function generateAPIKeyURL(username: string, password: string): string {
    return `https://e621.net/user/login.json?name="${username}"&password="${password}"`;
}