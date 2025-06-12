// slides
const slides = [
    {
        image: 'https://pbs.twimg.com/media/FNGQMzOVgAM-Ilz?format=jpg',
        title: 'shuyuka',
        description: 'yukari takeba & makoto yuki'
    },
    {
        image: 'https://pbs.twimg.com/media/GNSgJ0NaYAARO2_.jpg',
        title: 'hertamei',
        description: 'the herta & ruan mei'
    },
    {
        image: 'https://pbs.twimg.com/media/GLm_MVwboAAIlfz.jpg',
        title: 'robinhill',
        description: 'robin & boothill'
    },
    {
        image: 'https://pbs.twimg.com/media/GctYAQLWQAAYk6x.jpg',
        title: 'sunfugue',
        description: 'sunday & fugue'
    },
    {
        image: 'https://i.redd.it/45hpmom85t471.jpg',
        title: 'zelink',
        description: 'zelda & link'
    },
    {
        image: 'https://i.pinimg.com/736x/37/09/7a/37097ae20dfdc4a161d8227bd1751d71.jpg',
        title: 'sonamy',
        description: 'sonic & amy'
    },
    {
        image: 'https://pbs.twimg.com/media/Eo7mHHvXMAA_mYJ.jpg',
        title: 'negitoro',
        description: 'megurine luka & hatsune miku'
    }
];

// variáveis globais
let currentSlide = 0;
let isPlaying = false;
let slideInterval;
let audioPlayer;

// elementos do DOM
const initialScreen = document.getElementById('initial-screen');
const mainScreen = document.getElementById('main-screen');
const startBtn = document.getElementById('start-btn');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const slideImage = document.getElementById('slide-image');
const slideTitle = document.getElementById('slide-title');
const slideDescription = document.getElementById('slide-description');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicators = document.querySelectorAll('.indicator');

// inicialização
document.addEventListener('DOMContentLoaded', function() {
    audioPlayer = document.getElementById('audio-player');
    setupEventListeners();
    updateSlide();
});

// event listeners
function setupEventListeners() {
    // botão inicial
    startBtn.addEventListener('click', startExperience);
    
    // controles do player
    playPauseBtn.addEventListener('click', togglePlayPause);
    progressBar.addEventListener('input', seekAudio);
    volumeBar.addEventListener('input', changeVolume);
    
    // controles dos slides
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // audio events
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.textContent = '▶';
    });
}

// iniciar a experiência
function startExperience() {
    initialScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    
    // iniciar música
    audioPlayer.play().then(() => {
        isPlaying = true;
        playIcon.textContent = '⏸';
        startSlideshow();
    }).catch(error => {
        console.log('Erro ao reproduzir áudio:', error);
    });
}

// controles do player de música
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playIcon.textContent = '▶';
        stopSlideshow();
    } else {
        audioPlayer.play().then(() => {
            isPlaying = true;
            playIcon.textContent = '⏸';
            startSlideshow();
        }).catch(error => {
            console.log('Erro ao reproduzir áudio:', error);
        });
    }
}

function seekAudio() {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

function changeVolume() {
    audioPlayer.volume = volumeBar.value / 100;
}

function updateDuration() {
    durationEl.textContent = formatTime(audioPlayer.duration);
}

function updateProgress() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// controles dos slides
function startSlideshow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // muda slide a cada 5 segundos
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

function updateSlide() {
    const slide = slides[currentSlide];
    
    // atualizar imagem com fade
    slideImage.style.opacity = '0';
    
    setTimeout(() => {
        slideImage.src = slide.image;
        slideTitle.textContent = slide.title;
        slideDescription.textContent = slide.description;
        slideImage.style.opacity = '2';
    }, 300);
    
    // atualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// configurar volume inicial
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (audioPlayer) {
            audioPlayer.volume = 0.7;
        }
    }, 100);
});

