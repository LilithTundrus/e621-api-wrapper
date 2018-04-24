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

    public create() {
        // Create e621 post API endpoint
        // We'll want to make all required paramaters are provided here
        return this.requestServices.post('https://httpbin.org/anything', { "hello": "test" })
    }

    public update(postID: string) {
        // Update e621 post API endpoint
    }

    /**Check if a post exists by MD5 hash string
     * @param {string} md5String 
     * @memberof e621
     */
    public checkIfExists(md5String: string): Promise<e621MD5CheckJSON> {
        return this.requestServices.get(`https://e621.net/post/check_md5.json?md5=${md5String}`)
            .then((response: e621MD5CheckJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    public flagForDelete() {
        // post/flag.json --flag a post for delete through this method
    }

    public delete() {
        // The base URL is /post/destroy.json
    }

    /** Navigate through deleted posts, delreason being populated.
     * @param {number} [page] Page number to return (if more than 1)
     * @param {(number | string)} [userID] Return posts uploaded by the user with the given ID number.
     * @memberof e621
     */
    public getDeletedIndex(page?: number, userID?: number | string): Promise<e621PostData[]> {
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

    public revertTags() {
        //  This action reverts a post to a previous set of tags. The base URL is /post/revert_tags.json.
    }

    /** Vote for a post by ID, Score must be 1 for updvote, -1 for downvote
     * @param {(string | number)} postID 
     * @param {(1 | -1)} score 
     * @returns 
     * @memberof Posts
     */
    public vote(postID: string | number, score: 1 | -1): Promise<any> {
        return this.requestServices.post('https://e621.net/post/vote.json',
            {
                "id": postID, "score": score
            });
    }

    /** Generate a post's URL by its ID
     * @param {(string | number)} postID ID of the e621 post (Can be pulled from the API)
     * @returns {string} 
     * @memberof e621
     */
    public generatePostUrl(postID: string | number): string {
        return `https://e621.net/post/show/${postID}/`;
    }

    /** Get popular posts for a given timeframe by providing a *e621PopularityStrings* typeArg
     * @param {e621PopularityStrings} typeArg Type of popular endpoint to use
     * @returns {Promise<[e621PostData]>}
     * @memberof e621
     */
    public getPopularPosts(typeArg: e621PopularityStrings) {
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
    public getByID(postID: string) {
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
    public getByMD5(md5String: string) {
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
    public getIndexPaginate(tags?: string, start?: number, limitPerPage?: number, pageLimit?: number) {
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

    public getTagHistoryByID() {
        let url = `https://e621.net/post_tag_history/index.xml`;
        return this.requestServices.get(url)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
        //         The base URL is /post_tag_history/index.xml. Due to performance issues, this controller does not use page numbers. Instead, it takes an ID and returns the next/previous [limit] results. To traverse forward (back in time) through multiple pages of results, set the after parameter of the next request to the ID of the last result in the current result set. Or to go backwards (towards more recently) through results, set before to the ID of the first result in the current result set.

        // post_id Filter by post ID.
        // date_start Show only edits after this date (inclusive). Takes most date formats, including 10-digit UNIX timestamps
        // date_end Show only edits before this date (inclusive). Takes most date formats, including 10-digit UNIX timestamps
        // user_id Filter by user ID.
        // user_name Filter by username. Must match exactly, case insensitive.
        // source Filter by source. Wildcard, so 'example' will match 'http://www.example.com/'
        // tags Filter by tags. Wildcard, like above. Caveat: since this is a simple text match against the history entry's tag list, it's best to only use one tag for this field.
        // reason Filter by edit reason. Wildcard, like above.
        // description Filter by description. Wildcard, like above.
        // limit How many results to return at once. Defaults to 100 and limited to 1000.
        // before / after Show the next [limit] results before (higher ID than) or after (lower ID than) the given ID.
    }
}