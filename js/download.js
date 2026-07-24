async function generateFinalPreview() {
  const canvas = document.getElementById('finalCanvas');
  const layout = appState.selectedLayout;
  
  // Set canvas size based on layout
  canvas.width = 1200;
  canvas.height = (1200 / layout.cols) * layout.rows;
  
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Generate layout
  generateLayout(canvas, appState.photos, layout);
}

async function downloadAs(format) {
  const canvas = document.getElementById('finalCanvas');
  
  try {
    if (format === 'png' || format === 'jpg') {
      const link = document.createElement('a');
      link.href = canvas.toDataURL(`image/${format}`);
      link.download = `photobox-${new Date().getTime()}.${format}`;
      link.click();
    } else if (format === 'pdf') {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height / canvas.width) * imgWidth;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`photobox-${new Date().getTime()}.pdf`);
    }
  } catch (error) {
    console.error('Error downloading:', error);
    alert('Gagal mengunduh file');
  }
}
