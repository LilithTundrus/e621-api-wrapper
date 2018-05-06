import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621SetJSON,
    e621SetJSONConverted, e621PostDataConverted,
    e621SetJSONConvertedWithPosts
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

    /** List most recent sets, limit of 50 per page
     * 
     * **PLEASE NOTE**: This is being converted from XML as the JSON endpoint is 30x slower than the
     * XML endpoint, so it's faster to convert them. There may also be minor bugs even when custom converting
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

    /** Get sets that include the given post's ID
     * 
     * **PLEASE NOTE**: This is being converted from XML as the JSON endpoint is 30x slower than the
     * XML endpoint, so it's faster to convert them. There may also be minor bugs even when custom converting
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

    /** Get sets created by the given user's ID
     * 
     * **PLEASE NOTE**: This is being converted from XML as the JSON endpoint is 30x slower than the
     * XML endpoint, so it's faster to convert them. There may also be minor bugs even when custom converting
     * @param {number} userID User ID to filter sets by
     * @param {number} [page] The page number to return, if there is only one page this is ignored
     * @returns An array of set data (without post info, use `showSet()` method to retrive the post info)
     * @memberof Sets
     */
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

    /** Get a set by its `setID`
     * 
     * **PLEASE NOTE**: This is being converted from XML as the JSON endpoint is 30x slower than the
     * XML endpoint, so it's faster to convert them. There may also be minor bugs even when custom converting
     * @param {(number | string)} setID ID of the set to convert and retrieve
     * @returns Promise<e621SetJSONConvertedWithPosts> - a single converted XML set
     * @memberof Sets
     */
    public showSet(setID: number | string) {
        let url = `https://e621.net/set/show.xml?id=${setID}`;

        return this.requestServices.get(url)
            .then((response: string) => {
                // format the XML string to JSON
                var document = parser.parseFromString(response, 'text/xml');
                let json = xmlToJson(document);
                // clean the conversion artifacts

                // this is going to take a massive amount of work
                let cleanedSet = this.beautifySetJSONSingle(json["post-set"], json["post-set"].posts.post)
                return cleanedSet;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Cretae a new empty set
     * @param {string} setName Name of the set to create
     * @param {string} shortName SHort named of the set 
     * @param {string} setDescription Description for the set
     * @param {boolean} isPublic If the set will be public
     * @param {boolean} transferOnDelete Whether to replace deleted posts with their parents
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public create(setName: string, shortName: string, setDescription: string, isPublic: boolean, transferOnDelete: boolean) {
        let url = `https://e621.net/set/create.json`;

        let postObj = {
            "set[name]": setName,
            "set[shortname]": shortName,
            "set[description]": setDescription,
            "set[public]": isPublic,
            "set[transfer_to_parent_on_delete]": transferOnDelete
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a set's name by ID
     * @param {(number | string)} setID ID of the set to update
     * @param {string} newName New name of the set
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public updateName(setID: number | string, newName: string) {
        let url = `https://e621.net/set/update.json`;

        let postObj = {
            "set[id]": setID,
            "set[name]": newName,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a set's shortname by ID
     * @param {(number | string)} setID ID of the set to update
     * @param {string} newShortName New shortname of the set
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public updateShortName(setID: number | string, newShortName: string) {
        let url = `https://e621.net/set/update.json`;

        let postObj = {
            "set[id]": setID,
            "set[shortname]": newShortName,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a set's description by its ID
     * @param {(number | string)} setID ID of the set to update
     * @param {string} newDescription New description of the set
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public updateDescription(setID: number | string, newDescription: string) {
        let url = `https://e621.net/set/update.json`;

        let postObj = {
            "set[id]": setID,
            "set[description]": newDescription,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a set's public status by its `setID`
     * @param {(number | string)} setID ID of the set to update
     * @param {string} isPublic Public status of the set
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public updatePublicStatus(setID: number | string, isPublic: boolean) {
        let url = `https://e621.net/set/update.json`;

        let postObj = {
            "set[id]": setID,
            "set[pulibc]": isPublic,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a set's transferOnDelete status by its `setID`
     * @param {(number | string)} setID ID of the set to update
     * @param {string} transferOnDelete Public status of the set
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public updateTransferOnDeleteStatus(setID: number | string, transferOnDelete: boolean) {
        let url = `https://e621.net/set/update.json`;

        let postObj = {
            "set[id]": setID,
            "set[transfer_to_parent_on_delete]": transferOnDelete,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Add a post to a set
     * @param {(number | string)} setID ID of the set to add the post to
     * @param {number} postID ID of the post to add to the set
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public addPost(setID: number | string, postID: number) {
        let url = `https://e621.net/set/add_post.json`;

        let postObj = {
            "set_id": setID,
            "post_id": postID
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Remove a post from a set
     * @param {(number | string)} setID ID of the set to remove the post from
     * @param {number} postID ID of the post to remove from the set
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public removePost(setID: number | string, postID: number) {
        let url = `https://e621.net/set/remove_post.json`;

        let postObj = {
            "set_id": setID,
            "post_id": postID
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Delete a set (If you have proper permissions)
     * @param {(number | string)} setID ID of the set to deleteF
     * @returns Promise<e621POSTResponse>
     * @memberof Sets
     */
    public destroy(setID: number | string) {
        let url = `https://e621.net/set/destroy.json`;

        let postObj = {
            "id": setID,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

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
            cleanedObject.public = JSON.parse(setData.public);
            cleanedObject.transfer_to_parent_on_delete = JSON.parse(setData["transfer-to-parent-on-delete"]);

            arrayToReturn.push(cleanedObject);
        });
        return arrayToReturn;
    }

    private beautifySetJSONSingle(convertedSetJSON: any, convertedPostJSON: any) {
        // coerce the JSON into a custom object
        let cleanedObject = <e621SetJSONConvertedWithPosts>{};

        // array to hold all of the posts we've cleaned to have their correct typings
        let cleanedPosts: e621PostDataConverted[] = [];

        cleanedObject.id = parseInt(convertedSetJSON.id);
        cleanedObject.name = convertedSetJSON.name;
        cleanedObject.created_at = convertedSetJSON["created-at"];
        cleanedObject.updated_at = convertedSetJSON["updated-at"];
        cleanedObject.user_id = parseInt(convertedSetJSON["user-id"]);
        cleanedObject.description = convertedSetJSON.description;
        cleanedObject.shortname = convertedSetJSON.shortname;
        cleanedObject.post_count = parseInt(convertedSetJSON["post-count"]);
        cleanedObject.public = JSON.parse(convertedSetJSON.public);
        cleanedObject.transfer_to_parent_on_delete = JSON.parse(convertedSetJSON["transfer-to-parent-on-delete"]);

        convertedPostJSON.forEach((post, index) => {
            let cleanedPost = <e621PostDataConverted>{
                id: parseInt(post.id),
                tags: post.tags,
                locked_tags: post.locked_tags,
                description: post.description,
                created_at: post.created_at,
                creator_id: parseInt(post.creator_id),
                author: post.author,
                change: parseInt(post.change),
                source: post.source,
                score: parseInt(post.score),
                fav_count: parseInt(post.fav_count),
                md5: post.md5,
                file_size: parseInt(post.file_size),
                file_url: post.file_url,
                file_ext: post.file_ext,
                preview_url: post.preview_url,
                preview_width: parseInt(post.preview_width),
                preview_height: parseInt(post.preview_height),
                sample_url: post.sample_url,
                sample_width: parseInt(post.sample_width),
                sample_height: parseInt(post.sample_height),
                rating: post.rating,
                status: post.status,
                width: parseInt(post.width),
                height: parseInt(post.height),
                has_comments: JSON.parse(post.has_comments),
                has_notes: JSON.parse(post.has_notes),
                has_children: JSON.parse(post.has_children),
                children: post.children,
                parent_id: null,
            }
            // check if a parent ID isn't some garbage XML that means nothing
            if (isNaN(parseInt(post.parent_id)) == false) {
                cleanedPost.parent_id = post.parent_id;
            }

            // make sure the artist prop deson't return XML garbage
            if (post.artist.hasOwnProperty('artist')) {
                cleanedPost.artist = post.artist.artist;
            } else {
                cleanedPost.artist = post.artist;
            }

            // if > 1 source, handle the XML -> JSON array conversion
            if (post.sources) {
                if (post.sources.hasOwnProperty('source')) {
                    cleanedPost.sources = post.sources.source;
                }
            } else {
                cleanedPost.sources = post.sources;
            }
            cleanedPosts.push(cleanedPost);
        })
        cleanedObject.posts = cleanedPosts;
        return cleanedObject;
    }
}