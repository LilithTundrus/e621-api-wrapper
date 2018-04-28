import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621PoolInfo
} from '../interfaces';

export default class Pools {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** List ALL pools by newest first
     * @param {number} [page] The page number to return
     * @returns Promise<e621PoolInfo[]>
     * @memberof Pools
     */
    listPools(page?: number) {
        let url = `https://e621.net/pool/index.json?`;
        if (page) url = url + `page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621PoolInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    listPoolPosts() {

    }

    /** Get a pool or set of pools matched by name
     * @param {string} query The text to match to a pool's title
     * @param {number} [page] The page number to return
     * @returns Promise<e621PoolInfo[]>
     * @memberof Pools
     */
    getPoolsByName(query: string, page?: number) {
        let url = `https://e621.net/pool/index.json?query=${query}`;
        if (page) url = url + `page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621PoolInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    update() {

    }

    destroy() {

    }

    addPost() {

    }

    removePost() {

    }
}