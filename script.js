const rawConfig = window.VALENTINE_CONFIG || {};

const DEFAULT_CONFIG = {
    valentineName: "My Love",
    pageTitle: "Will You Be My Valentine? 💝",
    introLine: "I made this little universe just to see you smile.",
    specialDate: "",
    longDistance: {
        enabled: false,
        tagline: "Different cities, one heartbeat.",
        line: "No matter the distance, you are still my home.",
        from: {
            label: "Abu Dhabi, UAE",
            timezone: "Asia/Dubai",
            emoji: "🌇"
        },
        to: {
            label: "Punjab, India",
            timezone: "Asia/Kolkata",
            emoji: "🌾"
        },
        nextMeetDate: "",
        nextMeetLabel: "Until we meet again",
        fallbackMessage: "Until we meet, every call is my favorite part of the day."
    },
    floatingEmojis: {
        hearts: ["❤️", "💖", "💝", "💗", "💓"],
        bears: ["🧸", "🐻"]
    },
    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "No",
            secretAnswer: "I don't like you, I love you! ❤️"
        },
        second: {
            text: "How much do you love me?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "Will you be my Valentine on February 14th, {year}? 🌹",
            yesBtn: "Yes!",
            noBtn: "No"
        }
    },
    loveMeter: {
        min: 0,
        max: 10000,
        initial: 100
    },
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",
        high: "To infinity and beyond! 🚀💝",
        normal: "And beyond! 🥰"
    },
    celebration: {
        title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕",
        surpriseButton: "One More Surprise ✨",
        surpriseMessage: "Every day with you is my favorite love story."
    },
    loveLetter: {
        greeting: "My beautiful love,",
        paragraphs: [
            "You make ordinary moments feel magical.",
            "You are my peace, my best friend, and my favorite person to dream with.",
            "Thank you for being exactly who you are."
        ],
        signature: "Forever yours 💌"
    },
    reasons: [
        "Your laugh makes everything better.",
        "You have the kindest heart I have ever known.",
        "You believe in me even when I doubt myself.",
        "You turn simple days into unforgettable memories."
    ],
    memories: [
        {
            emoji: "✨",
            title: "The First Spark",
            date: "The day everything changed",
            description: "I still remember that moment and how easy it felt to talk to you."
        },
        {
            emoji: "🍽️",
            title: "Our Favorite Date",
            date: "A night I replay in my head",
            description: "The conversations, the laughter, and how time flew by with you."
        },
        {
            emoji: "🌙",
            title: "Late Night Talks",
            date: "My favorite routine",
            description: "Even silence feels warm when I share it with you."
        }
    ],
    datePlan: [
        "Sunset walk with hand-holding required",
        "Dinner at your favorite place",
        "A small surprise gift chosen just for you",
        "One long hug + one million kisses"
    ],
    gallery: {
        enabled: false,
        images: []
    },
    colors: {
        backgroundStart: "#f9a8b5",
        backgroundEnd: "#ffd8b1",
        buttonBackground: "#d64062",
        buttonHover: "#ea6a87",
        textColor: "#922640"
    },
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },
    music: {
        enabled: false,
        autoplay: false,
        musicUrl: "",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        nextText: "⏭ Next Song",
        nowPlayingPrefix: "Now Playing",
        showNowPlaying: true,
        shuffle: false,
        playlist: [],
        volume: 0.5
    }
};

const config = mergeDeep(DEFAULT_CONFIG, rawConfig);
window.VALENTINE_CONFIG = config;

const refs = {};
let celebrationShown = false;
let musicTracks = [];
let currentTrackIndex = 0;
let isSectionTransitioning = false;
let autoPlayUnlockBound = false;
const autoPlayUnlockEvents = ["pointerdown", "keydown"];

window.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    validateConfig();
    document.title = config.pageTitle;
    cacheRefs();
    applyContent();
    bindEvents();
    createFloatingElements();
    setInitialLoveMeter();
    setupMusicPlayer();
    updateCountdown();
    applyLongDistanceContent();
    updateLongDistancePanel();
    setInterval(() => {
        updateCountdown();
        updateLongDistancePanel();
    }, 60_000);
    enableTapHearts();
}

