// src/handlers/collections.handler.js
import { collectionApi } from '../api.js';
import { state } from '../state.js';
import { renderCollectionCard } from '../templates/collections.js';

let currentTab = 'public'; // 'public' | 'my'
let collectionsData = [];

export const initCollectionsHandler = async () => {
    // Gắn sự kiện chuyển tab
    const tabPublic = document.querySelector('#tab-public');
    const tabMy = document.querySelector('#tab-my');

    if (tabPublic && tabMy) {
        tabPublic.onclick = () => {
            currentTab = 'public';
            updateTabUI();
            fetchCollections();
        };
        tabMy.onclick = () => {
            currentTab = 'my';
            updateTabUI();
            fetchCollections();
        };
    }

    // Gắn sự kiện modal
    window.showAddCollectionModal = () => {
        document.querySelector('#col-id').value = '';
        document.querySelector('#col-name').value = '';
        document.querySelector('#col-shortDesc').value = '';
        document.querySelector('#col-longDesc').value = '';
        document.querySelector('#col-thumbnail').value = '';
        
        document.querySelector('#collection-modal-title').innerHTML = 'Tạo <span class="text-terracotta italic">Bộ sưu tập</span>';
        document.querySelector('#collection-modal').classList.remove('hidden');
    };

    window.closeCollectionModal = () => {
        document.querySelector('#collection-modal').classList.add('hidden');
    };

    window.editCollection = (id) => {
        const col = collectionsData.find(c => c.id === id);
        if (!col) return;

        document.querySelector('#col-id').value = col.id;
        document.querySelector('#col-name').value = col.name;
        document.querySelector('#col-shortDesc').value = col.shortDesc || '';
        document.querySelector('#col-longDesc').value = col.longDesc || '';
        document.querySelector('#col-thumbnail').value = ''; // không load được file
        
        document.querySelector('#collection-modal-title').innerHTML = 'Sửa <span class="text-terracotta italic">Bộ sưu tập</span>';
        document.querySelector('#collection-modal').classList.remove('hidden');
    };

    window.deleteCollection = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa bộ sưu tập này?')) {
            window.toggleLoader(true);
            try {
                await collectionApi.delete(id);
                window.showToast('Đã xóa bộ sưu tập');
                fetchCollections();
            } catch (err) {
                window.showToast('Lỗi khi xóa bộ sưu tập', 'error');
            } finally {
                window.toggleLoader(false);
            }
        }
    };

    const form = document.querySelector('#collection-form');
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

            window.toggleLoader(true);
            try {
                if (id) {
                    await collectionApi.update(id, formData);
                    window.showToast('Cập nhật bộ sưu tập thành công');
                } else {
                    await collectionApi.create(formData);
                    window.showToast('Tạo bộ sưu tập thành công');
                    if (currentTab === 'public') {
                        // Switch to my tab if they created one
                        currentTab = 'my';
                        updateTabUI();
                    }
                }
                window.closeCollectionModal();
                fetchCollections();
            } catch (err) {
                window.showToast(err.response?.data?.message || 'Có lỗi xảy ra', 'error');
            } finally {
                window.toggleLoader(false);
            }
        };
    }

    // Init fetch
    fetchCollections();
};

const updateTabUI = () => {
    const tabPublic = document.querySelector('#tab-public');
    const tabMy = document.querySelector('#tab-my');
    if (!tabPublic || !tabMy) return;

    if (currentTab === 'public') {
        tabPublic.className = 'px-6 py-2 border-2 border-charcoal bg-charcoal text-cream font-black uppercase tracking-widest text-[10px] transition-all';
        tabMy.className = 'px-6 py-2 border-2 border-charcoal text-charcoal font-black uppercase tracking-widest text-[10px] transition-all hover:bg-charcoal/10';
    } else {
        tabMy.className = 'px-6 py-2 border-2 border-charcoal bg-charcoal text-cream font-black uppercase tracking-widest text-[10px] transition-all';
        tabPublic.className = 'px-6 py-2 border-2 border-charcoal text-charcoal font-black uppercase tracking-widest text-[10px] transition-all hover:bg-charcoal/10';
    }
};

const fetchCollections = async () => {
    const loader = document.querySelector('#collections-loader');
    const grid = document.querySelector('#collections-grid');
    const empty = document.querySelector('#collections-empty');
    
    loader.classList.remove('hidden');
    grid.classList.add('hidden');
    empty.classList.add('hidden');

    try {
        let res;
        if (currentTab === 'public') {
            res = await collectionApi.getPublicAll();
        } else {
            res = await collectionApi.getAll(); // get my collections
        }
        
        collectionsData = res.data.data;

        if (collectionsData.length === 0) {
            empty.classList.remove('hidden');
        } else {
            const isMyTab = currentTab === 'my';
            grid.innerHTML = collectionsData.map(c => renderCollectionCard(c, isMyTab)).join('');
            grid.classList.remove('hidden');
        }
    } catch (err) {
        console.error('Lỗi khi lấy collections', err);
        window.showToast('Không thể tải bộ sưu tập', 'error');
    } finally {
        loader.classList.add('hidden');
    }
};
