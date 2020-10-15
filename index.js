const heartBtn = document.querySelector('.heart-btn');
const songs = document.querySelectorAll('.song');
const heart = document.querySelector('.heart');
const currentPlayTime = document.querySelector('.play__time p:first-child');
const totalPlayTime = document.querySelector('.play__time p:last-child');
const timeRange = document.querySelector('.play__range input[type=range]');
const albumImg = document.querySelector('.main-screen .cover img');
const playTitle = document.querySelector('.list-screen .play__text span');
const mainTitle = document.querySelector('.main-screen .song__text h1');
const playIcons = document.querySelectorAll('.fa-play');

const songTitles = ['EIGHT', 'Blueming', 'BBIBBI', 'Palette'];
const fileTitles = ['eight', 'blueming', 'bbibbi', 'palette'];

let preMusic = "";

const HEART_ANIMATION = "heartBeat 2s linear infinite";
heart.style.animation = HEART_ANIMATION;

heartBtn.addEventListener("click", heartBtnHandler);
songs.forEach(song => {
    song.addEventListener("click", songHandler);
});
timeRange.addEventListener("input", rangeHandler);

function heartBtnHandler() {
    heart.style.animation = heart.style.animation ? "" : HEART_ANIMATION;
    heartBtn.style.fontWeight = heartBtn.style.fontWeight ? "" : 800;
    heartBtn.style.color = heartBtn.style.color === "tomato" ? "#000" : "tomato";
}

function songHandler(event) {
    const songTitle = event.currentTarget.querySelector('span').innerText;
    const songIndex = searchSongIndex(songTitle);
    const music = new Audio('audio/' + fileTitles[songIndex]+'.mp3');

    albumImg.src = ('img/'+ fileTitles[songIndex]+'.jpg');
    playTitle.innerText = songTitles[songIndex];
    mainTitle.innerText = songTitles[songIndex];

    const otherSong = document.querySelector('.selected-song');

    musicPlayAndPause(music);

    // 다른 .song 클릭시
    if (otherSong && otherSong !== event.currentTarget) {
        otherSong.classList.toggle('selected-song');
    }
    // //currentTarget -> 상위 요소
    event.currentTarget.classList.toggle('selected-song');
}

function musicPlayAndPause(music) {
    if (preMusic.src === music.src) {
        preMusic.pause();
        music.pause();
        if(preMusic === ""){
            music.play();
        } else {
            preMusic="";
        }
        playIconsToggle(true);
    } else if (preMusic === "") {
        music.play();
        preMusic = music;
    } else if (preMusic !== music) {
        if(preMusic)
        preMusic.pause();
        music.play();
        preMusic = music;
    }
}

function searchSongIndex(songTitle) {
    for (i = 0; i < songTitles.length; i++) {
        if (songTitle === songTitles[i]) {
            return (songTitles.indexOf(songTitles[i]));
        }
    }
}

setInterval(function () {
    if (preMusic !== "") {
        const currentTime = parseInt(preMusic.currentTime);
        const duration = parseInt(preMusic.duration);
        timeRange.max = duration;
        timeRange.value = currentTime;
        const currentTimes = {
            min: (parseInt(currentTime / 60)),
            sec: (currentTime % 60)
        }
        const durations = {
            min: (parseInt(duration / 60)),
            sec: (duration % 60)
        }
        currentPlayTime.innerText = `${currentTimes.min}:${currentTimes.sec}`;
        totalPlayTime.innerText = `${durations.min}:${durations.sec}`;
        playIconsToggle(preMusic.paused);
    }
}, 500);

function rangeHandler (event) {
    preMusic.currentTime = event.target.value;
}

function playIconsToggle (musicState) {
    playIcons.forEach(icon => {
        icon.className = musicState ? "fas fa-play" : "fas fa-pause";
    })
}