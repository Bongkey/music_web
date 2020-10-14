const heartBtn = document.querySelector('.heart-btn');
const songs = document.querySelectorAll('.song');
const heart = document.querySelector('.heart');

heart.style.animation = "heartBeat 2s linear infinite";
heartBtn.addEventListener("click", heartBtnHandler);

songs.forEach(song => {
    song.addEventListener("click", songHandler);
});

function heartBtnHandler() {
    heart.style.animation = heart.style.animation ? "" : "heartBeat 2s linear infinite";
    heartBtn.style.fontWeight = heartBtn.style.fontWeight ? "" : 800;
    heartBtn.style.color = heartBtn.style.color === "tomato" ? "#000" : "tomato";
}

function songHandler(event) {
    const otherSong = document.querySelector('.selected-song');
    if (otherSong && otherSong !== event.currentTarget) {
        otherSong.classList.toggle('selected-song');
    }
    // //currentTarget -> 상위 요소
    event.currentTarget.classList.toggle('selected-song');

}