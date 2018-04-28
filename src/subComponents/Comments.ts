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
     * @param {(string | number)} commentID The ID number of the comment to retrieve
     * @returns Promise<e621CommentJSON>
     * @memberof Comments
     */
    show(commentID: string | number) {
        return this.requestServices.get(`https://e621.net/comment/show.json?id=${commentID}`)
            .then((response: e621CommentJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** List a set of comments by post ID
     * @param {(string | number)} postID The ID number of the post to retrieve comments for
     * @param {number} [page] The Page number
     * @param {string} [commentStatus] Returns hidden comments when set to hidden, visible comments when set to active, or both when set to any. Note that whether or not you can see other user's hidden comments is affected by your permission levels
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    list(postID: string | number, page?: number, commentStatus?: string) {
        let url = `https://e621.net/comment/index.json?`;
        if (postID) url = url + `&post_id=${postID}`;
        if (page) url = url + `&page=${page}`;
        if (commentStatus) url = url + `&status=${commentStatus}`;
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
     * @param {string} [order] Sorts the results. Can be one of the following: date, date_asc, score, score_asc
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    searchByCommentText(query: string, fuzzy?: boolean, page?: number, order?: string) {
        let url = `https://e621.net/comment/search.json?query=${query}`;
        if (fuzzy) url = url + `&results=fuzzy`;
        else url = url + `&results=exact`;
        if (order) url = url + `&order=${order}`;
        if (page) url = url + `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621CommentJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search for comments by a single user's ID
     * @param {(number | string)} userID ID of the user to search
     * @param {number} [page] Page number to return
     * @param {string} [order] Sorts the results. Can be one of the following: date, date_asc, score, score_asc
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    searchByCommentCreatorID(userID: number | string, page?: number, order?: string): Promise<e621CommentJSON[]> {
        let url = `https://e621.net/comment/search.json?user_id=${userID}`;
        if (order) url = url + `&order=${order}`;
        if (page) url = url + `&page=${page}`;
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
     * @param {string} [order] Sorts the results. Can be one of the following: date, date_asc, score, score_asc
     * @returns Promise<e621CommentJSON[]>
     * @memberof Comments
     */
    searchByCommentCreatorName(userName: number | string, page?: number, order?: string) {
        let url = `https://e621.net/comment/search.json?user=${userName}`;
        if (order) url = url + `&order=${order}`;
        if (page) url = url + `&page=${page}`;
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
    getRecentComments(page?: number) {
        let url = `https://e621.net/comment/search.json?`;
        if (page) url = url + `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621CommentJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Create a comment for a post given the ID and comment text
     * @param {(string | number)} postID The post ID number to which you are responding
     * @param {string} commentText The body of the comment
     * @param {boolean} [anonymous] Set to 1 if you want to post this comment anonymously
     * @returns Promise<e621POSTResponse>
     * @memberof Comments
     */
    create(postID: string | number, commentText: string, anonymous?: boolean) {
        let postObj = <e621CommentCreateJSON>{
            "comment[body]": commentText,
            "comment[post_id": postID
        }
        if (anonymous) postObj["comment[anonymous]"] = 1

        let url = `https://e621.net/comment/create.json`;
        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** 
     * @param {number} commentID 
     * @param {any} commentTextUpdate 
     * @returns Promise<e621POSTResponse>
     * @memberof Comments
     */
    update(commentID: number, commentTextUpdate: string) {
        let postObj = <e621CommentUpdateJSON>{
            "id": commentID,
            "comment[body]": commentTextUpdate,
        }
        let url = `https://e621.net/comment/update.json`;
        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Delete a comment by its ID
     * @param {number} commentID 
     * @returns Promise<e621POSTResponse>
     * @memberof Comments
     */
    destroy(commentID: number) {
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