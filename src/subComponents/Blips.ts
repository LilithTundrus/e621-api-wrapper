import { RequestServices } from '../RequestService';
import {
    e621POSTResponse
} from '../interfaces';

export default class Blips {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    create() {
        // The base URL is /blip/create.json.

        // blip[body] The blip's content.
        // blip[response] Blip ID number of the blip that the new blip is in response to, if any.

    }
    update() {
        // The base URL is /blip/update.json.

        // id The ID number of the blip being edited.
        // blip[body] The blip's content.
    }

    list() {
        // [ Example XML output ][ Example JSON output ]

        // The base URL is /blip/index.json. If you don't specify any parameters you'll get a list of the most recent blips.

        // name Return blips created by the user with the given name
        // body Returns blips that contain the given string
        // page The page number.
        // limit How many blips to retrieve. Hard limit of 100.
        // status Returns hidden blips when set to hidden, visible blips when set to active, or both when set to any. Note that whether or not you can see other user's hidden blips is affected by your permission levels.
        // response_to ID number of a blip. Returns blips which are in response to the blip with the given ID.
    }

    show() {
        // [ Example XML output ][ Example JSON output ]

        // The base URL is /blip/show.json.

        // id Returns the blip with the given ID number
    }
}