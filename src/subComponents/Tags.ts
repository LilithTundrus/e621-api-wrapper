import { e621TagJSON, e621TagAliases, e621TagUpdateResponse, e621RelatedTagJSON } from '../interfaces';
import { e621TagTypes, e621TagStrings } from '../enums';
import { RequestServices } from '../RequestService';

export default class Tags {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** Get a tag's data by name
     * @param {string} tagName 
     * @returns Promise<e621TagJSON[]>
     * @memberof Tags
     */
    public getByName(tagName: string): Promise<e621TagJSON[]> {
        let url = `https://e621.net/tag/index.json?name=${tagName}`;

        return this.requestServices.get(url)
            .then((response: e621TagJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a set of related tags by providing a valid tag
     * @param {string} tagName The tag to get related results for
     * @returns Promise<e621RelatedTagJSON[]>
     * @memberof Tags
     */
    public getRelatedTagsByName(tagName: string): Promise<e621RelatedTagJSON[]> {
        let url = `https://e621.net/tag/related.json?tags=${tagName}`;

        return this.requestServices.get(url)
            .then((response) => {
                // We are going to have to modify this a bit before giving it to the user
                let key = Object.keys(response)[0];
                let data = response[key];
                // make the array 1D, and have JSON inside the array entries, not CSV
                let formattedData = data.map(entry => {
                    return new Object({
                        name: entry[0],
                        popularity: entry[1],
                        type: entry[2]
                    });
                });
                return formattedData;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** This is a more advanced `getByName` method, allowing you to get more tag data than just by name
     * @param {number} [limit] Hard limit of 500
     * @param {number} [page] Page number to return
     * @param {string} [order] Order of the tags, can be `date`, `count` or `name`
     * @param {string} [name] Name of the tag
     * @returns Promise<e621TagJSON[]>
     * @memberof Tags
     */
    public listAllTags(limit?: number, page?: number, order?: string, tagName?: string, tagPattern?: string, afterID?: number) {
        let url: string;
        // consturct the URL (in a mega janky way)
        if (!limit) limit = 50;
        if (!page) page = 1;
        url = `https://e621.net/tag/index.json?limit=${limit}&page=${page}`;
        if (order) url = url + `&order=${order}`;
        if (tagName) url = url + `&name=${tagName}`;
        if (tagPattern) url = url + `&name_pattern=${tagPattern}`;
        if (afterID) url = url + `&after_id=${afterID}`;
        return this.requestServices.get(url)
            .then((response: e621TagJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a tag's data by ID
     * @param {(number | string)} tagID ID of the tag to return
     * @returns Promise<e621TagJSON>
     * @memberof Tags
     */
    public getByID(tagID: number | string): Promise<e621TagJSON> {
        return this.requestServices.get(`https://e621.net/tag/show.json?id=${tagID}`)
            .then((response: e621TagJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a tag's type
     * @param {string} name Name of the tag to update
     * @param {e621TagTypes} tagType New type for the tag
     * @returns Promise<e621TagUpdateResponse>
     * @memberof Tags
     */
    public updateTag(name: string, tagType: e621TagTypes): Promise<e621TagUpdateResponse> {
        let url = `https://e621.net/tag/update.json`;
        let postObj = {
            "tag[name]": name,
            "tag[tag_type]": tagType
        }
        return this.requestServices.post(url, postObj)
            .then((response: e621TagUpdateResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a tag's aliases (user and forum_post queries NOT supported)
     * @param {string} query The tag to query
     * @param {number} [page] Page number to return
     * @param {string} [order] How to order the results. Can be `tag`, `aliasedtag`,` reason`, `user`, `date`, or `forum_post`
     * @param {boolean} [approved] Can be all, true, false.
     * @returns Promise<e621TagAliases[]>
     * @memberof Tags
     */
    public getAliases(query: string, page?: number, order?: string, approved?: boolean): Promise<e621TagAliases[]> {
        let url: string;
        if (!page) page = 1;
        url = `https://e621.net/tag_alias/index.json?page=${page}&query=${query}`;
        if (order) url = url + `&order=${order}`;
        if (approved) url = url + `&approved=${approved}`;
        return this.requestServices.get(url)
            .then((response: e621TagAliases[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}