function cacheRefs() {
    const ids = [
        "valentineTitle",
        "introLine",
        "countdownText",
        "distanceSection",
        "distanceTagline",
        "distanceLine",
        "fromLocation",
        "fromTime",
        "fromTimeMeta",
        "toLocation",
        "toTime",
        "toTimeMeta",
        "nextMeetCountdown",
        "question1Text",
        "yesBtn1",
        "noBtn1",
        "secretAnswerBtn",
        "question2Text",
        "startText",
        "nextBtn",
        "loveMeter",
        "loveValue",
        "extraLove",
        "question3Text",
        "yesBtn3",
        "noBtn3",
        "celebration",
        "celebrationTitle",
        "celebrationMessage",
        "celebrationEmojis",
        "surpriseBtn",
        "surpriseMessage",
        "storySection",
        "letterGreeting",
        "letterBody",
        "letterSignature",
        "reasonsList",
        "memoriesGrid",
        "datePlanList",
        "galleryCard",
        "galleryGrid",
        "musicControls",
        "musicToggle",
        "nextSongBtn",
        "nowPlaying",
        "bgMusic",
        "musicSource"
    ];

    ids.forEach((id) => {
        refs[id] = document.getElementById(id);
    });
}

function applyContent() {
    refs.valentineTitle.textContent = `${config.valentineName}, my love...`;
    refs.introLine.textContent = config.introLine;

    refs.question1Text.textContent = config.questions.first.text;
    refs.yesBtn1.textContent = config.questions.first.yesBtn;
    refs.noBtn1.textContent = config.questions.first.noBtn;
    refs.secretAnswerBtn.textContent = config.questions.first.secretAnswer;

    refs.question2Text.textContent = config.questions.second.text;
    refs.startText.textContent = config.questions.second.startText;
    refs.nextBtn.textContent = config.questions.second.nextBtn;

    const targetDate = getTargetDate();
    const questionYear = String(targetDate.getFullYear());
    const thirdQuestionTemplate = config.questions.third.text;
    refs.question3Text.textContent = thirdQuestionTemplate.includes("{year}")
        ? thirdQuestionTemplate.replace("{year}", questionYear)
        : thirdQuestionTemplate.replace(/\b20\d{2}\b/, questionYear);
    refs.yesBtn3.textContent = config.questions.third.yesBtn;
    refs.noBtn3.textContent = config.questions.third.noBtn;

    refs.celebrationTitle.textContent = config.celebration.title;
    refs.celebrationMessage.textContent = config.celebration.message;
    refs.celebrationEmojis.textContent = config.celebration.emojis;

    if (config.celebration.surpriseButton && config.celebration.surpriseMessage) {
        refs.surpriseBtn.textContent = config.celebration.surpriseButton;
        refs.surpriseMessage.textContent = config.celebration.surpriseMessage;
        refs.surpriseBtn.classList.remove("hidden");
    }

    renderLoveLetter();
    renderReasons();
    renderMemories();
    renderDatePlan();
    renderGallery();
}

function applyLongDistanceContent() {
    if (!config.longDistance.enabled) {
        refs.distanceSection.classList.add("hidden");
        return;
    }

    refs.distanceSection.classList.remove("hidden");
    refs.distanceTagline.textContent = config.longDistance.tagline;
    refs.distanceLine.textContent = config.longDistance.line;

    refs.fromLocation.textContent = formatLocationLabel(config.longDistance.from);
    refs.toLocation.textContent = formatLocationLabel(config.longDistance.to);
}

function bindEvents() {
    refs.yesBtn1.addEventListener("click", () => showNextQuestion(2));

    setupPlayfulNoButton(refs.noBtn1, refs.yesBtn1);

    refs.secretAnswerBtn.addEventListener("click", () => showNextQuestion(2));

    refs.nextBtn.addEventListener("click", () => showNextQuestion(3));
    refs.loveMeter.addEventListener("input", handleLoveMeterInput);

    refs.yesBtn3.addEventListener("click", celebrate);
    setupPlayfulNoButton(refs.noBtn3, refs.yesBtn3);

    refs.surpriseBtn.addEventListener("click", () => {
        refs.surpriseMessage.classList.toggle("hidden");
    });
}

function showNextQuestion(questionNumber) {
    if (isSectionTransitioning) {
        return;
    }

    const target = document.getElementById(`question${questionNumber}`);
    if (!target) {
        return;
    }

    const current = getVisibleQuestionSection();
    if (current === target) {
        return;
    }

    isSectionTransitioning = true;
    transitionOutAndThen(current, () => {
        revealSection(target, "center");
        if (questionNumber === 3) {
            resetYesButtonBoost(refs.yesBtn3);
        }
        isSectionTransitioning = false;
    });
}

