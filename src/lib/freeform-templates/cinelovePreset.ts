/**
 * Cinelove Romantic Template Preset
 * 
 * Replicated from: https://cinelove.me/editor-template/6e37afe3-3ba2-42a3-8c39-350a7d492d22
 * Design style: Romantic Editorial
 * Color palette: Soft rose (#fdf5f7, #f4b8c8, #c8586c)
 * Typography: Dancing Script (cursive) + Cormorant Garamond (serif)
 * Canvas width: 375px | Canvas height: ~3200px (scrollable)
 * 
 * Asset notes:
 *  - All images are placehold.co replacements (no original Cinelove assets)
 *  - Text content uses sample data matching the reference template
 */

export interface FreeformBlock {
    id: string;
    type: 'text' | 'image' | 'calendar' | 'countdown' | 'map' | 'gift' | 'gallery';
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    content: Record<string, any>;
    styles?: Record<string, any>;
    effects?: { entry?: string; continuous?: string; speed?: number };
    interaction?: { type?: string; url?: string; target?: string };
}

export interface FreeformConfig {
    blocks: FreeformBlock[];
    globalStyles: {
        backgroundColor: string;
        fontFamily: string;
        musicUrl?: string;
    };
}

// ─────────────────────────────────────────────────────────
// SECTION LAYOUT (375px wide canvas):
//
// y=0    → SECTION 1: Hero Cover        (h≈640)
// y=660  → SECTION 2: Calendar          (h≈360)
// y=1040 → SECTION 3: Formal Invitation (h≈220)
// y=1280 → SECTION 4: Couple Info       (h≈480)
// y=1780 → SECTION 5: Event Nhà Gái    (h≈260)
// y=2060 → SECTION 6: Event Nhà Trai   (h≈260)
// y=2340 → SECTION 7: Photo Gallery     (h≈440)
// y=2800 → SECTION 8: Countdown         (h≈140)
// y=2960 → SECTION 9: Gift / Mừng Cưới (h≈200)
// y=3180 → SECTION 10: Footer / Cảm Ơn (h≈260)
// ─────────────────────────────────────────────────────────

const W = 375; // canvas width

function id(n: number): string {
    return `cinelove-block-${n}`;
}

