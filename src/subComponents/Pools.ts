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
    public listPools(page?: number) {
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

    /** List the posts contained in a pool
     * @param {(number | string)} poolID ID of the pool to list the posts of
     * @param {number} [page] The page number to return
     * @returns Promise<e621PoolPostSet>
     * @memberof Pools
     */
    public listPoolPosts(poolID: number | string, page?: number) {
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
    public getPoolsByName(query: string, page?: number) {
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

    /** Create a pool, giving a name and description. You can add posts to the pool using the `pools.addPost` method
     * @param {string} poolName The name of the pool to create
     * @param {string} poolDescription A description of the pool
     * @returns Promise<e621POSTResponse>
     * @memberof Pools
     */
    public create(poolName: string, poolDescription: string) {
        let url = `https://e621.net/pool/create.json`;

        let postObj = {
            "pool[name]": poolName,
            "pool[description]": poolDescription,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a pool's name by ID
     * @param {(number | string)} poolID ID of the pool to update
     * @param {string} poolName The updated name for the given `poolID`
     * @returns Promise<e621POSTResponse>
     * @memberof Pools
     */
    public updatePoolName(poolID: number | string, poolName: string) {
        let url = `https://e621.net/pool/update.json`;

        let postObj = {
            "id": poolID,
            "pool[name]": poolName,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update a pool's description by ID
     * @param {(number | string)} poolID ID of the pool to update
     * @param {string} poolDescription The updated description for the given `poolID`
     * @returns Promise<e621POSTResponse>
     * @memberof Pools
     */
    public updatePoolDescription(poolID: number | string, poolDescription: string) {
        let url = `https://e621.net/pool/update.json`;

        let postObj = {
            "id": poolID,
            "pool[description]": poolDescription,
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Delete a pool by its ID
     * 
     * You must either own the pool or be a moderator (or above) to delete a pool
     * @param {(number | string)} poolID ID of the pool to delete
     * @returns Promise<e621POSTResponse>
     * @memberof Pools
     */
    public destroy(poolID: number | string) {
        let url = `https://e621.net/pool/destroy.json`;

        return this.requestServices.post(url,
            {
                "id": poolID
            })
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Add a post from a pool by the pool and post ID
     * @param {number} poolID ID of the pool to add to
     * @param {number} postID ID of the post to add
     * @returns Promise<e621POSTResponse>
     * @memberof Pools
     */
    public addPost(poolID: number, postID: number) {
        let url = `https://e621.net/pool/add_post.json`;

        let postObj = {
            "pool_id": poolID,
            "post_id": postID
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Remove a post from a pool by the pool and post ID
     * @param {number} poolID ID to the pool to remove the post from
     * @param {number} postID ID of the post to remove
     * @returns Promise<e621POSTResponse>
     * @memberof Pools
     */
    public removePost(poolID: number, postID: number) {
        let url = `https://e621.net/pool/remove_post.json`;

        let postObj = {
            "pool_id": poolID,
            "post_id": postID
        };

        return this.requestServices.post(url, postObj)
            .then((response: e621POSTResponse) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}