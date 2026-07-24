const STICKERS = [
  '😀', '😂', '😍', '🥰', '😎', '🤩',
  '🎉', '🎊', '🎈', '🎁', '🎀', '🎭',
  '👑', '💎', '⭐', '✨', '🌟', '💫',
  '❤️', '💕', '💖', '💗', '💘', '💝',
  '🦄', '🐶', '🐱', '🐭', '🐹', '🐰',
  '🌸', '🌺', '🌻', '🌷', '🌹', '🥀',
  '🍕', '🍔', '🍟', '🌭', '🍿', '🍩',
  '☀️', '🌙', '⚡', '🔥', '❄️', '🌈',
];

function initStickerGrid() {
  const grid = document.getElementById('stickerGrid');
  grid.innerHTML = '';
  
  STICKERS.forEach(sticker => {
    const btn = document.createElement('button');
    btn.className = 'sticker-btn';
    btn.textContent = sticker;
    btn.onclick = () => addSticker(sticker);
    grid.appendChild(btn);
  });
}

// Initialize when editor screen is shown
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on editor screen
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (document.getElementById('editorScreen').classList.contains('active')) {
        initStickerGrid();
        loadPhotoToEdit(appState.currentPhotoIndex);
      }
    });
  });
  
  observer.observe(document.getElementById('editorScreen'), {
    attributes: true,
    attributeFilter: ['class']
  });
});
