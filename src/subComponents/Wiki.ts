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
     * none of the params besides `page` are processed.
     * @param {number} [page] Page number to return
     * @returns Promise<e621WikiEntry[]>
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

    /** Create a wiki page with the given `title` and `body`
     * @param {string} title Title of the wiki page to create
     * @param {string} body Body of the wiki page to create
     * @returns Promise<e621POSTResponse>
     * @memberof Wiki
     */
    create(title: string, body: string) {
        let url = `https://e621.net/wiki/create.json`;

        return this.requestServices.post(url, {
            "wiki_page[title]": title,
            "wiki_page[body]": body
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a wiki page with the given `currentTitle` to have a `newTitle`
     * 
     * Potential error reasons: "Page is locked"
     * @param {string} currentTitle Wiki page's current title (wiki endpoint does not support updates by ID)
     * @param {string} newTitle New Title
     * @returns Promise<e621POSTResponse>
     * @memberof Wiki
     */
    updateWikiTitle(currentTitle: string, newTitle: string) {
        let url = `https://e621.net/wiki/update.json`;

        return this.requestServices.post(url, {
            "title": currentTitle,
            "wiki_page[title]": newTitle,
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a wiki page with the given `wikiTitle` to have a `newBody`
     * 
     * Potential error reasons: "Page is locked"
     * @param {string} wikiTitle Wiki page's current title (wiki endpoint does not support updates by ID)
     * @param {string} newBody New Body to update the wiki page with
     * @returns Promise<e621POSTResponse>
     * @memberof Wiki
     */
    updateWikiBody(wikiTitle: string, newBody: string) {
        let url = `https://e621.net/wiki/update.json`;

        return this.requestServices.post(url, {
            "title": wikiTitle,
            "wiki_page[body]": newBody,
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
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