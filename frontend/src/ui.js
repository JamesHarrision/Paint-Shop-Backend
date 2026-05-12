// src/ui.js
import { Header } from './components/Header.js';
import { logout } from './handlers/auth.handler.js';

export const renderLayout = (contentTemplate) => {
    const root = document.querySelector('#app');
    if (!root) return;
    
    root.innerHTML = `
        ${Header()}
        <main id="main-content">
            ${contentTemplate}
        </main>
        <footer class="bg-charcoal text-cream/40 py-24 border-t-4 border-terracotta">
            <div class="container mx-auto px-6 text-center">
                <p class="text-4xl font-black uppercase italic text-cream mb-8">Paint <span class="text-terracotta">Shop</span></p>
                <p class="text-[10px] uppercase font-bold tracking-[0.4em]">Handcrafted with <span class="text-terracotta">Passion</span> &copy; 2026</p>
            </div>
        </footer>
    `;

    // Re-bind events for the newly rendered header
    bindHeaderEvents();
};

export const updateHeader = () => {
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
        existingHeader.outerHTML = Header();
        bindHeaderEvents();
    }
};

const bindHeaderEvents = () => {
    const btnLogout = document.querySelector('#btn-logout');
    if (btnLogout) btnLogout.onclick = logout;

    // Update cart count from state
    const cartCount = document.querySelector('#cart-count');
    if (cartCount) {
        const count = JSON.parse(localStorage.getItem('cart') || '[]').reduce((sum, i) => sum + i.quantity, 0);
        cartCount.innerText = count;
    }
};

export const toggleLoader = (show) => {
    let loader = document.querySelector('#global-loader');
    if (show && !loader) {
        const div = document.createElement('div');
        div.id = 'global-loader';
        div.className = 'fixed inset-0 z-[10001] bg-cream flex items-center justify-center transition-opacity duration-500';
        div.innerHTML = `
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 border-8 border-charcoal border-t-terracotta rounded-full animate-spin shadow-retro-sm"></div>
                <p class="mt-6 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Processing Request...</p>
            </div>
        `;
        document.body.appendChild(div);
    } else if (!show && loader) {
        loader.classList.add('opacity-0');
        setTimeout(() => loader.remove(), 500);
    }
};

window.toggleLoader = toggleLoader;

export const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    // Using new brutalist classes
    toast.className = `fixed bottom-8 right-8 z-[10005] px-8 py-4 font-black uppercase text-[10px] tracking-widest border-4 border-black shadow-[4px_4px_0px_#000] transform translate-y-20 transition-all duration-500 ${
      type === 'success' ? 'bg-[#C5FF2E] text-black' : 'bg-[#FF4D4D] text-white'
    }`;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.remove('translate-y-20'));
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
};

window.showToast = showToast;