const blocks: FreeformBlock[] = [

    // ═══════════════════════════════════════
    // SECTION 1 — HERO COVER
    // ═══════════════════════════════════════

    // Full-bleed hero background (soft rose gradient image)
    {
        id: id(1),
        type: 'image',
        x: 0, y: 0, width: W, height: 640, zIndex: 1,
        content: {
            url: 'https://placehold.co/375x640/fce4ec/c8586c?text=🌸',
            objectFit: 'cover',
            alt: 'Hero background'
        },
        styles: { opacity: 1, borderRadius: 0 },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Envelope / couple photo image — center of hero
    {
        id: id(2),
        type: 'image',
        x: 50, y: 60, width: 275, height: 340, zIndex: 3,
        content: {
            url: 'https://placehold.co/275x340/f8bbd9/c8586c?text=💑+Ảnh+đôi',
            objectFit: 'cover',
            alt: 'Couple photo in envelope'
        },
        styles: { borderRadius: 16, opacity: 1 },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // "We got married" — cursive script heading
    {
        id: id(3),
        type: 'text',
        x: 20, y: 30, width: 335, height: 55, zIndex: 5,
        content: { text: 'We got married' },
        styles: {
            fontSize: 34,
            fontFamily: 'Dancing Script',
            fontWeight: '400',
            fontStyle: 'italic',
            color: '#a0334a',
            textAlign: 'center',
            opacity: 1,
            letterSpacing: 1,
            lineHeight: 1.2,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // "Ngày Chung Đôi" — label inside envelope area
    {
        id: id(4),
        type: 'text',
        x: 80, y: 380, width: 215, height: 32, zIndex: 5,
        content: { text: 'Ngày Chung Đôi' },
        styles: {
            fontSize: 15,
            fontFamily: 'Cormorant Garamond',
            fontWeight: '600',
            color: '#7c2d3e',
            textAlign: 'center',
            letterSpacing: 2,
            opacity: 1,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Date "28.05.2026"
    {
        id: id(5),
        type: 'text',
        x: 80, y: 412, width: 215, height: 50, zIndex: 5,
        content: { text: '28.05.2026' },
        styles: {
            fontSize: 30,
            fontFamily: 'Cormorant Garamond',
            fontWeight: '700',
            color: '#9b2c3f',
            textAlign: 'center',
            letterSpacing: 3,
            opacity: 1,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Monogram / wax seal text "TM & ML"
    {
        id: id(6),
        type: 'text',
        x: 130, y: 466, width: 115, height: 30, zIndex: 5,
        content: { text: 'We\'re getting married' },
        styles: {
            fontSize: 9,
            fontFamily: 'Dancing Script',
            color: '#b05066',
            textAlign: 'center',
            opacity: 0.85,
            letterSpacing: 0.5,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Decorative floral divider (small rose emoji line)
    {
        id: id(7),
        type: 'text',
        x: 40, y: 510, width: W - 80, height: 28, zIndex: 4,
        content: { text: '— 🌸 —' },
        styles: {
            fontSize: 14,
            color: '#d4788a',
            textAlign: 'center',
            opacity: 0.9,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Couple names — large cursive
    {
        id: id(8),
        type: 'text',
        x: 10, y: 545, width: W - 20, height: 56, zIndex: 4,
        content: { text: 'Tuấn Minh  &  Mai Lan' },
        styles: {
            fontSize: 30,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#8b1a31',
            textAlign: 'center',
            letterSpacing: 1,
            lineHeight: 1.3,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Wedding date below names
    {
        id: id(9),
        type: 'text',
        x: 40, y: 602, width: W - 80, height: 26, zIndex: 4,
        content: { text: '28 . 05 . 2026' },
        styles: {
            fontSize: 14,
            fontFamily: 'Cormorant Garamond',
            fontWeight: '400',
            color: '#aa4050',
            textAlign: 'center',
            letterSpacing: 6,
            opacity: 0.9,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // ═══════════════════════════════════════
    // SECTION 2 — LỊCH CƯỚI (Calendar)
    // ═══════════════════════════════════════

    // Section background
    {
        id: id(10),
        type: 'image',
        x: 0, y: 648, width: W, height: 380, zIndex: 1,
        content: {
            url: 'https://placehold.co/375x380/fdf5f7/fce4ec?text=',
            objectFit: 'cover',
            alt: 'Calendar section bg'
        },
        styles: { opacity: 1, borderRadius: 0 },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Section title "Ngày Chung Đôi"
    {
        id: id(11),
        type: 'text',
        x: 20, y: 665, width: W - 40, height: 36, zIndex: 4,
        content: { text: 'Ngày Chung Đôi' },
        styles: {
            fontSize: 26,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#a0334a',
            textAlign: 'center',
            letterSpacing: 1,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Thin ornament line
    {
        id: id(12),
        type: 'text',
        x: 60, y: 705, width: W - 120, height: 20, zIndex: 4,
        content: { text: '— ♥ —' },
        styles: {
            fontSize: 12,
            color: '#d4788a',
            textAlign: 'center',
            opacity: 0.8,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Calendar block
    {
        id: id(13),
        type: 'calendar',
        x: 30, y: 728, width: W - 60, height: 270, zIndex: 3,
        content: {
            date: '2026-05-28',
            showLunar: false,
            style: 'classic',
            colors: {
                highlight: '#c8586c',
                text: '#4a1525',
                bg: '#ffffff'
            }
        },
        styles: {
            borderRadius: 20,
            backgroundColor: '#ffffff',
            shadowColor: 'rgba(200,88,108,0.15)',
            shadowBlur: 20,
            shadowX: 0,
            shadowY: 6,
            opacity: 1,
            padding: 12,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // ═══════════════════════════════════════
    // SECTION 3 — FORMAL INVITATION TEXT
    // ═══════════════════════════════════════

    // Pink divider strip
    {
        id: id(14),
        type: 'text',
        x: 0, y: 1010, width: W, height: 4, zIndex: 2,
        content: { text: '' },
        styles: {
            backgroundColor: '#f4b8c8',
            opacity: 0.5,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // "TRÂN TRỌNG KÍNH MỜI" — serif centered
    {
        id: id(15),
        type: 'text',
        x: 20, y: 1030, width: W - 40, height: 40, zIndex: 3,
        content: { text: 'TRÂN TRỌNG KÍNH MỜI' },
        styles: {
            fontSize: 17,
            fontFamily: 'Cormorant Garamond',
            fontWeight: '600',
            color: '#7c2d3e',
            textAlign: 'center',
            letterSpacing: 5,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // "Quý Khách"
    {
        id: id(16),
        type: 'text',
        x: 20, y: 1072, width: W - 40, height: 44, zIndex: 3,
        content: { text: 'Quý Khách' },
        styles: {
            fontSize: 34,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#9b2c3f',
            textAlign: 'center',
            letterSpacing: 1,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Invitation body text
    {
        id: id(17),
        type: 'text',
        x: 28, y: 1118, width: W - 56, height: 90, zIndex: 3,
        content: { text: 'Trân trọng kính mời quý khách đến tham dự lễ thành hôn của chúng tôi. Sự hiện diện của quý khách là niềm vinh dự và hạnh phúc lớn nhất đối với đôi uyên ương. 💕' },
        styles: {
            fontSize: 12,
            fontFamily: 'Cormorant Garamond',
            fontWeight: '400',
            color: '#6b2234',
            textAlign: 'center',
            lineHeight: 1.7,
            letterSpacing: 0.3,
            opacity: 0.88,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // ═══════════════════════════════════════
    // SECTION 4 — THÔNG TIN CẶP ĐÔI
    // ═══════════════════════════════════════

    // Section bg
    {
        id: id(18),
        type: 'image',
        x: 0, y: 1220, width: W, height: 520, zIndex: 1,
        content: {
            url: 'https://placehold.co/375x520/fce4ec/f8bbd9?text=',
            objectFit: 'cover',
            alt: 'Couple section bg'
        },
        styles: { opacity: 0.6, borderRadius: 0 },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Section title "Về Chúng Tôi"
    {
        id: id(19),
        type: 'text',
        x: 20, y: 1235, width: W - 40, height: 38, zIndex: 3,
        content: { text: 'Về Chúng Tôi' },
        styles: {
            fontSize: 26,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#a0334a',
            textAlign: 'center',
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Groom photo (left)
    {
        id: id(20),
        type: 'image',
        x: 18, y: 1280, width: 160, height: 200, zIndex: 3,
        content: {
            url: 'https://placehold.co/160x200/f8bbd9/9b2c3f?text=🤵+Chú+rể',
            objectFit: 'cover',
            alt: 'Groom photo'
        },
        styles: {
            borderRadius: 100,
            borderWidth: 3,
            borderColor: '#f4b8c8',
            borderStyle: 'solid',
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Bride photo (right)
    {
        id: id(21),
        type: 'image',
        x: 197, y: 1280, width: 160, height: 200, zIndex: 3,
        content: {
            url: 'https://placehold.co/160x200/f8bbd9/9b2c3f?text=👰+Cô+dâu',
            objectFit: 'cover',
            alt: 'Bride photo'
        },
        styles: {
            borderRadius: 100,
            borderWidth: 3,
            borderColor: '#f4b8c8',
            borderStyle: 'solid',
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Groom name
    {
        id: id(22),
        type: 'text',
        x: 10, y: 1488, width: 180, height: 32, zIndex: 4,
        content: { text: 'Tuấn Minh' },
        styles: {
            fontSize: 20,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#7c2d3e',
            textAlign: 'center',
            opacity: 1,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Bride name
    {
        id: id(23),
        type: 'text',
        x: 185, y: 1488, width: 180, height: 32, zIndex: 4,
        content: { text: 'Mai Lan' },
        styles: {
            fontSize: 20,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#7c2d3e',
            textAlign: 'center',
            opacity: 1,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Groom quote
    {
        id: id(24),
        type: 'text',
        x: 10, y: 1522, width: 175, height: 56, zIndex: 4,
        content: { text: '"Anh sẽ yêu em mãi mãi, đến tận cùng của thời gian."' },
        styles: {
            fontSize: 9.5,
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            color: '#9b4050',
            textAlign: 'center',
            lineHeight: 1.6,
            opacity: 0.85,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Bride quote
    {
        id: id(25),
        type: 'text',
        x: 190, y: 1522, width: 175, height: 56, zIndex: 4,
        content: { text: '"Bên anh là nơi em muốn thuộc về mãi mãi."' },
        styles: {
            fontSize: 9.5,
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            color: '#9b4050',
            textAlign: 'center',
            lineHeight: 1.6,
            opacity: 0.85,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Heart divider between them
    {
        id: id(26),
        type: 'text',
        x: 165, y: 1360, width: 45, height: 40, zIndex: 5,
        content: { text: '💕' },
        styles: {
            fontSize: 22,
            textAlign: 'center',
            opacity: 1,
        },
        effects: { entry: 'none', continuous: 'pulse' },
    },

    // ═══════════════════════════════════════
    // SECTION 5 — ĐỊA ĐIỂM NHÀ GÁI
    // ═══════════════════════════════════════

    // Section heading
    {
        id: id(27),
        type: 'text',
        x: 20, y: 1600, width: W - 40, height: 40, zIndex: 3,
        content: { text: '— Lễ Thành Hôn —' },
        styles: {
            fontSize: 22,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#a0334a',
            textAlign: 'center',
            letterSpacing: 1,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // "Nhà Gái" label
    {
        id: id(28),
        type: 'text',
        x: 20, y: 1643, width: W - 40, height: 24, zIndex: 3,
        content: { text: 'NHÀ GÁI' },
        styles: {
            fontSize: 11,
            fontFamily: 'Cormorant Garamond',
            fontWeight: '600',
            color: '#c8586c',
            textAlign: 'center',
            letterSpacing: 6,
            opacity: 0.9,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Bride event card / map block
    {
        id: id(29),
        type: 'map',
        x: 20, y: 1670, width: W - 40, height: 180, zIndex: 3,
        content: {
            placeName: 'Sảnh tiệc Nhà Gái — Quốc Oai, Hà Nội',
            address: 'Quốc Oai, Hà Nội',
            mapUrl: 'https://maps.google.com/?q=Quoc+Oai+Ha+Noi',
            buttonText: 'Xem chỉ đường',
            time: '10:30',
            date: 'Thứ Năm, 28.05.2026',
        },
        styles: {
            borderRadius: 20,
            backgroundColor: '#fff0f4',
            borderWidth: 1,
            borderColor: '#f4b8c8',
            borderStyle: 'solid',
            shadowColor: 'rgba(200,88,108,0.12)',
            shadowBlur: 16,
            shadowX: 0,
            shadowY: 4,
            padding: 0,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Time detail for bride event
    {
        id: id(30),
        type: 'text',
        x: 20, y: 1858, width: (W - 40) / 2, height: 22, zIndex: 4,
        content: { text: '⏰ 10:30 sáng' },
        styles: {
            fontSize: 11,
            fontFamily: 'Cormorant Garamond',
            color: '#9b2c3f',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: 0.5,
            opacity: 0.9,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    {
        id: id(31),
        type: 'text',
        x: 20 + (W - 40) / 2, y: 1858, width: (W - 40) / 2, height: 22, zIndex: 4,
        content: { text: '📍 Quốc Oai, Hà Nội' },
        styles: {
            fontSize: 11,
            fontFamily: 'Cormorant Garamond',
            color: '#9b2c3f',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: 0.3,
            opacity: 0.9,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // ═══════════════════════════════════════
    // SECTION 6 — ĐỊA ĐIỂM NHÀ TRAI
    // ═══════════════════════════════════════

    // Divider
    {
        id: id(32),
        type: 'text',
        x: 60, y: 1895, width: W - 120, height: 24, zIndex: 3,
        content: { text: '· · ·' },
        styles: {
            fontSize: 18,
            color: '#d4788a',
            textAlign: 'center',
            letterSpacing: 8,
            opacity: 0.7,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // "Nhà Trai" label
    {
        id: id(33),
        type: 'text',
        x: 20, y: 1924, width: W - 40, height: 24, zIndex: 3,
        content: { text: 'NHÀ TRAI' },
        styles: {
            fontSize: 11,
            fontFamily: 'Cormorant Garamond',
            fontWeight: '600',
            color: '#c8586c',
            textAlign: 'center',
            letterSpacing: 6,
            opacity: 0.9,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Groom event map block
    {
        id: id(34),
        type: 'map',
        x: 20, y: 1952, width: W - 40, height: 180, zIndex: 3,
        content: {
            placeName: 'Sảnh tiệc Nhà Trai — Hoàng Mai, Hà Nội',
            address: 'Hoàng Mai, Hà Nội',
            mapUrl: 'https://maps.google.com/?q=Hoang+Mai+Ha+Noi',
            buttonText: 'Xem chỉ đường',
            time: '12:30',
            date: 'Thứ Năm, 28.05.2026',
        },
        styles: {
            borderRadius: 20,
            backgroundColor: '#fff0f4',
            borderWidth: 1,
            borderColor: '#f4b8c8',
            borderStyle: 'solid',
            shadowColor: 'rgba(200,88,108,0.12)',
            shadowBlur: 16,
            shadowX: 0,
            shadowY: 4,
            padding: 0,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Time detail for groom event
    {
        id: id(35),
        type: 'text',
        x: 20, y: 2140, width: (W - 40) / 2, height: 22, zIndex: 4,
        content: { text: '⏰ 12:30 trưa' },
        styles: {
            fontSize: 11,
            fontFamily: 'Cormorant Garamond',
            color: '#9b2c3f',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: 0.5,
            opacity: 0.9,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    {
        id: id(36),
        type: 'text',
        x: 20 + (W - 40) / 2, y: 2140, width: (W - 40) / 2, height: 22, zIndex: 4,
        content: { text: '📍 Hoàng Mai, Hà Nội' },
        styles: {
            fontSize: 11,
            fontFamily: 'Cormorant Garamond',
            color: '#9b2c3f',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: 0.3,
            opacity: 0.9,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // ═══════════════════════════════════════
    // SECTION 7 — ALBUM ẢNH (Gallery)
    // ═══════════════════════════════════════

    // Section bg
    {
        id: id(37),
        type: 'image',
        x: 0, y: 2175, width: W, height: 500, zIndex: 1,
        content: {
            url: 'https://placehold.co/375x500/fdf5f7/fce4ec?text=',
            objectFit: 'cover',
            alt: 'Gallery section bg'
        },
        styles: { opacity: 1, borderRadius: 0 },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Gallery section title
    {
        id: id(38),
        type: 'text',
        x: 20, y: 2188, width: W - 40, height: 40, zIndex: 3,
        content: { text: 'Khoảnh Khắc Đẹp' },
        styles: {
            fontSize: 26,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#a0334a',
            textAlign: 'center',
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Gallery block — 2-column grid
    {
        id: id(39),
        type: 'gallery',
        x: 14, y: 2235, width: W - 28, height: 420, zIndex: 3,
        content: {
            images: [
                'https://placehold.co/170x220/f8bbd9/9b2c3f?text=📸+1',
                'https://placehold.co/170x220/fce4ec/c8586c?text=📸+2',
                'https://placehold.co/170x220/f8bbd9/7c2d3e?text=📸+3',
                'https://placehold.co/170x220/fce4ec/9b2c3f?text=📸+4',
                'https://placehold.co/170x220/f8bbd9/c8586c?text=📸+5',
                'https://placehold.co/170x220/fce4ec/7c2d3e?text=📸+6',
            ],
            columns: 2,
            gap: 8
        },
        styles: {
            borderRadius: 16,
            backgroundColor: 'transparent',
            opacity: 1,
            padding: 4,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // ═══════════════════════════════════════
    // SECTION 8 — ĐẾM NGƯỢC
    // ═══════════════════════════════════════

    // Countdown title
    {
        id: id(40),
        type: 'text',
        x: 20, y: 2672, width: W - 40, height: 36, zIndex: 3,
        content: { text: 'Đếm Ngược Đến Ngày Cưới' },
        styles: {
            fontSize: 18,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#a0334a',
            textAlign: 'center',
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Countdown block
    {
        id: id(41),
        type: 'countdown',
        x: 20, y: 2712, width: W - 40, height: 130, zIndex: 3,
        content: {
            targetDate: '2026-05-28T10:30:00',
            labels: { d: 'Ngày', h: 'Giờ', m: 'Phút', s: 'Giây' }
        },
        styles: {
            borderRadius: 24,
            backgroundColor: '#c8586c',
            shadowColor: 'rgba(200,88,108,0.3)',
            shadowBlur: 24,
            shadowX: 0,
            shadowY: 8,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // ═══════════════════════════════════════
    // SECTION 9 — MỪNG CƯỚI (Gift)
    // ═══════════════════════════════════════

    // Gift section title
    {
        id: id(42),
        type: 'text',
        x: 20, y: 2858, width: W - 40, height: 40, zIndex: 3,
        content: { text: 'Gửi Quà Mừng Cưới' },
        styles: {
            fontSize: 24,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#a0334a',
            textAlign: 'center',
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Gift subtitle
    {
        id: id(43),
        type: 'text',
        x: 28, y: 2898, width: W - 56, height: 32, zIndex: 3,
        content: { text: 'Sự hiện diện của bạn là món quà lớn nhất với chúng tôi 🎁' },
        styles: {
            fontSize: 11,
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            color: '#7c2d3e',
            textAlign: 'center',
            lineHeight: 1.5,
            opacity: 0.85,
        },
        effects: { entry: 'none', continuous: 'none' },
    },

    // Gift block — Cô dâu
    {
        id: id(44),
        type: 'gift',
        x: 14, y: 2935, width: (W - 34) / 2, height: 180, zIndex: 3,
        content: {
            title: 'Cô Dâu',
            message: 'Gửi lời chúc tới Mai Lan',
            bankName: 'Vietcombank',
            accountNumber: '1234 5678 9012',
            accountHolder: 'NGUYEN THI MAI LAN',
            qrUrl: 'https://placehold.co/80x80/fce4ec/9b2c3f?text=QR',
            buttonTitle: '🎁 Mừng cưới'
        },
        styles: {
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#f4b8c8',
            borderStyle: 'solid',
            shadowColor: 'rgba(200,88,108,0.1)',
            shadowBlur: 12,
            shadowX: 0,
            shadowY: 4,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Gift block — Chú rể
    {
        id: id(45),
        type: 'gift',
        x: 14 + (W - 34) / 2 + 6, y: 2935, width: (W - 34) / 2, height: 180, zIndex: 3,
        content: {
            title: 'Chú Rể',
            message: 'Gửi lời chúc tới Tuấn Minh',
            bankName: 'Techcombank',
            accountNumber: '9876 5432 1098',
            accountHolder: 'NGUYEN TUAN MINH',
            qrUrl: 'https://placehold.co/80x80/fce4ec/9b2c3f?text=QR',
            buttonTitle: '🎁 Mừng cưới'
        },
        styles: {
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#f4b8c8',
            borderStyle: 'solid',
            shadowColor: 'rgba(200,88,108,0.1)',
            shadowBlur: 12,
            shadowX: 0,
            shadowY: 4,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // ═══════════════════════════════════════
    // SECTION 10 — FOOTER / LỜI CẢM ƠN
    // ═══════════════════════════════════════

    // Footer couple photo (fading)
    {
        id: id(46),
        type: 'image',
        x: 0, y: 3128, width: W, height: 280, zIndex: 1,
        content: {
            url: 'https://placehold.co/375x280/fce4ec/c8586c?text=💑',
            objectFit: 'cover',
            alt: 'Footer couple photo'
        },
        styles: { opacity: 0.65, borderRadius: 0 },
        effects: { entry: 'none', continuous: 'none' },
    },

    // "Lời Cảm Ơn"
    {
        id: id(47),
        type: 'text',
        x: 20, y: 3155, width: W - 40, height: 42, zIndex: 3,
        content: { text: 'Lời Cảm Ơn' },
        styles: {
            fontSize: 30,
            fontFamily: 'Dancing Script',
            fontWeight: '700',
            fontStyle: 'italic',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            letterSpacing: 1,
            opacity: 1,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Thank you message
    {
        id: id(48),
        type: 'text',
        x: 28, y: 3200, width: W - 56, height: 100, zIndex: 3,
        content: { text: 'Cảm ơn bạn đã dành thời gian quý báu để đến chung vui cùng chúng tôi trong ngày trọng đại này. Tình cảm và sự hiện diện của bạn là món quà vô giá.\n\nTrân trọng & Biết ơn,\nTuấn Minh & Mai Lan 💕' },
        styles: {
            fontSize: 11,
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.7,
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
            opacity: 0.95,
        },
        effects: { entry: 'fade', continuous: 'none' },
    },

    // Final decorative line
    {
        id: id(49),
        type: 'text',
        x: 60, y: 3308, width: W - 120, height: 30, zIndex: 3,
        content: { text: '🌸 · · · · · 🌸' },
        styles: {
            fontSize: 14,
            color: '#f4b8c8',
            textAlign: 'center',
            letterSpacing: 4,
            opacity: 0.8,
        },
        effects: { entry: 'none', continuous: 'float' },
    },
];

export const cinelovePreset: FreeformConfig = {
    blocks,
    globalStyles: {
        backgroundColor: '#fdf5f7',
        fontFamily: 'Dancing Script',
    },
};

export default cinelovePreset;
