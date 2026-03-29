ضع هنا ملفات MediaPipe المحلية بهذه البنية:

vendor/mediapipe/
  camera_utils/
    camera_utils.js
  hands/
    hands.js
    hands.binarypb
    hands_solution_packed_assets_loader.js
    hands_solution_simd_wasm_bin.js
    hands_solution_simd_wasm_bin.wasm
    hands_solution_wasm_bin.js
    hands_solution_wasm_bin.wasm
    hands_solution_packed_assets.data
    hands_solution_simd_wasm_bin.data   (إذا احتاجتها النسخة)
    hand_landmark_full.tflite           (إذا احتاجتها النسخة)
    hand_landmark_lite.tflite           (إذا احتاجتها النسخة)

مهم:
- التطبيق يحاول أولاً التحميل المحلي.
- إذا لم يجد هذه الملفات، يرجع تلقائياً إلى CDN.
- بعد وضع الملفات المحلية داخل هذا المجلد، سيعمل التتبع دون الاعتماد على CDN.
