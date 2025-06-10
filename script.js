// Dados dos slides
const slides = [
    {
        image: 'assets/slide1.jpg',
        title: 'Paisagem Montanhosa',
        description: 'Belas montanhas com flores silvestres'
    },
    {
        image: 'assets/slide2.jpg',
        title: 'Lago Sereno',
        description: 'Um lago tranquilo ao entardecer'
    },
    {
        image: 'assets/slide3.jpg',
        title: 'Cachoeira Outonal',
        description: 'Cachoeira em meio à floresta de outono'
    },
    {
        image: 'assets/slide4.jpg',
        title: 'Fiorde Norueguês',
        description: 'Paisagem deslumbrante da Noruega'
    }
];

// Variáveis globais
let currentSlide = 0;
let isPlaying = false;
let slideInterval;
let audioPlayer;

// Elementos do DOM
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

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    audioPlayer = document.getElementById('audio-player');
    setupEventListeners();
    updateSlide();
});

// Event Listeners
function setupEventListeners() {
    // Botão inicial
    startBtn.addEventListener('click', startExperience);
    
    // Controles do player
    playPauseBtn.addEventListener('click', togglePlayPause);
    progressBar.addEventListener('input', seekAudio);
    volumeBar.addEventListener('input', changeVolume);
    
    // Controles dos slides
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Audio events
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.textContent = '▶';
    });
}

// Função para iniciar a experiência
function startExperience() {
    initialScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    
    // Iniciar música
    audioPlayer.play().then(() => {
        isPlaying = true;
        playIcon.textContent = '⏸';
        startSlideshow();
    }).catch(error => {
        console.log('Erro ao reproduzir áudio:', error);
    });
}

// Controles do player de música
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

// Controles dos slides
function startSlideshow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 4000); // Muda slide a cada 4 segundos
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
    
    // Atualizar imagem com fade
    slideImage.style.opacity = '0';
    
    setTimeout(() => {
        slideImage.src = slide.image;
        slideTitle.textContent = slide.title;
        slideDescription.textContent = slide.description;
        slideImage.style.opacity = '1';
    }, 300);
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Configurar volume inicial
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (audioPlayer) {
            audioPlayer.volume = 0.7;
        }
    }, 100);
});

