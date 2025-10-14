const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['fall','room'];
let songIndex = 1;

function loadSong(song) {
    title.innerText = song;
    audio.scr = `music/${song}.mp3`;
    cover.scr = `images/${song}.jpg`;
}

loadSong(songs[songIndex]);

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.replace('fa-pause','fa-play');
    audio.pause();
}

playBtn.addEventListener('click',() =>{
    const isPlaying = musicContainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
});

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function updateProgress(e) {
    const { duration, currentTime} = e.scrElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);