import { e621TagTypes, e621RelatedTagArrayTypes } from './enums';

export interface e621PostData {
    id: Number,
    tags: String,
    locked_tags: String,
    description: String,
    created_at: {
        json_class: String,
        s: Date,
        n: Date
    },
    creator_id: Number,
    author: String,
    change: Number,
    source: String,
    score: Number,
    fav_count: Number,
    md5: String,
    // in bytes
    file_size: Number,
    file_url: String,
    file_ext: String,
    preview_url: String,
    preview_width: Number,
    preview_height: Number,
    sample_url: String,
    sample_width: Number,
    sample_height: Number,
    rating: String,
    status: String,
    width: Number,
    height: Number,
    has_comments: Boolean,
    has_notes: Boolean,
    has_children: Boolean,
    children: Number,
    parent_id: Number,
    artist: string[],
    sources: string[],
    delreason: String
}

export interface e621TagJSON {
    id: number,
    name: string,
    count: number,
    type: e621TagTypes,
    type_locked: boolean
}

export interface e621TagAliases {
    id: number,
    name: string,
    alias_id: number,
    pending: boolean
}

export interface e621MD5CheckJSON {
    md5: string
    exists: boolean
    post_id: number
}

export interface e621TagUpdateResponse {
    success: boolean,
    reason?: string
}

export interface e621RelatedTagJSON {
    name: string,
    popularity: string,
    type: string
}

export interface e621ArtistInfo {
    id: number,
    name: string,
    other_names: string,
    group_name: string,
    urls: string[],
    is_active: boolean,
    version: number,
    updater_id: number
}

export interface e621ArtistCreateJSON {
    "artist[name]": string,
    "artist[urls]": string,
    "artist[groups]"?: string,
    "artist[other_names]"?: string,
}