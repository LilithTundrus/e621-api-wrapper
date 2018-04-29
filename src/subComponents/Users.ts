import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';

export default class Users {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    listUsers() {
        //         The base URL is /user/index.xml. If you don't specify any parameters you'll get a listing of all users.

        // id The ID number of the user.
        // name Text matching part or all of a user's name.
        // level Permission level. Can be one of the following or use -1 for Any:
        // 0 Unactivated
        // 10 Blocked
        // 20 Member
        // 30 Privileged
        // 33 Contributor
        // 34 Former Staff
        // 35 Janitor
        // 40 Mod
        // 50 Admin
        // order Sort order. Can be one of the following:
        // name Username, based on Unicode values (ascending)
        // posts Uploaded post count (descending)
        // deleted Deleted post count (descending)
        // notes Note edit count (descending)
        // tagedits Tag edit count (descending)
        // date Join date from most recent to least
        // record Cumulative user record score (descending)
        // Returns:
        // An array of users whose ID exactly matches the supplied id attribute or whose name contains the supplied name attribute. Each user element has the following attributes:

        // name The name of the user.
        // id The ID number of the user.
        // level The permission level of the user. See list under level parameter above for possible values.
        // created_at When the user created their account.
        // avatar_id The ID number of the post the user is currently using as their avatar, if any.
        // stats An XML child element or JSON object with the following attributes:
        // post_count
        // del_post_count
        // edit_count The number of tag edits the user has made.
        // favorite_count
        // wiki_count
        // forum_post_count
        // note_count
        // comment_count
        // blip_count
        // set_count
        // pool_update_count
        // pos_user_records
        // neutral_user_records
        // neg_user_records
        // subscriptions User tag subscriptions, if any. In JSON responses this is represented by a subscriptions object. In XML responses it is represented by one or more subscription child elements.
        // artist_tags Artist tags associated with the user. Represented by a child element in XML responses or an array in JSON responses.
    }

    getUserInfoByID(userID: number) {
        // The base URL is /user/show.xml. If you don't specify any parameters you'll get the currently logged in user.

        // id The ID number of the user.
        // name Text exactly matching a user's name.
        // Returns:
        // The same attributes given by the List function above, but only for a single user.
    }

    getUserInfoByName(userName: string) {
        // The base URL is /user/show.xml. If you don't specify any parameters you'll get the currently logged in user.

        // id The ID number of the user.
        // name Text exactly matching a user's name.
        // Returns:
        // The same attributes given by the List function above, but only for a single user.
    }

    getUserRecords() {
        //         The base URL is /user_record/show.xml.

        // id The ID number of the user record.
    }
}