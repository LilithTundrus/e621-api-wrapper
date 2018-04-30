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

    public create(bodyText: string, responseID?: number) {
        // The base URL is /blip/create.json.

        // blip[body] The blip's content.
        // blip[response] Blip ID number of the blip that the new blip is in response to, if any.

        let url = `https://e621.net/blip/create.json`;
        let postObj;
        if (!responseID) {
            postObj = {
                "blip[body]": bodyText,
                "blip[response]": responseID
            };
        } else {
            postObj = {
                "blip[body]": bodyText,
            };
        }

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    public update(blipID: number, bodyText: string) {
        // The base URL is /blip/update.json.

        // id The ID number of the blip being edited.
        // blip[body] The blip's content.
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

    /** Search for a blip that contains a given `textToMatch`
     * @param {string} textToMatch 
     * @param {number} [page] 
     * @returns Promise<e621BlipInfo[]>
     * @memberof Blips
     */
    public getBlipByText(textToMatch: string, page?: number) {
        let url = `https://e621.net/blip/index.json?body==${textToMatch}`;
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