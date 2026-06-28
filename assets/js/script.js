/* ========================================
   BIRTHDAY WEBSITE - MAIN JAVASCRIPT
   Elegant fine-dining interaction layer
   ======================================== */

let allMessages = [];
let allPhotos = [];
let currentPhotoIndex = 0;
let randomRevealTimeout = null;

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];

function normalizeData(data) {
    const rawMessages = data.messages || [];
    const textMessages = [];
    const mediaItems = [];

    rawMessages.forEach(item => {
        const mediaInfo = getMediaInfo(item);
        if (mediaInfo) {
            mediaItems.push({
                ...mediaInfo,
                caption: item.text || '',
                sender: getMessageSender(item),
                alt: item.alt || getMessageSender(item)
            });
        }

        if (!mediaInfo || item.type === 'text') {
            textMessages.push(item);
        }
    });

    const additionalPhotos = (data.photos || []).map(photo => ({
        src: photo.src || photo.file || '',
        type: photo.type || 'photo',
        alt: photo.alt || 'Photo',
        caption: photo.caption || '',
        sender: photo.sender || ''
    }));

    return {
        messages: textMessages,
        photos: [...mediaItems, ...additionalPhotos]
    };
}

async function loadData() {
    try {
        const response = await fetch('assets/data/messages.json');
        if (!response.ok) throw new Error('Failed to load messages');

        const data = await response.json();
        const normalized = normalizeData(data);
        allMessages = normalized.messages;
        allPhotos = normalized.photos;
    } catch (error) {
        console.warn('Error loading messages via fetch:', error);
        try {
            const el = document.getElementById('initial-data');
            if (el && el.textContent.trim().length > 0) {
                const data = JSON.parse(el.textContent);
                const normalized = normalizeData(data);
                allMessages = normalized.messages;
                allPhotos = normalized.photos;
                showNotification('Using embedded messages data (fallback). For dynamic loading, serve the site via a local server.');
                return;
            }
        } catch (innerErr) {
            console.error('Error parsing embedded messages:', innerErr);
        }

        allMessages = [];
        allPhotos = [];
        showNotification('Unable to load messages. If you opened the site by double-clicking index.html, run a local server and reload.');
    }
}

async function init() {
    await loadData();
    renderMessages(allMessages);
    renderPhotoGallery();
    renderContributorCollage();
    setupEventListeners();
    setupScrollAnimations();
    setupScrollIndicator();
    startOpeningSequence();
    animateCounter();
}

function startOpeningSequence() {
    const overlay = document.getElementById('openingOverlay');
    const lines = Array.from(document.querySelectorAll('.opening-line'));
    let step = 0;

    function revealNext() {
        if (step >= lines.length) {
            overlay.classList.add('closed');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 1000);
            return;
        }

        lines[step].classList.add('visible');
        step += 1;
        setTimeout(revealNext, 1200);
    }

    revealNext();
}

function animateCounter() {
    const counterElement = document.querySelector('.age-counter');
    if (!counterElement) return;

    const targetAge = 50;
    const duration = 2500;
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * targetAge);
        counterElement.textContent = currentValue;
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(counterElement);
        }
    }, { threshold: 0.4 });

    observer.observe(counterElement);
}

function renderMessages(messages) {
    const gallery = document.getElementById('messagesGallery');
    if (!gallery) return;

    gallery.innerHTML = '';

    if (messages.length === 0) {
        gallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No messages yet. Check back soon.</p>';
        return;
    }

    messages.forEach((message, index) => {
        const card = createMessageCard(message, index);
        gallery.appendChild(card);
    });
}

function createMessageCard(message, index) {
    const card = document.createElement('div');
    card.className = 'message-card scroll-fade-in';
    card.style.animationDelay = `${index * 0.08}s`;
    const senderName = getMessageSender(message);
    const initials = getInitials(senderName);
    const mediaInfo = getMediaInfo(message);
    const messageType = message.type || (mediaInfo ? mediaInfo.type : 'text');
    const previewText = message.text
        ? message.text.substring(0, 100) + (message.text.length > 100 ? '...' : '')
        : mediaInfo
            ? `Sent a ${messageType}`
            : 'View message';

    card.innerHTML = `
        <div class="message-header">
            <div class="message-avatar">${escapeHtml(initials)}</div>
            <div class="message-info">
                <h3>${escapeHtml(senderName)}</h3>
            </div>
        </div>
        <p class="message-text">${escapeHtml(previewText)}</p>
        <div class="message-type-badge"><span>${getTypeIcon(messageType)}</span>${messageType.charAt(0).toUpperCase() + messageType.slice(1)}</div>
    `;

    applyCardTilt(card);
    card.addEventListener('click', () => openMessageModal(message));
    return card;
}

