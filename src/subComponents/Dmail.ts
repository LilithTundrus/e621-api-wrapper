import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621DmailMessage
} from '../interfaces';

export default class Dmail {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** Get your Dmail inbox, will return an empty array if page number is empty
     * @param {number} [page] Page number to retrieve
     * @returns Array of dmail data
     * @memberof Dmail
     */
    getInbox(page?: number) {
        let url = `https://e621.net/dmail/inbox.json?show=in`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621DmailMessage[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get your Dmail outbox (sent messages) Will return an empty array if page number is empty
     * @param {number} [page] Page number to retrieve
     * @returns Array of dmail data
     * @memberof Dmail
     */
    getOutbox(page?: number) {
        let url = `https://e621.net/dmail/inbox.json?show=out`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621DmailMessage[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get ALL dmail messages, will return an empty array if page number is empty
     * @param {number} [page] Page number to retrieve
     * @returns Array of dmail data
     * @memberof Dmail
     */
    getAllMail(page?: number) {
        let url = `https://e621.net/dmail/inbox.json?show=all`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621DmailMessage[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search your inbox for a message with a given `query` (exact match)
     * 
     * **NOTE**: you do NOT need to include the 'Re:' in your `query` string
     * @param {string} query Exact message subject match
     * @param {number} [page] Page number to retrieve
     * @returns Array of dmail data that match your query
     * @memberof Dmail
     */
    searchInbox(query: string, page?: number) {
        let url = `https://e621.net/dmail/inbox.json?show=in&title=${query}`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621DmailMessage[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search your outbox for a message with a given `query` (exact match)
     * 
     * **NOTE**: you do NOT need to include the 'Re:' in your `query` string
     * @param {string} query Exact message subject match
     * @param {number} [page] Page number to retrieve
     * @returns Array of dmail data that match your query
     * @memberof Dmail
     */
    searchOutbox(query: string, page?: number) {
        let url = `https://e621.net/dmail/inbox.json?show=out&title=${query}`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621DmailMessage[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search ALL of your mail for a message with a given `query` (exact match)
     * 
     * **NOTE**: you do NOT need to include the 'Re:' in your `query` string
     * @param {string} query Exact message subject match
     * @param {number} [page] Page number to retrieve
     * @returns Array of dmail data that match your query
     * @memberof Dmail
     */
    searchAllMail(query: string, page?: number) {
        let url = `https://e621.net/dmail/inbox.json?show=all&title=${query}`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621DmailMessage[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /**
     * @param {string} to Who to send the message to (Their user name)
     * @param {string} title Title of the Dmail to send
     * @param {string} body Body of the Dmail to send
     * @returns HTML redirect message on success
     * @memberof Dmail
     */
    create(to: string, title: string, body: string) {
        let postObj = {
            "dmail[to_name]": to,
            "dmail[title]": title,
            "dmail[body]": body
        };

        let url = `https://e621.net/dmail/create.json`;
        return this.requestServices.post(url, postObj)
            .then((response: any) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Respond to a message with the given `parentID`, automatically
     * adding the 'Re:' title pretext.
     * 
     * **NOTE** this will NOT automatically quote the previous message. You will need to do this yourself.
     * @param {string} to Who to send the message to (Their user name)
     * @param {string} title Title of the Dmail to send
     * @param {string} body Body of the Dmail to send
     * @param {number} parentID ID of the parent message to reply ('Re:') to
     * @returns HTML redirect message on success
     * @memberof Dmail
     */
    responsdToParent(to: string, title: string, body: string, parentID: number) {

        let postObj = {
            "dmail[parent_id]": parentID,
            "dmail[to_name]": to,
            "dmail[title]": title,
            "dmail[body]": body
        };

        let url = `https://e621.net/dmail/create.json`;
        return this.requestServices.post(url, postObj)
            .then((response: any) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a dmail by its `dmailID`
     * @param {number} dmailID ID of the message to retrieve
     * @returns A single dmail's data
     * @memberof Dmail
     */
    getDmailByID(dmailID: number) {
        let url = `https://e621.net/dmail/show.json?id=${dmailID}`;

        return this.requestServices.get(url)
            .then((response: e621DmailMessage) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Mark all Dmails in your inbox as read
     * @returns e621 success boolean
     * @memberof Dmail
     */
    markAllAsRead() {
        let url = `https://e621.net/dmail/mark_all_read.json`;

        return this.requestServices.get(url)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a list of ALL of your hidden dmails
     * @param {number} [page] Page number to retrieve
     * @returns Array of dmail data
     * @memberof Dmail
     */
    getHidden(page?: number) {
        let url = `https://e621.net/dmail/inbox.json?visibility=hidden`;

        if (page) url += `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621DmailMessage[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Hide a dmail by its `dmailID`
     * @param {number} dmailID ID of the message to hide
     * @returns e621 success boolean
     * @memberof Dmail
     */
    hideDmail(dmailID: number) {
        let url = `https://e621.net/dmail/hide.json`;
        return this.requestServices.post(url,
            { "id": dmailID }
        )
            .then((response: any) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Unhide a dmail by its `dmailID`
     * @param {number} dmailID ID of the message to unhide
     * @returns e621 success boolean
     * @memberof Dmail
     */
    unhideDmail(dmailID: number) {
        let url = `https://e621.net/dmail/unhide.json`;
        return this.requestServices.post(url,
            { "id": dmailID }
        )
            .then((response: any) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Hide all dmails in the inbox
     * @returns e621 success boolean
     * @memberof Dmail
     */
    hideAll() {
        let url = `https://e621.net/dmail/hide_all.json`;

        return this.requestServices.get(url)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Unhide all dmails in the inbox
     * @returns e621 success boolean
     * @memberof Dmail
     */
    unhideAll() {
        let url = `https://e621.net/dmail/unhide_all.json`;

        return this.requestServices.get(url)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}

