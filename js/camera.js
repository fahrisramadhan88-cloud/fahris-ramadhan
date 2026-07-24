let stream = null;
let currentCameraFacingMode = 'user';
let countdownInterval = null;
let filterApplied = 'none';

async function initCamera() {
  try {
    const constraints = {
      video: {
        facingMode: currentCameraFacingMode,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.getElementById('videoStream');
    video.srcObject = stream;
    
    // Apply filter to video
    if (filterApplied !== 'none') {
      applyVideoFilter(video, filterApplied);
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.');
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

async function switchCamera() {
  const select = document.getElementById('cameraSelect');
  currentCameraFacingMode = select.value === 'front' ? 'user' : 'environment';
  stopCamera();
  await initCamera();
}

function applyFilter(filterName) {
  filterApplied = filterName;
  const video = document.getElementById('videoStream');
  applyVideoFilter(video, filterName);
}

function applyVideoFilter(element, filterName) {
  let filterValue = '';
  
  switch(filterName) {
    case 'grayscale':
      filterValue = 'grayscale(100%)';
      break;
    case 'sepia':
      filterValue = 'sepia(100%)';
      break;
    case 'brightness':
      filterValue = 'brightness(1.3)';
      break;
    case 'cool':
      filterValue = 'hue-rotate(200deg) saturate(1.2)';
      break;
    case 'warm':
      filterValue = 'hue-rotate(-20deg) saturate(1.1)';
      break;
    case 'saturate':
      filterValue = 'saturate(1.5) brightness(1.1)';
      break;
    case 'blur':
      filterValue = 'blur(3px)';
      break;
    default:
      filterValue = 'none';
  }
  
  element.style.filter = filterValue;
}

function capturePhoto() {
  const video = document.getElementById('videoStream');
  const canvas = document.getElementById('photoCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // Draw video with current filter
  ctx.filter = window.getComputedStyle(video).filter;
  ctx.drawImage(video, 0, 0);
  
  // Save photo
  appState.photos.push({
    canvas: canvas.cloneNode(true),
    imageData: canvas.toDataURL('image/png'),
    filter: filterApplied,
    beautySetting: { ...appState.currentBeautySettings },
    stickers: []
  });
  
  // Countdown
  showCountdown();
  
  setTimeout(() => {
    appState.currentPhotoIndex++;
    
    if (appState.currentPhotoIndex < appState.photoCount) {
      document.getElementById('photoCounter').textContent = appState.currentPhotoIndex + 1;
      // Keep camera open for next photo
    } else {
      // All photos taken
      stopCamera();
      goToEditor();
    }
  }, 2000);
}

function showCountdown() {
  const countdownEl = document.getElementById('countdown');
  let count = 3;
  
  countdownEl.classList.remove('hidden');
  countdownEl.textContent = count;
  
  countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
    } else {
      countdownEl.classList.add('hidden');
      clearInterval(countdownInterval);
    }
  }, 1000);
}

function retakePhoto() {
  appState.photos.pop();
  appState.currentPhotoIndex--;
  document.getElementById('photoCounter').textContent = appState.currentPhotoIndex + 1;
  goToCamera();
}
