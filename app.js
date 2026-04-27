/* ============================================================
   APP.JS — Russian Language Learning App
   ============================================================ */

(function () {
    "use strict";

    /* ── STATE ────────────────────────────────────────────────── */
    const state = {
        category: "all",
        level: "all",
        lang: "fr",
        theme: "light",
        seen: new Set(),
        openId: null
    };

    /* ── DOM REFS ─────────────────────────────────────────────── */
    const $ = id => document.getElementById(id);
    const $$ = sel => document.querySelectorAll(sel);

    const grid = $("contentGrid");
    const emptyState = $("emptyState");
    const modalOverlay = $("modalOverlay");
    const modalCard = $("modalCard");
    const modalClose = $("modalClose");
    const modalSeenBtn = $("modalSeenBtn");
    const themeToggle = $("themeToggle");
    const themeIcon = $("themeIcon");
    const menuToggle = $("menuToggle");
    const sidebar = $("sidebar");
    const progressRing = $("progressRing");
    const progressLabel = $("progressLabel");
    const progressSub = $("progressSub");

    /* ── INIT ─────────────────────────────────────────────────── */
    function init() {
        loadState();
        applyTheme();
        bindEvents();
        updateBadges();
        render();
    }

    /* ── PERSIST ──────────────────────────────────────────────── */
    function loadState() {
        try {
            const saved = JSON.parse(localStorage.getItem("russianApp") || "{}");
            if (saved.theme) { state.theme = saved.theme; }
            if (saved.lang) { state.lang = saved.lang; }
            if (Array.isArray(saved.seen)) { state.seen = new Set(saved.seen); }
        } catch (_) { }
    }

    function saveState() {
        localStorage.setItem("russianApp", JSON.stringify({
            theme: state.theme,
            lang: state.lang,
            seen: [...state.seen]
        }));
    }

    /* ── THEME ────────────────────────────────────────────────── */
    function applyTheme() {
        document.documentElement.setAttribute("data-theme", state.theme);
        themeIcon.textContent = state.theme === "dark" ? "☀️" : "🌙";
        $$(".lang-btn").forEach(b => {
            b.classList.toggle("active", b.dataset.lang === state.lang);
        });
    }

    /* ── FILTER HELPERS ───────────────────────────────────────── */
    function getFiltered() {
        return getAllPhrases().filter(p => {
            const catOk = state.category === "all" || p.category === state.category;
            const levelOk = state.level === "all" || p.level === state.level;
            return catOk && levelOk;
        });
    }

    /* ── BADGES ───────────────────────────────────────────────── */
    function updateBadges() {
        const allPhrases = getAllPhrases();
        Object.keys(CATEGORIES).forEach(cat => {
            const el = $(`badge-${cat}`);
            if (!el) return;
            const count = cat === "all"
                ? allPhrases.length
                : allPhrases.filter(p => p.category === cat).length;
            el.textContent = count;
        });
    }

    /* ── STATS BAR ────────────────────────────────────────────── */
    function updateStats(filtered) {
        $("totalVisible").textContent = filtered.length;
        $("currentLevel").textContent =
            state.level === "all" ? "Tous" : state.level;
        const cat = CATEGORIES[state.category] || CATEGORIES.all;
        $("currentCategory").textContent =
            state.lang === "fr" ? cat.labelFr : cat.labelEn;
    }

    /* ── PROGRESS RING ────────────────────────────────────────── */
    function updateProgress() {
        const total = getAllPhrases().length;
        const seen = state.seen.size;
        const pct = total > 0 ? Math.round((seen / total) * 100) : 0;
        const circ = 2 * Math.PI * 22;
        const offset = circ - (circ * pct / 100);
        progressRing.style.strokeDashoffset = offset;
        progressLabel.textContent = `${pct}%`;
        progressSub.textContent = `${seen} phrase${seen !== 1 ? "s" : ""} ${state.lang === "fr" ? "vues" : "seen"}`;
    }

    /* ── RENDER CARDS ─────────────────────────────────────────── */
    function render() {
        const filtered = getFiltered();
        updateStats(filtered);
        updateProgress();
        updateTopbarTitle();

        grid.innerHTML = "";

        if (filtered.length === 0) {
            emptyState.classList.remove("hidden");
            return;
        }

        emptyState.classList.add("hidden");

        filtered.forEach((phrase, idx) => {
            const card = buildCard(phrase, idx);
            grid.appendChild(card);
        });
    }

    function buildCard(phrase, idx) {
        const isSeen = state.seen.has(phrase.id);
        const translation = phrase[state.lang] || phrase.fr;
        const catMeta = CATEGORIES[phrase.category] || {};

        const card = document.createElement("article");
        card.className = `phrase-card${isSeen ? " seen" : ""}`;
        card.dataset.level = phrase.level;
        card.dataset.id = phrase.id;
        card.style.animationDelay = `${idx * 0.04}s`;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Phrase en russe: ${phrase.russian}`);

        card.innerHTML = `
      <div class="card-header">
        <span class="card-level-badge badge-${phrase.level}">${phrase.level}</span>
        <span class="card-category-tag">${catMeta.icon || ""} ${catMeta.label || ""}</span>
      </div>
      <p class="card-russian">${escapeHtml(phrase.russian)}</p>
      <p class="card-phonetic">${escapeHtml(phrase.phonetic)}</p>
      <p class="card-translation">${escapeHtml(translation)}</p>
      <div class="card-footer">
        <div class="card-audio-controls">
          <button class="audio-btn audio-ru" title="Écouter en russe">
            <span class="audio-icon">🔊</span>
            <span class="audio-lang">RU</span>
          </button>
          <button class="audio-btn audio-translation" title="Écouter la traduction">
            <span class="audio-icon">🔊</span>
            <span class="audio-lang">${state.lang.toUpperCase()}</span>
          </button>
        </div>
        <div class="card-status">
          <span class="card-eye">
            <span>👁️</span>
            <span class="card-seen-dot"></span>
            ${isSeen ? (state.lang === "fr" ? "Vu" : "Seen") : (state.lang === "fr" ? "Non vu" : "Not seen")}
          </span>
          <span class="card-open-hint">↗ ${state.lang === "fr" ? "Ouvrir" : "Open"}</span>
        </div>
      </div>
    `;

        const audioRuBtn = card.querySelector('.audio-ru');
        const audioTransBtn = card.querySelector('.audio-translation');
        
        audioRuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playAudio(phrase.russian, 'ru', audioRuBtn);
        });
        
        audioTransBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playAudio(translation, state.lang, audioTransBtn);
        });

        card.addEventListener("click", () => openModal(phrase.id));
        card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openModal(phrase.id); });

        return card;
    }

    /* ── TOPBAR TITLE ─────────────────────────────────────────── */
    function updateTopbarTitle() {
        const cat = CATEGORIES[state.category] || CATEGORIES.all;
        $("pageTitle").textContent = cat.label;
        $("pageSub").textContent = state.lang === "fr" ? cat.labelFr : cat.labelEn;
    }

    /* ── MODAL ────────────────────────────────────────────────── */
    function openModal(id) {
        const phrase = getAllPhrases().find(p => p.id === id);
        if (!phrase) return;
        state.openId = id;

        const translation = phrase[state.lang] || phrase.fr;
        const catMeta = CATEGORIES[phrase.category] || {};
        const isSeen = state.seen.has(id);

        $("modalLevel").textContent = phrase.level;
        $("modalLevel").className = `modal-level-badge badge-${phrase.level}`;
        $("modalRussian").textContent = phrase.russian;
        $("modalPhonetic").textContent = phrase.phonetic;
        $("modalTranslation").textContent = translation;
        $("modalCategory").textContent = `${catMeta.icon || ""} ${catMeta.label || ""} — ${state.lang === "fr" ? catMeta.labelFr : catMeta.labelEn}`;

        $("translationLangLabel").textContent = state.lang === "fr" ? "Français" : "English";

        $("playRussian").onclick = (e) => playAudio(phrase.russian, 'ru', e.target.closest('button'));
        $("playTranslation").onclick = (e) => playAudio(translation, state.lang, e.target.closest('button'));
        $("playEnglish").onclick = (e) => playAudio(phrase.en, 'en', e.target.closest('button'));

        updateSeenBtn(isSeen);

        modalOverlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        modalClose.focus();
    }

    function updateSeenBtn(isSeen) {
        if (isSeen) {
            modalSeenBtn.textContent = state.lang === "fr" ? "✔ Déjà vu !" : "✔ Already seen!";
            modalSeenBtn.classList.add("done");
        } else {
            modalSeenBtn.innerHTML = `<span>✔</span> ${state.lang === "fr" ? "Marquer comme vu" : "Mark as seen"}`;
            modalSeenBtn.classList.remove("done");
        }
    }

    function closeModal() {
        modalOverlay.classList.add("hidden");
        document.body.style.overflow = "";
        state.openId = null;
    }

    /* ── EVENTS ───────────────────────────────────────────────── */
    function bindEvents() {

        $$(".cat-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                $$(".cat-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                state.category = btn.dataset.category;
                render();
                if (window.innerWidth < 700) sidebar.classList.remove("open");
            });
        });

        $$(".level-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                $$(".level-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                state.level = btn.dataset.level;
                render();
            });
        });

        $$(".lang-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                $$(".lang-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                state.lang = btn.dataset.lang;
                saveState();
                render();
                if (state.openId !== null) openModal(state.openId);
            });
        });

        themeToggle.addEventListener("click", () => {
            state.theme = state.theme === "light" ? "dark" : "light";
            applyTheme();
            saveState();
        });

        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });

        document.addEventListener("click", e => {
            if (window.innerWidth < 700 &&
                sidebar.classList.contains("open") &&
                !sidebar.contains(e.target) &&
                e.target !== menuToggle) {
                sidebar.classList.remove("open");
            }
        });

        modalClose.addEventListener("click", closeModal);

        modalOverlay.addEventListener("click", e => {
            if (e.target === modalOverlay) closeModal();
        });

        modalSeenBtn.addEventListener("click", () => {
            if (state.openId === null) return;
            const id = state.openId;
            if (state.seen.has(id)) {
                state.seen.delete(id);
            } else {
                state.seen.add(id);
            }
            saveState();
            updateSeenBtn(state.seen.has(id));
            const cardEl = grid.querySelector(`[data-id="${id}"]`);
            if (cardEl) {
                cardEl.classList.toggle("seen", state.seen.has(id));
                const dot = cardEl.querySelector(".card-seen-dot");
                const eye = cardEl.querySelector(".card-eye");
                if (dot && eye) {
                    const txt = state.seen.has(id)
                        ? (state.lang === "fr" ? "Vu" : "Seen")
                        : (state.lang === "fr" ? "Non vu" : "Not seen");
                    eye.innerHTML = `<span>👁️</span><span class="card-seen-dot${state.seen.has(id) ? ' seen' : ''}"></span>${txt}`;
                }
            }
            updateProgress();
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
                closeModal();
            }
        });
    }

    /* ── UTIL ─────────────────────────────────────────────────── */
    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    /* ── AUDIO SYSTEM ─────────────────────────────────────────── */
    let currentSpeech = null;
    let currentButton = null;
    
    const voiceConfig = {
        'ru': { lang: 'ru-RU', rate: 0.8, pitch: 1.0 },
        'en': { lang: 'en-US', rate: 0.9, pitch: 1.0 },
        'fr': { lang: 'fr-FR', rate: 0.9, pitch: 1.0 }
    };

    function playAudio(text, language, buttonElement = null) {
        if (currentSpeech) {
            speechSynthesis.cancel();
            resetAudioButton();
        }

        if (!('speechSynthesis' in window)) {
            alert(state.lang === 'fr' ? 
                'Désolé, votre navigateur ne supporte pas la synthèse vocale.' : 
                'Sorry, your browser does not support speech synthesis.');
            return;
        }

        currentSpeech = new SpeechSynthesisUtterance(text);
        currentButton = buttonElement;
        
        const config = voiceConfig[language] || voiceConfig['en'];
        currentSpeech.lang = config.lang;
        currentSpeech.rate = config.rate;
        currentSpeech.pitch = config.pitch;
        currentSpeech.volume = 1.0;

        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.lang.startsWith(language === 'ru' ? 'ru' : language === 'fr' ? 'fr' : 'en')
        );
        
        if (preferredVoice) {
            currentSpeech.voice = preferredVoice;
        }

        if (currentButton) {
            currentButton.classList.add('playing');
            const icon = currentButton.querySelector('.audio-icon');
            if (icon) icon.textContent = '⏸️';
        }

        currentSpeech.onstart = () => {
            console.log(`🔊 Lecture audio démarrée: ${language.toUpperCase()}`);
        };

        currentSpeech.onend = () => {
            resetAudioButton();
            console.log('🔇 Lecture audio terminée');
        };

        currentSpeech.onerror = (event) => {
            console.error('❌ Erreur audio:', event.error);
            resetAudioButton();
        };

        speechSynthesis.speak(currentSpeech);
    }

    function resetAudioButton() {
        if (currentButton) {
            currentButton.classList.remove('playing');
            const icon = currentButton.querySelector('.audio-icon');
            if (icon) icon.textContent = '🔊';
        }
        currentSpeech = null;
        currentButton = null;
    }

    window.playAudio = playAudio;

    window.addEventListener('beforeunload', () => {
        if (currentSpeech) {
            speechSynthesis.cancel();
        }
    });

    /* ── BOOT ─────────────────────────────────────────────────── */
    document.addEventListener("DOMContentLoaded", init);

})();
