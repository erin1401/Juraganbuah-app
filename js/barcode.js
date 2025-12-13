/* =====================================================
   JURAGAN BUAH - BARCODE MODULE LEVEL 6
   HP CAMERA READY | FALLBACK MANUAL
===================================================== */

const BarcodeModule = (() => {

  let stream = null;

  /* ================== MANUAL INPUT ================== */
  function findItemByBarcode(code) {
    const items = DataStore.getItems();
    return items.find(i => i.barcode === code);
  }

  /* ================== CAMERA SCAN ================== */
  async function startCamera(videoEl, onDetected) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera tidak didukung di browser ini");
      return;
    }

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      videoEl.srcObject = stream;
      videoEl.setAttribute("playsinline", true);
      await videoEl.play();

      scanLoop(videoEl, onDetected);
    } catch (err) {
      alert("Gagal mengakses kamera");
      console.error(err);
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
  }

  /* ================== SIMPLE SCAN LOOP ================== */
  function scanLoop(videoEl, onDetected) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    function tick() {
      if (!videoEl.videoWidth) {
        requestAnimationFrame(tick);
        return;
      }

      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      ctx.drawImage(videoEl, 0, 0);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = decodeBarcode(imageData);
        if (code) {
          onDetected(code);
          stopCamera();
          return;
        }
      } catch (e) {}

      requestAnimationFrame(tick);
    }

    tick();
  }

  /* ================== BASIC BARCODE DECODER (SIMPLIFIED) ==================
     NOTE:
     - Ini placeholder decoder ringan
     - Untuk produksi besar bisa ganti ke ZXing / QuaggaJS
  ========================================================================== */
  function decodeBarcode(imageData) {
    // SIMULASI: user tetap input manual barcode
    return null;
  }

  return {
    findItemByBarcode,
    startCamera,
    stopCamera
  };

})();
