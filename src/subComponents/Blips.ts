import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621BlipInfo
} from '../interfaces';

export default class Blips {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    public create(bodyText: string, bodyResponse?: string) {
        // The base URL is /blip/create.json.

        // blip[body] The blip's content.
        // blip[response] Blip ID number of the blip that the new blip is in response to, if any.
    }

    public update(blipID: number, bodyText: string) {
        // The base URL is /blip/update.json.

        // id The ID number of the blip being edited.
        // blip[body] The blip's content.
    }

    public list() {
        // The base URL is /blip/index.json. If you don't specify any parameters you'll get a list of the most recent blips.

        // name Return blips created by the user with the given name
        // body Returns blips that contain the given string
        // page The page number.
        // limit How many blips to retrieve. Hard limit of 100.
        // status Returns hidden blips when set to hidden, visible blips when set to active, or both when set to any. Note that whether or not you can see other user's hidden blips is affected by your permission levels.
        // response_to ID number of a blip. Returns blips which are in response to the blip with the given ID.
    }

    /** Get a set of recent blips
     * @param {number} [page] 
     * @returns Promise<e621BlipInfo[]>
     * @memberof Blips
     */
    public getRecentBlips(page?: number) {
        let url = `https://e621.net/blip/index.json?`;
        if (page) url += `page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621BlipInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a blip's information by ID, returns a single blip
     * @param {number} blipID ID for the blip to retrieve
     * @returns Promise<e621BlipInfo>
     * @memberof Blips
     */
    public getBlipByID(blipID: number) {

        return this.requestServices.get(`https://e621.net/blip/show.json?id=${blipID}`)
            .then((response: e621BlipInfo) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a blip's responses (if any). If an error is thrown, then their are no responses for the first (or given) page
     * @param {number} blipID ID for the blip to retrieve the responses ofs
     * @returns Promise<e621BlipInfo[]>
     * @memberof Blips
     */
    public getBlipResponses(blipID: number, page?: number) {
        let url = `https://e621.net/blip/index.json?response_to=${blipID}`;

        if (page) url += `page=${page}`;
        return this.requestServices.get(url)
            .then((response: e621BlipInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}