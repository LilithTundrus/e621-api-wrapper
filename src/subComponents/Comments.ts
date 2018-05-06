import { RequestServices } from '../RequestService';
import {
    e621CommentJSON, e621POSTResponse,
    e621CommentCreateJSON, e621CommentUpdateJSON
} from '../interfaces';

export default class Comments {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** Get a single comment's data by ID
     * @param {(number | string)} commentID ID of the comment to retrieve
     * @returns Promise<e621CommentJSON>
     * @memberof Comments
     */
    public show(commentID: number | string) {
        let url = `https://e621.net/comment/show.json?id=${commentID}`;

        return this.requestServices.get(url)
            .then((response: e621CommentJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** List a set of comments by a post's ID
     * @param {(number | string)} postID The ID number of the post to retrieve comments for
     * @param {number} [page] Page number to return
     * @param {string} [commentStatus] Returns hidden comments when set to `hidden`, visible comments when set to `active`, or both when set to `any`. Note that whether or not you can see other user's hidden comments is affected by your permission levels
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    public list(postID: number | string, page?: number, commentStatus?: string) {
        let url = `https://e621.net/comment/index.json?`;

        if (postID) url += `&post_id=${postID}`;
        if (page) url += `&page=${page}`;
        if (commentStatus) url += `&status=${commentStatus}`;

        return this.requestServices.get(url)
            .then((response: e621CommentJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search for comments matching the given `query` text
     * @param {string} query String query which contains the given text for the comment body
     * @param {boolean} [fuzzy] If set to true, fuzzy logic for the query will be used, otherwise it's exact matched
     * @param {boolean} [page] Page number to return
     * @param {string} [order] Sorts the results. Can be one of the following: `date`, `date_asc`, `score`, `score_asc`
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    public searchByCommentText(query: string, fuzzy?: boolean, page?: number, order?: string) {
        let url = `https://e621.net/comment/search.json?query=${query}`;

        if (fuzzy) url += `&results=fuzzy`;
        else url += `&results=exact`;

        if (order) url += `&order=${order}`;
        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621CommentJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search for comments by a single user's ID
     * @param {(number | string)} userID ID of the user to search comments for
     * @param {number} [page] Page number to return
     * @param {string} [order] Sorts the results. Can be one of the following: `date`, `date_asc`, `score`, `score_asc`
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    public searchByCommentCreatorID(userID: number | string, page?: number, order?: string): Promise<e621CommentJSON[]> {
        let url = `https://e621.net/comment/search.json?user_id=${userID}`;

        if (order) url += `&order=${order}`;
        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621CommentJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search for comments by a single user's name
     * @param {string} userName name of the user to search
     * @param {number} [page] Page number to return
     * @param {string} [order] Sorts the results. Can be one of the following: `date`, `date_asc`, `score`, `score_asc`
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    public searchByCommentCreatorName(userName: string, page?: number, order?: string) {
        let url = `https://e621.net/comment/search.json?user=${userName}`;

        if (order) url += `&order=${order}`;
        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621CommentJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get ALL recent comments visible on e621
     * @param {number} [page] Page number to return
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    public getRecentComments(page?: number) {
        let url = `https://e621.net/comment/search.json?`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621CommentJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Create a comment for a post given the ID and comment text
     * @param {(number | string)} postID ID of the post to which you are responding
     * @param {string} commentText The body of the comment
     * @param {boolean} [anonymous] Set to `true` if you want to post this comment anonymously
     * @returns Promise<e621POSTResponse>
     * @memberof Comments
     */
    public create(postID: number | string, commentText: string, anonymous?: boolean) {
        let url = `https://e621.net/comment/create.json`;

        let postObj = <e621CommentCreateJSON>{
            "comment[body]": commentText,
            "comment[post_id": postID
        };
        if (anonymous) postObj["comment[anonymous]"] = 1;

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a comment's body by ID
     * @param {(number | string)} commentID ID of the comment to update
     * @param {string} commentTextUpdate New text for the given comment
     * @returns Promise<e621POSTResponse>
     * @memberof Comments
     */
    public update(commentID: number | string, commentTextUpdate: string) {
        let url = `https://e621.net/comment/update.json`;

        let postObj = <e621CommentUpdateJSON>{
            "id": commentID,
            "comment[body]": commentTextUpdate,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Delete a comment by ID
     * @param {(number | string)} commentID ID of the comment to delete
     * @returns Promise<e621POSTResponse>
     * @memberof Comments
     */
    public destroy(commentID: number | string) {
        let url = `https://e621.net/comment/destroy.json`;

        return this.requestServices.post(url,
            {
                "id": commentID
            })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    // TODO: Comment voting requires a complex call: new Ajax.Request("/post/vote.json", {params}, callback)
    // vote() {
    //     //         The base URL is /comment/vote.json. This action requires an AJAX-like call. That is, your request header must contain X-Requested-With: XMLHttpRequest

    //     // id Vote on the comment with the given ID number.
    //     // score
    //     // up
    //     // down
    //     // To remove a vote, send a request using the same score given previously (e.g. if it was voted up, vote up again to return to neutral).
    // }
}