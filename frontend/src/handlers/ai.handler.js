import { aiApi } from '../api.js';
import { formatPrice } from './cart.handler.js';
import { showToast } from '../ui.js';

export const renderAIResult = (result) => {
    const resultDiv = document.querySelector('#ai-result');
    if (!resultDiv) return;
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-16 border-t-4 border-charcoal pt-16">
            <div class="lg:w-1/3">
                <h3 class="text-3xl font-black uppercase mb-6 italic">Kết quả <br> Phân tích</h3>
                <div class="bg-charcoal p-6 text-cream mb-8 shadow-retro">
                    <p class="text-[10px] uppercase tracking-widest mb-2 opacity-60">Màu chủ đạo</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 border-2 border-cream" style="background-color: rgb(${result.base_color_rgb.join(',')})"></div>
                        <span class="font-black text-xl tracking-tighter">RGB(${result.base_color_rgb.join(',')})</span>
                    </div>
                </div>
            </div>
            
            <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                ${result.palette.map((item) => `
                    <div class="card-retro !p-0 overflow-hidden flex flex-col shadow-retro-sm">
                        <div class="h-24 border-b-2 border-charcoal flex items-center justify-center font-black text-xl" style="background-color: ${item.hex}; color: ${isDark(item.hex) ? '#fff' : '#000'}">
                            ${item.hex}
                        </div>
                        <div class="p-6">
                            ${item.matchedProduct ? `
                                <div class="flex gap-4">
                                    <img src="${item.matchedProduct.imageUrl}" class="w-16 h-16 border-2 border-charcoal grayscale-[0.2]">
                                    <div>
                                        <p class="text-[10px] uppercase font-black text-terracotta mb-1">Perfect Match ${item.matchedProduct.matchScore}%</p>
                                        <p class="font-black uppercase text-xs mb-1">${item.matchedProduct.name}</p>
                                        <p class="font-black text-sm">${formatPrice(item.matchedProduct.price)}</p>
                                    </div>
                                </div>
                            ` : '<p class="text-xs uppercase font-black text-slate-400 text-center py-4 italic">Không tìm thấy sản phẩm khớp</p>'}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

export const initAIHandlers = () => {
    const container = document.querySelector('#ai-upload-container');
    const input = document.querySelector('#ai-file-input');
    const preview = document.querySelector('#upload-preview');
    const placeholder = document.querySelector('#upload-placeholder');
    const imgPreview = document.querySelector('#img-preview');
    const btnAnalyze = document.querySelector('#btn-start-analyze');

    if (!container) return;

    container.onclick = () => input.click();

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (re) => {
                imgPreview.src = re.target.result;
                placeholder.classList.add('hidden');
                preview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    };

    btnAnalyze.onclick = async (e) => {
        e.stopPropagation();
        const file = input.files[0];
        if (!file) {
            showToast('❌ Vui lòng chọn ảnh trước!', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        btnAnalyze.innerText = 'Đang giải mã màu sắc...';
        btnAnalyze.disabled = true;

        try {
            const { data } = await aiApi.analyze(formData);
            renderAIResult(data.data);
            showToast('✅ Giải mã màu sắc thành công!');
        } catch (err) {
            showToast('❌ Giải mã thất bại: ' + (err.response?.data?.message || err.message), 'error');
            btnAnalyze.innerText = 'Tiến hành phân tích';
            btnAnalyze.disabled = false;
        }
    };
};

export const isDark = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 150;
};
