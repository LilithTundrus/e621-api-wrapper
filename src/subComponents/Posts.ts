import { e621PostData, e621MD5CheckJSON } from '../interfaces';
import { RequestServices } from '../RequestService';
import { e621PopularityStrings } from '../enums';

export default class Posts {
    private pageLimit: number;
    private requestServices: RequestServices;
    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    create() {
        // Create e621 post API endpoint
        // We'll want to make all required paramaters are provided here
        return this.requestServices.post('https://httpbin.org/anything', { "hello": "test" })
    }

    update(postID: string) {
        // Update e621 post API endpoint
    }

    /**Check if a post exists by MD5 hash string
     * @param {string} md5String 
     * @memberof e621
     */
    checkIfExists(md5String: string): Promise<e621MD5CheckJSON> {
        return this.requestServices.get(`https://e621.net/post/check_md5.json?md5=${md5String}`)
            .then((response: e621MD5CheckJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    flagForDelete() {
        // post/flag.json --flag a post for delete through this method
    }

    delete() {
        // The base URL is /post/destroy.json
    }

    /** Navigate through deleted posts, delreason being populated.
     * @param {number} [page] Page number to return (if more than 1)
     * @param {(number | string)} [userID] Return posts uploaded by the user with the given ID number.
     * @memberof e621
     */
    getDeletedIndex(page?: number, userID?: number | string): Promise<e621PostData[]> {
        // Make sure we have a default
        if (!page) page = 1;
        if (userID) {
            return this.requestServices.get(`https://e621.net/post/deleted_index.json?page=${page}&user_id=${userID}`)
                .then((response: e621PostData[]) => {
                    return response;
                })
                .catch((err) => {
                    throw Error(err);
                })
        } else {
            return this.requestServices.get(`https://e621.net/post/deleted_index.json?page=${page}`)
                .then((response: e621PostData[]) => {
                    return response;
                })
                .catch((err) => {
                    throw Error(err);
                })
        }
    }

    revertTags() {
        //  This action reverts a post to a previous set of tags. The base URL is /post/revert_tags.json.
    }

    // TODO: figure out if this is a POST or GET and if you need to be logged in
    vote() {
        // This action lets you vote for a post. 
        // You can only vote once per post per IP address. The base URL is /post/vote.json.
        return this.requestServices.post('https://e621.net/post/vote.json?id=1504549&score=1')
    }

    /** Generate a post's URL by its ID
     * @param {(string | number)} postID ID of the e621 post (Can be pulled from the API)
     * @returns {string} 
     * @memberof e621
     */
    generateUrl(postID: string | number): string {
        return `https://e621.net/post/show/${postID}/`;
    }

    /** Get popular posts for a given timeframe by providing a *e621PopularityStrings* typeArg
     * @param {e621PopularityStrings} typeArg Type of popular endpoint to use
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
                url = `https://e621.net/post/index.json?tags=order:favcount`;
                break;
            default:
                throw Error(`Unsupported popularURLHandler typeArg: ${typeArg}`);
        }
        return this.requestServices.get(url)
            .then((response: [e621PostData]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a post's data by its ID
     * @param {number} postID ID of the e621 post
     */
    getByID(postID: string) {
        return this.requestServices.get(`https://e621.net/post/show.json?id=${postID}`)
            .then((response: e621PostData[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a post's data by its MD5 hash string
     * @param {stirng} md5String 
     */
    getByMD5(md5String: string) {
        return this.requestServices.get(`https://e621.net/post/show.json?md5=${md5String}`)
            .then((response: e621PostData[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a set of e621 posts filtered by tags via pagination
     * @param {string} tags The tags to filter results by - providing an empty string or NULL value will get RECENT posts
     * @param {number} start Page number to start at
     * @param {number} limitPerPage Number of results per page (Max of 75)
     * @param {number} pageLimit Number of pages to get (Max of 750)
     * @memberof e621
     */
    getIndexPaginate(tags?: string, start?: number, limitPerPage?: number, pageLimit?: number) {
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
        return this.requestServices.paginateE621Endpoint(`https://e621.net/post/index.json?${tagsString}&limit=${limitString}`, start, pageLimit, dataArray);
    }
}