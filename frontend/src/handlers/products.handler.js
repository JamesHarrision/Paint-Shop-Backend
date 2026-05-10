// src/handlers/products.handler.js
import { productApi } from '../api.js';
import { ProductListTemplate } from '../templates/products.js';
import { formatPrice } from './cart.handler.js';

let currentFilters = {
    page: 1,
    limit: 8,
    search: '',
    minPrice: undefined,
    maxPrice: undefined
};

export const renderProductsPage = async (container, options = {}) => {
    if (!container) return;

    // Override default filters if options provided
    if (options.limit) currentFilters.limit = options.limit;
    
    // Show skeleton/loader in container
    container.innerHTML = `
        <div class="py-24 text-center">
            <div class="w-12 h-12 border-4 border-charcoal border-t-terracotta animate-spin mx-auto mb-4"></div>
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Đang lọc danh sách...</p>
        </div>
    `;

    try {
        const { data } = await productApi.getAll(currentFilters);
        container.innerHTML = ProductListTemplate(data.data, formatPrice, data.pagination);
        
        // Bind pagination function globally for the template
        window.changeUserProductPage = (newPage) => {
            currentFilters.page = newPage;
            renderProductsPage(container, options);
            window.scrollTo({ top: container.offsetTop - 100, behavior: 'smooth' });
        };

        // Bind filter UI if present
        initFilterHandlers(container, options);

    } catch (err) {
        console.error('Render products error:', err);
        container.innerHTML = `
            <div class="p-24 text-center border-4 border-dashed border-terracotta bg-terracotta/5">
                <h2 class="text-4xl font-black text-terracotta uppercase mb-4 italic">Hệ thống bận</h2>
                <p class="text-charcoal font-bold uppercase text-[10px] tracking-widest">${err.message}</p>
            </div>
        `;
    }
};

const initFilterHandlers = (container, options) => {
    const btnApply = document.querySelector('#btn-apply-filter');
    const inputSearch = document.querySelector('#filter-search');
    const inputMin = document.querySelector('#filter-min-price');
    const inputMax = document.querySelector('#filter-max-price');

    if (!btnApply) return; // Not on the full products page (maybe on home)

    // Sync input values with currentFilters
    if (inputSearch) inputSearch.value = currentFilters.search;
    if (inputMin) inputMin.value = currentFilters.minPrice || '';
    if (inputMax) inputMax.value = currentFilters.maxPrice || '';

    btnApply.onclick = () => {
        currentFilters.search = inputSearch?.value || '';
        currentFilters.minPrice = inputMin?.value ? Number(inputMin.value) : undefined;
        currentFilters.maxPrice = inputMax?.value ? Number(inputMax.value) : undefined;
        currentFilters.page = 1; // Reset to page 1 on new filter
        renderProductsPage(container, options);
    };

    // Allow Enter key to apply filter
    const handleEnter = (e) => { if (e.key === 'Enter') btnApply.click(); };
    inputSearch?.addEventListener('keypress', handleEnter);
    inputMin?.addEventListener('keypress', handleEnter);
    inputMax?.addEventListener('keypress', handleEnter);
};
