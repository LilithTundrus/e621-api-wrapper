import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621UserInfo
} from '../interfaces';
import { e621UserLevels } from '../enums';

export default class Users {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** List all users by a set of given options, if no arguments are passed, you will get a listing of all users
     * @param {e621UserLevels} [level] Permission level, optional
     * @param {string} [order] Order of the users, can be `name`, `posts`, `deleted`, `notes`, `tagedits, `date` or `record`
     * @returns Promise<e621UserInfo[]>
     * @memberof Users
     */
    public listUsers(level?: e621UserLevels, order?: string) {
        let url = `https://e621.net/user/index.json?`;

        // if no level set but order set
        if (!level && order) url = url + `order=${order}`;
        // if no order set but level is set
        else if (!order && level) url = url + `level=${level}`;
        // if both are set
        else if (order && level) url = url + `level=${level}&order=${order}`;

        return this.requestServices.get(url)
            .then((response: e621UserInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a single user's info by ID (Returns an array from e621 with a single entry)
     * @param {number} userID ID of the user
     * @returns Promise<e621UserInfo[]>
     * @memberof Users
     */
    public getUserInfoByID(userID: number) {
        let url = `https://e621.net/user/index.json?id=${userID}`;

        return this.requestServices.get(url)
            .then((response: e621UserInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a single user's info by name (Returns an array from e621 with a single entry)
     * @param {string} userName Text exactly matching a user's name
     * @returns Promise<e621UserInfo[]>
     * @memberof Users
     */
    public getUserInfoByName(userName: string) {
        let url = `https://e621.net/user/index.json?name=${userName}`;

        return this.requestServices.get(url)
            .then((response: e621UserInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}