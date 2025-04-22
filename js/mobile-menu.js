document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü butonunu seç
    const mobileMenuButton = document.querySelector('button.lg\\:hidden');
    if (!mobileMenuButton) return;

    // Mobil menü container'ı oluştur
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu fixed top-[64px] left-0 w-full bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out lg:hidden z-40';
    document.body.appendChild(mobileMenu);

    // Ana menü öğelerini kopyala
    const mainNav = document.querySelector('nav.hidden.lg\\:flex');
    if (mainNav) {
        const menuItems = mainNav.cloneNode(true);
        // Mobil görünüm için sınıfları düzenle
        menuItems.className = 'flex flex-col space-y-4 p-6';
        mobileMenu.appendChild(menuItems);

        // Dropdown menüleri mobil için düzenle
        const dropdowns = mobileMenu.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.className = 'dropdown-menu bg-gray-50 mt-2 py-2 px-4 rounded-md';
            }
            
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    menu.classList.toggle('active');
                });
            }
        });
    }

    let isMenuOpen = false;

    // Menü açma/kapama işlevselliği
    mobileMenuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.style.transform = isMenuOpen ? 'translateX(0)' : 'translateX(100%)';
        
        // Hamburger ikonunu değiştir
        const icon = mobileMenuButton.querySelector('svg');
        if (icon) {
            if (isMenuOpen) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            }
        }
    });

    // Sayfa dışına tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            isMenuOpen = false;
            mobileMenu.style.transform = 'translateX(100%)';
            const icon = mobileMenuButton.querySelector('svg');
            if (icon) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            }
        }
    });
});