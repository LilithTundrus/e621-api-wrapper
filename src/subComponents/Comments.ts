import { RequestServices } from '../RequestService';
import { e621CommentJSON } from '../interfaces';



export default class Comments {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    show(commentID: string | number) {
        // The base URL is /comment/show.json. This retrieves a single comment.

        // id The ID number of the comment to retrieve.
        return this.requestServices.get(`https://e621.net/comment/show.json?id=${commentID}`)
            .then((response: e621CommentJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    list(postID?: string, page?: number, commentStatus?: string) {
        //         The base URL is /comment/index.json. A maximum of 25 comments are retrieved per request. If you don't specify any parameters you'll get a list of the most recent comments.

        // post_id The ID number of the post to retrieve comments for.
        // page The page number.
        // status Returns hidden comments when set to hidden, visible comments when set to active, or both when set to any. Note that whether or not you can see other user's hidden comments is affected by your permission levels.
    }

    search() {
        //         The base URL is /comment/search.json. A maximum of 25 comments are retrieved per request. If you don't specify any parameters you'll get a list of the most recent comments.

        // query Returns comments which contain the given text.
        // results Affects how query is handled??? Can be either fuzzy or exact
        // date_start Returns comments that were created on or after the given date. Format is yyyy-mm-dd.
        // date_end Returns comments that were created before the given date. Format is yyyy-mm-dd.
        // order Sorts the results. Can be one of the following:
        // date
        // date_asc
        // score
        // score_asc
        // post_id The ID number of the post to retrieve comments for.
        // page The page number.
        // user Returns comments created by the user with the given username.
        // user_id Returns comments created by the user with the given ID number. Takes precedence over user.
        // status Returns hidden comments when set to hidden, visible comments when set to active, or both when set to any. Note that whether or not you can see other user's hidden comments is affected by your permission levels.
    }

    create() {
        //         The base URL is /comment/create.json.

        // comment[anonymous] Set to 1 if you want to post this comment anonymously.
        // comment[post_id] The post ID number to which you are responding.
        // comment[body] The body of the comment.
    }

    update() {
        //         The base URL is /comment/update.json. Depending on your permission level, comments may only be editable for the first 5 minutes after they are created.

        // id The ID number of the comment being edited.
        // comment[body] The body of the comment.
    }

    destroy() {
        //         The base url is /comment/destroy.json. You must be logged in to use this action. You must also be the owner of the comment, or you must be a moderator.

        // id The ID number of the comment to delete.
    }

    vote() {
        //         The base URL is /comment/vote.json. This action requires an AJAX-like call. That is, your request header must contain X-Requested-With: XMLHttpRequest

        // id Vote on the comment with the given ID number.
        // score
        // up
        // down
        // To remove a vote, send a request using the same score given previously (e.g. if it was voted up, vote up again to return to neutral).
    }


}