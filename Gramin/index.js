
function show(id, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (el) el.classList.add('active');
    closeMobileNav();
    window.scrollTo(0, 0);
}
function switchSyl(id, btn) {
    document.querySelectorAll('.stream-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('syl-sci').style.display = id === 'sci' ? 'block' : 'none';
    document.getElementById('syl-com').style.display = id === 'com' ? 'block' : 'none';
}
function switchTeach(id, btn) {
    document.querySelectorAll('.teach-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('sci-t').style.display = id === 'sci-t' ? 'grid' : 'none';
    document.getElementById('com-t').style.display = id === 'com-t' ? 'grid' : 'none';
}

function openMobileNav() {
    var m = document.getElementById('mobileNav');
    if (!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    var hb = document.querySelector('.hamburger');
    if (hb) { hb.classList.add('open'); hb.setAttribute('aria-label', 'Close menu'); }
}
function closeMobileNav() {
    var m = document.getElementById('mobileNav');
    if (!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    var hb = document.querySelector('.hamburger');
    if (hb) { hb.classList.remove('open'); hb.setAttribute('aria-label', 'Open menu'); }
}

// make elements with data-goto clickable and keyboard accessible
function attachGotoHandlers() {
    var navLinks = document.querySelectorAll('.nav-links a');
    var navMap = {
        home: navLinks[0] || null,
        syllabus: navLinks[1] || null,
        teachers: navLinks[2] || null,
        contact: navLinks[3] || null,
        'syl-sci': navLinks[1] || null,
        'syl-com': navLinks[1] || null
    };
    document.querySelectorAll('[data-goto]').forEach(el => {
        el.addEventListener('click', e => {
            var id = el.getAttribute('data-goto');
            if (!id) return;
            show(id, navMap[id] || null);
        });
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
        });
        // ensure pointer cursor
        el.classList.add('clickable');
    });
}

attachGotoHandlers();

// highlight clickable items that target the active section
function updateActiveGotos(activeId) {
    document.querySelectorAll('[data-goto]').forEach(el => {
        var target = el.getAttribute('data-goto');
        if (target === activeId) el.classList.add('active-goto'); else el.classList.remove('active-goto');
    });
}

// wrap original show to also update active-goto
var _oldShow = show;
show = function (id, el) { _oldShow(id, el); updateActiveGotos(id); }
