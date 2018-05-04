import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621WikiEntry
} from '../interfaces';

export default class Wiki {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** List ALL wiki pages, sorted by name
     * 
     * **NOTE**: The official docs on the list endpoint where it says that queries are accepted is **false**,
     * none of the args besides `page` are processed.
     * @param {number} [page] 
     * @returns 
     * @memberof Wiki
     */
    list(page?: number) {
        let url = `https://e621.net/wiki/index.json?`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621WikiEntry[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    create() {
        // The base URL is /wiki/create.json.

        // wiki_page[title] The title of the wiki page.
        // wiki_page[body] The body of the wiki page.
    }

    update() {
        // The base URL is /wiki/update.json. Potential error reasons: "Page is locked"

        // title The title of the wiki page to update.
        // wiki_page[title] The new title of the wiki page.
        // wiki_page[body] The new body of the wiki page.
    }

    /** Get a wiki page data by its `wikiTitle`
     * @param {string} wikiTitle Title of the wiki page to get
     * @returns Promise<e621WikiEntry>
     * @memberof Wiki
     */
    getWikiByTitle(wikiTitle: string) {
        let url = `https://e621.net/wiki/show.json?title=${wikiTitle}`;

        return this.requestServices.get(url)
            .then((response: e621WikiEntry) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Delete a wiki page by its `wikiTitle`
     * 
     * **NOTE**: You must be logged in as a moderator or higher to delete a wiki page
     * @param {string} wikiTitle Title of the wiki page to delete
     * @memberof Wiki
     */
    destroy(wikiTitle: string) {
        let url = `https://e621.net/wiki/destroy.json`;

        return this.requestServices.post(url, {
            "title": wikiTitle,
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    // Lock
    // The base URL is /wiki/lock.json. You must be logged in as a moderator to use this action.

    // title The title of the page to lock.


    // Unlock
    // The base URL is /wiki/unlock.json. You must be logged in as a moderator to use this action.

    // title The title of the page to unlock.

    /** Revert a wiki page with the givem `wikiTitle` to the given tag `version`
     * @param {string} wikiTitle Title of the wiki page to revert
     * @param {number} version Version to revert the page to
     * @returns Promise<e621POSTResponse>
     * @memberof Wiki
     */
    revertWiki(wikiTitle: string, version: number) {
        let url = `https://e621.net/wiki/revert.json`;

        return this.requestServices.post(url, {
            "title": wikiTitle,
            "version": version
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    // /** Get the history of a wiki page by title
    //  * 
    //  * **NOTE**: As of API version 0.4.0 this returns a 500 internal server error
    //  * @param {string} wikiTitle Title of the page to retrive the history of
    //  * @returns 
    //  * @memberof Wiki
    //  */
    // getWikiHistoryByTitle(wikiTitle: string) {
    //     let url = `https://e621.net/wiki/history.json?title=${wikiTitle}`;

    //     return this.requestServices.get(url)
    //         .then((response: any) => {
    //             return response;
    //         })
    //         .catch((err) => {
    //             throw Error(err);
    //         })
    // }

    /** Get recent changes to wiki pages
     * @param {number} [page] Page number to return
     * @returns Promise<e621WikiEntry[]>
     * @memberof Wiki
     */
    getRecentChanges(page?: number) {
        let url = `https://e621.net/wiki/recent_changes.json?`;

        if (page) url += `page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621WikiEntry[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}