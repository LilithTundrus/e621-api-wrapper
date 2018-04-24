import { e621TagJSON, e621TagAliases, subClassOptions } from '../interfaces';
import { e621TagTypes, e621TagStrings } from '../enums';
import { RequestServices } from '../RequestService';

export default class Tags {
    private pageLimit: number;
    private userName: string;
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
    public getRelatedTagsByName(tagName: string): Promise<Array<Array<string>> | null> {
        return this.requestServices.get(`https://e621.net/tag/related.json?tags=${tagName}`)
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

    public updateTag(name: string, tagType: e621TagTypes) {
        // The base URL is /tag/update.json.

        //         name The name of the tag to update.
        // tag[tag_type] The tag type. General: 0, artist: 1, copyright: 3, character: 4, species: 5.
        // tag[is_ambiguous] Whether or not this tag is ambiguous. Use 1 for true and 0 for false.
        let url = `https://e621.net/tag/update.json`;
        let postObj = {
            "tag[name]": name,
            "tag[tag_type]": tagType
        }
        return this.requestServices.post(url, postObj)
            .then((response: any) => {
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

    public tagHistory() {
        //         The base URL is /post_tag_history/index.xml. Due to performance issues, this controller does not use page numbers. Instead, it takes an ID and returns the next/previous [limit] results. To traverse forward (back in time) through multiple pages of results, set the after parameter of the next request to the ID of the last result in the current result set. Or to go backwards (towards more recently) through results, set before to the ID of the first result in the current result set.

        // post_id Filter by post ID.
        // date_start Show only edits after this date (inclusive). Takes most date formats, including 10-digit UNIX timestamps
        // date_end Show only edits before this date (inclusive). Takes most date formats, including 10-digit UNIX timestamps
        // user_id Filter by user ID.
        // user_name Filter by username. Must match exactly, case insensitive.
        // source Filter by source. Wildcard, so 'example' will match 'http://www.example.com/'
        // tags Filter by tags. Wildcard, like above. Caveat: since this is a simple text match against the history entry's tag list, it's best to only use one tag for this field.
        // reason Filter by edit reason. Wildcard, like above.
        // description Filter by description. Wildcard, like above.
        // limit How many results to return at once. Defaults to 100 and limited to 1000.
        // before / after Show the next [limit] results before (higher ID than) or after (lower ID than) the given ID.
    }
}