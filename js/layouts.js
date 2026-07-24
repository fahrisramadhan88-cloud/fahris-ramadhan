const LAYOUTS = [
  {
    id: 'grid-3',
    name: 'Grid 3',
    cols: 1,
    rows: 3,
    description: 'Vertikal 3 Foto'
  },
  {
    id: 'grid-4',
    name: 'Grid 4',
    cols: 2,
    rows: 2,
    description: 'Kotak 2x2'
  },
  {
    id: 'grid-5',
    name: 'Grid 5',
    cols: 3,
    rows: 2,
    description: 'Jalur 3 Atas, 2 Bawah'
  },
  {
    id: 'grid-6',
    name: 'Grid 6',
    cols: 3,
    rows: 2,
    description: 'Kotak 3x2'
  },
  {
    id: 'feature-1',
    name: 'Featured',
    cols: 2,
    rows: 2,
    description: 'Foto Besar + 3 Kecil'
  },
  {
    id: 'collage-1',
    name: 'Collage',
    cols: 2,
    rows: 2,
    description: 'Kolase Unik'
  }
];

function initLayoutGrid() {
  const grid = document.getElementById('layoutGrid');
  grid.innerHTML = '';
  
  LAYOUTS.forEach((layout, index) => {
    if (layout.cols * layout.rows === appState.photoCount) {
      const item = document.createElement('div');
      item.className = 'layout-item';
      item.onclick = () => selectLayout(layout);
      
      let previewHTML = `<div class="layout-preview" style="grid-template-columns: repeat(${layout.cols}, 1fr); grid-template-rows: repeat(${layout.rows}, 1fr);">`;
      
      for (let i = 0; i < layout.cols * layout.rows; i++) {
        previewHTML += `<div class="layout-slot">${i + 1}</div>`;
      }
      
      previewHTML += '</div>';
      
      item.innerHTML = previewHTML + `<div class="layout-name">${layout.description}</div>`;
      grid.appendChild(item);
    }
  });
}

function selectLayout(layout) {
  appState.selectedLayout = layout;
  goToPreview();
}

function generateLayout(canvas, photos, layout) {
  const ctx = canvas.getContext('2d');
  
  const padding = 10;
  const photoWidth = (canvas.width - padding * (layout.cols + 1)) / layout.cols;
  const photoHeight = (canvas.height - padding * (layout.rows + 1)) / layout.rows;
  
  let photoIndex = 0;
  
  for (let row = 0; row < layout.rows; row++) {
    for (let col = 0; col < layout.cols; col++) {
      if (photoIndex < photos.length) {
        const x = padding + col * (photoWidth + padding);
        const y = padding + row * (photoHeight + padding);
        
        const img = new Image();
        img.onload = function() {
          ctx.drawImage(img, x, y, photoWidth, photoHeight);
        };
        img.src = photos[photoIndex].imageData;
        photoIndex++;
      }
    }
  }
}
