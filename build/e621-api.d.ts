import { e621PopularityStrings } from './enums';
import { e621PostData } from './interfaces';
export default class e621 {
    private userAgent;
    private pageLimit;
    constructor(userAgent: string, pageLimit?: number);
    generateE621PostUrl(postID: string): string;
    getPopularPosts(typeArg: e621PopularityStrings): Promise<[e621PostData]>;
    /**
     * Get a post's data by its ID using the e621 API
     * @param {number} postID
    */
    getE621PostByID(postID: string): Promise<e621PostData>;
    getE621PostIndexPaginate(tags: string, start: number, limitPerPage: number, pageLimit: number): Promise<e621PostData[][]>;
    /**
     * Used to get the api key
     * @param {String} username e621 username
     * @param {String} password password (only needed to generate the key)
    */
    getApiKey(username: string, password: string): Promise<string>;
}
