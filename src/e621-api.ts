import { e621ResponseCodes, e621TagTypes, e621PopularityStrings, e621RelatedTagArrayTypes } from './enums';
import { e621PostData, e621TagJSON, e621MD5CheckJSON } from './interfaces';
import * as request from 'request';
import { paginateE621Endpoint, getPostByID, getPostByMD5, generateAPIKeyURL, requestUrl, postUrl } from './utils';
declare const Promise: any;

// This function can be used as a higher order function for named parameters
const required = () => {
    throw Error('Missing parameter');
};

// TODO: Fill in ALL API endpoints
// TODO: Actually allow for class-external definitions for page limits/etc.
// TODO: Document all of the class endpoints so the user knows what they do
// TODO: Support getting tags/posts by MD5 hash

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
            requestUrl(url, userAgent)
                .then((response) => {
                    resolve(response.password_hash);
                })
                .catch((err) => {
                    throw Error(err)
                })
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
    createPost() {
        // Create e621 post API endpoint
        // We'll want to make all required paramaters are provided here
        return postUrl('https://httpbin.org/anything', this.userAgent, { "hello": "test" })
    }

    updatePost({ postID: string = required() }) {
        // Update e621 post API endpoint
    }

    /**
     * Check if a post exists by MD5 hash string
     * @param {string} md5String 
     * @memberof e621
     */
    checkPostMD5(md5String: string): Promise<e621MD5CheckJSON> {
        return requestUrl(`https://e621.net/post/check_md5.json?md5=${md5String}`, this.userAgent)
            .then((response: e621MD5CheckJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    flagPostForDelete() {
        // post/flag.json --flag a post for delete through this method
    }

    deletePost() {
        // The base URL is /post/destroy.json
    }

    /**
     * Navigate through deleted posts, delreason being populated.
     * @param {number} [page] Page number to return (if more than 1)
     * @param {(number | string)} [userID] Return posts uploaded by the user with the given ID number.
     * @memberof e621
     */
    getDeletedPostIndex(page?: number, userID?: number | string): Promise<e621PostData[]> {
        // Make sure we have a default
        if (!page) page = 1;
        if (userID) {
            return requestUrl(`https://e621.net/post/deleted_index.json?page=${page}&user_id=${userID}`, this.userAgent)
                .then((response: e621PostData[]) => {
                    return response;
                })
                .catch((err) => {
                    throw Error(err);
                })
        } else {
            return requestUrl(`https://e621.net/post/deleted_index.json?page=${page}`, this.userAgent)
                .then((response: e621PostData[]) => {
                    return response;
                })
                .catch((err) => {
                    throw Error(err);
                })
        }
    }

    revertPostTags() {
        //  This action reverts a post to a previous set of tags. The base URL is /post/revert_tags.json.
    }

    // TODO: figure out if this is a POST or GET and if you need to be logged in
    voteForPost() {
        // This action lets you vote for a post. 
        // You can only vote once per post per IP address. The base URL is /post/vote.json.
        return postUrl('https://e621.net/post/vote.json?id=1504549&score=1', this.userAgent)
    }

    /**
     * Generate a post's URL by its ID
     * @param {(string | number)} postID ID of the e621 post (Can be pulled from the API)
     * @returns {string} 
     * @memberof e621
     */
    generatePostUrl(postID: string | number): string {
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
    getPostByID(postID: string) {
        return getPostByID(postID, this.userAgent);
    }

    /**
     * Get a post's data by its MD5 hash string
     * @param {stirng} md5String 
     */
    getPostByMD5(md5String: string) {
        return getPostByMD5(md5String, this.userAgent);
    }

    /**
     * Get a set of e621 posts filtered by tags via pagination
     * @param {string} tags The tags to filter results by - providing an empty string or NULL value will get RECENT posts
     * @param {number} start Page number to start at
     * @param {number} limitPerPage Number of results per page (Max of 75)
     * @param {number} pageLimit Number of pages to get (Max of 750)
     * @memberof e621
     */
    getPostIndexPaginate(tags: string, start?: number, limitPerPage?: number, pageLimit?: number) {
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
