const searchSongs = () => {   //OR const searchSongs = async() => {
   const searchText = document.getElementById("searchBox").value;
   const url = `https://api.lyrics.ovh/suggest/${searchText}`
   //load data
   fetch(url)  //OR const res = await fetch(url);
   .then(res => res.json())   //OR const data = await res.json();
   .then(data => displaySongs(data.data))   //OR displaySongs(data.data);
   .catch = (error => displayError(error));
}

const displaySongs = songs => {
   const songContainer = document.getElementById("song-container");
   songContainer.innerHTML = "";
   songs.forEach(song => {
      const songDiv = document.createElement("div");
      songDiv.className = "single-result row align-items-center my-3 p-3";
      songDiv.innerHTML = `
         <div class="col-md-9">
             <h3 class="lyrics-name">${song.title}</h3>
             <p class="author lead">Album by <span>${song.artist.name}</span></p>
             <audio controls>
               <source src="${song.preview}" type="audio/ogg">
            </audio>
         </div>
         <div class="col-md-3 text-md-right text-center">
             <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
         </div>
      `;
      songContainer.appendChild(songDiv);
   });
};

const getLyrics = (artist, title) => {   //OR const getLyrics = async(artist, title) => {
   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
   fetch(url)  //OR const res = await fetch(url);
   .then(res => res.json())   //OR const data = await res.json();
   .then(data => displayLyrics(data.lyrics))   //OR displaySongs(data.lyrics);
}

const displayLyrics = lyrics => {
   const lyricsDiv = document.getElementById(("song-lyrics"));
   lyricsDiv.innerText = lyrics;
}

const displayError = error => {
   const errorTag = document.getElementById("error-msg");
   errorTag.innerText = error;
}
