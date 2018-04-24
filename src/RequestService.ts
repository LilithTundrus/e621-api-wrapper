import { e621ResponseCodes, e621TagTypes, e621PopularityStrings, e621RelatedTagArrayTypes } from './enums';
import { e621PostData, e621TagJSON, e621MD5CheckJSON } from './interfaces';
import * as request from 'request';
declare const Promise: any;

//  This is how we will allow for per-class usage of the same instance with the same autorization
export class RequestServices {
    private userAgent: string;
    private userName: string;
    private apiKey: string;

    public constructor(userAgent: string, userName?: string, apiKey?: string) {
        this.userAgent = userAgent;
        if (userName && apiKey) {
            this.userName = userName;
            this.apiKey = apiKey;
        } else {
            // de-initialize the vars that are checked for GET and POST requests
            this.userName = null;
            this.apiKey = null;
        }
    }

    /** Request an e621 URL using constant headers (user-agent, etc.)
     * @param {URL} url 
     * @returns Promise<any>
     */
    public get(url: string): Promise<any> {
        let options = {
            uri: url,
            headers: {
                'User-Agent': this.userAgent
            },
            json: true
        };
        console.log(url)
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

    // post method goes here
    public post(url: string, postObject: any): Promise<object> {
        let options: object
        options = {
            uri: url,
            headers: {
                'User-Agent': this.userAgent,
                'content-type': 'application/x-www-form-urlencoded'
            },
            json: true,
            form: postObject
        };
        if (this.userName && this.apiKey) {
            postObject.login = this.userName;
            postObject.password_hash = this.apiKey;
        }
        console.log(url);
        console.log(options)
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
    public paginateE621Endpoint(urlWithoutPageNum: string, start: number, limit: number, pageArray: Array<Array<e621PostData>>): Promise<Array<Array<e621PostData>>> {
        return this.get(`${urlWithoutPageNum}&page=${start}`)
            .then((response: Array<e621PostData>) => {
                if (response.length !== 0 && limit !== start) {
                    pageArray.push(response);
                    return this.paginateE621Endpoint(urlWithoutPageNum, start + 1, limit, pageArray);
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
}