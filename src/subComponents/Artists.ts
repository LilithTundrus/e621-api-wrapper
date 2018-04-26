import { RequestServices } from '../RequestService';
import { e621ArtistInfo, e621ArtistCreateJSON } from '../interfaces';

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

    createArtist(name: string, artistURLs: string, groupName?: string, otherNames?: string) {
        //         The base URL is /artist/create.json.

        // artist[name] The artist's name.
        // artist[urls] A list of URLs associated with the artist, whitespace delimited.
        // artist[group_name] The group or circle that this artist is a member of. Simply enter the group's name.
        // artist[other_names] List of comma separated names this artist is also known by.
        let url = `https://e621.net/tag/update.json`;
        let postObj = <e621ArtistCreateJSON>{
            "artist[name]": name,
            "artist[urls]": artistURLs
        }
        if (groupName) postObj["artist[groups]"] = groupName;
        if (otherNames) postObj["artist[other_names]"] = otherNames;

        console.log(postObj)

        // return this.requestServices.post(url, postObj)
        // .then((response: any) => {
        //     return response;
        // })
        // .catch((err) => {
        //     throw Error(err);
        // })
    }

    updateArtist() {
        //         The base URL is /artist/update.json. Only the id parameter is required. The other parameters are optional.

        // id The ID of the artist to update.
        // artist[name] The artist's name.
        // artist[urls] A list of URLs associated with the artist, whitespace delimited.
        // artist[is_active] Whether or not the artist is active.
        // artist[group_name] The group or circle that this artist is a member of. Simply enter the group's name.
        // artist[other_names] List of comma separated names this artist is also known by.
    }

    deleteArtist() {
        //         The base URL is /artist/destroy.json. You must be logged in to delete artists.

        // id The ID of the artist to destroy.
    }
}