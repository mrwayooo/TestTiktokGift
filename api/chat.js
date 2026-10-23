const { WebcastPushConnection } = require('tiktok-live-connector');

// Gift Mapping ของคุณ
const GIFT_TO_ABILITY = {
  'Rose': 'Tung LV.1',
  'Finger Heart': 'Tung LV.2',
  'Rosa': 'Tung LV.3',
  'GG': 'Ghost LV.1',
  'Gala GG': 'Ghost LV.1',
  'Good Game': 'Ghost LV.1',
  'Tiny Diny': 'Ghost LV.2',
  'Dinosaur': 'Ghost LV.2',
  'Perfume': 'Ghost LV.3',
  'Perfume Box': 'Ghost LV.3',
  'Doughnut': 'Meteor',
  'Donut': 'Meteor',
  'Cap': 'No Jar',
  'Cowboy Hat': 'No Jar',
  'Confetti': 'Reset',
  'Party Popper': 'Reset',
  'Music Note': 'Totem Attack',
  'Raving Snail': 'Web',
  'Paper Crane': 'Spawn Jar',
  'Baby Hippo': 'Shield',
  'Moo Deng': 'Shield',
  'Hand Heart': 'Attack +1 Win',
  'Racing Car': 'Speed',
};

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // ถ้ามีการขอรายชื่อ Gift สำหรับทำ Test / Dropdown
    if (req.url.includes('/gifts')) {
        return res.status(200).json({
            success: true,
            gifts: GIFT_TO_ABILITY
        });
    }

    const { uniqueId } = req.query;

    if (!uniqueId) {
        return res.status(400).json({ success: false, error: 'กรุณาระบุ TikTok Username' });
    }

    try {
        const tiktokLiveConnection = new WebcastPushConnection(uniqueId);
        const state = await tiktokLiveConnection.connect();

        return res.status(200).json({
            success: true,
            roomId: state.roomId,
            uniqueId: uniqueId,
            message: `เชื่อมต่อกับห้องไลฟ์สำเร็จ!`
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message || 'ไม่พบไลฟ์สด หรือบัญชีนี้ไม่ได้กำลังไลฟ์อยู่'
        });
    }
};