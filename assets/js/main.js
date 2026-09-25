let theme = localStorage.getItem('velora-theme');
if (theme !== 'dark' && theme !== 'light') theme = 'light';
let rtl = localStorage.getItem('velora-rtl') === '1';

function applyPreferences() {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.style.colorScheme = theme;
    document.body?.setAttribute('data-theme', theme);
}
applyPreferences();

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navlinks a, #mobileNav a').forEach(link => {
        if(link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    document.querySelectorAll('[data-theme]').forEach(b => b.onclick = () => { 
        theme = theme === 'dark' ? 'light' : 'dark'; 
        localStorage.setItem('velora-theme', theme); 
        applyPreferences() 
    });
    
    document.querySelectorAll('[data-rtl]').forEach(b => b.onclick = () => { 
        rtl = !rtl; 
        localStorage.setItem('velora-rtl', rtl ? '1' : '0'); 
        applyPreferences() 
    });
    
    const menu = document.getElementById('menu'), mn = document.getElementById('mobileNav');
    if (menu) { 
        menu.onclick = () => { mn.style.display = mn.style.display === 'block' ? 'none' : 'block' }; 
        if(mn) mn.querySelectorAll('a').forEach(a => a.onclick = () => mn.style.display = 'none');
    }
    
    document.querySelectorAll('.reveal').forEach(el => setTimeout(() => el.classList.add('show'), 60));
    
    const dm = document.getElementById('dashMenu'), sb = document.getElementById('sidebar');
    if (dm) dm.onclick = () => sb.classList.toggle('open');
    
    document.querySelectorAll('[data-dview]').forEach(a => a.onclick = (e) => { 
        e.preventDefault();
        showDash(a.dataset.dview); 
        if(sb) sb.classList.remove('open');
    });

    const topBtn = document.getElementById('topBtn');
    if(topBtn) {
        window.addEventListener('scroll', () => { 
            topBtn.style.display = scrollY > 500 ? 'grid' : 'none' 
        });
        topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Auto show dash view based on hash if on dashboard
    if (window.location.pathname.includes('dashboard')) {
        const view = window.location.hash.replace('#', '') || 'overview';
        showDash(view);
    }
});

function showDash(view) {
    document.querySelectorAll('.dash-view').forEach(v => v.classList.toggle('active', v.dataset.view === view));
    document.querySelectorAll('[data-dview]').forEach(a => a.classList.toggle('active', a.dataset.dview === view));
    if (window.location.pathname.includes('dashboard')) {
        history.replaceState(null, null, '#' + view);
    }
}

const closeSb = document.getElementById('closeSidebar'); if (closeSb && document.getElementById('sidebar')) closeSb.onclick = () => document.getElementById('sidebar').classList.remove('open');

