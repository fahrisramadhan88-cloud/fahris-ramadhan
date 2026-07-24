# PhotoBox - Aplikasi Pemotretan Seru

Aplikasi web interaktif untuk mengambil foto, menambahkan filter dan stiker, serta mengatur layout foto dalam satu sesi pemotretan.

## Fitur Utama

✨ **Pemilihan Foto**
- Pilih jumlah foto yang ingin diambil (3-6 foto)
- Kamera depan dan belakang
- Real-time preview

📸 **Filter Real-time**
- Grayscale (Hitam Putih)
- Sepia
- Brightness (Terang)
- Cool (Dingin)
- Warm (Hangat)
- Saturate (Vivid)
- Blur

🎨 **Editor dengan Stiker**
- 40+ stiker lucu
- Tambahkan stiker tak terbatas
- Drag & drop stiker
- Repositioning mudah

💄 **Beauty Filter**
- Brightness adjustment
- Contrast control
- Blur effect (skin softening)
- Saturation control
- Real-time preview

⏱️ **Countdown Timer**
- Countdown 3 detik setelah pengambilan foto
- Efek visual yang menarik

📐 **Tata Letak Foto**
- 6 pilihan layout:
  - Grid 3 (Vertikal)
  - Grid 4 (2x2)
  - Grid 5 (Jalur)
  - Grid 6 (3x2)
  - Featured (Foto besar + 3 kecil)
  - Collage (Unik)

📥 **Download Hasil**
- PNG (Lossless)
- JPG (Compressed)
- PDF (Dokumen)

## Instalasi

1. Clone repository ini
```bash
git clone https://github.com/fahrisramadhan88-cloud/fahris-ramadhan.git
cd fahris-ramadhan
```

2. Install dependencies (opsional, untuk development)
```bash
npm install
```

3. Jalankan server lokal
```bash
npm start
```

4. Buka browser dan akses `http://localhost:8000`

## Teknologi

- **HTML5** - Struktur
- **CSS3** - Styling & Animasi
- **JavaScript** - Logika aplikasi
- **Canvas API** - Editing foto
- **MediaDevices API** - Akses kamera
- **html2canvas** - Screenshot
- **jsPDF** - Export PDF

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

*Catatan: Memerlukan HTTPS atau localhost untuk akses kamera*

## Struktur File

```
photobox-app/
├── index.html          # File HTML utama
├── styles/
│   └── main.css       # Styling
├── js/
│   ├── app.js         # Navigasi aplikasi
│   ├── camera.js      # Fungsi kamera
│   ├── editor.js      # Editor foto
│   ├── stickers.js    # Data stiker
│   ├── filters.js     # Filter presets
│   ├── layouts.js     # Layout templates
│   └── download.js    # Download functionality
├── package.json       # Dependencies
└── README.md         # Dokumentasi
```

## Penggunaan

1. **Mulai** - Klik "Mulai Sekarang" di halaman sambutan
2. **Pilih Jumlah** - Pilih 3-6 foto yang ingin diambil
3. **Ambil Foto** - Gunakan kamera untuk mengambil foto
   - Pilih filter sebelum mengambil foto
   - Klik tombol kamera untuk mengambil
4. **Edit Foto** - Setelah setiap pengambilan:
   - Terapkan filter tambahan
   - Tambahkan beauty filter
   - Tambahkan stiker
   - Drag stiker untuk memindahkan
5. **Pilih Layout** - Setelah semua foto diambil:
   - Pilih dari 6 opsi layout yang tersedia
6. **Download** - Download hasil akhir dalam format:
   - PNG (untuk kualitas terbaik)
   - JPG (untuk ukuran lebih kecil)
   - PDF (untuk cetak)

## Fitur Upcoming

- [ ] Filter face recognition
- [ ] Text watermark
- [ ] Background options
- [ ] Share ke social media
- [ ] Undo/Redo functionality
- [ ] Custom layout creator

## Kontribusi

Contribusi sambutan! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file LICENSE untuk detail.

## Support

Jika menemukan bug atau memiliki pertanyaan, silakan buat issue baru.

---

**Dibuat oleh Fahris Ramadhan** 📸✨
