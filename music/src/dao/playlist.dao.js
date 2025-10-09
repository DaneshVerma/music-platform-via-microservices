import playlistModel from "../models/playlist.model.js";

export async function createPlaylist(title, artist, artistId, musics) {
    if (!title || !artist || !artistId || !musics) {
        throw new Error("All fields are required");
    }
    const playlist = await playlistModel.create({ title, artist, artistId, musics });
    return playlist;
}

export async function getAllPlaylist(skip, limit) {
    if (!skip || !limit) {
        throw new Error("All fields are required");
    }
    const playlist = await playlistModel.find().skip(skip).limit(limit);
    return playlist;
}