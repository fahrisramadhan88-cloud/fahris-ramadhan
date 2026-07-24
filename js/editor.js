function loadPhotoToEdit(index) {
  const photo = appState.photos[index];
  const img = new Image();
  
  img.onload = function() {
    const canvas = document.getElementById('photoCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.drawImage(img, 0, 0);
    
    // Apply beauty filter
    applyBeautyFilterToCanvas();
    
    // Load stickers if any
    if (photo.stickers && photo.stickers.length > 0) {
      loadStickers(photo.stickers);
    }
  };
  
  img.src = photo.imageData;
}

function applyPhotoFilter(filterName) {
  const canvas = document.getElementById('photoCanvas');
  const ctx = canvas.getContext('2d');
  const photo = appState.photos[appState.currentPhotoIndex];
  
  // Reload original image
  const img = new Image();
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Apply selected filter
    switch(filterName) {
      case 'grayscale':
        ctx.filter = 'grayscale(100%)';
        break;
      case 'sepia':
        ctx.filter = 'sepia(100%)';
        break;
      case 'brightness':
        ctx.filter = 'brightness(1.3)';
        break;
      case 'cool':
        ctx.filter = 'hue-rotate(200deg) saturate(1.2)';
        break;
      case 'warm':
        ctx.filter = 'hue-rotate(-20deg) saturate(1.1)';
        break;
      case 'saturate':
        ctx.filter = 'saturate(1.5) brightness(1.1)';
        break;
      case 'blur':
        ctx.filter = 'blur(3px)';
        break;
      default:
        ctx.filter = 'none';
    }
    
    ctx.drawImage(img, 0, 0);
    appState.currentFilter = filterName;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  };
  
  img.src = photo.imageData;
}

function updateBeautyFilter() {
  const brightness = parseInt(document.getElementById('brightnessSlider').value);
  const contrast = parseInt(document.getElementById('contrastSlider').value);
  const blur = parseInt(document.getElementById('blurSlider').value);
  const saturation = parseInt(document.getElementById('saturationSlider').value);
  
  appState.currentBeautySettings = {
    brightness,
    contrast,
    blur,
    saturation
  };
  
  applyBeautyFilterToCanvas();
}

function applyBeautyFilterToCanvas() {
  const canvas = document.getElementById('photoCanvas');
  const ctx = canvas.getContext('2d');
  const settings = appState.currentBeautySettings;
  
  let filterString = '';
  
  if (settings.brightness !== 0) {
    filterString += `brightness(${100 + settings.brightness}%) `;
  }
  if (settings.contrast !== 0) {
    filterString += `contrast(${100 + settings.contrast}%) `;
  }
  if (settings.blur !== 0) {
    filterString += `blur(${settings.blur}px) `;
  }
  if (settings.saturation !== 0) {
    filterString += `saturate(${100 + settings.saturation}%) `;
  }
  
  ctx.filter = filterString || 'none';
}

function addSticker(stickerCode) {
  const container = document.getElementById('stickersContainer');
  const sticker = document.createElement('div');
  sticker.className = 'sticker';
  sticker.textContent = stickerCode;
  sticker.style.left = Math.random() * 80 + '%';
  sticker.style.top = Math.random() * 80 + '%';
  
  // Make sticker draggable
  makeStkerDraggable(sticker);
  
  container.appendChild(sticker);
  appState.stickers.push({
    code: stickerCode,
    left: sticker.style.left,
    top: sticker.style.top
  });
}

function makeStkerDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  element.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  
  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    const newTop = element.offsetTop - pos2;
    const newLeft = element.offsetLeft - pos1;
    
    element.style.top = newTop + 'px';
    element.style.left = newLeft + 'px';
  }
  
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function nextPhoto() {
  appState.currentPhotoIndex++;
  
  if (appState.currentPhotoIndex < appState.photoCount) {
    loadPhotoToEdit(appState.currentPhotoIndex);
    document.getElementById('photoCounter').textContent = appState.currentPhotoIndex + 1;
    resetBeautyFilters();
  } else {
    goToLayout();
  }
}

function resetBeautyFilters() {
  document.getElementById('brightnessSlider').value = 0;
  document.getElementById('contrastSlider').value = 0;
  document.getElementById('blurSlider').value = 0;
  document.getElementById('saturationSlider').value = 0;
  
  appState.currentBeautySettings = {
    brightness: 0,
    contrast: 0,
    blur: 0,
    saturation: 0
  };
}

function loadStickers(stickers) {
  const container = document.getElementById('stickersContainer');
  container.innerHTML = '';
  
  stickers.forEach(sticker => {
    const stickerEl = document.createElement('div');
    stickerEl.className = 'sticker';
    stickerEl.textContent = sticker.code;
    stickerEl.style.left = sticker.left;
    stickerEl.style.top = sticker.top;
    makeStkerDraggable(stickerEl);
    container.appendChild(stickerEl);
  });
}
