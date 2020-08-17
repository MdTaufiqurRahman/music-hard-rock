
// Active search area
const searchArea = document.getElementById("searchArea");
searchArea.addEventListener('keypress', function search(press) {
    if(press.keyCode == 13){
        getResults(searchArea.value);
    }
    }
)
// Active search btn
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click', function () {
    getResults(searchArea.value);
})
// Get data from api
function getResults(value) {
    fetch(`https://api.lyrics.ovh/suggest/${value}`)
    .then(response => response.json())
    .then(songs => displayResult(songs))
}
// Display result function
function displayResult(songs) {
    const allSongs = songs.data;
    const searchResult = document.getElementById("searchResult");
    for (let i = 0; i < 10; i++) {
        const title = allSongs[i].title;
        const artist = allSongs[i].artist.name;
        const album = allSongs[i].album.title;
        const albumCover = allSongs[i].album.cover;
        searchResult.innerHTML += `<div class="single-result row my-3 p-3 d-flex justify-content-between align-items-center">
                                    <div class="col-md-9">
                                        <h3 id="title">${title}</h3>
                                        <p class="author lead">Album by: <span>${album}</span></p>
                                        <p>Artist: <span id="author">${artist}</span></p>
                                    </div>
                                    <div>
                                       <img src="${albumCover}" alt="">
                                    </div>
                                    <div class="col-md-3 text-md-right text-center">
                                        <button class="getLyrics btn btn-success" onclick="getLyrics(this)">Get Lyrics</button>
                                    </div>
                                </div>`
    }
}
// get lyrics
function getLyrics(btn) {
const getLyrics = document.getElementsByClassName("getLyrics");
for (let i = 0; i < getLyrics.length; i++) {
    if (btn == getLyrics[i]) {
    const artist = document.getElementById("author").innerHTML;
    const title = document.getElementById("title").innerHTML;
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(function displayResult(lyric) {
        const currentLyric = lyric.lyrics;
        const displayArea = document.getElementById("lyricsArea");
        displayArea.innerHTML = `<button class="btn go-back btn-success" onclick="hide()">Go-Back</button>
                                <h2 class="text-success mb-4">${title}</h2>
                                <pre class="lyric text-white">${currentLyric}</pre>`
        })
    .catch(error => console.log(error))
    }
}
}
// remove lyrics
function hide() {
    const displayArea = document.getElementById("lyricsArea");
    displayArea.remove();
}


