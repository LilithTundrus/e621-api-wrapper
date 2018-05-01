import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';

export default class Dmail {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    list() {
        // The base URL is /dmail/inbox.xml. If you don't specify any parameters you'll get a list of the most recently sent and received dmails, excluding hidden dmails.

        // from_name Returns dmails sent from the user with the given username.*
        // to_name Returns dmails sent to the user with the given username.*
        // title Returns dmails with titles which contain the given string.
        // date_start Returns dmails sent on or after the given date. Format is yyyy-mm-dd.
        // date_end Returns dmails sent before the given date. Format is yyyy-mm-dd.
        // show Returns incoming dmails when set to in, outgoing dmails when set to out, or both when set to all. Defaults to the setting last used through the site's normal interface.
        // visibility Returns hidden dmails when set to hidden, visible dmails when set to unhidden, or both when set to all.
        // page Page number to retrieve in the paginated results.
        // *If the inbox does not contain any dmails with the given username, this parameter will be ignored. Thus it is not safe to rely on this function to return dmails from/to specific users. The dmails returned should be checked individually for the desired senders/recipients.
    }

    create() {
        //         The base URL is /dmail/create.xml.

        // dmail[parent_id] Dmail ID number of the dmail that the new dmail is in response to, if any.
        // dmail[to_name]
        // dmail[title]
        // dmail[body]
    }

    show() {
        //         The base URL is /dmail/show.xml.

        // id Returns the dmail with the given ID number.
    }

    markAllAsRead() {
        // The base URL is / dmail / mark_all_read.xml.

        // Marks all dmails in the inbox as read.
    }
}

