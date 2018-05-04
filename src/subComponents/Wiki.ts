import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';

export default class Wiki {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    //     All titles must be exact (but case and whitespace don't matter).

    searchWiki(query: string, order?: string, page?: number) {
        // The base URL is /wiki/index.json. This retrieves a list of every wiki page.

        // order How you want the pages ordered. Can be: title, date.
        // limit The number of pages to retrieve.
        // page The page number.
        // query A word or phrase to search for.
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

    getWikiByName() {
        // The base URL is /wiki/show.json. Potential error reasons: "artist type"

        // title The title of the wiki page to retrieve.
        // version The version of the page to retrieve.
    }

    destroy() {
        // The base URL is /wiki/destroy.json. You must be logged in as a moderator to use this action.

        // title The title of the page to delete.
    }

    // Lock
    // The base URL is /wiki/lock.json. You must be logged in as a moderator to use this action.

    // title The title of the page to lock.


    // Unlock
    // The base URL is /wiki/unlock.json. You must be logged in as a moderator to use this action.

    // title The title of the page to unlock.


    revertWiki() {
        // The base URL is /wiki/revert.json. Potential error reasons: "Page is locked"

        // title The title of the wiki page to update.
        // version The version to revert to.
    }

    getWikiHistoryByName() {
        // The base URL is /wiki/history.xml.

        // title The title of the wiki page to retrieve versions for.
    }

    getRecentChanges() {
        // The base URL is /wiki/recent_changes.xml.

        // user_id
        // page
    }
}