import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621SetJSON,
    e621SetJSONConverted
} from '../interfaces';
import { xmlToJson } from '../lib/xml2json';
import { DOMParser } from 'xmldom'
let parser = new DOMParser();

export default class Sets {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    // public listSets() {
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

    /** List most recent sets, limit of 50 per page
     * 
     * **PLEASE NOTE**: This is being converted from XML as the JSON endpoint is 30x slower than the
     * XML endpoint, so it's faster to convert them
     * @param {number} [page] Page number to return
     * @returns An array of set data (without post info, use `showSet()` method to retrive the post info)
     * @memberof Sets
     */
    public getAllSets(page?: number) {
        let url = `https://e621.net/set/index.xml?limit=50`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: string) => {
                // format the XML string to JSON
                var document = parser.parseFromString(response, 'text/xml');
                let json = xmlToJson(document);
                // clean the conversion artifacts
                let cleanedResponse = this.beautifySetJSONArray(json.sets.set);
                return cleanedResponse;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get sets that include the given `postID` 
     * 
     * **PLEASE NOTE**: This is being converted from XML as the JSON endpoint is 30x slower than the
     * XML endpoint, so it's faster to convert them
     * @param {number} postID Post to filter sets by
     * @param {number} [page] The page number to return, if there is only one page this is ignored
     * @returns An array of set data (without post info, use `showSet()` method to retrive the post info)
     * @memberof Sets
     */
    public getSetsByPostID(postID: number, page?: number) {
        let url = `https://e621.net/set/index.xml?limit=50&post_id=${postID}`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: string) => {
                // format the XML string to JSON
                var document = parser.parseFromString(response, 'text/xml');
                let json = xmlToJson(document);
                // clean the conversion artifacts
                let cleanedResponse = this.beautifySetJSONArray(json.sets.set);
                return cleanedResponse;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    public getSetsByUserID(userID: number, page?: number) {
        let url = `https://e621.net/set/index.xml?user_id=${userID}`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: string) => {
                // format the XML string to JSON
                var document = parser.parseFromString(response, 'text/xml');
                let json = xmlToJson(document);
                // clean the conversion artifacts
                let cleanedResponse = this.beautifySetJSONArray(json.sets.set);
                return cleanedResponse;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    // 412503

    public showSet() {
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

    public create() {
        //         The base URL is /set/create.xml

        // set[name] The name of the set
        // set[shortname] The short name of the set
        // set[description] The description of the set
        // set[public] Whether to make the set public (true) or private (false)
        // set[transfer_to_parent_on_delete] Whether to replace deleted posts with their parents
    }

    public addPost() {
        //         The base URL is /set/add_post.xml

        // set_id ID of the set to add a post to
        // post_id ID of the post to add
    }

    public removePost() {
        //         The base URL is /set/remove_post.xml

        // set_id ID of the set to remove a post from
        // post_id ID of the post to remove
    }

    public destroy() {
        //         The base URL is /set/destroy.xml

        // id The name of the set to destroy
    }

    public listSetMaintainers() {
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

    //     List Invites
    // Use this to view your personal invites. The base URL is /set_maintainer/index.xml

    // Returns:

    // invites
    // invite
    // id
    // post-set-id
    // user-id
    // status - Either "pending", "approved", or "blocked"

    public createMaintainer() {
        //         The base URL is /set_maintainer/create.xml

        // username / user_id The username or user ID of the maintainer to add
        // set_id The ID of the set to add the maintainer to
    }

    public destroyMaintainer() {
        //         The base URL is /set_maintainer/destroy.xml. You must supply the id, user_id or username of the maintainer. user_id and username must be accompanied by a set_id.

        // id The ID of the maintainer to destroy
        // username The username of the maintainer to destroy
        // user_id The user ID of the maintainer to destroy
        // set_id The ID of the set
    }


    //     Approve/Deny/Block Maintainer Invite
    // The base URL is /set_maintainer/approve.xml (or deny.xml, or block.xml). You must supply either id or set_id.

    // id The ID of the maintainer invite to approve/deny/block
    // set_id The ID of the set to approve/deny/block the invite to

    private beautifySetJSONArray(convertedSetArray: any[]) {
        let arrayToReturn: e621SetJSONConverted[] = [];
        convertedSetArray.forEach(setData => {
            // coerce the JSON into a custom object
            let cleanedObject = <e621SetJSONConverted>{};
            cleanedObject.id = parseInt(setData.id);
            cleanedObject.name = setData.name;
            cleanedObject.created_at = setData["created-at"];
            cleanedObject.updated_at = setData["updated-at"];
            cleanedObject.user_id = parseInt(setData["user-id"]);
            cleanedObject.description = setData.description;
            cleanedObject.shortname = setData.shortname;
            cleanedObject.post_count = parseInt(setData["post-count"]);

            arrayToReturn.push(cleanedObject);
        });
        return arrayToReturn;
    }
}