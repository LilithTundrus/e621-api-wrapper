import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';

export default class Sets {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }


    listSets() {
        // The base URL is /set/index.xml

        // page The page number (50 sets per page)
        // user_id Only show sets owned by the given user
        // maintainer_id Only show sets maintained by the given user
        // post_id Only show sets containing the given post
        // Returns:

        // sets
        // set
        // created-at
        // updated-at
        // id
        // user-id
        // name
        // shortname
        // description
        // public
        // post-count
        // transfer-to-parent-on-delete
    }

    showSet() {
        // The base URL is / set / show.xml

        // id The ID number of the set to retrieve
        // Returns:

        // post - set
        // created - at
        // updated - at
        // id
        // user - id
        // name
        // shortname
        // description
        // public
        // post - count
        // transfer - to - parent - on - delete
        //     posts
        // post
    }

    create() {
        //         The base URL is /set/create.xml

        // set[name] The name of the set
        // set[shortname] The short name of the set
        // set[description] The description of the set
        // set[public] Whether to make the set public (true) or private (false)
        // set[transfer_to_parent_on_delete] Whether to replace deleted posts with their parents
    }

    addPost() {
        //         The base URL is /set/add_post.xml

        // set_id ID of the set to add a post to
        // post_id ID of the post to add
    }

    removePost() {
        //         The base URL is /set/remove_post.xml

        // set_id ID of the set to remove a post from
        // post_id ID of the post to remove
    }

    destroy() {
        //         The base URL is /set/destroy.xml

        // id The name of the set to destroy
    }

    listSetMaintainers() {
        //         List
        // Use this to view maintainers/invites for a given set. The base URL is /set/maintainers.xml

        // id The name of the set to retrieve
        // Returns:

        // set-maintainers
        // set-maintainer
        // id
        // post-set-id
        // user-id
        // status - Either "pending", "approved", or "blocked"
    }

    createMaintainer() {
        //         The base URL is /set_maintainer/create.xml

        // username / user_id The username or user ID of the maintainer to add
        // set_id The ID of the set to add the maintainer to
    }
}