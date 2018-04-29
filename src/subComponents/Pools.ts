import { RequestServices } from '../RequestService';
import {
    e621POSTResponse, e621PoolInfo,
    e621PoolPostSet
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
        if (page) url = url + `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621PoolInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    listPoolPosts(poolID: number | string, page?: number) {

        let url = `https://e621.net/pool/show.json?id=${poolID}`;
        if (page) url = url + `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621PoolPostSet) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Get a pool or set of pools matched by name
     * @param {string} query The text to match to a pool's title
     * @param {number} [page] The page number to return
     * @returns Promise<e621PoolInfo[]>
     * @memberof Pools
     */
    getPoolsByName(query: string, page?: number) {
        let url = `https://e621.net/pool/index.json?query=${query}`;
        if (page) url = url + `&page=${page}`;

        return this.requestServices.get(url)
            .then((response: e621PoolInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** 
     * @param {string} poolName The name of the pool to create
     * @param {string} poolDescription A description of the pool
     * @param {boolean} isLocked 
     * @returns Promise<e621POSTResponse>s
     * @memberof Pools
     */
    create(poolName: string, poolDescription: string) {
        //         The base URL is /pool/create.xml.

        // pool[name] The name.
        // pool[is_locked] 1 or 0, whether or not the pool is locked. Mod+ only function.
        // pool[description] A description of the pool.
        let url = `https://e621.net/pool/create.json`;
        let postObj = {
            "pool[name]": poolName,
            "pool[description]": poolDescription,
        }

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    update(poolID: number | string, poolName?: string, poolDescription?: string, isLocked?: boolean) {
        //         The base URL is /pool/update.xml.

        // id The pool ID number.
        // pool[name] The name.
        // pool[is_locked] 1 or 0, whether or not the pool is locked. Mod+ only function.
        // pool[description] A description of the pool.
    }

    destroy(poolID: number | string) {
        // The base URL is /pool/destroy.xml.

        // id The pool ID number.
    }

    addPost(poolID, postID) {
        //         The base URL is /pool/add_post.xml. Potential error reasons: "Post already exists", "access denied"

        // pool_id The pool to add the post to.
        // post_id The post to add.
    }

    removePost(poolID, postID) {
        // The base URL is / pool / remove_post.xml.Potential error reasons: "access denied"

        // pool_id The pool to remove the post from.
        // post_id The post to remove.
    }
}