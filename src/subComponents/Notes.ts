import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621PostNote
} from '../interfaces';

export default class Notes {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** Get a post's Notes by the ID of the post
     * @param {(number | string)} postID ID of the post to retrieve notes for
     * @returns Promise<e621PostNote[]>
     * @memberof Notes
     */
    public getPostNotes(postID: number | string) {
        let url = `https://e621.net/note/index.json?post_id=${postID}`;

        return this.requestServices.get(url)
            .then((response: e621PostNote[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Search ALL notes that match a given query
     * @param {string} query String to search all notes for
     * @returns Promise<e621PostNote[]>
     * @memberof Notes
     */
    public searchNotes(query: string) {
        let url = `https://e621.net/note/search.json?query=${query}`;

        return this.requestServices.get(url)
            .then((response: e621PostNote[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get the history of a note by its ID
     * @param {(number | string)} noteID ID of the note to get the history of
     * @returns Promise<e621PostNote[]>
     * @memberof Notes
     */
    public getNoteHistory(noteID: number | string) {
        let url = `https://e621.net/note/history.json?id=${noteID}`;

        return this.requestServices.get(url)
            .then((response: e621PostNote[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Revert a note to a given previous version by ID
     * @param {(number | string)} noteID ID of the note to revert
     * @param {number} version Version number to revert the note to
     * @returns Promise<e621POSTResponse>
     * @memberof Notes
     */
    public revertNote(noteID: number | string, version: number) {
        let url = `https://e621.net/note/revert.json`;

        return this.requestServices.post(url, {
            "id": noteID,
            "version": version
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a note's body by ID
     * @param {number} noteID ID of the note to update
     * @param {string} body The new body message
     * @returns Promise<e621POSTResponse>
     * @memberof Notes
     */
    public updateNoteBody(noteID: number, body: string) {
        let url = `https://e621.net/note/update.json`;

        return this.requestServices.post(url, {
            "id": noteID,
            "note[body]": body
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a note's location on the assocaited post by  ID
     * @param {(number | string)} noteID ID of the note to update
     * @param {number} x The X position of the note
     * @param {number} y The Y position of the note
     * @returns Promise<e621POSTResponse>
     * @memberof Notes
     */
    public updateNoteLocation(noteID: number | string, x: number, y: number) {
        let url = `https://e621.net/note/update.json`;

        return this.requestServices.post(url, {
            "id": noteID,
            "note[x]": x,
            "note[y]": y
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a note's width and height by ID
     * @param {(number | string)} noteID ID of the note to update
     * @param {number} width New Width of the note
     * @param {number} height New height of the note
     * @returns Promise<e621POSTResponse>
     * @memberof Notes
     */
    public updateNoteWidthAndHeight(noteID: number | string, width: number, height: number) {
        let url = `https://e621.net/note/update.json`;

        return this.requestServices.post(url, {
            "id": noteID,
            "note[width]": width,
            "note[height]": height
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Set a note's visibility boolean by ID
     * @param {(number | string)} noteID ID of the note to update
     * @param {boolean} isVisible True or false
     * @returns Promise<e621POSTResponse>
     * @memberof Notes
     */
    public updateNoteVisibility(noteID: number | string, isVisible: boolean) {
        let visibility = 1;
        if (isVisible == false) visibility = 0;

        let url = `https://e621.net/note/update.json`;

        return this.requestServices.post(url, {
            "id": noteID,
            "note[is_active]": visibility
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Create a note, given the ID of the post to add the note to
     * @param {(number | string)} postID ID of the post to attach the note to
     * @param {string} body Text body of the note
     * @param {number} x X position of the note
     * @param {number} y Y position of the note
     * @param {number} width Width of the note
     * @param {number} height Height of the note
     * @returns Promise<e621POSTResponse>
     * @memberof Notes
     */
    public create(postID: number | string, body: string, x: number, y: number, width: number, height: number) {
        let url = `https://e621.net/note/update.json`;

        return this.requestServices.post(url, {
            "note[post_id]": postID,
            "note[width]": width,
            "note[height]": height,
            "note[body]": body,
            "note[x]": x,
            "note[y]": y
        })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}