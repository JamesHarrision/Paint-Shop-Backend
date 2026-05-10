// src/components/Pagination.js

export const Pagination = (pagination, onPageChangeFnName) => {
    const { page, totalPages } = pagination;
    if (totalPages <= 1) return '';

    let pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(`
            <button 
                onclick="window.${onPageChangeFnName}(${i})"
                class="w-10 h-10 border-2 border-charcoal font-black text-xs transition-all shadow-retro-sm ${i === page ? 'bg-terracotta text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-slate-100'}"
            >
                ${i}
            </button>
        `);
    }

    return `
        <div class="flex justify-center items-center gap-3 mt-16">
            <button 
                ${page === 1 ? 'disabled' : `onclick="window.${onPageChangeFnName}(${page - 1})"`}
                class="px-4 py-2 border-2 border-charcoal font-black uppercase text-[10px] tracking-widest bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-retro-sm transition-all"
            >
                Trước
            </button>
            
            <div class="flex gap-2">
                ${pages.join('')}
            </div>

            <button 
                ${page === totalPages ? 'disabled' : `onclick="window.${onPageChangeFnName}(${page + 1})"`}
                class="px-4 py-2 border-2 border-charcoal font-black uppercase text-[10px] tracking-widest bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-retro-sm transition-all"
            >
                Sau
            </button>
        </div>
    `;
};
