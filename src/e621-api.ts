import * as request from 'request'
import { generateAPIKeyURL, requestUrl } from './utils';
import { subClassOptions } from './interfaces'

import Tags from './subComponents/Tags';
import Posts from './subComponents/Posts';
import { RequestServices } from './RequestService';

declare const Promise: any;

// TODO: Fill in ALL API endpoints
// TODO: Document all of the class endpoints so the user knows what they do
// TODO: Get logins working in a better way

export default class e621 {
    private userAgent: string;
    private pageLimit: number;
    public requestservices: RequestServices;
    public tags: Tags;
    public posts: Posts;

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
        this.tags = new Tags(this.pageLimit, this.requestservices);
        this.posts = new Posts(this.userAgent, this.pageLimit);
    }

    public get agent() { return this.userAgent; }
    public get limit() { return this.pageLimit; }

}