import * as request from 'request'
import { generateAPIKeyURL, requestUrl } from './utils';

import Tags from './subComponents/Tags';
import Posts from './subComponents/Posts';

declare const Promise: any;

// TODO: Fill in ALL API endpoints
// TODO: Document all of the class endpoints so the user knows what they do
// TODO: Get logins working

export default class e621 {
    private userAgent: string;
    private userName: string;
    private apiKey: string;
    private pageLimit: number;
    public tags: Tags;
    public posts: Posts;

    public constructor(userAgent: string, userName?: string, apiKey?: string, pageLimit?: number) {
        this.userAgent = userAgent;
        if (pageLimit) this.pageLimit = pageLimit;
        else this.pageLimit = 3;
        if (userName && apiKey) {
            this.userName = userName;
            this.apiKey = apiKey
        }
        this.tags = new Tags(this.userAgent, this.pageLimit, this.userName, this.apiKey);
        this.posts = new Posts(this.userAgent, this.pageLimit);

        // set the API key and username to be used with all requests/posts if one is given 
    }

    public get agent() { return this.userAgent; }
    public get limit() { return this.pageLimit; }

    /** Used to get the api key
     * 
     * WARNING: This is dangerous to use without encryption and can lead to user data leakage. Only use via enrypted methods.
     * @param {String} username e621 username
     * @param {String} password password (only needed to generate the key)
     */
    public getApiKey(username: string, password: string): Promise<string> {
        let userAgent = this.userAgent
        return new Promise(function (resolve, reject) {
            const url = generateAPIKeyURL(username, password);
            requestUrl(url, userAgent)
                .then((response) => {
                    resolve(response.password_hash);
                })
                .catch((err) => {
                    throw Error(err);
                })
        });
    }

    // this is how we allow a user to GET/POST as themselves
    public setApiKey() {

    }
}