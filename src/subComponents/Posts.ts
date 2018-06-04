import {
    e621PostData, e621MD5CheckJSON,
    e621FavoritedUsers, e621PostTagHistory,
    e621POSTResponse
} from '../interfaces';
import { RequestServices } from '../RequestService';
import { e621PopularityStrings } from '../enums';
import * as fs from 'fs';
import { xmlToJson } from '../lib/xml2json';
import { DOMParser } from 'xmldom'
let parser = new DOMParser();

export default class Posts {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    // // TODO: Have this user rest params, or a custom args object
    // public create(tags: string, source: string, rating: string, file?: string, url?: string) {
    //     let formOptions;
    //     if (file) {
    //         formOptions = {
    //             "post[tags]": tags,
    //             "post[source]": source,
    //             "post[rating]": rating,
    //             "post[file]": fs.createReadStream(file)
    //         };
    //     } else if (url) {
    //         formOptions = {
    //             "post[tags]": tags,
    //             "post[source]": source,
    //             "post[rating]": rating,
    //             "post[url]": url
    //         };
    //     }
    //     // The base URL is /post/create.json. There are only four mandatory fields: you need to supply the tags, and you need to supply the file, either through a multipart form or through a source URL. A source, even if blank, and a rating are also required.

    //     // post[tags] A space delimited list of tags.
    //     // post[file] The file data encoded as a multipart form.
    //     // post[rating] The rating for the post. Can be: safe, questionable, or explicit.
    //     // post[upload_url] If this is a URL, e621 will download the file.
    //     // post[source] This will be used as the post's 'Source' text. Separate multiple URLs with %0A (url-encoded newline) to define multiple sources. Limit of five URLs
    //     // post[description] The description for the post.
    //     // post[is_rating_locked] Set to true to prevent others from changing the rating.
    //     // post[is_note_locked] Set to true to prevent others from adding notes.
    //     // post[parent_id] The ID of the parent post.
    //     // If the call fails, the following response reasons are possible:

    //     // MD5 mismatch This means you supplied an MD5 parameter and what e621 got doesn't match. Try uploading the file again.
    //     // duplicate This post already exists in e621 (based on the MD5 hash). An additional attribute called location will be set, pointing to the (relative) URL of the original post.
    //     // other Any other error will have its error message printed.
    //     // If the post upload succeeded, you'll get an attribute called location in the response pointing to the relative URL of your newly uploaded post.
    //     console.log(formOptions)
    //     return this.requestServices.post('https://e621.net/post/create.json', formOptions)
    // }

    // TODO: split this into stuff like updateSource/etc.
    // public update(postID: string) {
    //     //         The base URL is /post/update.json. Only the id parameter is required. Leave the other parameters blank if you don't want to change them. If submitting the post[tags] parameter, it is recommended to include the post[old_tags] parameter as well because it allows e621 to correctly handle simultaneous edits from multiple users.

    //     // id The ID number of the post to update.
    //     // post[tags] A space delimited list of tags.
    //     // post[old_tags] A space delimited list of tags. Should include the same tags submitted to post[tags] minus any intended changes. Does nothing without post[tags].
    //     // post[rating] The rating for the post. Can be: safe, questionable, or explicit.
    //     // post[source] This will be used as the post's 'Source' text. Separate multiple URLs with %0A (url-encoded newline) to define multiple sources. Limit of five URLs
    //     // post[description] This will be used as the post's 'Description' text.
    //     // post[is_rating_locked] Set to true to prevent others from changing the rating.
    //     // post[is_note_locked] Set to true to prevent others from adding notes.
    //     // post[parent_id] The ID of the parent post.
    //     // reason The reason for the submitted changes. Inline DText allowed.
    // }

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

    // // TODO: Make the flag options an enum or interface
    // public flagForDelete(postID: string | number, flagOptions: string) {
    //     //         The base URL is /post/flag.json. The id and flag_option parameters are required.

    //     // id The ID number of the post to flag for deletion.
    //     // inferior_parent The ID number of the post which is superior to the post being flagged. For duplicates, this should be the ID of the post which is older. Use only when flag_option is set to inferior.
    //     // flag_option Indicates the reason the post should be deleted. Valid values are:
    //     // uploader Uploader requests deletion
    //     // inferior Repost/inferior version of existing post
    //     // 1 Artist is on avoid-posting list
    //     // 2 Post is paysite material
    //     // 3 Uncredited trace
    //     // 4 Real-life pornography
    //     // 5 File corrupted
    //     // 6 Image previously deleted
    // }

