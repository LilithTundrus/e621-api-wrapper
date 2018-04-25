import { RequestServices } from '../RequestService';
import { e621ArtistInfo } from '../interfaces';

export default class Artists {
    private pageLimit: number;
    private requestServices: RequestServices;

    public constructor(pageLimit: number, requestServices: RequestServices) {
        this.pageLimit = pageLimit;
        this.requestServices = requestServices;
    }

    listArtists(name?: string, limit?: number, order?: string, page?: number) {
        //         The base URL is /artist/index.json.
        // name The name (or a fragment of the name) of the artist or the artist URL.
        // limit How many records per page.
        // order Can be date or name.
        // page The page number.
        let url = `https://e621.net/artist/index.json?`

        return this.requestServices.get(url)
            .then((response: e621ArtistInfo[]) => {
                return response;
            })
            .catch((err) => {
                throw Error(err);
            })
    }

    createArtist() {
        //         The base URL is /artist/create.json.

        // artist[name] The artist's name.
        // artist[urls] A list of URLs associated with the artist, whitespace delimited.
        // artist[group_name] The group or circle that this artist is a member of. Simply enter the group's name.
        // artist[other_names] List of comma separated names this artist is also known by.
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