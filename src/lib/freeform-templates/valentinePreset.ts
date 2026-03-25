// Template: "Thiệp Valentine 1 - Love Letter"
// Phân tích từ: https://cinelove.me/template/pc/thiep-valentine-1
// Phong cách: Romantic Valentine — nền hồng ivory nhạt, đỏ maroon, ảnh Polaroid, thư tình
// Màu sắc: #F2E8E4 (nền ivory hồng) | #800000 (maroon chủ đạo) | #F7ABB6 (phong bì hồng) | #FF6B8A (accent hồng)

export const valentinePreset = {
    globalStyles: {
        backgroundColor: '#F2E8E4',
        fontFamily: 'Dancing Script',
        canvasHeight: 5500,
        isAutoHeight: true,
    },
    blocks: [

        // ========================================================
        // SECTION 1: HERO — Floating Hearts & Polaroid Photos (y: 0~720)
        // ========================================================
        // Scattered hearts background
        { id: "vt-heart-1", type: "text", x: 15, y: 60, width: 30, height: 30, content: { text: "❤️" }, styles: { fontSize: 22, textAlign: "center", opacity: 0.6 }, effects: { continuous: "float", duration: 3 } },
        { id: "vt-heart-2", type: "text", x: 300, y: 30, width: 30, height: 30, content: { text: "❤️" }, styles: { fontSize: 16, textAlign: "center", opacity: 0.5 }, effects: { continuous: "float", duration: 4, delay: 0.8 } },
        { id: "vt-heart-3", type: "text", x: 50, y: 280, width: 25, height: 25, content: { text: "🤍" }, styles: { fontSize: 14, textAlign: "center", opacity: 0.4 }, effects: { continuous: "float", duration: 3.5, delay: 1.2 } },
        { id: "vt-heart-4", type: "text", x: 320, y: 200, width: 25, height: 25, content: { text: "❤️" }, styles: { fontSize: 18, textAlign: "center", opacity: 0.5 }, effects: { continuous: "float", duration: 5, delay: 0.5 } },
        { id: "vt-heart-5", type: "text", x: 20, y: 450, width: 28, height: 28, content: { text: "❤️" }, styles: { fontSize: 20, textAlign: "center", opacity: 0.4 }, effects: { continuous: "float", duration: 3.8, delay: 2 } },
        { id: "vt-heart-6", type: "text", x: 330, y: 400, width: 22, height: 22, content: { text: "🤍" }, styles: { fontSize: 12, textAlign: "center", opacity: 0.35 }, effects: { continuous: "float", duration: 4.2, delay: 1.5 } },

        // Polaroid photo 1 — larger, slightly tilted left, stacked behind
        {
            id: "vt-polaroid-1-bg",
            type: "text",
            x: 155, y: 40, width: 200, height: 255,
            content: { text: "" },
            styles: { backgroundColor: "#fff8f8", borderRadius: 4, shadowBlur: 20, shadowColor: "rgba(128,0,0,0.15)", shadowY: 8, rotate: 8 }
        },
        {
            id: "vt-polaroid-1-photo",
            type: "image",
            x: 165, y: 50, width: 180, height: 185,
            content: { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop", objectFit: "cover" },
            styles: { rotate: 8 },
            effects: { entry: "zoomIn", duration: 1.2, delay: 0.2 }
        },
        {
            id: "vt-polaroid-1-text",
            type: "text",
            x: 162, y: 240, width: 186, height: 55,
            content: { text: "Thanh Loan - Đức Anh\n14 . 02 . 2025" },
            styles: { fontFamily: "Dancing Script", fontSize: 12, color: "#800000", textAlign: "center", lineHeight: 1.6, rotate: 8 }
        },

        // Polaroid photo 2 — in front, slightly tilted right
        {
            id: "vt-polaroid-2-bg",
            type: "text",
            x: 60, y: 100, width: 200, height: 260,
            content: { text: "" },
            styles: { backgroundColor: "#ffffff", borderRadius: 4, shadowBlur: 25, shadowColor: "rgba(128,0,0,0.2)", shadowY: 10, rotate: -5 }
        },
        {
            id: "vt-polaroid-2-photo",
            type: "image",
            x: 70, y: 112, width: 180, height: 185,
            content: { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop", objectFit: "cover" },
            styles: { rotate: -5 },
            effects: { entry: "zoomIn", duration: 1.2, delay: 0.5 }
        },
        {
            id: "vt-polaroid-2-quote",
            type: "text",
            x: 67, y: 300, width: 186, height: 55,
            content: { text: "\"If forever is a journey,\nI'd love to walk it with you\"\nThanh Loan - Đức Anh\n14 . 02 . 2026" },
            styles: { fontFamily: "Dancing Script", fontSize: 11, color: "#800000", textAlign: "center", lineHeight: 1.5, rotate: -5 }
        },

        // Music icon (decorative)
        {
            id: "vt-music-icon",
            type: "text",
            x: 310, y: 45, width: 48, height: 48,
            content: { text: "🎵" },
            styles: { fontSize: 28, textAlign: "center", backgroundColor: "rgba(247,171,182,0.3)", borderRadius: 100 },
            effects: { continuous: "pulse", duration: 2 }
        },

        // ========================================================
        // SECTION 2: COUNTDOWN (y: 400~550)
        // ========================================================
        {
            id: "vt-countdown-widget",
            type: "countdown",
            x: 37.5, y: 420, width: 300, height: 110,
            content: {
                targetDate: "2026-02-14T12:00:00",
                labels: { d: "ngày", h: "giờ", m: "phút", s: "giây" }
            },
            styles: { color: "#800000", backgroundColor: "transparent" }
        },

        // ========================================================
        // SECTION 3: LOVE LETTER / GREETING (y: 550~1150)
        // ========================================================
        // Pink envelope background
        {
            id: "vt-envelope-bg",
            type: "text",
            x: 25, y: 570, width: 200, height: 180,
            content: { text: "" },
            styles: { backgroundColor: "#F7ABB6", borderRadius: 8, shadowBlur: 15, shadowColor: "rgba(128,0,0,0.1)" }
        },
        // Envelope flap
        {
            id: "vt-envelope-flap",
            type: "text",
            x: 30, y: 575, width: 190, height: 60,
            content: { text: "𝓁" },
            styles: { fontFamily: "Dancing Script", fontSize: 48, color: "#fff", textAlign: "center", opacity: 0.7 }
        },
        // Red heart on envelope
        {
            id: "vt-envelope-heart",
            type: "text",
            x: 108, y: 680, width: 40, height: 40,
            content: { text: "❤️" },
            styles: { fontSize: 26, textAlign: "center" },
            effects: { continuous: "pulse", duration: 1.5 }
        },
        // Letter paper (overlapping envelope)
        {
            id: "vt-letter-paper",
            type: "text",
            x: 85, y: 610, width: 270, height: 80,
            content: { text: "" },
            styles: { backgroundColor: "#fff", borderRadius: 4, shadowBlur: 10, shadowColor: "rgba(0,0,0,0.08)" }
        },

        // Full letter card below
        {
            id: "vt-letter-card",
            type: "text",
            x: 25, y: 750, width: 325, height: 440,
            content: { text: "" },
            styles: { backgroundColor: "#ffffff", borderRadius: 12, shadowBlur: 15, shadowColor: "rgba(128,0,0,0.08)" }
        },
        {
            id: "vt-letter-salutation",
            type: "text",
            x: 45, y: 770, width: 285, height: 25,
            content: { text: "Gửi em," },
            styles: { fontFamily: "Dancing Script", fontSize: 16, color: "#800000", textAlign: "left" }
        },
        {
            id: "vt-letter-body",
            type: "text",
            x: 45, y: 800, width: 285, height: 320,
            content: { text: "Anh không giỏi nói những điều quá hoa mỹ, nhưng anh biết một điều rất rõ: từ khi có em, cuộc sống của anh trở nên ấm áp và dịu dàng hơn rất nhiều.\n\nCảm ơn em vì đã bước vào thế giới của anh, vì những nụ cười, những lần quan tâm nhỏ xíu nhưng khiến tim anh rung động. Ở bên em, anh thấy mình trưởng thành hơn, bình yên hơn và muốn cố gắng nhiều hơn mỗi ngày.\n\nValentine này, anh không hứa những điều quá xa xôi. Anh chỉ mong mình vẫn có thể nắm tay em như thế này, cùng nhau đi qua từng ngày bình thường nhưng đầy yêu thương.\n\nYêu em rất nhiều." },
            styles: { fontFamily: "Inter", fontSize: 10, color: "#333", textAlign: "left", lineHeight: 1.8 }
        },
        {
            id: "vt-letter-signature",
            type: "text",
            x: 45, y: 1120, width: 285, height: 45,
            content: { text: "ĐỨC ANH ❤️" },
            styles: { fontFamily: "Dancing Script", fontSize: 26, color: "#800000", textAlign: "right" }
        },
        {
            id: "vt-letter-hearts",
            type: "text",
            x: 285, y: 1150, width: 50, height: 30,
            content: { text: "🤍❤️" },
            styles: { fontSize: 16, textAlign: "right" }
        },

        // ========================================================
        // SECTION 4: DATE DETAILS + CALENDAR (y: 1230~1700)
        // ========================================================
        {
            id: "vt-date-section-bg",
            type: "text",
            x: 25, y: 1230, width: 325, height: 420,
            content: { text: "" },
            styles: { backgroundColor: "#ffffff", borderRadius: 20, shadowBlur: 15, shadowColor: "rgba(128,0,0,0.08)" }
        },
        {
            id: "vt-date-eyebrow",
            type: "text",
            x: 37.5, y: 1255, width: 300, height: 20,
            content: { text: "Ngày Trọng Đại" },
            styles: { fontFamily: "Dancing Script", fontSize: 16, color: "#F7ABB6", textAlign: "center" }
        },
        {
            id: "vt-date-main",
            type: "text",
            x: 37.5, y: 1277, width: 300, height: 42,
            content: { text: "Valentine 2026" },
            styles: { fontFamily: "Dancing Script", fontSize: 30, color: "#800000", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "vt-date-detail",
            type: "text",
            x: 37.5, y: 1320, width: 300, height: 24,
            content: { text: "14 . 02 . 2026  ·  Thứ Bảy  ·  12:00" },
            styles: { fontFamily: "Inter", fontSize: 9.5, color: "#800000", textAlign: "center", letterSpacing: 1, fontWeight: "bold" }
        },
        {
            id: "vt-date-calendar",
            type: "calendar",
            x: 50, y: 1355, width: 275, height: 255,
            content: {
                date: "2026-02-14",
                showLunar: false,
                style: "classic",
                colors: { highlight: "#800000", text: "#333", bg: "#ffffff" }
            },
            effects: { entry: "zoomIn", duration: 0.8 }
        },
        {
            id: "vt-date-ornament",
            type: "text",
            x: 37.5, y: 1622, width: 300, height: 24,
            content: { text: "~ ❤️ ~" },
            styles: { color: "#F7ABB6", textAlign: "center", fontSize: 18 }
        },

        // ========================================================
        // SECTION 5: COUPLE INTRO (y: 1720~2220)
        // ========================================================
        {
            id: "vt-couple-section-header",
            type: "text",
            x: 37.5, y: 1740, width: 300, height: 38,
            content: { text: "Chúng Mình" },
            styles: { fontFamily: "Dancing Script", fontSize: 28, color: "#800000", textAlign: "center" }
        },
        {
            id: "vt-couple-divider",
            type: "text",
            x: 112.5, y: 1778, width: 150, height: 20,
            content: { text: "———  ❤️  ———" },
            styles: { color: "#F7ABB6", textAlign: "center", fontSize: 12 }
        },

        // Guy intro card
        {
            id: "vt-guy-photo",
            type: "image",
            x: 25, y: 1808, width: 150, height: 180,
            content: { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop", objectFit: "cover" },
            styles: { borderRadius: 16, borderWidth: 3, borderColor: "#F7ABB6" },
            effects: { entry: "slideLeft", duration: 0.8 }
        },
        {
            id: "vt-guy-card",
            type: "text",
            x: 190, y: 1808, width: 160, height: 180,
            content: { text: "" },
            styles: { backgroundColor: "#fff8f8", borderRadius: 16 }
        },
        {
            id: "vt-guy-label",
            type: "text",
            x: 194, y: 1822, width: 151, height: 18,
            content: { text: "CHÀNG" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#F7ABB6", textAlign: "center", fontWeight: "bold", letterSpacing: 3 }
        },
        {
            id: "vt-guy-name",
            type: "text",
            x: 194, y: 1842, width: 151, height: 40,
            content: { text: "Đức Anh" },
            styles: { fontFamily: "Dancing Script", fontSize: 24, color: "#800000", textAlign: "center" }
        },
        {
            id: "vt-guy-dob",
            type: "text",
            x: 194, y: 1884, width: 151, height: 16,
            content: { text: "S.N: 01.01.2000" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#888", textAlign: "center" }
        },
        {
            id: "vt-guy-quote",
            type: "text",
            x: 194, y: 1904, width: 151, height: 80,
            content: { text: "\"Từ khi có em, cuộc sống của anh trở nên ấm áp và dịu dàng hơn rất nhiều.\"" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#888", textAlign: "center", lineHeight: 1.6, fontStyle: "italic" }
        },

        // Girl intro card
        {
            id: "vt-girl-card",
            type: "text",
            x: 25, y: 2010, width: 160, height: 180,
            content: { text: "" },
            styles: { backgroundColor: "#fff8f8", borderRadius: 16 }
        },
        {
            id: "vt-girl-label",
            type: "text",
            x: 29, y: 2024, width: 151, height: 18,
            content: { text: "NÀNG" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#F7ABB6", textAlign: "center", fontWeight: "bold", letterSpacing: 3 }
        },
        {
            id: "vt-girl-name",
            type: "text",
            x: 29, y: 2044, width: 151, height: 40,
            content: { text: "Thanh Loan" },
            styles: { fontFamily: "Dancing Script", fontSize: 24, color: "#800000", textAlign: "center" }
        },
        {
            id: "vt-girl-dob",
            type: "text",
            x: 29, y: 2086, width: 151, height: 16,
            content: { text: "S.N: 14.02.2002" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#888", textAlign: "center" }
        },
        {
            id: "vt-girl-quote",
            type: "text",
            x: 29, y: 2106, width: 151, height: 80,
            content: { text: "\"Được yêu thương bởi anh là điều tuyệt vời nhất trong cuộc đời em.\"" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#888", textAlign: "center", lineHeight: 1.6, fontStyle: "italic" }
        },
        {
            id: "vt-girl-photo",
            type: "image",
            x: 200, y: 2010, width: 150, height: 180,
            content: { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop", objectFit: "cover" },
            styles: { borderRadius: 16, borderWidth: 3, borderColor: "#F7ABB6" },
            effects: { entry: "slideRight", duration: 0.8 }
        },

        // ========================================================
        // SECTION 6: EVENT + MAP (y: 2250~2780)
        // ========================================================
        {
            id: "vt-event-bg",
            type: "text",
            x: 25, y: 2250, width: 325, height: 490,
            content: { text: "" },
            styles: { backgroundColor: "#ffffff", borderRadius: 20, shadowBlur: 15, shadowColor: "rgba(128,0,0,0.07)" }
        },
        {
            id: "vt-rose-decoration",
            type: "text",
            x: 37.5, y: 2270, width: 300, height: 28,
            content: { text: "🌹 ─────────── 🌹" },
            styles: { color: "#800000", textAlign: "center", fontSize: 14 }
        },
        {
            id: "vt-event-title",
            type: "text",
            x: 37.5, y: 2300, width: 300, height: 42,
            content: { text: "Tiệc Valentine" },
            styles: { fontFamily: "Dancing Script", fontSize: 30, color: "#800000", textAlign: "center" }
        },
        {
            id: "vt-event-eyebrow",
            type: "text",
            x: 37.5, y: 2342, width: 300, height: 20,
            content: { text: "Trân trọng kính mời bạn đến tham dự" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#888", textAlign: "center", fontStyle: "italic" }
        },
        {
            id: "vt-event-time-box",
            type: "text",
            x: 50, y: 2372, width: 275, height: 65,
            content: { text: "" },
            styles: { backgroundColor: "#FEF0F2", borderRadius: 12 }
        },
        {
            id: "vt-event-clock",
            type: "text",
            x: 50, y: 2382, width: 275, height: 30,
            content: { text: "12:00 PM  ·  14/02/2026  ·  Thứ Bảy" },
            styles: { fontFamily: "Inter", fontSize: 10.5, color: "#800000", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "vt-event-lunar",
            type: "text",
            x: 50, y: 2415, width: 275, height: 18,
            content: { text: "Tức ngày 27 tháng 12 năm Ất Tỵ" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#aaa", textAlign: "center", fontStyle: "italic" }
        },
        {
            id: "vt-event-venue-label",
            type: "text",
            x: 37.5, y: 2445, width: 300, height: 22,
            content: { text: "📍  Địa điểm tổ chức" },
            styles: { fontFamily: "Inter", fontSize: 10, color: "#800000", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "vt-event-map",
            type: "map",
            x: 37.5, y: 2475, width: 300, height: 250,
            content: {
                placeName: "Nhà Hàng Valentine House",
                address: "36 Hoàng Cầu, Ô Chợ Dừa, Đống Đa, Hà Nội",
                mapUrl: "https://goo.gl/maps/example",
                buttonText: "Xem đường đi"
            },
            styles: { borderRadius: 16, shadowBlur: 10, shadowColor: "rgba(128,0,0,0.1)" }
        },

        // ========================================================
        // SECTION 7: PHOTO GALLERY (y: 2820~3680)
        // ========================================================
        {
            id: "vt-gallery-eyebrow",
            type: "text",
            x: 37.5, y: 2840, width: 300, height: 32,
            content: { text: "Album Tình Yêu" },
            styles: { fontFamily: "Dancing Script", fontSize: 26, color: "#800000", textAlign: "center" }
        },
        {
            id: "vt-gallery-sub",
            type: "text",
            x: 37.5, y: 2872, width: 300, height: 22,
            content: { text: "❤️ Những khoảnh khắc đáng nhớ của chúng mình ❤️" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#F7ABB6", textAlign: "center", fontStyle: "italic" }
        },
        {
            id: "vt-gallery-widget",
            type: "gallery",
            x: 25, y: 2905, width: 325, height: 730,
            content: {
                images: [
                    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1465495910483-0d6749ee9b4a?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop"
                ],
                columns: 2,
                gap: 10
            },
            styles: { borderRadius: 12 }
        },

        // ========================================================
        // SECTION 8: GUESTBOOK / WISHES (y: 3680~4250)
        // ========================================================
        {
            id: "vt-wishes-header",
            type: "text",
            x: 37.5, y: 3700, width: 300, height: 38,
            content: { text: "Lời Chúc Yêu Thương" },
            styles: { fontFamily: "Dancing Script", fontSize: 26, color: "#800000", textAlign: "center" }
        },
        {
            id: "vt-wishes-desc",
            type: "text",
            x: 50, y: 3740, width: 275, height: 35,
            content: { text: "Những lời chúc từ bạn bè là món quà ý nghĩa nhất với chúng mình ❤️" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#888", textAlign: "center", lineHeight: 1.6 }
        },
        // Sample wish cards
        {
            id: "vt-wish-card-1",
            type: "text",
            x: 25, y: 3785, width: 325, height: 55,
            content: { text: "🌟 Hải: Chúc mừng bạn! Chúc cả hai mãi hạnh phúc bên nhau!" },
            styles: { fontFamily: "Inter", fontSize: 9.5, color: "#444", backgroundColor: "#fff8f8", borderRadius: 12, lineHeight: 1.5 }
        },
        {
            id: "vt-wish-card-2",
            type: "text",
            x: 25, y: 3850, width: 325, height: 55,
            content: { text: "✨ Huy: Hạnh phúc và thịnh vượng! Yêu bền cùng năm tháng nhé!" },
            styles: { fontFamily: "Inter", fontSize: 9.5, color: "#444", backgroundColor: "#fff8f8", borderRadius: 12, lineHeight: 1.5 }
        },
        {
            id: "vt-wish-card-3",
            type: "text",
            x: 25, y: 3915, width: 325, height: 55,
            content: { text: "💖 Thanh: Mong hai bạn luôn vui vẻ và hạnh phúc như ngày hôm nay!" },
            styles: { fontFamily: "Inter", fontSize: 9.5, color: "#444", backgroundColor: "#fff8f8", borderRadius: 12, lineHeight: 1.5 }
        },
        {
            id: "vt-wish-card-4",
            type: "text",
            x: 25, y: 3980, width: 325, height: 55,
            content: { text: "🎊 Đức: Chúc hai bạn có những khoảnh khắc tuyệt vời bên nhau!" },
            styles: { fontFamily: "Inter", fontSize: 9.5, color: "#444", backgroundColor: "#fff8f8", borderRadius: 12, lineHeight: 1.5 }
        },

        // ========================================================
        // SECTION 9: GIFT / MỪNG CÁI (y: 4080~4600)
        // ========================================================
        {
            id: "vt-gift-header",
            type: "text",
            x: 37.5, y: 4080, width: 300, height: 38,
            content: { text: "Tặng Quà Yêu Thương" },
            styles: { fontFamily: "Dancing Script", fontSize: 22, color: "#800000", textAlign: "center" }
        },
        {
            id: "vt-gift-widget",
            type: "gift",
            x: 25, y: 4128, width: 325, height: 400,
            content: {
                title: "Gửi Tình Yêu Của Bạn",
                message: "Mỗi lời chúc, mỗi món quà nhỏ đều là nguồn động lực yêu thương cho chúng mình 💕",
                bankName: "Ngân hàng Vietcombank",
                accountNumber: "1402 2026 0000",
                accountHolder: "NGUYEN DUC ANH",
                qrUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
                buttonTitle: "Gửi quà ❤️"
            },
            styles: { borderRadius: 20, backgroundColor: "#fff8f8", shadowBlur: 15, shadowColor: "rgba(128,0,0,0.08)", borderWidth: 1, borderColor: "#fce4ec" }
        },

        // ========================================================
        // SECTION 10: FOOTER / CLOSING (y: 4580~4850)
        // ========================================================
        {
            id: "vt-footer-bg",
            type: "text",
            x: 0, y: 4580, width: 375, height: 270,
            content: { text: "" },
            styles: { backgroundColor: "#800000" }
        },
        {
            id: "vt-footer-hearts-row",
            type: "text",
            x: 37.5, y: 4600, width: 300, height: 30,
            content: { text: "❤️  ❤️  ❤️  ❤️  ❤️" },
            styles: { fontSize: 16, textAlign: "center", color: "rgba(255,255,255,0.4)" }
        },
        {
            id: "vt-footer-names",
            type: "text",
            x: 37.5, y: 4635, width: 300, height: 50,
            content: { text: "Thanh Loan & Đức Anh" },
            styles: { fontFamily: "Dancing Script", fontSize: 32, color: "#F7ABB6", textAlign: "center" }
        },
        {
            id: "vt-footer-date",
            type: "text",
            x: 37.5, y: 4688, width: 300, height: 22,
            content: { text: "14 . 02 . 2026" },
            styles: { fontFamily: "Dancing Script", fontSize: 18, color: "rgba(255,255,255,0.7)", textAlign: "center" }
        },
        {
            id: "vt-footer-quote",
            type: "text",
            x: 50, y: 4715, width: 275, height: 60,
            content: { text: "\"Tình yêu không đếm bằng thời gian, mà bằng những khoảnh khắc cùng nhau.\"" },
            styles: { fontFamily: "Playfair Display", fontSize: 10, color: "rgba(255,255,255,0.65)", textAlign: "center", lineHeight: 1.7, fontStyle: "italic" }
        },
        {
            id: "vt-footer-closing-heart",
            type: "text",
            x: 155, y: 4780, width: 65, height: 45,
            content: { text: "❤️" },
            styles: { fontSize: 36, textAlign: "center" },
            effects: { continuous: "pulse", duration: 1.5 }
        }
    ]
};
