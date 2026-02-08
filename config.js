// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Basic setup
    valentineName: "Mansavi",
    pageTitle: "Will You Be My Valentine? 💝",
    introLine: "Cutuuu bchuu, your baby Madhur is always with you, from Abu Dhabi to Punjab.",

    // Optional: set a fixed special date in YYYY-MM-DD format.
    // If blank, it automatically targets the next Feb 14.
    specialDate: "2026-02-14",

    // Long-distance love section
    longDistance: {
        enabled: true,
        tagline: "Two cities. One heartbeat.",
        line: "Cutuuu Patuttuuuu, I am there with youu naaaa 💞",
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
        // You said next meet is in 2 months, so this is set to April 8, 2026.
        nextMeetDate: "2026-04-08",
        nextMeetLabel: "Until I see you in person",
        fallbackMessage: "Until we meet, every call, message, and prayer keeps us close."
    },

    // Floating emojis in the background
    floatingEmojis: {
        hearts: ["❤️", "💖", "💝", "💗", "💓"],
        bears: ["🧸", "🐻"]
    },

    // Questions shown in sequence
    questions: {
        first: {
            text: "Cutuuu, do you love your baby Madhur? 💗",
            yesBtn: "Yes 😌",
            noBtn: "No 🙈",
            secretAnswer: "I don't like you, I love you! ❤️"
        },
        second: {
            text: "How much do you love me?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            // {year} is replaced automatically
            text: "Will you be my Valentine on February 14th, {year}? 🌹",
            yesBtn: "Yes, of course! 💞",
            noBtn: "No"
        }
    },

    // Love meter behavior
    loveMeter: {
        min: 0,
        max: 10000,
        initial: 100
    },

    // Messages based on love meter values
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",
        high: "To infinity and beyond! 🚀💝",
        normal: "And beyond! 🥰"
    },

    // Final celebration content
    celebration: {
        title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
        message: "My Cutuuu said yes! Now your baby Madhur owes you the biggest hug and sweetest kiss.",
        emojis: "🎁💖🤗💝💋❤️💕",
        surpriseButton: "One More Surprise ✨",
        surpriseMessage: "You call me baby, Madhur, jaanuu... and every single time my heart melts."
    },

    // Love letter section shown after she says yes
    loveLetter: {
        greeting: "My Cutuuu bchuu,",
        paragraphs: [
            "You are very, very cute and I never get tired of looking at you or thinking about you.",
            "I admire how kind you are to everyone and especially to me. Your heart is one of my favorite things about you.",
            "I love how understanding you are and how excited you get to talk to me. I always want those conversations to continue forever.",
            "You are my biggest fan and I feel your happiness every time I do something good. That support means everything to me."
        ],
        signature: "Forever your baby, Madhur 💌"
    },

    // Quick reasons list
    reasons: [
        "You are very very cute, and your smile instantly fixes my mood.",
        "You are so kind to others and to me, and I deeply admire that quality in you.",
        "You are very understanding, and that makes me feel safe with you.",
        "You are always so excited to talk to me and never get tired of our conversations.",
        "You are my biggest fan, and your happiness when I do well gives me so much strength."
    ],

    // Memory cards
    memories: [
        {
            emoji: "🏔️",
            title: "Our first meeting in Kasauli",
            date: "The trip with Shubi",
            description: "I still remember how exciting and scary it felt before meeting you for the first time, wondering how everything would go. But that night changed everything for me - full of masti, real conversations, and the moment you wiped the sweat from my forehead with so much love. That moment melted me."
        },
        {
            emoji: "📞",
            title: "Our lovely late-night calls",
            date: "After work, almost every night",
            description: "After we both finish work, I mostly just listen to my madam tell me everything about her day. Hearing your sweet voice makes me feel so relaxed and comfortable, Cutuuu. And sleeping on call together every night is what makes this long distance feel easy for us."
        },
        {
            emoji: "🏙️",
            title: "When you came to Bangalore",
            date: "The visit that made everything stronger",
            description: "We were both tensed about how it would go, but it turned out to be one of the best times of my life. Living with you was amazing, and the way you kept my room clean and fresh made me love it even more. From pampering you, cooking dates, meeting friends, movie nights, shopping, office visits, and park walks - you made my life so so gooddd."
        }
    ],

    // Date plan shown after celebration
    datePlan: [
        "A video-call dinner date for now, with your favorite songs playing",
        "A shared movie night while we text through every scene",
        "A handwritten letter + surprise gift sent with love",
        "A countdown to the day I can finally hold you again",
        "When we meet: flowers, a long hug, and endless kisses"
    ],

    // Optional gallery section (set enabled: true and add image URLs)
    gallery: {
        enabled: true,
        images: [
            {
                url: "assets/photos/our-favorite-photo.jpg",
                alt: "Our favorite photo together",
                caption: "My favorite us moment 💖"
            }
        ]
    },

    // Color theme
    colors: {
        backgroundStart: "#f9a8b5",
        backgroundEnd: "#ffd8b1",
        buttonBackground: "#d64062",
        buttonHover: "#ea6a87",
        textColor: "#922640"
    },

    // Animation tuning
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },

    // Background music
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        nextText: "⏭ Next Song",
        nowPlayingPrefix: "🎶 Now Playing",
        showNowPlaying: true,
        shuffle: false,
        // Popular romantic Bollywood picks (selected by long-run popularity).
        // Paste direct MP3 links (Cloudinary/CDN) for each track URL below.
        // If left empty, musicUrl above is used as fallback.
        playlist: [
            // { title: "Tum Hi Ho (Aashiqui 2)", url: "https://res.cloudinary.com/your-cloud/video/upload/v123/tum-hi-ho.mp3" },
            // { title: "Raataan Lambiyan (Shershaah)", url: "https://res.cloudinary.com/your-cloud/video/upload/v123/raataan-lambiyan.mp3" },
            // { title: "Agar Tum Saath Ho (Tamasha)", url: "https://res.cloudinary.com/your-cloud/video/upload/v123/agar-tum-saath-ho.mp3" },
            // { title: "Kesariya (Brahmastra)", url: "https://res.cloudinary.com/your-cloud/video/upload/v123/kesariya.mp3" },
            // { title: "Tera Ban Jaunga (Kabir Singh)", url: "https://res.cloudinary.com/your-cloud/video/upload/v123/tera-ban-jaunga.mp3" }
        ],
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;
