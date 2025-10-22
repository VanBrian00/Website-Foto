document.addEventListener("DOMContentLoaded", () => {

    const hasilFoto = document.getElementById("hasilFoto");

    // Ambil data gambar dari localStorage
    const capturedImage = sessionStorage.getItem("fotoUser");

    if (capturedImage) {
        hasilFoto.src = capturedImage;
    } else {
        console.warn("Tidak ada gambar ditemukan di localStorage.");
    }

    const buttons = document.querySelectorAll(".ptp-btn");
    const confirmBtn = document.getElementById("btnOne");

    const pilihTemplateSection = document.getElementById("pt");
    const prosesSection = document.getElementById("proses");
    const hasilSection = document.getElementById("halamanHasil"); 
    // karena class "hasil" muncul 2 kali di HTML-mu

    // Awalnya sembunyikan proses & hasil
    prosesSection.style.display = "none";
    hasilSection.style.display = "none";

    // Awalnya tombol "Next" dinonaktifkan
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = "0.5";

    // Fungsi untuk update status tombol
    function updateConfirmButton() {
        const selected = document.querySelector(".ptp-btn.pilihan");
        if (selected) {
            confirmBtn.disabled = false;
            confirmBtn.style.opacity = "1";
        } else {
            confirmBtn.disabled = true;
            confirmBtn.style.opacity = "0.5";
        }
    }

    // Saat tombol template diklik
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("pilihan"));
            btn.classList.add("pilihan");
            updateConfirmButton();
        });
    });

    // Saat halaman direfresh
    window.addEventListener("load", () => {
        buttons.forEach(b => b.classList.remove("pilihan"));
        updateConfirmButton();
    });

    // Saat tombol Next diklik
    confirmBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirmBtn.disabled) return;

        // tampilkan bagian proses
        pilihTemplateSection.style.display = "none";
        prosesSection.style.display = "flex";

        console.log("Memulai proses selama 15 detik...");

        // setelah 15 detik, tampilkan hasil
        setTimeout(() => {
            prosesSection.style.display = "none";
            hasilSection.style.display = "block";
            console.log("Proses selesai! Menampilkan hasil...");
        }, 15000);
    });
});
