import { RequestServices } from '../RequestService';
import { e621ArtistInfo, e621ArtistCreateJSON, e621ArtistUpdateJSON, e621ArtistPOSTJSON } from '../interfaces';

export default class Artists {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    /** List artists by name and or/order through the e621 API
     * @param {string} [name] Name The name (or a fragment of the name) of the artist or the artist URL
     * @param {number} [limit] Limit How many records per page
     * @param {string} [order] Order, Can be date or name
     * @param {number} [page] The page number
     * @returns Promise<e621ArtistInfo[]>
     * @memberof Artists
     */
    listArtists(name?: string, limit?: number, order?: string, page?: number) {
        let url = `https://e621.net/artist/index.json?`;
        if (name) url = `https://e621.net/artist/index.json?name=${name}`;
        if (limit) url = url + `&limit=${limit}`;
        if (order) url = url + `&order=${order}`;
        if (page) url = url + `&page=${page}`;
        return this.requestServices.get(url)
            .then((response: e621ArtistInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Create an Artist
     * @param {string} name Name of the artist
     * @param {string} artistURLs A list of URLs associated with the artist, whitespace delimited.
     * @param {string} [groupName] The group or circle that this artist is a member of. Simply give the group's name.
     * @param {string} [otherNames] List of comma separated names this artist is also known by.
     * @returns 
     * @memberof Artists
     */
    createArtist(name: string, artistURLs: string, groupName?: string, otherNames?: string) {
        let url = `https://e621.net/artist/create.json`;
        let postObj = <e621ArtistCreateJSON>{
            "artist[name]": name,
            "artist[urls]": artistURLs
        };
        if (groupName) postObj["artist[groups]"] = groupName;
        if (otherNames) postObj["artist[other_names]"] = otherNames;

        console.log(postObj);

        return this.requestServices.post(url, postObj)
            .then((response: e621ArtistPOSTJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** Update an artists info, only the artistID is required
     * @param {any} artistID ID of the artist to update
     * @param {string} [name] Name of the artist
     * @param {string} [artistURLs] A list of URLs associated with the artist, whitespace delimited.
     * @param {boolean} [isActive] If the Artist is active (true or false)
     * @param {string} [groupName] The group or circle that this artist is a member of. Simply give the group's name.
     * @param {string} [otherNames] List of comma separated names this artist is also known by.
     * @returns 
     * @memberof Artists
     */
    updateArtist(artistID: number | string, name?: string, artistURLs?: string, isActive?: boolean, groupName?: string, otherNames?: string) {
        let url = `https://e621.net/artist/update.json`;

        let postObj = <e621ArtistUpdateJSON>{
            id: artistID
        };
        if (name) postObj["artist[name]"] = name;
        if (artistURLs) postObj["artist[urls]"] = artistURLs;
        if (groupName) postObj["artist[groups]"] = groupName;
        if (otherNames) postObj["artist[other_names]"] = otherNames;
        if (isActive !== null) postObj["artist[is_active]"] = isActive;

        return this.requestServices.post(url, postObj)
            .then((response: e621ArtistPOSTJSON) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    /** DELETE an artist, you must be logged in
     * @param {(number | string)} id ID of the artist to delete
     * @returns 
     * @memberof Artists
     */
    deleteArtist(artistID: number | string) {
        let url = `https://e621.net/artist/destroy.json`;
        return this.requestServices.post(url, {
            "id": artistID
        })
            .then((response: any) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }
}