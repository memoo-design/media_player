document.addEventListener('DOMContentLoaded', function () {
    const audio = new Audio(); 
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeControl = document.getElementById('volumeControl');
    const playbackSpeed = document.getElementById('playbackSpeed');
    const progressBar = document.getElementById('progressBar');
    const playbackSeek = document.getElementById('playbackSeek');

    const playlist = [
        { src: './audio/Jungkook-Dreamers-FIFA-World-Cup-2022.mp3', name: 'Dreamers', artist: 'Jungkook by Bts' },
        { src: './audio/Keane_-_Somewhere_Only_We_Know_CeeNaija.com_.mp3', name: 'Somewhere only we know', artist: 'keanee' },
        { src: './audio/Lovely(PagalNew.Com.Se).mp3', name: 'lovely', artist: 'Billie Eliesh' }
    ];

    let currentTrackIndex = 0;

    function loadTrack(index) {
        audio.src = playlist[index].src;
        document.getElementById('track-name').textContent = playlist[index].name;
        document.getElementById('artist-name').textContent = playlist[index].artist;
        audio.load(); 
        audio.play(); 
        playPauseBtn.textContent = 'Pause'; 
    }

    playPauseBtn.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    prevBtn.addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : playlist.length - 1;
        loadTrack(currentTrackIndex);
    });

    nextBtn.addEventListener('click', function () {
        currentTrackIndex = (currentTrackIndex < playlist.length - 1) ? currentTrackIndex + 1 : 0;
        loadTrack(currentTrackIndex);
    });

    volumeControl.addEventListener('input', function () {
        audio.volume = volumeControl.value;
    });

    playbackSpeed.addEventListener('input', function () {
        audio.playbackRate = playbackSpeed.value;
    });

    playbackSeek.addEventListener('input', function () {
        audio.currentTime = (playbackSeek.value / 100) * audio.duration;
    });

    audio.addEventListener('timeupdate', function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
        playbackSeek.value = (progress);
    });

    audio.addEventListener('ended', function () {
        nextBtn.click();
    });

    loadTrack(currentTrackIndex);
});
