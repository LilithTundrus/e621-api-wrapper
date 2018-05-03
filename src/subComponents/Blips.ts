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

    /** Create a blip, either in response to another blip or standalone
     * @param {string} bodyText Text of the blip's body to create
     * @param {number} [responseID] ID of another blip to respond to
     * @returns Promise<e621POSTResponse>
     * @memberof Blips
     */
    public create(bodyText: string, responseID?: number) {
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

    /** Update a blip's body by ID
     * @param {number} blipID ID of the blip to update
     * @param {string} bodyText New text of the blip body
     * @returns Promise<e621POSTResponse>
     * @memberof Blips
     */
    public update(blipID: number, bodyText: string) {
        let url = `https://e621.net/blip/update.json`;

        let postObj = {
            "id": blipID,
            "blip[body]": bodyText
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
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