// src/templates/ai.js
export const AITemplate = () => `
  <section class="py-24 container mx-auto px-6 max-w-6xl">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div class="lg:col-span-4">
            <h2 class="text-6xl font-black uppercase leading-none mb-8 tracking-tighter">AI <span class="bg-[#3B82F6] text-white px-2 border-2 border-black">LAB</span></h2>
            <div class="card-brutal bg-[#C5FF2E] p-8 mb-8">
                <p class="font-black text-black text-lg leading-tight uppercase italic mb-6">
                    Tải lên ảnh không gian của bạn (Phòng khách, phòng ngủ, phòng làm việc).
                </p>
                <p class="font-bold text-black text-sm leading-relaxed mb-0">
                    Hệ thống AI sẽ tự động bóc tách các mảng màu chính và gợi ý những sản phẩm sơn tương đồng nhất từ catalog của chúng tôi.
                </p>
            </div>
            <div class="p-6 border-4 border-black bg-white font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_#000]">
                💡 Mẹo: Nên chụp trong điều kiện ánh sáng tự nhiên để kết quả chính xác nhất.
            </div>
        </div>

        <div class="lg:col-span-8">
            <div id="ai-upload-container" class="relative bg-white border-4 border-black border-dashed p-16 text-center hover:bg-gray-50 transition-all cursor-pointer shadow-[12px_12px_0px_#000]">
                <input type="file" id="ai-file-input" class="hidden" accept="image/*">
                <div id="upload-placeholder">
                    <div class="w-24 h-24 bg-black text-white flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0px_#C5FF2E] animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p class="text-3xl font-black uppercase tracking-tighter mb-4">Tải ảnh không gian</p>
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-widest border-2 border-black inline-block px-4 py-2">Bấm hoặc kéo thả ảnh vào đây</p>
                </div>
                <div id="upload-preview" class="hidden">
                    <div class="relative inline-block border-4 border-black shadow-[12px_12px_0px_#000] mb-12">
                        <img src="" id="img-preview" class="max-h-[400px] block">
                        <div class="absolute -top-4 -right-4 bg-[#FF4D4D] text-white p-2 border-2 border-black animate-bounce cursor-pointer" onclick="event.stopPropagation(); document.getElementById('ai-file-input').click();">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                    </div>
                    <br/>
                    <button id="btn-start-analyze" class="btn-brutal bg-[#C5FF2E] text-2xl px-16">TIẾN HÀNH PHÂN TÍCH</button>
                </div>
            </div>
        </div>
    </div>

    <div id="ai-result" class="mt-32 hidden animate-fade-in border-t-8 border-black pt-24">
        <!-- Kết quả AI -->
    </div>
  </section>
`;