function moveButton(button, yesButton) {
    if (isCoarsePointer()) {
        nudgeNoButtonForTouch(button, yesButton);
        return;
    }

    const margin = 16;
    const maxX = Math.max(margin, window.innerWidth - button.offsetWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - button.offsetHeight - margin);
    const x = randomBetween(margin, maxX);
    const y = randomBetween(margin, maxY);

    placeNoButton(button, x, y, false);
    boostYesButton(yesButton, 0.07);
}

function setInitialLoveMeter() {
    refs.loveMeter.min = String(config.loveMeter.min);
    refs.loveMeter.max = String(config.loveMeter.max);
    refs.loveMeter.value = String(config.loveMeter.initial);
    refs.loveValue.textContent = String(config.loveMeter.initial);
    handleLoveMeterInput();
}

function handleLoveMeterInput() {
    const value = Number.parseInt(refs.loveMeter.value, 10);
    const max = Number.parseInt(refs.loveMeter.max, 10);
    const fillPercent = Math.min(100, (value / max) * 100);

    refs.loveValue.textContent = String(value);
    refs.loveMeter.style.setProperty("--fill-percent", `${fillPercent}%`);

    if (value <= 100) {
        refs.extraLove.classList.add("hidden");
        refs.extraLove.classList.remove("super-love");
        return;
    }

    refs.extraLove.classList.remove("hidden");

    if (value >= 5000) {
        refs.extraLove.classList.add("super-love");
        refs.extraLove.textContent = config.loveMessages.extreme;
    } else if (value > 1000) {
        refs.extraLove.classList.remove("super-love");
        refs.extraLove.textContent = config.loveMessages.high;
    } else {
        refs.extraLove.classList.remove("super-love");
        refs.extraLove.textContent = config.loveMessages.normal;
    }
}

function celebrate() {
    if (celebrationShown || isSectionTransitioning) {
        return;
    }

    celebrationShown = true;
    isSectionTransitioning = true;

    const currentQuestion = getVisibleQuestionSection();
    transitionOutAndThen(currentQuestion, () => {
        refs.celebration.classList.remove("hidden");
        refs.storySection.classList.remove("hidden");

        refs.celebration.classList.add("section-enter");
        refs.storySection.classList.add("story-reveal");

        setTimeout(() => {
            refs.celebration.classList.remove("section-enter");
            refs.storySection.classList.remove("story-reveal");
        }, isCoarsePointer() ? 640 : 850);

        createHeartExplosion(80);
        typeLetterParagraphs(config.loveLetter.paragraphs);

        refs.celebration.scrollIntoView({ behavior: "smooth", block: "start" });
        isSectionTransitioning = false;
    });
}

function setupPlayfulNoButton(noButton, yesButton) {
    if (!noButton || !yesButton) {
        return;
    }

    noButton.addEventListener("mouseenter", () => {
        if (!isCoarsePointer()) {
            moveButton(noButton, yesButton);
        }
    });

    noButton.addEventListener("click", (event) => {
        const now = Date.now();
        const lastTouchAt = Number.parseInt(noButton.dataset.lastTouchAt || "0", 10);
        if (isCoarsePointer() && now - lastTouchAt < 320) {
            event.preventDefault();
            return;
        }

        moveButton(noButton, yesButton);
    });

    noButton.addEventListener("touchstart", (event) => {
        noButton.dataset.lastTouchAt = String(Date.now());
        event.preventDefault();
        moveButton(noButton, yesButton);
    }, { passive: false });

    document.addEventListener("mousemove", (event) => {
        evadeCursor(noButton, yesButton, event.clientX, event.clientY);
    });
}

function evadeCursor(noButton, yesButton, pointerX, pointerY) {
    if (isCoarsePointer() || !isElementVisible(noButton)) {
        return;
    }

    const rect = noButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(centerX - pointerX, centerY - pointerY);
    const triggerDistance = Math.max(120, rect.width * 1.8);

    if (distance >= triggerDistance) {
        return;
    }

    const now = Date.now();
    const lastMoveAt = Number.parseInt(noButton.dataset.lastMoveAt || "0", 10);
    if (now - lastMoveAt < 80) {
        return;
    }
    noButton.dataset.lastMoveAt = String(now);

    const safeDistance = Math.max(distance, 1);
    const unitX = (centerX - pointerX) / safeDistance;
    const unitY = (centerY - pointerY) / safeDistance;
    const pushDistance = triggerDistance - distance + 36;
    const targetX = rect.left + unitX * pushDistance;
    const targetY = rect.top + unitY * pushDistance;

    placeNoButton(noButton, targetX, targetY, true);
    boostYesButton(yesButton, 0.03);
}

