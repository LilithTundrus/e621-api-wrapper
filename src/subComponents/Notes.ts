import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';

export default class Notes {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    getPostNotes() {
        //     List
        // The base URL is /note/index.xml.

        // post_id The post ID number to retrieve notes for.

    }

    search() {
        // Search

        // The base URL is /note/search.xml.

        // query A word or phrase to search for.
    }

    getHistory() {
        // History
        // The base URL is /note/history.xml. You can either specify id, post_id, user_id, or nothing. Specifying nothing will give you a list of every note version.

        // limit How many versions to retrieve.
        // page The offset.
        // post_id The ID number of the post to retrieve note versions for.
        // id The ID number of the note to retrieve versions for.
        // user_id Returns notes created by the user with the given ID number.
    }

    revertNotea() {
        // Revert
        // The base URL is /note/revert.xml. Potential error reasons: "Post is locked"

        // id The ID of the note to update.
        // version The version to revert to.
    }


    update(noteID: number) {
        // Create/Update
        // The base URL is /note/update.xml. Notes differ from the other controllers in that the interface for creation and updates is the same. If you supply an id parameter, then e621 will assume you're updating an existing note. Otherwise, it will create a new note. Potential error reasons: "Post is locked"

        // id If you are updating a note, this is the ID number of the note to update.
        // note[post_id] The ID number of the post this note belongs to.
        // note[x] The x coordinate of the note.
        // note[y] The y coordinate of the note.
        // note[width] The width of the note.
        // note[height] The height of the note.
        // note[is_active] Whether or not the note is visible. Set to 1 for active, 0 for inactive.
        // note[body] The note message.
    }

    create() {

    }
}