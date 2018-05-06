import { e621TagTypes, e621RelatedTagArrayTypes, e621UserLevels } from './enums';

export interface e621PostData {
    id: number,
    tags: string,
    locked_tags: string,
    description: string,
    created_at: {
        json_class: string,
        s: number,
        n: number
    },
    creator_id: number,
    author: string,
    change: number,
    source: string,
    score: number,
    fav_count: number,
    md5: string,
    // in bytes
    file_size: number,
    file_url: string,
    file_ext: string,
    preview_url: string,
    preview_width: number,
    preview_height: number,
    sample_url: string,
    sample_width: number,
    sample_height: number,
    rating: string,
    status: string,
    width: number,
    height: number,
    has_comments: boolean,
    has_notes: boolean,
    has_children: boolean,
    children: number,
    parent_id: number,
    artist: string[],
    sources: string[],
    delreason: string
}

export interface e621PostDataConverted {
    id: number,
    tags: string,
    locked_tags: string,
    description: string,
    created_at: string,
    creator_id: number,
    author: string,
    change: number,
    source: string,
    score: number,
    fav_count: number,
    md5: string,
    // in bytes
    file_size: number,
    file_url: string,
    file_ext: string,
    preview_url: string,
    preview_width: number,
    preview_height: number,
    sample_url: string,
    sample_width: number,
    sample_height: number,
    rating: string,
    status: string,
    width: number,
    height: number,
    has_comments: boolean,
    has_notes: boolean,
    has_children: boolean,
    children: number,
    parent_id: number,
    artist: string[],
    sources: string[],
    delreason: string
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

export interface e621ArtistUpdateJSON {
    "id": string | number
    "artist[name]": string,
    "artist[urls]": string,
    "artist[groups]"?: string,
    "artist[other_names]"?: string,
    "artist[is_active]"?: boolean
}

export interface e621ArtistPOSTJSON {
    success: boolean,
    reason?: string
}

export interface e621POSTResponse {
    success: boolean,
    reason?: string,
    message?: string
}

export interface e621CommentJSON {
    id: number,
    created_at: string,
    post_id: number,
    creator: string,
    creator_id: number,
    body: string,
    score: number
}

export interface e621CommentCreateJSON {
    "comment[post_id": string | number
    "comment[anonymous]": 1 | 0,
    "comment[body]": string,
}

export interface e621CommentUpdateJSON {
    "id": string | number
    "comment[body]": string,
}

export interface e621PoolInfo {
    id: number,
    name: string,
    created_at: { json_class: 'Time', s: number, n: number },
    updated_at: { json_class: 'Time', s: number, n: number },
    user_id: number,
    is_locked: boolean,
    post_count: number,
}

export interface e621PoolPostSet {
    created_at: { json_class: 'Time', s: number, n: number },
    description: string,
    id: number,
    is_active: boolean,
    is_locked: boolean,
    name: string,
    post_count: number,
    updated_at: { json_class: 'Time', s: number, n: number },
    user_id: number,
    posts: e621PostData[]
}

export interface e621UserInfo {
    name: string,
    id: number
    level: e621UserLevels,
    created_at: string,
    avatar_id: number,
    stats:
    {
        post_count: number,
        del_post_count: number,
        edit_count: number,
        favorite_count: number,
        wiki_count: number,
        forum_post_count: number,
        note_count: number,
        comment_count: number,
        blip_count: number,
        set_count: number,
        pool_update_count: number,
        pos_user_records: number,
        neutral_user_records: number,
        neg_user_records: number
    },
    artist_tags: string[]
}

export interface e621BlipInfo {
    body: string,
    user: string,
    user_id: number,
    id: number,
    response: number
}

export interface e621SetJSON {
    id: number,
    name: string,
    created_at: { json_class: string, s: number, n: number },
    updated_at: { json_class: string, s: number, n: number },
    user_id: number,
    description: string,
    shortname: string,
    post_count: number,
    posts: e621PostData[]
}

export interface e621SetJSONConverted {
    id: number,
    name: string,
    created_at: string,
    updated_at: string,
    user_id: number,
    description: string,
    shortname: string,
    post_count: number,
    public: boolean,
    transfer_to_parent_on_delete: boolean
}

export interface e621SetJSONConvertedWithPosts {
    id: number,
    name: string,
    created_at: string,
    updated_at: string,
    user_id: number,
    description: string,
    shortname: string,
    post_count: number,
    public: boolean,
    transfer_to_parent_on_delete: boolean
    posts: e621PostDataConverted[]
}

export interface e621DmailMessage {
    id: number,
    parent_id: number,
    title: string,
    body: string,
    has_seen: boolean,
    created_at: { json_class: string, s: number, n: number },
    from_id: number,
    from: string,
    to_id: number,
    to: string
}

export interface e621PostNote {
    id: number,
    created_at: { json_class: string, s: number, n: number },
    updated_at: { json_class: string, s: number, n: number },
    creator_id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    is_active: true,
    post_id: number,
    body: string,
    version: number
}

export interface e621FavoritedUsers {
    favorited_users: string
}

export interface e621PostTagHistory {
    id: number,
    post_id: number,
    created_at: number,
    tags: string,
    source: string
}

export interface e621WikiEntry {
    id: number,
    created_at: { json_class: string, s: number, n: number },
    updated_at: { json_class: string, s: number, n: number },
    title: string,
    body: string,
    updater_id: number,
    locked: boolean,
    version: number
}


export interface e621ForumPost {
    body: string,
    creator: string,
    creator_id: number,
    id: number,
    parent_id: number | null,
    title: string
}