function applyCardTilt(card) {
    card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 10;
        const rotateX = (py - 0.5) * -10;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('pointerleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
}

function getInitials(name) {
    return name
        .split(' ')
        .map(part => part.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
}

function getTypeIcon(type) {
    const icons = {
        text: '✦',
        video: '▶',
        photo: '✹'
    };
    return icons[type] || '✦';
}

function titleCase(text) {
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim();
}

function parseSenderFromFilename(filename) {
    if (!filename) return 'Anonymous';
    const normalized = filename.replace(/^@file:/i, '').trim();
    const baseName = normalized.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
    const people = baseName
        .split('_')
        .filter(Boolean)
        .map(part => part.replace(/-/g, ' ').trim())
        .filter(Boolean);

    if (people.length === 0) return 'Anonymous';
    return people.map(titleCase).join(' & ');
}

function resolveMediaPath(fileName) {
    if (!fileName) return '';
    const cleaned = String(fileName).replace(/^@file:/i, '').trim();
    const extension = cleaned.split('.').pop().toLowerCase();
    if (cleaned.includes('/') || cleaned.includes('\\')) {
        return cleaned;
    }
    if (imageExtensions.includes(extension)) {
        return `assets/images/${cleaned}`;
    }
    if (videoExtensions.includes(extension)) {
        return `assets/videos/${cleaned}`;
    }
    return cleaned;
}

function getMediaInfo(message) {
    const mediaFile = message.file || message.photo || message.video;
    if (!mediaFile) return null;

    const src = resolveMediaPath(mediaFile);
    const extension = String(mediaFile).split('.').pop().toLowerCase();

    if (imageExtensions.includes(extension)) {
        return { type: 'photo', src };
    }
    if (videoExtensions.includes(extension)) {
        return { type: 'video', src };
    }
    return null;
}

function getMessageSender(message) {
    if (Object.prototype.hasOwnProperty.call(message, 'name')) {
        return message.name;
    }
    const mediaFile = message.file || message.photo || message.video;
    if (mediaFile) {
        return parseSenderFromFilename(mediaFile);
    }
    return 'Anonymous';
}

function openMessageModal(message) {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    if (!modal || !modalMessage) return;

    const senderName = getMessageSender(message);
    const mediaInfo = getMediaInfo(message);
    let content = senderName ? `<h2>${escapeHtml(senderName)}</h2>` : '';

    if (message.text) {
        const lines = message.text.split('\n').filter(Boolean);
        const bodyHtml = lines.map((line, index) => `
            <span class="animated-line" style="animation-delay:${0.08 + index * 0.05}s">${escapeHtml(line)}</span>
        `).join('');
        content += `<div class="message-body">${bodyHtml}</div>`;
    }

    if (mediaInfo?.type === 'photo') {
        content += `
            <div class="modal-image-frame">
                <img src="${mediaInfo.src}" alt="Message photo from ${escapeHtml(senderName)}" loading="lazy">
            </div>
        `;
    }

    if (mediaInfo?.type === 'video') {
        content += `
            <div class="modal-video-frame">
                <video controls preload="metadata" playsinline>
                    <source src="${mediaInfo.src}" type="video/mp4">
                    Your browser does not support video playback.
                </video>
            </div>
        `;
    }

    modalMessage.innerHTML = content;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeMessageModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

function renderPhotoGallery() {
    const gallery = document.getElementById('photoGallery');
    if (!gallery) return;

    gallery.innerHTML = '';

    allPhotos.forEach((media, index) => {
        const item = document.createElement('div');
        item.className = 'photo-card scroll-fade-in';
        item.style.animationDelay = `${index * 0.08}s`;
        let innerHtml = '';

        if (media.type === 'video') {
            innerHtml = `
                <video muted playsinline preload="metadata" src="${media.src}"></video>
                <div class="video-overlay"><div class="play-button">▶</div></div>
                ${media.sender || media.caption ? `
                <div class="photo-caption">
                    ${media.sender ? `<strong>${escapeHtml(media.sender)}</strong>` : ''}
                    ${media.caption ? `<p>${escapeHtml(media.caption)}</p>` : ''}
                </div>` : ''}
            `;
        } else {
            innerHtml = `
                <img src="${media.src}" alt="${escapeHtml(media.alt || media.sender)}" loading="lazy">
                ${media.sender || media.caption ? `
                <div class="photo-caption">
                    ${media.sender ? `<strong>${escapeHtml(media.sender)}</strong>` : ''}
                    ${media.caption ? `<p>${escapeHtml(media.caption)}</p>` : ''}
                </div>` : ''}
            `;
        }

        item.innerHTML = innerHtml;
        item.addEventListener('click', () => openLightbox(media, index));
        gallery.appendChild(item);
    });
}

function openLightbox(media, index = 0) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxMedia = document.getElementById('lightboxMedia');
    if (!lightbox || !lightboxMedia) return;

    currentPhotoIndex = index;
    const mediaObj = typeof media === 'string' ? { type: 'photo', src: media } : media;
    if (!mediaObj?.src) return;

    if (mediaObj.type === 'video') {
        lightboxMedia.innerHTML = `
            <video class="lightbox-media-content" controls autoplay playsinline>
                <source src="${mediaObj.src}" type="video/mp4">
                Your browser does not support video playback.
            </video>
        `;
    } else {
        lightboxMedia.innerHTML = `
            <img class="lightbox-media-content" src="${mediaObj.src}" alt="${escapeHtml(mediaObj.alt || 'Photo')}">
        `;
    }

    lightbox.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxMedia = document.getElementById('lightboxMedia');
    if (lightbox) {
        if (lightboxMedia) {
            const video = lightboxMedia.querySelector('video');
            if (video) {
                video.pause();
                video.removeAttribute('src');
                lightboxMedia.innerHTML = '';
            }
        }
        lightbox.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

function nextPhoto() {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
    openLightbox(allPhotos[currentPhotoIndex], currentPhotoIndex);
}

function prevPhoto() {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    openLightbox(allPhotos[currentPhotoIndex], currentPhotoIndex);
}

function showRandomMessage() {
    if (allMessages.length === 0) return;

    const randomIndex = Math.floor(Math.random() * allMessages.length);
    const randomMessage = allMessages[randomIndex];
    const display = document.getElementById('randomDisplay');
    const name = document.getElementById('randomName');
    const text = document.getElementById('randomText');

    if (!display || !name || !text) return;

    name.textContent = getMessageSender(randomMessage);
    text.textContent = randomMessage.text || 'A warm greeting to celebrate this milestone.';
    display.classList.remove('hidden');
    display.classList.add('active');

    if (randomRevealTimeout) {
        window.clearTimeout(randomRevealTimeout);
    }

    randomRevealTimeout = window.setTimeout(() => {
        display.classList.remove('active');
    }, 5200);
}

function createConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#D4AF37', '#F5F1E8', '#B87333'];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.vx = (Math.random() - 0.5) * 3;
            this.vy = Math.random() * 2 + 2;
            this.rotation = Math.random() * 360;
            this.size = Math.random() * 8 + 6;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.gravity = 0.12;
            this.opacity = 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity * 0.08;
            this.rotation += 5;
            if (this.y > canvas.height) {
                this.opacity -= 0.04;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < 60; i += 1) {
        confetti.push(new Confetti());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((piece, index) => {
            piece.update();
            piece.draw();
            if (piece.opacity <= 0) {
                confetti.splice(index, 1);
            }
        });
        if (confetti.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

function setupScrollAnimations() {
    const options = {
        threshold: 0.12,
        rootMargin: '0px 0px -80px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('scroll-fade-in')) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));
}

function setupScrollIndicator() {
    const dots = Array.from(document.querySelectorAll('.indicator-dot'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                dots.forEach(dot => dot.classList.remove('active'));
                const activeDot = dots.find(dot => dot.dataset.section === entry.target.id);
                if (activeDot) activeDot.classList.add('active');
            }
        });
    }, { threshold: 0.45 });

    dots.forEach(dot => {
        const section = document.getElementById(dot.dataset.section);
        if (section) observer.observe(section);
        dot.addEventListener('click', () => {
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function setupEventListeners() {
    const scrollBtn = document.getElementById('scrollToMessages');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const section = document.getElementById('all-messages');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const modal = document.getElementById('messageModal');
    const modalClose = document.querySelector('.modal-close');
    if (modal) {
        if (modalClose) modalClose.addEventListener('click', closeMessageModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeMessageModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMessageModal();
            closeLightbox();
        }
    });

    const lightbox = document.getElementById('imageLightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    if (lightbox) {
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
    if (nextBtn) nextBtn.addEventListener('click', nextPhoto);

    const randomBtn = document.getElementById('randomBtn');
    if (randomBtn) randomBtn.addEventListener('click', showRandomMessage);

    const celebrationSection = document.getElementById('celebration');
    if (celebrationSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                createConfetti();
                observer.unobserve(celebrationSection);
            }
        }, { threshold: 0.3 });
        observer.observe(celebrationSection);
    }

    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confetti');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}

function renderContributorCollage() {
    const grid = document.getElementById('collageGrid');
    if (!grid) return;

    const contributors = new Set();
    allMessages.forEach(item => contributors.add(getMessageSender(item)));
    allPhotos.forEach(item => contributors.add(item.sender || getMessageSender(item)));

    const names = Array.from(contributors).filter(Boolean);
    grid.innerHTML = '';

    names.forEach((name, index) => {
        const card = document.createElement('div');
        card.className = 'collage-item';
        card.style.animationDelay = `${index * 0.28}s`;
        card.innerHTML = `
            <span>${escapeHtml(getInitials(name))}</span>
            <p>${escapeHtml(name)}</p>
        `;
        grid.appendChild(card);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message) {
    console.warn(message);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
