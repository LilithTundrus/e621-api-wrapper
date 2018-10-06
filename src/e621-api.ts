
// Imports and dependencies
import Tags from './subComponents/Tags';
import Posts from './subComponents/Posts';
import Artists from './subComponents/Artists';
import Comments from './subComponents/Comments';
import Pools from './subComponents/Pools';
import Users from './subComponents/Users';
import Blips from './subComponents/Blips';
import Sets from './subComponents/Sets';
import Dmail from './subComponents/Dmail';
import Notes from './subComponents/Notes';
import Wiki from './subComponents/Wiki';
import Forums from './subComponents/Forums';

import { RequestServices } from './RequestService';

export default class e621 {
    private userAgent: string;
    private pageLimit: number;
    // These delcarations are how we attach new classes to properties

    /** Directly GET and POST to the e621 API using this service wrapper
     * @memberof e621
     */
    public requestservices: RequestServices;

    /** Contains all methods for performing GET/POST operations on the e621 `tag` endpoints
     * @memberof e621
     */
    public tags: Tags;

    /** Contains all methods for performing GET/POST operations on the e621 `post` endpoints
     * @memberof e621
     */
    public posts: Posts;

    /** Contains all methods for performing GET/POST operations on the e621 `artist` endpoints
     * @memberof e621
     */
    public artists: Artists;

    /** Contains all methods for performing GET/POST operations on the e621 `comment` endpoints
     * @memberof e621
     */
    public comments: Comments;

    /** Contains all methods for performing GET/POST operations on the e621 `pool` endpoints
     * @memberof e621
     */
    public pools: Pools;

    /** Contains all methods for performing GET/POST operations on the e621 `user` endpoints
     * @memberof e621
     */
    public users: Users;

    /** Contains all methods for performing GET/POST operations on the e621 `blip` endpoints
     * @memberof e621
     */
    public blips: Blips;

    /** Contains all methods for performing GET/POST operations on the e621 `set` endpoints
     * @memberof e621
     */
    public sets: Sets;

    /** Contains all methods for performing GET/POST operations on the e621 `dmail` endpoints
     * @memberof e621
     */
    public dmail: Dmail;

    /** Contains all methods for performing GET/POST operations on the e621 `note` endpoints
     * @memberof e621
     */
    public notes: Notes;

    /** Contains all methods for performing GET/POST operations on the e621 `wiki` endpoints
     * @memberof e621
     */
    public wiki: Wiki;

    /** Contains all methods for performing GET/POST operations on the e621 `forum` endpoints
     * @memberof e621
     */
    public forums: Forums;

    /**
     * Creates an instance of e621.
     * @param {string} userAgent This identifies you to the API
     * @param {string} [userName] Your user name (optional, if making changes to data)
     * @param {string} [apiKey] Your API key to use (optional, if making changes to data)
     * @param {number} [pageLimit] Page limit for paginated calls from e621
     * @memberof e621
     */
    public constructor(userAgent: string, userName?: string, apiKey?: string, pageLimit?: number) {
        this.userAgent = userAgent;
        if (pageLimit) this.pageLimit = pageLimit;
        else this.pageLimit = 3;
        if (userName && apiKey) {
            this.requestservices = new RequestServices(userAgent, userName, apiKey);
        } else {
            // we won't send the RequestServices a username + hash if they are not given
            this.requestservices = new RequestServices(userAgent);
        }
        // assign the properties as new classes with the page limit and the methods for get/post 
        // operations as arguments
        this.tags = new Tags(this.pageLimit, this.requestservices);
        this.posts = new Posts(this.pageLimit, this.requestservices);
        this.artists = new Artists(this.pageLimit, this.requestservices);
        this.comments = new Comments(this.pageLimit, this.requestservices);
        this.pools = new Pools(this.pageLimit, this.requestservices);
        this.users = new Users(this.pageLimit, this.requestservices);
        this.blips = new Blips(this.pageLimit, this.requestservices);
        this.sets = new Sets(this.pageLimit, this.requestservices);
        this.dmail = new Dmail(this.pageLimit, this.requestservices);
        this.notes = new Notes(this.pageLimit, this.requestservices);
        this.wiki = new Wiki(this.pageLimit, this.requestservices);
        this.forums = new Forums(this.pageLimit, this.requestservices);
    }

    public get agent() { return this.userAgent; }
    public get limit() { return this.pageLimit; }
}