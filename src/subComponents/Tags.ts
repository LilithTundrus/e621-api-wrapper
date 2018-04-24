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

    /** Get an e621 tag's data by name
     * @param {string} tagName 
     * @memberof Tags
     */
    public getByName(tagName: string): Promise<e621TagJSON[]> {
        return this.requestServices.get(`https://e621.net/tag/index.json?name=${tagName}`)
            .then((response: e621TagJSON[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a set of related tags by providing a valid e621 tag. Returns a 2D array. This may change in the future
     * @param {string} tagName The tag to get related results for
     * @memberof Tags
     */
    public getRelatedTagsByName(tagName: string): Promise<e621RelatedTagJSON[]> {
        return this.requestServices.get(`https://e621.net/tag/related.json?tags=${tagName}`)
            .then((response) => {
                // We are going to have to modify this a bit before giving it to the user
                let key = Object.keys(response)[0];
                let data = response[key];
                // make the array 1D, and have JSON inside the array entries, not CSV
                // there has to be a better way to represent the data
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

    /** This is a more advanced getByName method, allowing you to get more tag data than just by name
     * @param {number} [limit] Hard limit of 500
     * @param {number} [page] 
     * @param {string} [order] 
     * @param {string} [name] 
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

    /** Get an e621 tag's data by ID
     * @param {(number | string)} tagID 
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
     * @param {string} name 
     * @param {e621TagTypes} tagType 
     * @returns 
     * @memberof Tags
     */
    public updateTag(name: string, tagType: e621TagTypes) {
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

    /** Get a tag's aliases (user an forum_post queries NOT supported)
     * @param {string} query The tag to query
     * @param {number} [page] Page to start at (default is 1)
     * @param {string} [order] How to order the results. Can be tag, aliasedtag, reason, user, date, or forum_post
     * @param {boolean} [approved] Can be all, true, false.
     * @memberof Tags
     */
    public getAliases(query: string, page?: number, order?: string, approved?: boolean) {
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