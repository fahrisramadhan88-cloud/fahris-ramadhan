// Filter presets and utilities
const FILTERS = [
  { name: 'Original', value: 'none' },
  { name: 'Black & White', value: 'grayscale' },
  { name: 'Sepia', value: 'sepia' },
  { name: 'Bright', value: 'brightness' },
  { name: 'Cool', value: 'cool' },
  { name: 'Warm', value: 'warm' },
  { name: 'Vivid', value: 'saturate' },
  { name: 'Blur', value: 'blur' }
];

function getFilterCSS(filterName) {
  const filterMap = {
    'grayscale': 'grayscale(100%)',
    'sepia': 'sepia(100%)',
    'brightness': 'brightness(1.3)',
    'cool': 'hue-rotate(200deg) saturate(1.2)',
    'warm': 'hue-rotate(-20deg) saturate(1.1)',
    'saturate': 'saturate(1.5) brightness(1.1)',
    'blur': 'blur(3px)',
    'none': 'none'
  };
  
  return filterMap[filterName] || 'none';
}
