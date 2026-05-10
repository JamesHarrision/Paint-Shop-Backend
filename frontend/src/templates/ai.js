// src/templates/ai.js
export const AITemplate = () => `
  <section class="py-24 container mx-auto px-6 max-w-5xl">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div class="lg:col-span-1">
            <h2 class="text-5xl font-black uppercase leading-none mb-8">AI <br> <span class="text-terracotta">Analysis</span> <br> Lab</h2>
            <p class="text-slate-500 text-sm leading-relaxed mb-8">
                Tải lên ảnh không gian của bạn (Phòng khách, phòng ngủ, phòng làm việc). AI sẽ tự động bóc tách các mảng màu và gợi ý những sản phẩm sơn tương đồng nhất.
            </p>
            <div class="p-4 border-2 border-charcoal bg-teal/10 text-teal font-bold text-xs uppercase tracking-widest">
                Mẹo: Nên chụp trong điều kiện ánh sáng tự nhiên để kết quả chính xác nhất.
            </div>
        </div>

        <div class="lg:col-span-2">
            <div id="ai-upload-container" class="relative card-retro !p-16 text-center hover:bg-cream transition-all cursor-pointer border-dashed">
                <input type="file" id="ai-file-input" class="hidden" accept="image/*">
                <div id="upload-placeholder">
                    <div class="w-16 h-16 bg-charcoal text-white flex items-center justify-center mx-auto mb-6 shadow-retro">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p class="text-lg font-black uppercase tracking-tight mb-2">Tải ảnh không gian</p>
                    <p class="text-xs text-slate-500 uppercase tracking-widest">Bấm hoặc kéo thả ảnh vào đây</p>
                </div>
                <div id="upload-preview" class="hidden">
                    <img src="" id="img-preview" class="max-h-[300px] mx-auto border-2 border-charcoal mb-8 shadow-retro">
                    <button id="btn-start-analyze" class="btn-retro">Tiến hành phân tích</button>
                </div>
            </div>
        </div>
    </div>

    <div id="ai-result" class="mt-24 hidden animate-fade-in">
        <!-- Kết quả AI -->
    </div>
  </section>
`;
