// Application State
const appState = {
  photoCount: 0,
  photos: [],
  currentPhotoIndex: 0,
  selectedLayout: null,
  currentFilter: 'none',
  currentBeautySettings: {
    brightness: 0,
    contrast: 0,
    blur: 0,
    saturation: 0
  },
  stickers: []
};

// Screen Navigation
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show target screen
  document.getElementById(screenId).classList.add('active');
  
  // Scroll to top
  window.scrollTo(0, 0);
}

function goToWelcome() {
  appState.photoCount = 0;
  appState.photos = [];
  appState.currentPhotoIndex = 0;
  appState.stickers = [];
  showScreen('welcomeScreen');
}

function goToPhotoSelection() {
  showScreen('photoSelectionScreen');
}

function selectPhotoCount(count) {
  appState.photoCount = count;
  document.getElementById('totalPhotos').textContent = count;
  document.getElementById('photoCounter').textContent = '1';
  appState.currentPhotoIndex = 0;
  appState.photos = [];
  goToCamera();
}

function goToCamera() {
  showScreen('cameraScreen');
  initCamera();
}

function goToEditor() {
  showScreen('editorScreen');
}

function goToLayout() {
  showScreen('layoutScreen');
  initLayoutGrid();
}

function goToPreview() {
  showScreen('previewScreen');
  generateFinalPreview();
}

// Initialize app
window.addEventListener('DOMContentLoaded', function() {
  showScreen('welcomeScreen');
});