    // /** Delete a post by ID, given a reason
    //  * @param {(string | number)} postID ID of the post to delete
    //  * @param {string} reason given reason for deletion
    //  * @param {(1 | null)} mode Set to 1 if you are attempting to permanently destroy this post (will only work if called on an already deleted post).
    //  * @memberof Posts
    //  */
    // public delete(postID: string | number, reason: string, mode?: 1) {
    //     //         The base URL is /post/destroy.json. Both the id and reason parameters are required. The mode parameter is only required (to be 1) if you are attempting to permanently destroy the post (which must be called a second time, after the post has been normally deleted). You must be logged in to use this action. You must also be janitor or higher.

    //     // id The ID number of the post to delete.
    //     // reason The reason you are deleting the post.
    //     // mode Set to 1 if you are attempting to permanently destroy this post (will only work if called on an already deleted post).
    // }

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

    /** Revert a post with the given `postID` to a previous tag history 
     * @param {number} postID ID of the post to revert the tags for
     * @param {number} tagHistoryID ID of the tag history set, can be retrieved by using `posts.getTagHistoryByID` method
     * @returns Promise<e621POSTResponse>
     * @memberof Posts
     */
    public revertTags(postID: number, tagHistoryID: number) {
        let url = `https://e621.net//post/revert_tags.json`;

        return this.requestServices.post(url, {
            "id": postID,
            "history_id": tagHistoryID
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Vote for a post by ID, Score must be 1 for updvote, -1 for downvote
     * @param {(string | number)} postID 
     * @param {(1 | -1)} score 
     * @returns Promise<any>
     * @memberof Posts
     */
    public vote(postID: string | number, score: 1 | -1): Promise<any> {
        return this.requestServices.post('https://e621.net/post/vote.json',
            {
                "id": postID, "score": score
            })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Generate a post's URL by its ID
     * @param {(string | number)} postID ID of the e621 post (Can be pulled from the API)
     * @returns string 
     * @memberof Posts
     */
    public generatePostUrl(postID: string | number): string {
        return `https://e621.net/post/show/${postID}/`;
    }

    /** Get popular posts for a given timeframe by providing a *e621PopularityStrings* typeArg
     * @param {e621PopularityStrings} typeArg Type of popular endpoint to use
     * @returns Promise<e621PostData[]>
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
            .then((response: e621PostData[]) => {
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
    public getIndexPaginate(tags?: string, start?: number, limitPerPage?: number, pageLimit?: number): Promise<Array<Array<e621PostData>>> {
        let tagsString: string;
        let pageStart: number;
        let limitString;
        let pageLimitTemp: number;

        if (!tags) tagsString = '';
        else tagsString = `tags=${tags}`;

        if (!start) pageStart = 1;
        else pageStart = start;

        if (!limitPerPage) limitString = '50';
        else limitString = limitPerPage;

        if (!pageLimit) pageLimitTemp = this.pageLimit;
        else pageLimitTemp = pageLimit;

        let dataArray = [];                                         // Empty array, likely not needed but eh?
        return this.requestServices.paginateE621Endpoint(`https://e621.net/post/index.json?${tagsString}&limit=${limitString}`, start, pageLimit, dataArray);
    }

    /**
     * Get a post's tag history XML. Pass true for returnJSON to get converted JSON back from the Promise
     * @param {(string | number)} postID The post's ID to get the tag history of
     * @param {boolean} [returnJSON] Pass true to have XML converted to JSON before return
     * @returns Promise<any>
     * @memberof Posts
     */
    public getTagHistoryByID(postID: string | number, returnJSON?: boolean) {
        let url = `https://e621.net/post_tag_history/index.json?post_id=${postID}`;

        return this.requestServices.get(url)
            .then((response: e621PostTagHistory[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a list of users who have favorited a given post by `postID`
     * @param {(string | number)} postID ID of the post to get favorites for
     * @returns Promise<e621FavoritedUsers>
     * @memberof Posts
     */
    public getFavorites(postID: string | number) {
        let url = `https://e621.net/favorite/list_users.json?id=${postID}`;

        return this.requestServices.get(url)
            .then((response: e621FavoritedUsers) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}