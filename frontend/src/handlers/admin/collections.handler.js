// src/handlers/admin/collections.handler.js
import { collectionApi } from '../../api.js';
import { showToast, toggleLoader } from '../../ui.js';

let adminCollections = [];

export const renderAdminCollections = async () => {
    const loader = document.querySelector('#admin-collections-loader');
    const tbody = document.querySelector('#admin-collections-list');
    const countBadge = document.querySelector('#admin-collection-count');

    if (!tbody) return;

    if (loader) loader.classList.remove('hidden');
    tbody.innerHTML = '';

    try {
        const res = await collectionApi.getAdminAll();
        adminCollections = res.data.data;

        if (countBadge) countBadge.innerText = adminCollections.length;

        if (adminCollections.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="p-10 text-center font-bold text-black/20 italic">Chưa có bộ sưu tập nào</td></tr>';
        } else {
            tbody.innerHTML = adminCollections.map(col => {
                const defaultThumb = 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800';
                let thumbUrl = defaultThumb;
                if (col.thumbnail) {
                    thumbUrl = col.thumbnail.startsWith('http') ? col.thumbnail : `${import.meta.env.VITE_IMAGE_BASE_URL}/${col.thumbnail}`;
                }

                return `
                <tr class="hover:bg-black/[0.02] transition-colors group">
                    <td class="p-5 border-r border-black/10">
                        <div class="flex items-center gap-4 cursor-pointer" onclick="window.navigate('collections/${col.id}')">
                            <img src="${thumbUrl}" class="w-12 h-12 object-cover border-2 border-black shadow-[3px_3px_0px_#000]">
                            <span class="font-black uppercase tracking-tight group-hover:text-[#E2725B] transition-colors">${col.name}</span>
                        </div>
                    </td>
                    <td class="p-5 border-r border-black/10">
                        <p class="text-xs line-clamp-2 text-black/60 font-bold">${col.shortDesc || 'Không có mô tả'}</p>
                    </td>
                    <td class="p-5 border-r border-black/10 text-center font-black">
                        ${col._count?.items || 0}
                    </td>
                    <td class="p-5 border-r border-black/10">
                        <div class="flex items-center gap-2">
                             <div class="w-6 h-6 bg-black text-white text-[8px] flex items-center justify-center font-black uppercase">
                                ${col.user?.fullName?.charAt(0) || 'A'}
                             </div>
                             <div>
                                <p class="text-[10px] font-black leading-none">${col.user?.fullName || 'Ẩn danh'}</p>
                                <p class="text-[9px] font-bold opacity-40 leading-none mt-1">${col.user?.email || ''}</p>
                             </div>
                        </div>
                    </td>
                    <td class="p-5">
                        <div class="flex justify-center gap-2">
                            <button onclick="window.editAdminCollection('${col.id}')" 
                                class="w-8 h-8 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button onclick="window.deleteAdminCollection('${col.id}')" 
                                class="w-8 h-8 flex items-center justify-center border-2 border-black text-[#FF4D4D] hover:bg-[#FF4D4D] hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
                `;
            }).join('');
        }
    } catch (err) {
        console.error('Lỗi khi lấy collections', err);
        showToast('Lỗi khi tải danh sách bộ sưu tập', 'error');
    } finally {
        if (loader) loader.classList.add('hidden');
    }

    // Initialize Form Event
    const form = document.querySelector('#admin-collection-form');
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const id = document.querySelector('#col-id').value;
            const name = document.querySelector('#col-name').value;
            const shortDesc = document.querySelector('#col-shortDesc').value;
            const longDesc = document.querySelector('#col-longDesc').value;
            const thumbnail = document.querySelector('#col-thumbnail').files[0];

            const formData = new FormData();
            formData.append('name', name);
            if (shortDesc) formData.append('shortDesc', shortDesc);
            if (longDesc) formData.append('longDesc', longDesc);
            if (thumbnail) formData.append('thumbnail', thumbnail);

            toggleLoader(true);
            try {
                if (id) {
                    await collectionApi.update(id, formData);
                    showToast('✅ Cập nhật bộ sưu tập thành công');
                } else {
                    await collectionApi.create(formData);
                    showToast('✅ Tạo bộ sưu tập thành công');
                }
                document.querySelector('#collection-modal').classList.add('hidden');
                renderAdminCollections();
            } catch (err) {
                showToast('❌ ' + (err.response?.data?.message || 'Có lỗi xảy ra'), 'error');
            } finally {
                toggleLoader(false);
            }
        };
    }
};

window.editAdminCollection = (id) => {
    const col = adminCollections.find(c => c.id === id);
    if (!col) return;

    const modal = document.querySelector('#collection-modal');
    if (!modal) return;

    document.querySelector('#col-id').value = col.id;
    document.querySelector('#col-name').value = col.name;
    document.querySelector('#col-shortDesc').value = col.shortDesc || '';
    document.querySelector('#col-longDesc').value = col.longDesc || '';
    document.querySelector('#col-thumbnail').value = '';

    document.querySelector('#collection-modal-title').innerHTML = 'SỬA <span class="italic text-[#E2725B] normal-case">Bộ sưu tập</span>';
    modal.classList.remove('hidden');
};

window.showAddCollectionModal = () => {
    const modal = document.querySelector('#collection-modal');
    if (!modal) return;

    document.querySelector('#col-id').value = '';
    document.querySelector('#col-name').value = '';
    document.querySelector('#col-shortDesc').value = '';
    document.querySelector('#col-longDesc').value = '';
    document.querySelector('#col-thumbnail').value = '';

    document.querySelector('#collection-modal-title').innerHTML = 'TẠO <span class="italic text-[#E2725B] normal-case">Bộ sưu tập</span>';
    modal.classList.remove('hidden');
};

window.deleteAdminCollection = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa bộ sưu tập này?')) {
        toggleLoader(true);
        try {
            await collectionApi.delete(id);
            showToast('🗑️ Đã xóa bộ sưu tập thành công');
            renderAdminCollections();
        } catch (err) {
            showToast('❌ ' + (err.response?.data?.message || 'Lỗi khi xóa'), 'error');
        } finally {
            toggleLoader(false);
        }
    }
};
