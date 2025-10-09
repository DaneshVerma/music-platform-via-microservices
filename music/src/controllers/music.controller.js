import musicModel from "../models/music.model.js";
import {
  uploadFile,
  getSignedUrlForAccess,
} from "../services/storage.service.js";
import { createPlaylist, getAllPlaylist } from "../dao/playlist.dao.js";

export async function createMusic(req, res) {
  const musicFile = req.files["music"][0];
  const coverImageFile = req.files["coverImage"][0];

  const music = await uploadFile(musicFile);
  const coverImage = await uploadFile(coverImageFile);

  const musicDoc = await musicModel.create({
    title: req.body.title,
    artist: req.user.fullName.firstName + " " + req.user.fullName.lastName,
    artistId: req.user.id,
    musicUrl: music,
    coverImageUrl: coverImage,
  });

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: musicDoc._id,
      title: musicDoc.title,
      artist: musicDoc.artist,
      musicUrl: await getSignedUrlForAccess(musicDoc.musicUrl),
      coverImageUrl: await getSignedUrlForAccess(musicDoc.coverImageUrl),
    },
  });
}

export async function getAllMusic(req, res) {
  const { skip, limit } = parseInt(req.query);

  const musics = await musicModel
    .find()
    .skip(parseInt(skip))
    .limit(parseInt(limit));
  for (let music of musics) {
    music.musicUrl = await getSignedUrlForAccess(music.musicUrl);
    music.coverImageUrl = await getSignedUrlForAccess(music.coverImageUrl);
    musicDoc.push(music);
  }

  res.status(200).json({
    musics,
  });
}

export async function createPlaylist(req, res) {
  const { titel, musics } = req.body;
  const artistId = req.user.id;
  const artist = req.user.fullName.firstName + " " + req.user.fullName.lastName;

  const playlist = await createPlaylist(titel, artist, artistId, musics);

  res.status(201).json({
    message: "Playlist created successfully",
    playlist,
  });
}

export async function getAllPlaylist(req, res) {
  const { skip, limit } = parseInt(req.query);

  const playlists = await getAllPlaylist(skip, limit);

  res.status(200).json({
    playlists,
  });
}
