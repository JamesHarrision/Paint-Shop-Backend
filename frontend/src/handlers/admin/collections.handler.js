// src/handlers/admin/collections.handler.js
import { collectionApi } from '../../api.js';

let adminCollections = [];

export const renderAdminCollections = async () => {
    const loader = document.querySelector('#admin-collections-loader');
    const tbody = document.querySelector('#admin-collections-list');
    
    if (!loader || !tbody) return;

    loader.classList.remove('hidden');
    tbody.innerHTML = '';

    try {
        const res = await collectionApi.getAdminAll();
        adminCollections = res.data.data;

        if (adminCollections.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-slate-400">Chưa có bộ sưu tập nào</td></tr>';
        } else {
            tbody.innerHTML = adminCollections.map(col => {
                const defaultThumb = 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800';
                let thumbUrl = defaultThumb;
                if (col.thumbnail) {
                    thumbUrl = col.thumbnail.startsWith('http') ? col.thumbnail : `http://localhost:3000/${col.thumbnail}`;
                }
                
                return `
                <tr class="border-b border-charcoal/10 hover:bg-slate-50 transition-colors">
                    <td class="p-4 border-r border-charcoal/10">
                        <div class="flex items-center gap-4 cursor-pointer hover:text-terracotta" onclick="window.navigate('collections/${col.id}')">
                            <img src="${thumbUrl}" class="w-12 h-12 object-cover border border-charcoal">
                            <span class="font-black uppercase">${col.name}</span>
                        </div>
                    </td>
                    <td class="p-4 border-r border-charcoal/10 text-xs">
                        ${col.shortDesc || '-'}
                    </td>
                    <td class="p-4 border-r border-charcoal/10 text-center">
                        ${col._count?.items || 0}
                    </td>
                    <td class="p-4 border-r border-charcoal/10">
                        ${col.user?.fullName || 'Ẩn danh'} <br>
                        <span class="text-[10px] font-normal opacity-60">${col.user?.email || ''}</span>
                    </td>
                    <td class="p-4">
                        <div class="flex justify-center gap-2">
                            <button onclick="window.editAdminCollection('${col.id}')" class="px-3 py-1 bg-teal text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Sửa</button>
                            <button onclick="window.deleteAdminCollection('${col.id}')" class="px-3 py-1 bg-terracotta text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Xóa</button>
                        </div>
                    </td>
                </tr>
                `;
            }).join('');
        }
    } catch (err) {
        console.error('Lỗi khi lấy collections', err);
        window.showToast('Lỗi khi tải danh sách bộ sưu tập', 'error');
    } finally {
        loader.classList.add('hidden');
    }

    window.deleteAdminCollection = async (id) => {
        if (confirm('Admin: Xóa bộ sưu tập này?')) {
            window.toggleLoader(true);
            try {
                await collectionApi.delete(id);
                window.showToast('Đã xóa bộ sưu tập');
                renderAdminCollections();
            } catch (err) {
                window.showToast(err.response?.data?.message || 'Lỗi khi xóa', 'error');
            } finally {
                window.toggleLoader(false);
            }
        }
    };

    const getOrCreateModal = () => {
        let modal = document.querySelector('#collection-modal');
        if (!modal) {
            const div = document.createElement('div');
            div.innerHTML = `
                <div id="collection-modal" class="fixed inset-0 z-[10005] bg-cream/90 flex items-center justify-center hidden">
                    <div class="bg-white border-4 border-charcoal p-8 max-w-lg w-full mx-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                        <button onclick="document.querySelector('#collection-modal').classList.add('hidden')" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-charcoal hover:bg-terracotta hover:text-white transition-all font-black">&times;</button>
                        <h3 id="collection-modal-title" class="text-2xl font-black uppercase mb-6 text-charcoal">Sửa <span class="text-terracotta italic">Bộ sưu tập</span></h3>
                        
                        <form id="admin-collection-form" class="space-y-6 text-charcoal">
                            <input type="hidden" id="col-id">
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Tên bộ sưu tập</label>
                                <input type="text" id="col-name" required class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold">
                            </div>
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mô tả ngắn</label>
                                <input type="text" id="col-shortDesc" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold">
                            </div>
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Ảnh bìa</label>
                                <input type="file" id="col-thumbnail" accept="image/*" class="w-full text-xs">
                            </div>
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Chi tiết</label>
                                <textarea id="col-longDesc" rows="4" class="w-full border-2 border-charcoal p-2 outline-none focus:border-terracotta"></textarea>
                            </div>
                            <button type="submit" id="btn-col-submit" class="btn-retro w-full">Lưu thay đổi</button>
                        </form>
                    </div>
                </div>
            `;
            document.body.appendChild(div.firstElementChild);
            modal = document.querySelector('#collection-modal');
            
            document.querySelector('#admin-collection-form').onsubmit = async (e) => {
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

                window.toggleLoader(true);
                try {
                    if (id) {
                        await collectionApi.update(id, formData);
                        window.showToast('Cập nhật bộ sưu tập thành công');
                    } else {
                        await collectionApi.create(formData);
                        window.showToast('Tạo bộ sưu tập thành công');
                    }
                    modal.classList.add('hidden');
                    renderAdminCollections();
                } catch (err) {
                    window.showToast(err.response?.data?.message || 'Có lỗi xảy ra', 'error');
                } finally {
                    window.toggleLoader(false);
                }
            };
        }
        return modal;
    };

    window.editAdminCollection = (id) => {
        const col = adminCollections.find(c => c.id === id);
        if (!col) return;

        const modal = getOrCreateModal();

        document.querySelector('#col-id').value = col.id;
        document.querySelector('#col-name').value = col.name;
        document.querySelector('#col-shortDesc').value = col.shortDesc || '';
        document.querySelector('#col-longDesc').value = col.longDesc || '';
        document.querySelector('#col-thumbnail').value = '';
        
        document.querySelector('#collection-modal-title').innerHTML = 'Sửa <span class="text-terracotta italic">Bộ sưu tập</span>';
        modal.classList.remove('hidden');
    };

    window.showAddCollectionModal = () => {
        const modal = getOrCreateModal();
        document.querySelector('#col-id').value = '';
        document.querySelector('#col-name').value = '';
        document.querySelector('#col-shortDesc').value = '';
        document.querySelector('#col-longDesc').value = '';
        document.querySelector('#col-thumbnail').value = '';
        
        document.querySelector('#collection-modal-title').innerHTML = 'Tạo <span class="text-terracotta italic">Bộ sưu tập</span>';
        modal.classList.remove('hidden');
    };
};
