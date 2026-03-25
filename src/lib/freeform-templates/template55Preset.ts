// Template 55: "Thiệp Cưới 55 - Classic Green"
// Phân tích từ: https://cinelove.me/template/pc/thiep-cuoi-55
// Phong cách: Minimalist, Wedding Classic - nền kem nhạt, xanh rừng đậm
// Tông màu: #FDFBF7 (nền) | #2D4A3E (xanh rừng) | #D4AF37 (vàng gold) | #8B9B8B (xanh nhạt)

export const template55Preset = {
    globalStyles: {
        backgroundColor: '#FDFBF7',
        fontFamily: 'Playfair Display',
        canvasHeight: 8500,
        isAutoHeight: true,
    },
    blocks: [

        // ========================================================
        // SECTION 1: HERO - Floral + Title (y: 0 ~ 500)
        // ========================================================
        {
            id: "t55-floral-left",
            type: "image",
            x: -60, y: -20, width: 240, height: 320,
            content: { url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&auto=format&fit=crop&q=80", objectFit: "contain" },
            styles: { opacity: 0.55, rotate: -20 },
            effects: { entry: "fade", duration: 2, delay: 0 }
        },
        {
            id: "t55-floral-right",
            type: "image",
            x: 195, y: -10, width: 240, height: 320,
            content: { url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&auto=format&fit=crop&q=80", objectFit: "contain" },
            styles: { opacity: 0.55, rotate: 160 },
            effects: { entry: "fade", duration: 2, delay: 0.3 }
        },
        {
            id: "t55-hero-label",
            type: "text",
            x: 37.5, y: 130, width: 300, height: 30,
            content: { text: "~ Thiệp Mời Dự Tiệc Cưới ~" },
            styles: { fontFamily: "Dancing Script", fontSize: 14, color: "#8B9B8B", textAlign: "center", letterSpacing: 1 },
            effects: { entry: "fade", duration: 1, delay: 0.5 }
        },
        {
            id: "t55-hero-event",
            type: "text",
            x: 37.5, y: 165, width: 300, height: 50,
            content: { text: "Lễ Vu Quy" },
            styles: { fontFamily: "Playfair Display", fontSize: 34, color: "#2D4A3E", textAlign: "center", fontWeight: "bold" },
            effects: { entry: "slideUp", duration: 1, delay: 0.3 }
        },
        {
            id: "t55-hero-names",
            type: "text",
            x: 37.5, y: 218, width: 300, height: 60,
            content: { text: "Minh Quân & Ánh Dương" },
            styles: { fontFamily: "Dancing Script", fontSize: 34, color: "#2D4A3E", textAlign: "center" },
            effects: { entry: "slideUp", duration: 1, delay: 0.5 }
        },
        {
            id: "t55-hero-date-line",
            type: "text",
            x: 112.5, y: 278, width: 150, height: 3,
            content: { text: "——————" },
            styles: { color: "#2D4A3E", textAlign: "center", opacity: 0.3, fontSize: 12 }
        },
        {
            id: "t55-hero-date",
            type: "text",
            x: 37.5, y: 285, width: 300, height: 30,
            content: { text: "THỨ BẢY  ✦  28 THÁNG 02 NĂM 2026  ✦  12:00" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#2D4A3E", textAlign: "center", letterSpacing: 2, fontWeight: "bold" },
            effects: { entry: "fade", duration: 1, delay: 0.7 }
        },

        // ========================================================
        // SECTION 2: INVITATION CARD / ENVELOPE (y: 370 ~ 850)
        // ========================================================
        {
            id: "t55-invite-card-bg",
            type: "text",
            x: 25, y: 370, width: 325, height: 420,
            content: { text: "" },
            styles: { backgroundColor: "#ffffff", borderRadius: 20, shadowBlur: 40, shadowColor: "rgba(45,74,62,0.08)", shadowY: 15 }
        },
        {
            id: "t55-invite-couple-photo",
            type: "image",
            x: 37.5, y: 390, width: 150, height: 200,
            content: { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop", objectFit: "cover" },
            styles: { borderRadius: 12 },
            effects: { entry: "zoomIn", duration: 1.2 }
        },
        {
            id: "t55-invite-calendar-card",
            type: "text",
            x: 200, y: 390, width: 138, height: 200,
            content: { text: "" },
            styles: { backgroundColor: "#2D4A3E", borderRadius: 12 }
        },
        {
            id: "t55-invite-cal-month",
            type: "text",
            x: 205, y: 403, width: 128, height: 18,
            content: { text: "THÁNG 02 / 2026" },
            styles: { fontFamily: "Inter", fontSize: 7, color: "#ffffff", textAlign: "center", fontWeight: "bold", letterSpacing: 1 }
        },
        {
            id: "t55-invite-cal-title",
            type: "text",
            x: 205, y: 422, width: 128, height: 28,
            content: { text: "Lễ Vu Quy" },
            styles: { fontFamily: "Dancing Script", fontSize: 17, color: "#D4AF37", textAlign: "center" }
        },
        {
            id: "t55-invite-cal-names",
            type: "text",
            x: 205, y: 450, width: 128, height: 20,
            content: { text: "Minh Quân – Ánh Dương" },
            styles: { fontFamily: "Inter", fontSize: 7, color: "rgba(255,255,255,0.8)", textAlign: "center" }
        },
        {
            id: "t55-invite-cal-day",
            type: "text",
            x: 222, y: 478, width: 98, height: 70,
            content: { text: "28" },
            styles: { fontFamily: "Playfair Display", fontSize: 52, color: "#D4AF37", textAlign: "center", fontWeight: "bold", lineHeight: 1 }
        },
        {
            id: "t55-invite-cal-thu",
            type: "text",
            x: 205, y: 556, width: 128, height: 20,
            content: { text: "THỨ BẢY" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "rgba(255,255,255,0.8)", textAlign: "center", letterSpacing: 2 }
        },
        {
            id: "t55-invite-greeting",
            type: "text",
            x: 37.5, y: 605, width: 325, height: 24,
            content: { text: "Trân trọng kính mời" },
            styles: { fontFamily: "Dancing Script", fontSize: 18, color: "#2D4A3E", textAlign: "center" }
        },
        {
            id: "t55-invite-guest-label",
            type: "text",
            x: 37.5, y: 630, width: 325, height: 16,
            content: { text: "─────────────────────" },
            styles: { color: "#2D4A3E", textAlign: "center", opacity: 0.25, fontSize: 10 }
        },
        {
            id: "t55-invite-guest-name",
            type: "text",
            x: 37.5, y: 647, width: 325, height: 36,
            content: { text: "Bạn Thân" },
            styles: { fontFamily: "Dancing Script", fontSize: 26, color: "#2D4A3E", textAlign: "center" }
        },
        {
            id: "t55-invite-body",
            type: "text",
            x: 50, y: 688, width: 275, height: 80,
            content: { text: "Chúng tôi trân trọng kính mời bạn đến tham dự lễ cưới của chúng tôi.\n\nSự hiện diện của bạn là niềm vinh hạnh lớn nhất cho gia đình chúng tôi." },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#666", textAlign: "center", lineHeight: 1.7, fontStyle: "italic" }
        },

        // ========================================================
        // SECTION 3: FAMILY DETAILS (y: 830 ~ 1100)
        // ========================================================
        {
            id: "t55-family-bg",
            type: "text",
            x: 25, y: 830, width: 325, height: 250,
            content: { text: "" },
            styles: { backgroundColor: "#f5f2ec", borderRadius: 20 }
        },
        {
            id: "t55-family-header",
            type: "text",
            x: 37.5, y: 855, width: 300, height: 28,
            content: { text: "Hôn Lễ Của Chúng Tôi" },
            styles: { fontFamily: "Playfair Display", fontSize: 15, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", letterSpacing: 1 }
        },
        {
            id: "t55-family-divider",
            type: "text",
            x: 112.5, y: 883, width: 150, height: 14,
            content: { text: "✦" },
            styles: { color: "#D4AF37", textAlign: "center", fontSize: 12 }
        },
        {
            id: "t55-family-bride-label",
            type: "text",
            x: 37.5, y: 905, width: 135, height: 18,
            content: { text: "NHÀ GÁI" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", letterSpacing: 2 }
        },
        {
            id: "t55-family-groom-label",
            type: "text",
            x: 202, y: 905, width: 135, height: 18,
            content: { text: "NHÀ TRAI" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", letterSpacing: 2 }
        },
        {
            id: "t55-family-center-divider",
            type: "text",
            x: 175, y: 900, width: 25, height: 120,
            content: { text: "" },
            styles: { borderWidth: 0, borderColor: "#2D4A3E", opacity: 0.15 }
        },
        {
            id: "t55-family-bride-info",
            type: "text",
            x: 37.5, y: 928, width: 135, height: 100,
            content: { text: "Ông: Lê Văn A\nBà: Nguyễn Thị B\n\nCùng gia đình\ntrân trọng kính mời" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#555", textAlign: "center", lineHeight: 1.9 }
        },
        {
            id: "t55-family-groom-info",
            type: "text",
            x: 202, y: 928, width: 135, height: 100,
            content: { text: "Ông: Nguyễn Văn C\nBà: Trần Thị D\n\nCùng gia đình\ntrân trọng kính mời" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#555", textAlign: "center", lineHeight: 1.9 }
        },

        // ========================================================
        // SECTION 4: CALENDAR + EVENT 1 (y: 1120 ~ 1750)
        // ========================================================
        {
            id: "t55-event1-bg",
            type: "text",
            x: 25, y: 1120, width: 325, height: 540,
            content: { text: "" },
            styles: { backgroundColor: "#ffffff", borderRadius: 25, shadowBlur: 20, shadowColor: "rgba(0,0,0,0.05)", shadowY: 8 }
        },
        {
            id: "t55-event1-eyebrow",
            type: "text",
            x: 37.5, y: 1145, width: 300, height: 20,
            content: { text: "SỰ KIỆN 1" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#8B9B8B", textAlign: "center", letterSpacing: 3, fontWeight: "bold" }
        },
        {
            id: "t55-event1-title",
            type: "text",
            x: 37.5, y: 1167, width: 300, height: 32,
            content: { text: "Tham dự tiệc mừng" },
            styles: { fontFamily: "Playfair Display", fontSize: 20, color: "#2D4A3E", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "t55-event1-name",
            type: "text",
            x: 37.5, y: 1200, width: 300, height: 30,
            content: { text: "Lễ Vu Quy" },
            styles: { fontFamily: "Dancing Script", fontSize: 22, color: "#D4AF37", textAlign: "center" }
        },
        {
            id: "t55-calendar-widget",
            type: "calendar",
            x: 50, y: 1240, width: 275, height: 260,
            content: {
                date: "2026-02-28",
                showLunar: true,
                style: "classic",
                colors: { highlight: "#2D4A3E", text: "#2D4A3E", bg: "#ffffff" }
            },
            effects: { entry: "zoomIn", duration: 1 }
        },
        {
            id: "t55-event1-time-box",
            type: "text",
            x: 50, y: 1515, width: 275, height: 60,
            content: { text: "" },
            styles: { backgroundColor: "#f5f2ec", borderRadius: 12 }
        },
        {
            id: "t55-event1-clock",
            type: "text",
            x: 50, y: 1522, width: 130, height: 30,
            content: { text: "⏰  12:00 PM" },
            styles: { fontFamily: "Inter", fontSize: 11, color: "#2D4A3E", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "t55-event1-day",
            type: "text",
            x: 185, y: 1522, width: 140, height: 30,
            content: { text: "Thứ Bảy, 28/02/2026" },
            styles: { fontFamily: "Inter", fontSize: 9.5, color: "#555", textAlign: "center" }
        },
        {
            id: "t55-event1-lunar",
            type: "text",
            x: 50, y: 1555, width: 275, height: 16,
            content: { text: "Tức ngày 01 tháng 02 năm Bính Ngọ (Âm lịch)" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#8B9B8B", textAlign: "center", fontStyle: "italic" }
        },
        {
            id: "t55-event1-venue-icon",
            type: "text",
            x: 37.5, y: 1588, width: 300, height: 22,
            content: { text: "📍  TẠI TƯ GIA NHÀ GÁI" },
            styles: { fontFamily: "Inter", fontSize: 10, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", letterSpacing: 1 }
        },
        {
            id: "t55-event1-address",
            type: "text",
            x: 50, y: 1612, width: 275, height: 18,
            content: { text: "Mai Dịch, Cầu Giấy, Hà Nội" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#666", textAlign: "center" }
        },
        {
            id: "t55-event1-map-btn",
            type: "text",
            x: 100, y: 1638, width: 175, height: 30,
            content: { text: "🗺  Xem chỉ đường" },
            styles: { backgroundColor: "#2D4A3E", color: "#ffffff", borderRadius: 20, fontSize: 9, fontFamily: "Inter", textAlign: "center", fontWeight: "bold" },
            interaction: { type: "link", url: "https://maps.google.com/?q=Mai+Dich+Cau+Giay+Ha+Noi", target: "_blank" }
        },

        // ========================================================
        // SECTION 5: COUNTDOWN (y: 1750 ~ 1980)
        // ========================================================
        {
            id: "t55-countdown-section-bg",
            type: "text",
            x: 0, y: 1750, width: 375, height: 220,
            content: { text: "" },
            styles: { backgroundColor: "#2D4A3E" }
        },
        {
            id: "t55-countdown-label",
            type: "text",
            x: 37.5, y: 1775, width: 300, height: 28,
            content: { text: "Đếm ngược đến ngày vui" },
            styles: { fontFamily: "Dancing Script", fontSize: 20, color: "rgba(255,255,255,0.75)", textAlign: "center" }
        },
        {
            id: "t55-countdown-header",
            type: "text",
            x: 37.5, y: 1804, width: 300, height: 32,
            content: { text: "Chỉ Còn..." },
            styles: { fontFamily: "Playfair Display", fontSize: 22, color: "#D4AF37", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "t55-countdown-widget",
            type: "countdown",
            x: 37.5, y: 1843, width: 300, height: 100,
            content: {
                targetDate: "2026-02-28T12:00:00",
                labels: { d: "Ngày", h: "Giờ", m: "Phút", s: "Giây" }
            },
            styles: { color: "#2D4A3E", backgroundColor: "#FDFBF7", borderRadius: 16 }
        },

        // ========================================================
        // SECTION 6: GROOM INTRO (y: 1980 ~ 2350)
        // ========================================================
        {
            id: "t55-groom-section-header",
            type: "text",
            x: 37.5, y: 2015, width: 300, height: 24,
            content: { text: "Xin chân trọng giới thiệu!" },
            styles: { fontFamily: "Dancing Script", fontSize: 17, color: "#8B9B8B", textAlign: "center", fontStyle: "italic" }
        },
        {
            id: "t55-groom-photo",
            type: "image",
            x: 25, y: 2050, width: 158, height: 200,
            content: { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop", objectFit: "cover" },
            styles: { borderRadius: 16 },
            effects: { entry: "slideLeft", duration: 0.8 }
        },
        {
            id: "t55-groom-info-card",
            type: "text",
            x: 192, y: 2050, width: 158, height: 200,
            content: { text: "" },
            styles: { backgroundColor: "#f5f2ec", borderRadius: 16 }
        },
        {
            id: "t55-groom-role",
            type: "text",
            x: 197, y: 2065, width: 148, height: 18,
            content: { text: "CHÚ RỂ" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", letterSpacing: 2 }
        },
        {
            id: "t55-groom-name",
            type: "text",
            x: 197, y: 2085, width: 148, height: 40,
            content: { text: "Nguyễn\nMinh Quân" },
            styles: { fontFamily: "Playfair Display", fontSize: 16, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", lineHeight: 1.3 }
        },
        {
            id: "t55-groom-dob",
            type: "text",
            x: 197, y: 2133, width: 148, height: 18,
            content: { text: "D.O.B: 27.01.2000" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#666", textAlign: "center" }
        },
        {
            id: "t55-groom-from",
            type: "text",
            x: 197, y: 2152, width: 148, height: 18,
            content: { text: "From: TP. Hải Phòng" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#666", textAlign: "center" }
        },
        {
            id: "t55-groom-divider",
            type: "text",
            x: 205, y: 2175, width: 132, height: 12,
            content: { text: "─────────────" },
            styles: { color: "#2D4A3E", textAlign: "center", opacity: 0.25, fontSize: 8 }
        },
        {
            id: "t55-groom-quote",
            type: "text",
            x: 197, y: 2188, width: 148, height: 55,
            content: { text: "\"Người đàn ông độc thân lâu năm và cuối cùng cũng ký hợp đồng hôn nhân trọn đời.\"" },
            styles: { fontFamily: "Inter", fontSize: 7.5, color: "#888", textAlign: "center", lineHeight: 1.6, fontStyle: "italic" }
        },

        // ========================================================
        // SECTION 7: BRIDE INTRO (y: 2350 ~ 2720)
        // ========================================================
        {
            id: "t55-bride-section-header",
            type: "text",
            x: 37.5, y: 2370, width: 300, height: 24,
            content: { text: "Xin chân trọng giới thiệu!" },
            styles: { fontFamily: "Dancing Script", fontSize: 17, color: "#8B9B8B", textAlign: "center", fontStyle: "italic" }
        },
        {
            id: "t55-bride-info-card",
            type: "text",
            x: 25, y: 2405, width: 158, height: 200,
            content: { text: "" },
            styles: { backgroundColor: "#f5f2ec", borderRadius: 16 }
        },
        {
            id: "t55-bride-photo",
            type: "image",
            x: 192, y: 2405, width: 158, height: 200,
            content: { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop", objectFit: "cover" },
            styles: { borderRadius: 16 },
            effects: { entry: "slideRight", duration: 0.8 }
        },
        {
            id: "t55-bride-role",
            type: "text",
            x: 30, y: 2420, width: 148, height: 18,
            content: { text: "CÔ DÂU" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", letterSpacing: 2 }
        },
        {
            id: "t55-bride-name",
            type: "text",
            x: 30, y: 2440, width: 148, height: 40,
            content: { text: "Lê Thị\nÁnh Dương" },
            styles: { fontFamily: "Playfair Display", fontSize: 16, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", lineHeight: 1.3 }
        },
        {
            id: "t55-bride-dob",
            type: "text",
            x: 30, y: 2488, width: 148, height: 18,
            content: { text: "D.O.B: 15.08.2002" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#666", textAlign: "center" }
        },
        {
            id: "t55-bride-from",
            type: "text",
            x: 30, y: 2507, width: 148, height: 18,
            content: { text: "From: TP. Hà Nội" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#666", textAlign: "center" }
        },
        {
            id: "t55-bride-divider",
            type: "text",
            x: 38, y: 2530, width: 132, height: 12,
            content: { text: "─────────────" },
            styles: { color: "#2D4A3E", textAlign: "center", opacity: 0.25, fontSize: 8 }
        },
        {
            id: "t55-bride-quote",
            type: "text",
            x: 30, y: 2543, width: 148, height: 55,
            content: { text: "\"Cô gái xinh đẹp, dịu dàng và là lý do chú rể tự nguyện bỏ cuộc sống độc thân.\"" },
            styles: { fontFamily: "Inter", fontSize: 7.5, color: "#888", textAlign: "center", lineHeight: 1.6, fontStyle: "italic" }
        },

        // ========================================================
        // SECTION 8: TRANSITION TEXT (y: 2720 ~ 2870)
        // ========================================================
        {
            id: "t55-transition-bg",
            type: "text",
            x: 0, y: 2720, width: 375, height: 150,
            content: { text: "" },
            styles: { backgroundColor: "#f5f2ec" }
        },
        {
            id: "t55-transition-ornament",
            type: "text",
            x: 37.5, y: 2740, width: 300, height: 24,
            content: { text: "❧ ─────── ❧" },
            styles: { color: "#D4AF37", textAlign: "center", fontSize: 14 }
        },
        {
            id: "t55-transition-text",
            type: "text",
            x: 50, y: 2773, width: 275, height: 70,
            content: { text: "Và hôm nay chúng mình chính thức nắm tay nhau bắt đầu một hành trình mới mang tên gia đình" },
            styles: { fontFamily: "Playfair Display", fontSize: 12, color: "#2D4A3E", textAlign: "center", lineHeight: 1.7, fontStyle: "italic" }
        },
        {
            id: "t55-transition-ornament-end",
            type: "text",
            x: 37.5, y: 2848, width: 300, height: 20,
            content: { text: "❧ ─────── ❧" },
            styles: { color: "#D4AF37", textAlign: "center", fontSize: 14 }
        },

        // ========================================================
        // SECTION 9: WEDDING CEREMONY + MAP (y: 2880 ~ 3480)
        // ========================================================
        {
            id: "t55-event2-bg",
            type: "text",
            x: 25, y: 2880, width: 325, height: 560,
            content: { text: "" },
            styles: { backgroundColor: "#ffffff", borderRadius: 25, shadowBlur: 20, shadowColor: "rgba(0,0,0,0.05)", shadowY: 8 }
        },
        {
            id: "t55-event2-eyebrow",
            type: "text",
            x: 37.5, y: 2905, width: 300, height: 20,
            content: { text: "SỰ KIỆN 2" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#8B9B8B", textAlign: "center", letterSpacing: 3, fontWeight: "bold" }
        },
        {
            id: "t55-event2-title",
            type: "text",
            x: 37.5, y: 2928, width: 300, height: 45,
            content: { text: "Lễ Thành Hôn" },
            styles: { fontFamily: "Dancing Script", fontSize: 34, color: "#2D4A3E", textAlign: "center" }
        },
        {
            id: "t55-event2-sub",
            type: "text",
            x: 37.5, y: 2973, width: 300, height: 20,
            content: { text: "Được tổ chức vào" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#8B9B8B", textAlign: "center" }
        },
        {
            id: "t55-event2-time-box",
            type: "text",
            x: 50, y: 3002, width: 275, height: 70,
            content: { text: "" },
            styles: { backgroundColor: "#f5f2ec", borderRadius: 12 }
        },
        {
            id: "t55-event2-clock",
            type: "text",
            x: 50, y: 3012, width: 275, height: 28,
            content: { text: "10:45 AM" },
            styles: { fontFamily: "Playfair Display", fontSize: 24, color: "#2D4A3E", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "t55-event2-date",
            type: "text",
            x: 50, y: 3043, width: 275, height: 18,
            content: { text: "Thứ Bảy | 28 | Tháng 02 | 2026" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#555", textAlign: "center", letterSpacing: 1 }
        },
        {
            id: "t55-event2-lunar",
            type: "text",
            x: 50, y: 3063, width: 275, height: 16,
            content: { text: "Tức ngày 01 tháng 02 năm Bính Ngọ" },
            styles: { fontFamily: "Inter", fontSize: 7.5, color: "#8B9B8B", textAlign: "center", fontStyle: "italic" }
        },
        {
            id: "t55-event2-venue-label",
            type: "text",
            x: 37.5, y: 3085, width: 300, height: 22,
            content: { text: "📍  TẠI TƯ GIA NHÀ TRAI" },
            styles: { fontFamily: "Inter", fontSize: 10, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", letterSpacing: 1 }
        },
        {
            id: "t55-event2-map-widget",
            type: "map",
            x: 37.5, y: 3115, width: 300, height: 280,
            content: {
                placeName: "Nhà Trai - Tư Gia",
                address: "15 Lạch Tray, Lê Lợi, Ngô Quyền, Hải Phòng",
                mapUrl: "https://goo.gl/maps/example",
                buttonText: "Chỉ đường tới nhà trai"
            },
            styles: { borderRadius: 16, shadowBlur: 12, shadowColor: "rgba(45,74,62,0.1)" }
        },
        {
            id: "t55-event2-address",
            type: "text",
            x: 50, y: 3403, width: 275, height: 18,
            content: { text: "15 Lạch Tray, Lê Lợi, Ngô Quyền, Hải Phòng" },
            styles: { fontFamily: "Inter", fontSize: 8.5, color: "#666", textAlign: "center" }
        },

        // ========================================================
        // SECTION 10: DRESS CODE (y: 3490 ~ 3720)
        // ========================================================
        {
            id: "t55-dress-code-bg",
            type: "text",
            x: 25, y: 3490, width: 325, height: 265,
            content: { text: "" },
            styles: { backgroundColor: "#f5f2ec", borderRadius: 25 }
        },
        {
            id: "t55-dress-title",
            type: "text",
            x: 37.5, y: 3510, width: 300, height: 38,
            content: { text: "Dress Code" },
            styles: { fontFamily: "Dancing Script", fontSize: 28, color: "#2D4A3E", textAlign: "center" }
        },
        {
            id: "t55-dress-desc",
            type: "text",
            x: 50, y: 3551, width: 275, height: 55,
            content: { text: "Để những bức ảnh kỷ niệm thêm phần hài hòa, trân trọng kính mời các vị khách quý lựa chọn trang phục theo tông màu sau" },
            styles: { fontFamily: "Inter", fontSize: 8.5, color: "#666", textAlign: "center", lineHeight: 1.6 }
        },
        {
            id: "t55-dress-swatches-row",
            type: "text",
            x: 37.5, y: 3615, width: 300, height: 60,
            content: { text: "" },
            styles: {}
        },
        { id: "t55-swatch-1", type: "text", x: 73, y: 3620, width: 44, height: 44, content: { text: "" }, styles: { backgroundColor: "#ffffff", borderRadius: 100, borderWidth: 1.5, borderColor: "#ddd" } },
        { id: "t55-swatch-1-label", type: "text", x: 60, y: 3668, width: 70, height: 16, content: { text: "Trắng" }, styles: { fontFamily: "Inter", fontSize: 7.5, color: "#888", textAlign: "center" } },
        { id: "t55-swatch-2", type: "text", x: 132, y: 3620, width: 44, height: 44, content: { text: "" }, styles: { backgroundColor: "#B5C0B2", borderRadius: 100 } },
        { id: "t55-swatch-2-label", type: "text", x: 119, y: 3668, width: 70, height: 16, content: { text: "Xanh Sage" }, styles: { fontFamily: "Inter", fontSize: 7.5, color: "#888", textAlign: "center" } },
        { id: "t55-swatch-3", type: "text", x: 191, y: 3620, width: 44, height: 44, content: { text: "" }, styles: { backgroundColor: "#2D4A3E", borderRadius: 100 } },
        { id: "t55-swatch-3-label", type: "text", x: 178, y: 3668, width: 70, height: 16, content: { text: "Xanh Rừng" }, styles: { fontFamily: "Inter", fontSize: 7.5, color: "#888", textAlign: "center" } },
        { id: "t55-swatch-4", type: "text", x: 250, y: 3620, width: 44, height: 44, content: { text: "" }, styles: { backgroundColor: "#1a1a1a", borderRadius: 100 } },
        { id: "t55-swatch-4-label", type: "text", x: 237, y: 3668, width: 70, height: 16, content: { text: "Đen" }, styles: { fontFamily: "Inter", fontSize: 7.5, color: "#888", textAlign: "center" } },
        {
            id: "t55-dress-note",
            type: "text",
            x: 50, y: 3695, width: 275, height: 20,
            content: { text: "Vui lòng tránh mặc trang phục màu đỏ hoặc quá sặc sỡ" },
            styles: { fontFamily: "Inter", fontSize: 8, color: "#999", textAlign: "center", fontStyle: "italic" }
        },

        // ========================================================
        // SECTION 11: RSVP / XÁC NHẬN THAM DỰ (y: 3760 ~ 4100)
        // ========================================================
        {
            id: "t55-rsvp-bg",
            type: "text",
            x: 25, y: 3760, width: 325, height: 330,
            content: { text: "" },
            styles: { backgroundColor: "#ffffff", borderRadius: 25, shadowBlur: 20, shadowColor: "rgba(0,0,0,0.05)", shadowY: 8 }
        },
        {
            id: "t55-rsvp-eyebrow",
            type: "text",
            x: 37.5, y: 3785, width: 300, height: 18,
            content: { text: "RSVP" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#8B9B8B", textAlign: "center", letterSpacing: 4, fontWeight: "bold" }
        },
        {
            id: "t55-rsvp-title",
            type: "text",
            x: 37.5, y: 3805, width: 300, height: 38,
            content: { text: "Xác nhận tham dự" },
            styles: { fontFamily: "Playfair Display", fontSize: 22, color: "#2D4A3E", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "t55-rsvp-desc",
            type: "text",
            x: 50, y: 3845, width: 275, height: 35,
            content: { text: "Để chuẩn bị chu đáo cho lễ cưới, kính nhờ bạn xác nhận tham dự trước ngày 20/02/2026" },
            styles: { fontFamily: "Inter", fontSize: 8.5, color: "#666", textAlign: "center", lineHeight: 1.6 }
        },
        {
            id: "t55-rsvp-field-1-label",
            type: "text",
            x: 50, y: 3888, width: 275, height: 18,
            content: { text: "Họ và tên" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#2D4A3E", fontWeight: "bold" }
        },
        {
            id: "t55-rsvp-field-1-input",
            type: "text",
            x: 50, y: 3906, width: 275, height: 34,
            content: { text: "" },
            styles: { borderWidth: 1, borderColor: "#dee2e6", borderRadius: 8, backgroundColor: "#f8f9fa" }
        },
        {
            id: "t55-rsvp-field-2-label",
            type: "text",
            x: 50, y: 3948, width: 275, height: 18,
            content: { text: "Bạn sẽ tham dự chứ?" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#2D4A3E", fontWeight: "bold" }
        },
        {
            id: "t55-rsvp-option-yes",
            type: "text",
            x: 50, y: 3968, width: 130, height: 30,
            content: { text: "✅  Có, tôi sẽ đến" },
            styles: { fontFamily: "Inter", fontSize: 8.5, color: "#2D4A3E", backgroundColor: "rgba(45,74,62,0.08)", borderRadius: 8, textAlign: "center" }
        },
        {
            id: "t55-rsvp-option-no",
            type: "text",
            x: 190, y: 3968, width: 135, height: 30,
            content: { text: "❌  Rất tiếc, tôi bận" },
            styles: { fontFamily: "Inter", fontSize: 8.5, color: "#888", backgroundColor: "#f5f5f5", borderRadius: 8, textAlign: "center" }
        },
        {
            id: "t55-rsvp-field-3-label",
            type: "text",
            x: 50, y: 4006, width: 275, height: 18,
            content: { text: "Số lượng người tham dự" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "#2D4A3E", fontWeight: "bold" }
        },
        {
            id: "t55-rsvp-field-3-input",
            type: "text",
            x: 50, y: 4024, width: 275, height: 34,
            content: { text: "" },
            styles: { borderWidth: 1, borderColor: "#dee2e6", borderRadius: 8, backgroundColor: "#f8f9fa" }
        },
        {
            id: "t55-rsvp-submit",
            type: "text",
            x: 50, y: 4066, width: 275, height: 38,
            content: { text: "✉️  Gửi xác nhận" },
            styles: { backgroundColor: "#2D4A3E", color: "#ffffff", borderRadius: 20, fontSize: 11, fontFamily: "Inter", textAlign: "center", fontWeight: "bold" }
        },

        // ========================================================
        // SECTION 12: GALLERY (y: 4140 ~ 5080)
        // ========================================================
        {
            id: "t55-gallery-eyebrow",
            type: "text",
            x: 37.5, y: 4160, width: 300, height: 22,
            content: { text: "ALBUM" },
            styles: { fontFamily: "Playfair Display", fontSize: 32, color: "#2D4A3E", textAlign: "center", fontWeight: "bold", letterSpacing: 4 }
        },
        {
            id: "t55-gallery-subtitle",
            type: "text",
            x: 37.5, y: 4192, width: 300, height: 22,
            content: { text: "of Love" },
            styles: { fontFamily: "Dancing Script", fontSize: 20, color: "#D4AF37", textAlign: "center" }
        },
        {
            id: "t55-gallery-divider",
            type: "text",
            x: 112.5, y: 4218, width: 150, height: 16,
            content: { text: "✦" },
            styles: { color: "#D4AF37", textAlign: "center", fontSize: 14 }
        },
        {
            id: "t55-gallery-widget",
            type: "gallery",
            x: 25, y: 4244, width: 325, height: 800,
            content: {
                images: [
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1465495910483-0d6749ee9b4a?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&auto=format&fit=crop"
                ],
                columns: 2,
                gap: 10
            },
            styles: { borderRadius: 12 }
        },

        // ========================================================
        // SECTION 13: THANK YOU + GIFT (y: 5080 ~ 5700)
        // ========================================================
        {
            id: "t55-gift-header",
            type: "text",
            x: 37.5, y: 5080, width: 300, height: 40,
            content: { text: "Gửi Lời Chúc & Quà Tặng" },
            styles: { fontFamily: "Playfair Display", fontSize: 20, color: "#2D4A3E", textAlign: "center", fontWeight: "bold" }
        },
        {
            id: "t55-gift-widget",
            type: "gift",
            x: 25, y: 5130, width: 325, height: 440,
            content: {
                title: "Dành cho Cô Dâu & Chú Rể",
                message: "Sự hiện diện của bạn là món quà lớn nhất với chúng tôi. Nếu bạn muốn gửi thêm lời chúc, chúng tôi rất trân trọng!",
                bankName: "Ngân hàng Vietcombank",
                accountNumber: "1234 5678 90",
                accountHolder: "NGUYEN MINH QUAN",
                qrUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
                buttonTitle: "Mừng cưới"
            },
            styles: { borderRadius: 25, backgroundColor: "#ffffff", shadowBlur: 15, shadowColor: "rgba(0,0,0,0.05)", borderWidth: 1, borderColor: "#e8e0d0" }
        },

        // ========================================================
        // SECTION 14: FOOTER / CLOSING (y: 5600 ~ 5850)
        // ========================================================
        {
            id: "t55-footer-bg",
            type: "text",
            x: 0, y: 5600, width: 375, height: 250,
            content: { text: "" },
            styles: { backgroundColor: "#2D4A3E" }
        },
        {
            id: "t55-footer-ornament-top",
            type: "text",
            x: 37.5, y: 5620, width: 300, height: 28,
            content: { text: "❧ ───── ❧" },
            styles: { color: "#D4AF37", textAlign: "center", fontSize: 16 }
        },
        {
            id: "t55-footer-names",
            type: "text",
            x: 37.5, y: 5650, width: 300, height: 48,
            content: { text: "Quân & Dương" },
            styles: { fontFamily: "Dancing Script", fontSize: 34, color: "#D4AF37", textAlign: "center" }
        },
        {
            id: "t55-footer-thankyou",
            type: "text",
            x: 50, y: 5700, width: 275, height: 65,
            content: { text: "Cảm ơn bạn đã đến, đã yêu thương và làm ngày hôm nay của chúng mình trọn vẹn hơn." },
            styles: { fontFamily: "Playfair Display", fontSize: 11, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 1.7, fontStyle: "italic" }
        },
        {
            id: "t55-footer-date",
            type: "text",
            x: 37.5, y: 5768, width: 300, height: 20,
            content: { text: "THỨ BẢY · 28.02.2026" },
            styles: { fontFamily: "Inter", fontSize: 9, color: "rgba(255,255,255,0.5)", textAlign: "center", letterSpacing: 3 }
        },
        {
            id: "t55-footer-floral",
            type: "image",
            x: 75, y: 5798, width: 225, height: 48,
            content: { url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&auto=format&fit=crop", objectFit: "contain" },
            styles: { opacity: 0.25, rotate: 0 }
        }
    ]
};