function placeNoButton(button, left, top, isSoftMove) {
    const margin = 12;
    const maxX = Math.max(margin, window.innerWidth - button.offsetWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - button.offsetHeight - margin);
    const boundedX = Math.min(maxX, Math.max(margin, left));
    const boundedY = Math.min(maxY, Math.max(margin, top));

    button.style.position = "fixed";
    button.style.left = `${boundedX}px`;
    button.style.top = `${boundedY}px`;
    button.style.zIndex = "1001";
    button.style.transition = isSoftMove
        ? "left 0.14s ease-out, top 0.14s ease-out, transform 0.14s ease-out"
        : "left 0.24s ease, top 0.24s ease, transform 0.24s ease";
    button.style.transform = `rotate(${randomBetween(-12, 12)}deg)`;
}

function nudgeNoButtonForTouch(button, yesButton) {
    const previousShift = Number.parseFloat(button.dataset.touchShift || "0");
    const direction = previousShift >= 0 ? -1 : 1;
    const nextShift = direction * randomBetween(18, 48);
    const rotation = randomBetween(-8, 8);

    button.dataset.touchShift = String(nextShift);
    button.style.position = "relative";
    button.style.left = "auto";
    button.style.top = "auto";
    button.style.zIndex = "1";
    button.style.transition = "transform 0.18s ease-out";
    button.style.transform = `translateX(${nextShift}px) rotate(${rotation}deg)`;
    button.classList.add("shake");
    setTimeout(() => button.classList.remove("shake"), 260);

    boostYesButton(yesButton, 0.08);
}

function boostYesButton(button, step) {
    if (!button || !isElementVisible(button)) {
        return;
    }

    const currentScale = Number.parseFloat(button.dataset.yesScale || "1");
    const nextScale = Math.min(1.85, currentScale + step);
    button.dataset.yesScale = String(nextScale);
    button.style.setProperty("--yes-scale", String(nextScale));
    button.classList.add("yes-growing");
}

function resetYesButtonBoost(button) {
    if (!button) {
        return;
    }

    button.dataset.yesScale = "1";
    button.style.setProperty("--yes-scale", "1");
    button.classList.remove("yes-growing");
}

function getVisibleQuestionSection() {
    return Array.from(document.querySelectorAll(".question-section")).find((section) => !section.classList.contains("hidden")) || null;
}

function transitionOutAndThen(section, onAfterExit) {
    if (!section || section.classList.contains("hidden")) {
        onAfterExit();
        return;
    }

    section.classList.add("section-exit");
    setTimeout(() => {
        section.classList.remove("section-exit");
        section.classList.add("hidden");
        onAfterExit();
    }, isCoarsePointer() ? 220 : 260);
}

function revealSection(section, scrollBlock = "center") {
    section.classList.remove("hidden");
    section.classList.add("section-enter");
    setTimeout(() => {
        section.classList.remove("section-enter");
    }, isCoarsePointer() ? 420 : 540);
    section.scrollIntoView({ behavior: "smooth", block: isCoarsePointer() ? "start" : scrollBlock });
}

function isElementVisible(element) {
    return Boolean(element) && !element.classList.contains("hidden") && element.getClientRects().length > 0;
}

