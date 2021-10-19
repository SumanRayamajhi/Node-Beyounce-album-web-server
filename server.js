// const express = require("express");
// const app = express();

// const api = require("./api");
// const webapi = api();

// app.use(express.json());
// app.get("/albums", webapi.getAlbumsDetails);
// app.get("/albums/:albumsId", webapi.getAlbumsDetailsById);
// app.post("/albums", webapi.saveAlbumsDetail);

// app.listen(4000, () => console.log("Listening on port 4000"));

const express = require("express");
const app = express();
const albums = require("./albums.json");
const fs = require("fs");

const saveNewAlbumsToJson = (albums) => {
  const text = JSON.stringify(albums, null, 4);
  fs.writeFileSync("./albums.json", text);
};
const getAlbumsFromJson = () => {
  const text = fs.readFileSync("./albums.json");
  const obj = JSON.parse(text);
  return obj;
};

const getAlbumsDetailsById = (request, response) => {
  const albumsId = parseInt(request.params.albumId);
  const album = getAlbumsFromJson().find((q) => q.albumId === albumsId);

  if (album) {
    response.send(album);
  } else {
    response.status(400).send("Album doesn't exist");
  }
};

const getAlbumsDetails = (request, response) => {
  response.send(albums);
};

const addNewAlbum = (request, response) => {
  const newAlbum = request.body;

  //   const sameAlbum = albums.find((q) => q.album === newAlbum.album);

  const sameAlbum = albums.find(
    (q) => q.artworkUrl100 === newAlbum.artworkUrl100
  );
  if (sameAlbum) {
    response.status(400).send("Album already exists");
  }
  const maxAlbumId = Math.max(...albums.map((q) => q.albumId));
  newAlbum.albumId = maxAlbumId + 1;

  albums.push(newAlbum);
  saveNewAlbumsToJson(albums);

  response.status(201).send(newAlbum);
};

const deleteAlbumsById = (request, response) => {
  const albumsId = parseInt(request.params.albumId);
  const jsonAlbums = getAlbumsFromJson().find((q) => q.albumId === albumsId);
  if (jsonAlbums) {
    afterDeleteAlbums = albums.filter((q) => q.albumId != albumsId);
    saveNewAlbumsToJson(afterDeleteAlbums);
    response.status(200).send(jsonAlbums);
  } else {
    response.status(404).send("Did not find album with id " + albumsId);
  }
};

app.use(express.json());
app.get("/albums", getAlbumsDetails);
app.get("/albums/:albumId", getAlbumsDetailsById);
app.post("/albums", addNewAlbum);
app.delete("/albums/:albumId", deleteAlbumsById);

app.listen(4000, () => console.log("Listening on port 4000"));
