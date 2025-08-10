const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `
╭───〔 *🤖 ${config.BOT_NAME} STATUS* 〕───◉
│✨ *Bot is Active & Online!*
│
│🧠 *Owner:* ${config.OWNER_NAME}
│⚡ *Version:* 4.0.0
│📝 *Prefix:* [${config.PREFIX}]
│📳 *Mode:* [${config.MODE}]
│💾 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
│🖥️ *Host:* ${os.hostname()}
│⌛ *Uptime:* ${runtime(process.uptime())}
╰────────────────────◉
> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363296818107681@newsletter',
                    newsletterName: '👾BILAL ᎷᎠ👾',
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "Meta AI",
                    body: "Artificial Intelligence Assistant",
                    thumbnailUrl: "https://i.ibb.co/0jzR6wQ/meta-ai.jpg", // Meta AI logo or image
                    sourceUrl: "https://www.meta.ai", // Optional link
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                ...(from ? { remoteJid: from } : {})
            },
            message: {
                contactMessage: {
                    displayName: "Meta AI",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Meta AI\nORG:Meta Platforms, Inc.\nTEL;type=CELL;type=VOICE;waid=0:+0\nEND:VCARD`
                }
            }
        }});

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
