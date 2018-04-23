import { e621TagJSON, e621TagAliases} from '../interfaces';
import { paginateE621Endpoint, requestUrl, postUrl } from '../utils';


export default class Tags {
    private userAgent: string;
    private pageLimit: number;
    public constructor(userAgent: string, pageLimit: number) {
        this.userAgent = userAgent;
        this.pageLimit = pageLimit;
    }

    /** Get an e621 tag's data by name
     * @param {string} tagName 
     * @memberof Tags
     */
    public getByName(tagName: string): Promise<e621TagJSON[]> {
        return requestUrl(`https://e621.net/tag/index.json?name=${tagName}`, this.userAgent)
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
    public getRelatedTagsByName(tagName: string): Promise<Array<Array<string>> | null> {
        return requestUrl(`https://e621.net/tag/related.json?tags=${tagName}`, this.userAgent)
            .then((response) => {
                // We are going to have to modify this a bit before giving it to the user
                let key = Object.keys(response)[0];
                let data: Array<Array<string>> = response[key];
                return data;
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
        return requestUrl(url, this.userAgent)
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
        return requestUrl(`https://e621.net/tag/show.json?id=${tagID}`, this.userAgent)
            .then((response: e621TagJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    public updateTag(name: string, tagType, isAmbiguous: boolean) {
        // The base URL is /tag/update.json.

        //         name The name of the tag to update.
        // tag[tag_type] The tag type. General: 0, artist: 1, copyright: 3, character: 4, species: 5.
        // tag[is_ambiguous] Whether or not this tag is ambiguous. Use 1 for true and 0 for false.
    }

    // TODO: Create types for the results here
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
        return requestUrl(url, this.userAgent)
            .then((response: e621TagAliases[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}