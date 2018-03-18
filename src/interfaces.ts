import { e621TagTypes } from './enums';

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
    id: number
    name: string
    count: number
    type: e621TagTypes
    type_locked: boolean
}

export interface e621RelatedTagJSON {
    key: string[][];
}