function isCoarsePointer() {
    return Boolean(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
}

function createFloatingElements() {
    const container = document.querySelector(".floating-elements");
    if (!container) {
        return;
    }

    container.innerHTML = "";

    const pool = [
        ...(Array.isArray(config.floatingEmojis.hearts) ? config.floatingEmojis.hearts : []),
        ...(Array.isArray(config.floatingEmojis.bears) ? config.floatingEmojis.bears : [])
    ];

    const emojiPool = pool.length > 0 ? pool : ["💖"];
    const floatingCount = Math.min(36, Math.max(16, emojiPool.length * 3));

    for (let index = 0; index < floatingCount; index += 1) {
        const el = document.createElement("div");
        el.className = "float-emoji";
        el.textContent = emojiPool[Math.floor(Math.random() * emojiPool.length)];
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDelay = `${Math.random() * 8}s`;
        el.style.animationDuration = `${randomBetween(10, 24)}s`;
        el.style.fontSize = `${randomBetween(1.1, 2.2)}rem`;
        container.appendChild(el);
    }
}

function createHeartExplosion(count) {
    const container = document.querySelector(".floating-elements");
    const origin = refs.celebration.getBoundingClientRect();
    const startX = origin.left + origin.width / 2;
    const startY = origin.top + origin.height / 3;
    const hearts = config.floatingEmojis.hearts.length > 0 ? config.floatingEmojis.hearts : ["💖"];

    for (let index = 0; index < count; index += 1) {
        const heart = document.createElement("div");
        const angle = (Math.PI * 2 * index) / count;
        const distance = randomBetween(100, 360);
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;

        heart.className = "confetti-heart";
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
        heart.style.setProperty("--end-x", `${endX}px`);
        heart.style.setProperty("--end-y", `${endY}px`);
        heart.style.animationDelay = `${Math.random() * 200}ms`;

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1600);
    }
}

function renderLoveLetter() {
    refs.letterGreeting.textContent = config.loveLetter.greeting;
    refs.letterSignature.textContent = config.loveLetter.signature;
    refs.letterBody.innerHTML = "";

    config.loveLetter.paragraphs.forEach((paragraph) => {
        const p = document.createElement("p");
        p.className = "letter-paragraph";
        p.textContent = paragraph;
        refs.letterBody.appendChild(p);
    });
}

function typeLetterParagraphs(paragraphs) {
    const lines = refs.letterBody.querySelectorAll(".letter-paragraph");

    lines.forEach((line) => {
        line.textContent = "";
    });

    let lineIndex = 0;

    const renderNextLine = () => {
        if (lineIndex >= lines.length) {
            return;
        }

        typeText(lines[lineIndex], paragraphs[lineIndex], 18, () => {
            lineIndex += 1;
            setTimeout(renderNextLine, 140);
        });
    };

    renderNextLine();
}

function typeText(node, text, speed, callback) {
    let pointer = 0;
    const ticker = setInterval(() => {
        node.textContent += text.charAt(pointer);
        pointer += 1;

        if (pointer >= text.length) {
            clearInterval(ticker);
            if (typeof callback === "function") {
                callback();
            }
        }
    }, speed);
}

function renderReasons() {
    refs.reasonsList.innerHTML = "";

    config.reasons.forEach((reason) => {
        const li = document.createElement("li");
        li.textContent = reason;
        refs.reasonsList.appendChild(li);
    });
}

function renderMemories() {
    refs.memoriesGrid.innerHTML = "";

    config.memories.forEach((memory) => {
        const card = document.createElement("article");
        card.className = "memory-card";

        const emoji = document.createElement("p");
        emoji.className = "memory-emoji";
        emoji.textContent = memory.emoji || "💞";

        const title = document.createElement("h4");
        title.textContent = memory.title || "A beautiful memory";

        const date = document.createElement("p");
        date.className = "memory-date";
        date.textContent = memory.date || "Always";

        const description = document.createElement("p");
        description.textContent = memory.description || "Every moment with you matters to me.";

        card.append(emoji, title, date, description);
        refs.memoriesGrid.appendChild(card);
    });
}

function renderDatePlan() {
    refs.datePlanList.innerHTML = "";

    config.datePlan.forEach((planItem) => {
        const li = document.createElement("li");
        li.textContent = planItem;
        refs.datePlanList.appendChild(li);
    });
}

function renderGallery() {
    const enabled = Boolean(config.gallery.enabled);
    const images = Array.isArray(config.gallery.images) ? config.gallery.images : [];

    if (!enabled || images.length === 0) {
        refs.galleryCard.classList.add("hidden");
        refs.galleryGrid.innerHTML = "";
        return;
    }

    refs.galleryCard.classList.remove("hidden");
    refs.galleryGrid.innerHTML = "";

    images.forEach((entry, index) => {
        const imageData = typeof entry === "string"
            ? { url: entry, alt: `Photo ${index + 1}`, caption: "" }
            : {
                url: entry.url || "",
                alt: entry.alt || `Photo ${index + 1}`,
                caption: entry.caption || ""
            };

        if (!imageData.url) {
            return;
        }

        const figure = document.createElement("figure");
        figure.className = "gallery-item";

        const image = document.createElement("img");
        image.src = imageData.url;
        image.alt = imageData.alt;
        image.loading = "lazy";
        figure.appendChild(image);

        if (imageData.caption) {
            const caption = document.createElement("figcaption");
            caption.textContent = imageData.caption;
            figure.appendChild(caption);
        }

        refs.galleryGrid.appendChild(figure);
    });
}

