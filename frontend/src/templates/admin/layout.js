// src/templates/admin/layout.js
import { AdminSidebar } from '../../components/AdminSidebar.js';
import { AdminUsersTemplate } from './users.js';
import { AdminProductsTemplate } from './products.js';
import { AdminOrdersTemplate } from './orders.js';

export const AdminTemplate = (activeTab = 'users') => `
  <section class="min-h-screen bg-[#F5F5F0] flex flex-col md:flex-row">
    ${AdminSidebar(activeTab)}
    <main class="flex-1 p-8 md:p-14 overflow-x-hidden" id="admin-main-content">
        ${activeTab === 'users' ? AdminUsersTemplate() : 
          activeTab === 'products' ? AdminProductsTemplate() : 
          AdminOrdersTemplate()}
    </main>
  </section>
`;
