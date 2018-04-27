import * as request from 'request'
import Tags from './subComponents/Tags';
import Posts from './subComponents/Posts';
import Artists from './subComponents/Artists';
import Comments from './subComponents/Comments';

import { RequestServices } from './RequestService';

declare const Promise: any;

export default class e621 {
    private userAgent: string;
    private pageLimit: number;
    // these delcarations are how we attach new classes to properties
    public requestservices: RequestServices;
    public tags: Tags;
    public posts: Posts;
    public artists: Artists;
    public comments: Comments;

    /**
     * Creates an instance of e621.
     * @param {string} userAgent This identifies you to the API
     * @param {string} [userName] Your user name (optional, if making changes to data)
     * @param {string} [apiKey] Your API key to use (optional, if making changes to data)
     * @param {number} [pageLimit] Page limit for paginated calls from e621
     * @memberof e621
     */
    public constructor(userAgent: string, userName?: string, apiKey?: string, pageLimit?: number) {
        this.userAgent = userAgent;
        if (pageLimit) this.pageLimit = pageLimit;
        else this.pageLimit = 3;
        if (userName && apiKey) {
            this.requestservices = new RequestServices(userAgent, userName, apiKey);
        } else {
            // we won't send the RequestServices a username + hash if they are not given
            this.requestservices = new RequestServices(userAgent);
        }
        // assign the properties as new classes with the page limit and the methods for get/post 
        // operations as arguments
        this.tags = new Tags(this.pageLimit, this.requestservices);
        this.posts = new Posts(this.pageLimit, this.requestservices);
        this.artists = new Artists(this.pageLimit, this.requestservices);
        this.comments = new Comments(this.pageLimit, this.requestservices);
    }

    public get agent() { return this.userAgent; }
    public get limit() { return this.pageLimit; }
}