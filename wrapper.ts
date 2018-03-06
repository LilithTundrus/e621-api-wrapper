import { e621ResponseCodes, e621TagTypes } from './enums';
import { e621PostData } from './interfaces';
import *as request from 'request'


class e621 {
    userAgent: string;
    public constructor(userAgent: string) {
        this.userAgent = userAgent;
    }
    generateE621PostUrl(postID: string) {
        return `https://e621.net/post/show/${postID}/`;
    }
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
 * @param {Array} pageArray 
 * @returns {<utils(E621PostData)>} Returns a 2D array
 */
function paginateE621Endpoint(urlWithoutPageNum, start, limit, pageArray, userAgent) {
    return requestUrl(`${urlWithoutPageNum}&page=${start}`, userAgent)
        .then((response) => {
            if (response.length !== 0 && limit !== start) {
                pageArray.push(response);
                return paginateE621Endpoint(urlWithoutPageNum, start + 1, limit, pageArray, userAgent);
            } else {
                // still push the last response!
                if (response.length !== 0) {
                    pageArray.push(response);
                }
                logger.debug(`Done, got ${pageArray.length} pages`);
                return pageArray;
            }
        })
        .catch((err) => {
            logger.error(err);
        })
}

/**
 * Get a post's data by its ID using the e621 API
 * @param {number} postID 
 * @param {string} md5 
 * @returns {Promise}
 */
function getPostByID(postID) {
    return requestUrl(`https://e621.net/post/show.json?id=${postID}`)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            logger.error(err);
        })
}

/**
 * Request an e621 URL using constant headers (user-agent, etc.)
 * @param {String} url 
 * @returns {Promise<Body>}
 */
function requestUrl(url, userAgent) {
    // set up the options so we don't have to constantly redefine our user agent
    let options = {
        uri: url,
        headers: {
            'User-Agent': userAgent
        },
        json: true
    };
    return new Promise((resolve, reject) => {
        request.get(options, function (err, response, body) {
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