function setupMusicPlayer() {
    if (!config.music.enabled) {
        refs.musicControls.style.display = "none";
        return;
    }

    musicTracks = buildMusicPlaylist();
    if (musicTracks.length === 0) {
        refs.musicControls.style.display = "none";
        return;
    }

    refs.musicToggle.textContent = config.music.startText;
    refs.nextSongBtn.textContent = config.music.nextText;
    refs.bgMusic.volume = clampVolume(config.music.volume);
    refs.bgMusic.preload = "auto";

    if (config.music.shuffle && musicTracks.length > 1) {
        currentTrackIndex = Math.floor(Math.random() * musicTracks.length);
    } else {
        currentTrackIndex = 0;
    }

    const hasMultipleTracks = musicTracks.length > 1;
    refs.bgMusic.loop = !hasMultipleTracks;
    refs.nextSongBtn.classList.toggle("hidden", !hasMultipleTracks);

    loadCurrentTrack();

    refs.musicToggle.addEventListener("click", toggleMusicPlayback);
    refs.bgMusic.addEventListener("ended", () => {
        if (!refs.bgMusic.loop) {
            changeTrack("next", true);
        }
    });

    if (hasMultipleTracks) {
        refs.nextSongBtn.addEventListener("click", () => changeTrack("next", true));
    }

    if (config.music.autoplay) {
        startPlayback({ allowAutoResume: true });
    }
}

function buildMusicPlaylist() {
    const playlist = [];
    const configuredPlaylist = Array.isArray(config.music.playlist) ? config.music.playlist : [];

    configuredPlaylist.forEach((entry, index) => {
        if (typeof entry === "string") {
            const url = entry.trim();
            if (url) {
                playlist.push({
                    title: `Track ${index + 1}`,
                    url
                });
            }
            return;
        }

        if (!isPlainObject(entry)) {
            return;
        }

        const url = typeof entry.url === "string" ? entry.url.trim() : "";
        if (!url) {
            return;
        }

        const title = typeof entry.title === "string" && entry.title.trim()
            ? entry.title.trim()
            : `Track ${index + 1}`;

        playlist.push({ title, url });
    });

    if (playlist.length === 0 && typeof config.music.musicUrl === "string" && config.music.musicUrl.trim()) {
        playlist.push({
            title: "Our Song",
            url: config.music.musicUrl.trim()
        });
    }

    return playlist;
}

function loadCurrentTrack() {
    const track = musicTracks[currentTrackIndex];
    if (!track) {
        return;
    }

    refs.musicSource.src = track.url;
    refs.bgMusic.load();
    updateNowPlaying(track.title);
}

function updateNowPlaying(trackTitle) {
    if (!config.music.showNowPlaying) {
        refs.nowPlaying.classList.add("hidden");
        return;
    }

    const prefix = typeof config.music.nowPlayingPrefix === "string" && config.music.nowPlayingPrefix.trim()
        ? config.music.nowPlayingPrefix.trim()
        : "Now Playing";

    refs.nowPlaying.textContent = `${prefix}: ${trackTitle}`;
    refs.nowPlaying.classList.remove("hidden");
}

function startPlayback(options = {}) {
    const { allowAutoResume = false } = options;
    refs.bgMusic.play().then(() => {
        refs.musicToggle.textContent = config.music.stopText;
        disableAutoPlayUnlock();
    }).catch(() => {
        refs.musicToggle.textContent = config.music.startText;
        if (allowAutoResume) {
            enableAutoPlayUnlock();
        }
    });
}

function pausePlayback() {
    refs.bgMusic.pause();
    refs.musicToggle.textContent = config.music.startText;
    disableAutoPlayUnlock();
}

function toggleMusicPlayback() {
    if (refs.bgMusic.paused) {
        startPlayback({ allowAutoResume: false });
        return;
    }

    pausePlayback();
}

function handleAutoPlayUnlock() {
    startPlayback({ allowAutoResume: false });
}

function enableAutoPlayUnlock() {
    if (autoPlayUnlockBound) {
        return;
    }

    autoPlayUnlockBound = true;
    autoPlayUnlockEvents.forEach((eventName) => {
        document.addEventListener(eventName, handleAutoPlayUnlock, { once: true });
    });
}

