const video = document.getElementById("camera");
const fotoBtn = document.getElementById("foto");
const hmOverlay = document.getElementById("hmOverlay");
const textReady = document.getElementById("textReady");
const angkaHm = document.getElementById("Angkahm");
const containerPreview = document.getElementById("containerPreview");
const canvas = document.getElementById("tampilanCanvas");
const ctx = canvas.getContext("2d");
const btnYes = document.getElementById("btnOne");
const btnRetake = document.getElementById("btnDua");

// --- AKTIFKAN KAMERA ---
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert("Gagal mengakses kamera: " + err.message);
    }
}
startCamera();

// --- PROSES COUNTDOWN ---
fotoBtn.addEventListener("click", () => {
    let count = 3;
    hmOverlay.style.display = "block";
    textReady.textContent = "Ready?";
    angkaHm.textContent = count;

    // Tampilkan tulisan "Ready?" selama 1 detik
    setTimeout(() => {
        const timer = setInterval(() => {
            count--;
            angkaHm.textContent = count;

            if (count <= 0) {
                clearInterval(timer);
                hmOverlay.style.display = "none";
                ambilFoto();
            }
        }, 1000);
    }, 1000);
});

// --- AMBIL FOTO ---
function ambilFoto() {
    // Samakan ukuran canvas dengan video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Gambar frame dari video ke canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Sembunyikan video & tombol, tampilkan hasil preview
    video.style.display = "none";
    fotoBtn.style.display = "none";
    containerPreview.style.display = "flex";
}

// --- RETAKE FOTO ---
btnRetake.addEventListener("click", () => {
    containerPreview.style.display = "none";
    video.style.display = "block";
    fotoBtn.style.display = "flex";
});

// --- KONFIRMASI FOTO (YES) ---
btnYes.addEventListener("click", () => {
    // Ambil data foto dalam bentuk base64
    const imageData = canvas.toDataURL("image/png");
    sessionStorage.setItem("fotoUser", imageData);
    window.location.href = "hasil.html"
});