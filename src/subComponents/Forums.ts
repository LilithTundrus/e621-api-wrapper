import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621ForumPost
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
     * @param {number | null} parentPostID ID of the parent forum post. Can be `null`
     * @param {e621ForumPostReasons} postCategory Category of the forum post
     * @returns Promise<e621POSTResponse>
     * @memberof Forums
     */
    createPost(postTitle: string, postBody: string, parentPostID: number | null, postCategory: e621ForumPostReasons) {
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

    /** Update a forum post's body
     * @param {number} postID ID of the forum post to update
     * @param {string} newBody New Body of the forum post
     * @returns Promise<e621POSTResponse>
     * @memberof Forums
     */
    updatePostBody(postID: number, newBody: string) {
        let url = `https://e621.net/forum/update.json`;

        let postObj = {
            "id": postID,
            "forum_post[body]": newBody,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a forum post's title
     * @param {number} postID ID of the forum post to update
     * @param {string} newTitle New title of the forum post
     * @returns Promise<e621POSTResponse>
     * @memberof Forums
     */
    updatePostTitle(postID: number, newTitle: string) {
        let url = `https://e621.net/forum/update.json`;

        let postObj = {
            "id": postID,
            "forum_post[title]": newTitle,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a forum post's topic category
     * @param {number} postID ID of the forum post to update
     * @param {string} newTopic New topic of the forum post
     * @returns Promise<e621POSTResponse>
     * @memberof Forums
     */
    updatePostCategory(postID: number, newTopic: e621ForumPostReasons) {
        let url = `https://e621.net/forum/update.json`;

        let postObj = {
            "id": postID,
            "forum_post[category_id]": newTopic,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** List all forum parent posts
     * @param {number} [page] Page number to return
     * @returns Promise<e621ForumPost[]>
     * @memberof Forums
     */
    getAllPosts(page?: number) {
        let url = `https://e621.net/forum/index.json?`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621ForumPost[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** List all posts that have the given `parentID`
     * @param {(number | string )} parentID ID of the parent's post to get the children of
     * @param {string} [page] Page number to return
     * @returns Promise<e621ForumPost[]>
     * @memberof Forums
     */
    getPostsByParentID(parentID: number | string, page?: string) {
        let url = `https://e621.net/forum/index.json?parent_id=${parentID}`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621ForumPost[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search for a forum post that matches the given `query` string
     * @param {string} query String to match forum posts for
     * @param {number} [page] Page number to return
     * @returns e621ForumPost[]
     * @memberof Forums
     */
    searchPosts(query: string, page?: number) {
        let url = `https://e621.net/forum/search.json?query=${query}`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621ForumPost[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a forum post's data by its `forumPostID`
     * @param {number} forumPostID ID of the forum post to retrieve
     * @returns Promise<e621ForumPost>
     * @memberof Forums
     */
    getPostByID(forumPostID: number) {
        let url = `https://e621.net/forum/show.json?id=${forumPostID}`;

        return this.requestServices.get(url)
            .then((response: e621ForumPost) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}