function disableAutoPlayUnlock() {
    if (!autoPlayUnlockBound) {
        return;
    }

    autoPlayUnlockBound = false;
    autoPlayUnlockEvents.forEach((eventName) => {
        document.removeEventListener(eventName, handleAutoPlayUnlock);
    });
}

function changeTrack(direction, shouldPlay = false) {
    if (musicTracks.length === 0) {
        return;
    }

    if (config.music.shuffle && musicTracks.length > 1) {
        const previousIndex = currentTrackIndex;
        while (currentTrackIndex === previousIndex) {
            currentTrackIndex = Math.floor(Math.random() * musicTracks.length);
        }
    } else if (direction === "prev") {
        currentTrackIndex = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    }

    const wasPlaying = !refs.bgMusic.paused || shouldPlay;
    loadCurrentTrack();

    if (wasPlaying) {
        startPlayback();
    }
}

function clampVolume(value) {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
        return 0.5;
    }

    return Math.min(1, Math.max(0, parsed));
}

function enableTapHearts() {
    document.body.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button") || event.target.closest("input")) {
            return;
        }

        const heart = document.createElement("span");
        const hearts = config.floatingEmojis.hearts.length > 0 ? config.floatingEmojis.hearts : ["💖"];
        heart.className = "tap-heart";
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${event.clientX}px`;
        heart.style.top = `${event.clientY}px`;

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 900);
    });
}

function updateCountdown() {
    const now = new Date();
    const targetDate = getTargetDate();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTarget = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

    const diffMs = startOfTarget.getTime() - startOfToday.getTime();
    const daysLeft = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const formattedTarget = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(targetDate);

    if (daysLeft > 1) {
        refs.countdownText.textContent = `${daysLeft} days until our special date: ${formattedTarget}`;
        return;
    }

    if (daysLeft === 1) {
        refs.countdownText.textContent = `1 day until our special date: ${formattedTarget}`;
        return;
    }

    if (daysLeft === 0) {
        refs.countdownText.textContent = `It is our day today: ${formattedTarget} 💘`;
        return;
    }

    refs.countdownText.textContent = `Counting down for our next love day ✨`;
}

function updateLongDistancePanel() {
    if (!config.longDistance.enabled || refs.distanceSection.classList.contains("hidden")) {
        return;
    }

    updateClockForPlace(config.longDistance.from, refs.fromTime, refs.fromTimeMeta);
    updateClockForPlace(config.longDistance.to, refs.toTime, refs.toTimeMeta);
    updateNextMeetCountdown();
}

function updateClockForPlace(place, timeNode, metaNode) {
    const safePlace = isPlainObject(place) ? place : {};
    const timezone = typeof safePlace.timezone === "string" ? safePlace.timezone.trim() : "";
    const fallbackMeta = timezone || "Local time";
    const now = new Date();

    try {
        const timeFormatter = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: timezone || undefined
        });

        const metaFormatter = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            timeZone: timezone || undefined
        });

        timeNode.textContent = timeFormatter.format(now);
        metaNode.textContent = `${metaFormatter.format(now)} • ${fallbackMeta}`;
    } catch {
        timeNode.textContent = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
        });
        metaNode.textContent = fallbackMeta;
    }
}

function updateNextMeetCountdown() {
    const dateText = typeof config.longDistance.nextMeetDate === "string" ? config.longDistance.nextMeetDate.trim() : "";
    if (!dateText) {
        refs.nextMeetCountdown.textContent = config.longDistance.fallbackMessage;
        return;
    }

    const nextMeetDate = parseLocalDate(dateText);
    if (!nextMeetDate) {
        refs.nextMeetCountdown.textContent = config.longDistance.fallbackMessage;
        return;
    }

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMeet = new Date(nextMeetDate.getFullYear(), nextMeetDate.getMonth(), nextMeetDate.getDate());

    const diffMs = startOfMeet.getTime() - startOfToday.getTime();
    const daysLeft = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const label = config.longDistance.nextMeetLabel || "Until we meet again";
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(nextMeetDate);

    if (daysLeft > 1) {
        refs.nextMeetCountdown.textContent = `${label}: ${daysLeft} days (${formattedDate})`;
        return;
    }

    if (daysLeft === 1) {
        refs.nextMeetCountdown.textContent = `${label}: 1 day (${formattedDate})`;
        return;
    }

    if (daysLeft === 0) {
        refs.nextMeetCountdown.textContent = `Today is our day to meet: ${formattedDate} 💞`;
        return;
    }

    refs.nextMeetCountdown.textContent = config.longDistance.fallbackMessage;
}

function getTargetDate() {
    if (config.specialDate) {
        const date = parseLocalDate(config.specialDate);
        if (date) {
            return date;
        }
    }

    const now = new Date();
    const currentYearTarget = new Date(now.getFullYear(), 1, 14);
    if (currentYearTarget >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        return currentYearTarget;
    }

    return new Date(now.getFullYear() + 1, 1, 14);
}

function parseLocalDate(dateString) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString.trim());
    if (!match) {
        return null;
    }

    const [, yearText, monthText, dayText] = match;
    const year = Number.parseInt(yearText, 10);
    const monthIndex = Number.parseInt(monthText, 10) - 1;
    const day = Number.parseInt(dayText, 10);
    const parsed = new Date(year, monthIndex, day);

    if (
        parsed.getFullYear() !== year ||
        parsed.getMonth() !== monthIndex ||
        parsed.getDate() !== day
    ) {
        return null;
    }

    return parsed;
}

function formatLocationLabel(place) {
    const safePlace = isPlainObject(place) ? place : {};
    const emoji = typeof safePlace.emoji === "string" ? safePlace.emoji.trim() : "";
    const label = typeof safePlace.label === "string" ? safePlace.label.trim() : "";
    const merged = [emoji, label].filter(Boolean).join(" ");
    return merged || "Our city";
}

function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        config.valentineName = DEFAULT_CONFIG.valentineName;
        warnings.push("Missing valentineName; fallback applied.");
    }

    validateColorConfig(warnings);

    if (!Array.isArray(config.reasons) || config.reasons.length === 0) {
        config.reasons = DEFAULT_CONFIG.reasons;
        warnings.push("Missing reasons; fallback applied.");
    }

    if (!Array.isArray(config.memories) || config.memories.length === 0) {
        config.memories = DEFAULT_CONFIG.memories;
        warnings.push("Missing memories; fallback applied.");
    }

    if (!Array.isArray(config.datePlan) || config.datePlan.length === 0) {
        config.datePlan = DEFAULT_CONFIG.datePlan;
        warnings.push("Missing datePlan; fallback applied.");
    }

    if (!Array.isArray(config.loveLetter.paragraphs) || config.loveLetter.paragraphs.length === 0) {
        config.loveLetter.paragraphs = DEFAULT_CONFIG.loveLetter.paragraphs;
        warnings.push("Missing loveLetter paragraphs; fallback applied.");
    }

    if (!isPlainObject(config.longDistance)) {
        config.longDistance = DEFAULT_CONFIG.longDistance;
        warnings.push("Missing longDistance settings; fallback applied.");
    } else {
        if (!isPlainObject(config.longDistance.from)) {
            config.longDistance.from = DEFAULT_CONFIG.longDistance.from;
            warnings.push("Missing longDistance.from; fallback applied.");
        }

        if (!isPlainObject(config.longDistance.to)) {
            config.longDistance.to = DEFAULT_CONFIG.longDistance.to;
            warnings.push("Missing longDistance.to; fallback applied.");
        }
    }

    if (warnings.length > 0) {
        console.warn("Configuration warnings:");
        warnings.forEach((warning) => console.warn(`- ${warning}`));
    }
}

function validateColorConfig(warnings) {
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex);

    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            config.colors[key] = DEFAULT_CONFIG.colors[key];
            warnings.push(`Invalid color in colors.${key}; fallback applied.`);
        }
    });
}

function mergeDeep(base, override) {
    if (typeof base !== "object" || base === null) {
        return override;
    }

    if (Array.isArray(base)) {
        return Array.isArray(override) ? override : base;
    }

    const output = { ...base };

    Object.keys(override || {}).forEach((key) => {
        const baseValue = base[key];
        const overrideValue = override[key];

        if (Array.isArray(baseValue)) {
            output[key] = Array.isArray(overrideValue) ? overrideValue : baseValue;
            return;
        }

        if (isPlainObject(baseValue)) {
            output[key] = mergeDeep(baseValue, isPlainObject(overrideValue) ? overrideValue : {});
            return;
        }

        output[key] = overrideValue;
    });

    return output;
}

function isPlainObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
