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

    getPoolsByName() {
        // The base URL is /pool/index.xml. If you don't specify any parameters you'll get a list of all pools.

        // query The title.
        // page The page.
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