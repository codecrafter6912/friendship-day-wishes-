// ===================================================
// 🔴 DOSTO KI LIST & LOCAL PHOTO (UPDATED)
// ===================================================
const FRIENDS_DATABASE = {
    "abdul": {
        name: "",
        message: "Or abdul bomb kab phodega , Happy Friendship Day Abdul!✨",
        image: "friend-photo.jpeg", // Fixed local photo link
        giftTitle: "Abdul Special Friendship Pack 🎁"
    },

}

const startBtn = document.getElementById('start-btn');
const userNicknameInput = document.getElementById('user-nickname');
const inputSection = document.getElementById('input-section');
const surpriseSection = document.getElementById('surprise-section');
const deliverySection = document.getElementById('delivery-section');

const greeting = document.getElementById('greeting');
const specialMessage = document.getElementById('special-message');
const friendPhoto = document.getElementById('friend-photo');
const errorMsg = document.getElementById('error-msg');
const mainCard = document.getElementById('main-card');

const quoteText = document.getElementById('quote-text');
const nextQuoteBtn = document.getElementById('next-quote-btn');
const replayConfettiBtn = document.getElementById('replay-confetti-btn');
const goToPage3Btn = document.getElementById('go-to-page3-btn');
const backToPage2Btn = document.getElementById('back-to-page2-btn');

const whatsappShare = document.getElementById('whatsapp-share');
const bgAnimation = document.getElementById('bg-animation');
const meterFill = document.getElementById('meter-fill');
const musicBtn = document.getElementById('music-btn');
const ringTitle = document.getElementById('ring-title');
const trackingCode = document.getElementById('tracking-code');

const bgMusic = document.getElementById('bg-music');

