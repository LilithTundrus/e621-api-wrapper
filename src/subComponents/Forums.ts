import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';
import { e621ForumPostReasons } from '../enums';

export default class Forums {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** Create a forum post
     * @param {string} postTitle Title of the forum post to create
     * @param {string} postBody Body of the forum post
     * @param {number} parentPostID ID of the parent forum post
     * @param {e621ForumPostReasons} postCategory Category of the forum post
     * @returns Promise<e621POSTResponse>
     * @memberof Forums
     */
    createPost(postTitle: string, postBody: string, parentPostID: number, postCategory: e621ForumPostReasons) {
        let url = `https://e621.net/forum/create.json`;

        let postObj = {
            "forum_post[body]": postBody,
            "forum_post[title]": postTitle,
            "forum_post[parent_id]": parentPostID,
            "forum_post[category_id]": postCategory
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    // update() {
    // The base URL is /forum/update.xml.

    // id The ID number of the forum post being edited.
    // forum_post[body]
    // forum_post[title]
    // forum_post[category_id] See Create for possible values.
    // }

    updatePostBody(postID: number, newBody: string) {

    }

    updatePostTitle(postID: number, newTitle: string) {

    }

    updatePostCategory(postID: number, newTopic: e621ForumPostReasons) {

    }

    listAllPosts() {
        //         The base URL is /forum/index.xml. If you don't specify any parameters you'll get a list of all the parent topics.

        // parent_id The parent ID number.
        // page The page.
        // limit How many posts to retrieve. Hard limit of 100.
    }

    listPostsByParentID(parentID: number, page?: string) {

    }

    search(query: string, page?: number) {
        //         The base URL is /forum/search.xml. If you don't specify any parameters you'll get a list of all the parent topics.

        // query Returns posts which contain the given text. Using the prefix user: allows for searching for posts created by a given user.
        // page The page.
    }

    show(forumPostID: number) {
        //         The base URL is /forum/show.xml.

        // id Returns the post with the given ID number.
    }
}