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
        let options: any;

        options = {
            uri: url,
            headers: {
                'User-Agent': this.userAgent
            },
            json: true,
            form: {}
        };

        // The username and hash still go into the form even on a GET for some reaso???
        if (this.userName && this.apiKey) {
            options.form.login = this.userName;
            options.form.password_hash = this.apiKey;
        }

        return new Promise((resolve, reject) => {
            request.get(options, function (err: Error, response, body) {
                if (err) {
                    return reject(err);
                }
                if (response.statusCode !== e621ResponseCodes.OK) {
                    return reject(`GET did not return OK: Code ${response.statusCode}`);
                }
                if (response.statusCode == e621ResponseCodes.FORBIDDEN) {
                    return reject('Incorrect password given');
                }
                return resolve(body);
            });
        })
    }

    /** POST a `postObject` to the e621 API, authorization keys are automatically pulled from the parent class (if any)
     * @param {string} url 
     * @param {*} postObject 
     * @returns {Promise<any>} 
     * @memberof RequestServices
     */
    public post(url: string, postObject: any): Promise<any> {
        let options: any;
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
        return new Promise((resolve, reject) => {
            request.post(options, function (err: Error, response, body) {
                if (err) {
                    return reject(err);
                }
                return resolve(body);
            });
        })
    }

    /**
     * Request an E621 URL endpoint and recursively get all pages of information up to the limit set
     * 
     * Note: Page 0 and 1 are the same results so we start at 1, not 0 (Sorry)
     * 
     * Note: For some endpoints the maximum is 750 pages (which should be fine)
     * @param {String} urlWithoutPageNum URL to paginate (no page number)
     * @param {Number} start Starting page number
     * @param {Number} limit Limit on the number of pages to retrieve
     * @param {Array<any>} pageArray For internal use
     * @returns Promise<Array<any>>
     */
    public paginateE621Endpoint(urlWithoutPageNum: string, start: number, limit: number, pageArray: Array<any>): Promise<Array<any>> {
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