// ===================================================
// PERSONALIZED LINKS (made with create.html). No #d=... in the link = original FRIENDS_DATABASE site.
// All user text is shown with textContent, photos must be https or small data:image, music must be https.
// ===================================================
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'><rect width='4' height='3' fill='#ffd6dc'/><text x='2' y='2' font-size='1.6' text-anchor='middle'>🤝</text></svg>");
const b64d = s => { s = s.replace(/-/g, '+').replace(/_/g, '/'); const bin = atob(s + '='.repeat((4 - s.length % 4) % 4)); return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))); };
const shared = (() => { try { const m = location.hash.match(/[#&]d=([\w-]+)/); return m ? JSON.parse(b64d(m[1])) : null; } catch (e) { return null; } })();

function lookup(k) {
    if (!shared) return FRIENDS_DATABASE[k];
    if (!shared.k || k !== String(shared.k).trim().toLowerCase()) return null;
    const p = String(shared.p || '');
    const ok = /^https:\/\//.test(p) || /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(p);
    return { name: String(shared.n || 'Friend').slice(0, 60), message: String(shared.m || 'Happy Friendship Day! ❤️'),
             image: ok ? p : PLACEHOLDER, giftTitle: String(shared.g || 'Surprise Gift 🎁'), x: shared };
}
function applyExtras(f) {
    const x = f.x; if (!x) return;
    if (Array.isArray(x.q) && x.q.length) { quotes.splice(0, quotes.length, ...x.q.map(String)); currentQuoteIndex = 0; quoteText.textContent = quotes[0]; }
    if (x.cap) document.getElementById('photo-caption').textContent = String(x.cap);
    if (/^https:\/\//.test(x.a || '')) { bgMusic.src = x.a; bgMusic.load(); }
    goToPage3Btn.classList.toggle('hidden', x.t === 0);
}
function waLink(f, t) {
    const x = f.x; if (!x) return `https://api.whatsapp.com/send?text=${t}`;
    const txt = x.s ? encodeURIComponent(`Hey ${x.s}! Maine tera Friendship Day surprise dekh liya ❤️`) : t;
    return /^\d{8,15}$/.test(x.w || '') ? `https://wa.me/${x.w}?text=${txt}` : `https://api.whatsapp.com/send?text=${txt}`;
}

const quotes = [
    "\"Friends standard nahi, har mushkil me stand lene wale hone chahiye!\" 😎",
    "\"Tu dost nahi, mera official crime partner hai!\" 🕵️‍♂️",
    "\"Tu jitna bhi irritating ho, par mera favorite weirdo hai!\" 🤪",
    "\"Zindagi me acche dosto ka hona utna hi zaroori hai jitna fast internet!\" 📶",
    "\"Tu best tha, best hai, aur hamesha mera sabse accha dost rahega!\" ❤️"
];

let currentQuoteIndex = 0;

// Audio Pre-Unlock Fix
let isAudioUnlocked = false;
function unlockAudioOnFirstTouch() {
    if (!isAudioUnlocked && bgMusic) {
        bgMusic.play().then(() => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            isAudioUnlocked = true;
        }).catch(e => {});
        document.removeEventListener('click', unlockAudioOnFirstTouch);
        document.removeEventListener('touchstart', unlockAudioOnFirstTouch);
    }
}
document.addEventListener('click', unlockAudioOnFirstTouch);
document.addEventListener('touchstart', unlockAudioOnFirstTouch);

// Background Animations
function createFloatingElements() {
    const symbols = ['❤️', '✨', '🤝', '🎁', '💖', '📦'];
    setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('floating-item');
        item.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.animationDuration = (Math.random() * 3 + 5) + 's';
        bgAnimation.appendChild(item);

        setTimeout(() => { item.remove(); }, 8000);
    }, 600);
}
createFloatingElements();

function revealGift(element, text) {
    playBeepSound();
    element.classList.add('opened');
    element.textContent = text;
    triggerConfetti();
}

function verifyAndOpen() {
    const enteredInput = userNicknameInput.value.trim().toLowerCase();

    const friend = lookup(enteredInput);
    if (friend) {
        errorMsg.classList.add('hidden');

        applyExtras(friend);

        greeting.textContent = 'Happy Friendship Day,';
        const nm = document.createElement('span'); nm.className = 'name-highlight'; nm.textContent = friend.name;
        greeting.append(document.createElement('br'), nm, '! 🎉');
        specialMessage.textContent = friend.message;
        
        // 🖼️ Correct photo set ho rahi hai ab!
        friendPhoto.src = friend.image;
        ringTitle.innerText = friend.giftTitle || "Top Secret Custom Box 🎁";

        trackingCode.innerText = `BFF-SECRET-2026-${friend.name.substring(0, 3).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;

        const waText = encodeURIComponent(`Bhai tera Friendship Day surprise website dekha! Secret Parcel delivery ke liye address bhej raha hu ❤️`);
        whatsappShare.href = waLink(friend, waText);

        inputSection.classList.add('hidden');
        surpriseSection.classList.remove('hidden');

        setTimeout(() => {
            meterFill.style.width = '100%';
        }, 300);

        if (bgMusic) {
            bgMusic.currentTime = 0;
            bgMusic.play().then(() => {
                musicBtn.innerText = "🎵";
            }).catch(error => {
                console.log("Audio play error:", error);
            });
        }

        triggerConfetti();
        playBeepSound();
    } else {
        errorMsg.classList.remove('hidden');
        mainCard.classList.add('shake');

        setTimeout(() => {
            mainCard.classList.remove('shake');
        }, 400);
    }
}

goToPage3Btn.addEventListener('click', () => {
    surpriseSection.classList.add('hidden');
    deliverySection.classList.remove('hidden');
    triggerConfetti();
    playBeepSound();
});

backToPage2Btn.addEventListener('click', () => {
    deliverySection.classList.add('hidden');
    surpriseSection.classList.remove('hidden');
});

startBtn.addEventListener('click', verifyAndOpen);

document.querySelectorAll('.gift-box').forEach((b, i) => b.addEventListener('click', () =>
    revealGift(b, shared ? String((shared.b || [])[i] || 'A little surprise for you 🎁') : b.dataset.note)));

userNicknameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verifyAndOpen();
    }
});

nextQuoteBtn.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteText.innerText = quotes[currentQuoteIndex];
});

replayConfettiBtn.addEventListener('click', triggerConfetti);

musicBtn.addEventListener('click', () => {
    if (bgMusic) {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerText = "🎵";
        } else {
            bgMusic.pause();
            musicBtn.innerText = "🔇";
        }
    }
});

function playBeepSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {}
}

function triggerConfetti() {
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 40 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
}