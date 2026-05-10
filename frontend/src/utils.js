// src/ui.js
export const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-8 right-8 z-[10005] px-8 py-4 font-black uppercase text-[10px] tracking-widest shadow-retro border-4 border-charcoal transform translate-y-20 transition-all duration-500 ${
      type === 'success' ? 'bg-green-400 text-charcoal' : 'bg-terracotta text-white'
    }`;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.remove('translate-y-20'));
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};
