import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';

export default class Forums {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    create() {
        //         The base URL is /forum/create.xml.

        // forum_post[body]
        // forum_post[title]
        // forum_post[parent_id]
        // forum_post[category_id] Can be one of the following:
        // 1 General
        // 11 Site Bug Reports & Feature Requests
        // 2 Tag Alias and Implication Suggestions
        // 10 Tag/Wiki Projects and Questions
        // 3 Art Talk
        // 5 Off Topic
        // 9 e621 Tools and Applications
    }

    update() {
        // The base URL is /forum/update.xml.

        // id The ID number of the forum post being edited.
        // forum_post[body]
        // forum_post[title]
        // forum_post[category_id] See Create for possible values.
    }

    list() {
        //         The base URL is /forum/index.xml. If you don't specify any parameters you'll get a list of all the parent topics.

        // parent_id The parent ID number.
        // page The page.
        // limit How many posts to retrieve. Hard limit of 100.
    }

    search() {
        //         The base URL is /forum/search.xml. If you don't specify any parameters you'll get a list of all the parent topics.

        // query Returns posts which contain the given text. Using the prefix user: allows for searching for posts created by a given user.
        // page The page.
    }

    show() {
        //         The base URL is /forum/show.xml.

        // id Returns the post with the given ID number.
    }

    hide() {
        //         The base URL is /forum/hide.xml. Unlike the other hide methods, requires a POST call.

        // id Hides the forum post with the given ID number.
    }

    unhide() {
        //         The base URL is /forum/unhide.xml.

        // id Unhides the forum post with the given ID number.
    }
}