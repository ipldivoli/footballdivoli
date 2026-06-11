import { useEffect, useState } from "react";
import loginBg from "./assets/login-bg.jpg";
import logo from "./assets/logo.png";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx9pdevkHIPor2A5exr1Fafndc7d-KiSxnbhP_l2QJjs5AtCNbIZStIMpbUp9Cowd5QVQ/exec";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #08090d; --surface: #0f111a; --card: #12151f;
    --border: rgba(255,255,255,0.07);
    --gold: #f0c040; --gold2: #c89010;
    --green: #22c55e; --red: #ef4444; --blue: #3b82f6;
    --muted: #6b7280; --text: #e8eaf0; --radius: 16px;
  }
  body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; min-height: 100vh; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #222535; border-radius: 3px; }
  .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }

  /* AUTH */
  .auth-wrap { width: 100%; height: 100vh; display: grid; grid-template-columns: 30% 70%; overflow: hidden; background: var(--bg); }
  .admin-card { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: 22px; margin-bottom: 24px; }
  .prediction-list { display: flex; flex-direction: column; gap: 10px; }
  .prediction-row { padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.03); }
  .team-name { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 1000; letter-spacing: 0.4px; }
  .team-flag { width: 35px; height: 35px; min-width: 35px; min-height: 35px; object-fit: cover; border-radius: 50%; border: 1px solid rgba(255,255,255,0.18); vertical-align: middle; box-shadow: 0 2px 6px rgba(0,0,0,0.32); }
  .notice-banner { margin-bottom: 20px; padding: 16px 24px; border-radius: 14px; background: linear-gradient(135deg, rgba(240,192,64,0.15), rgba(240,192,64,0.05)); border: 1px solid rgba(240,192,64,0.3); color: #ffe08a; font-weight: 600; backdrop-filter: blur(16px); box-shadow: 0 0 24px rgba(240,192,64,0.08), inset 0 1px 0 rgba(255,255,255,0.06); letter-spacing: 0.03em; transition: opacity 0.8s ease; }
  .auth-left { height: 100vh; display: flex; align-items: center; justify-content: center; padding: 28px; overflow-y: auto; background: radial-gradient(ellipse 80% 55% at 50% -5%, rgba(240,192,64,0.13) 0%, transparent 65%), var(--bg); border-right: 1px solid var(--border); }
  .auth-right { position: relative; width: 100%; height: 100vh; overflow: hidden; background: #05070b; }
  .auth-image { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; animation: zoomBg 18s ease-in-out infinite alternate; }
  .auth-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(8,9,13,0.92) 0%, rgba(8,9,13,0.3) 35%, rgba(8,9,13,0.08) 100%); }
  .auth-right-content { position: absolute; left: 60px; bottom: 70px; z-index: 5; max-width: 520px; }
  .auth-big-title { font-family: 'Bebas Neue', sans-serif; font-size: 86px; line-height: 0.9; color: white; margin-bottom: 18px; letter-spacing: 0.03em; }
  .auth-big-title span { color: var(--gold); }
  .auth-big-sub { font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.78); }
  @keyframes zoomBg { from { transform: scale(1); } to { transform: scale(1.08); } }
  @media (max-width: 900px) { .auth-wrap { grid-template-columns: 1fr; } .auth-right { display: none; } .auth-left { width: 100%; border-right: none; } }

  .auth-card { width: 100%; max-width: 420px; background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 48px 40px; box-shadow: 0 40px 90px rgba(0,0,0,0.65); }
  .auth-logo-full {
    width: 220px;
    height: auto;
    display: block;
    margin: 0 auto 20px;
    object-fit: contain;
    background: transparent;
    border: none;
    padding: 0;
  }
  .auth-title { font-size: 44px; color: var(--gold); text-align: center; line-height: 1; }
  .auth-sub { color: var(--muted); text-align: center; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; margin: 6px 0 34px; }
  .auth-field { width: 100%; padding: 14px 18px; border-radius: 12px; background: rgba(0,0,0,0.45); border: 1px solid var(--border); color: var(--text); font-family: 'Outfit', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; margin-bottom: 12px; display: block; }
  .auth-field:focus { border-color: var(--gold); }
  .auth-field::placeholder { color: var(--muted); }
  .btn-gold { width: 100%; padding: 15px; border-radius: 12px; background: linear-gradient(135deg, var(--gold), var(--gold2)); color: #080808; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.05em; border: none; cursor: pointer; transition: opacity 0.2s, transform 0.1s; margin-top: 4px; }
  .btn-gold:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-gold:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
  .btn-link { width: 100%; background: none; border: none; color: var(--muted); font-family: 'Outfit', sans-serif; font-size: 13px; cursor: pointer; margin-top: 14px; text-align: center; transition: color 0.2s; }
  .btn-link:hover { color: var(--text); }
  .auth-msg { text-align: center; font-size: 13px; padding: 10px 14px; border-radius: 8px; margin-top: 12px; }
  .auth-msg.error { background: rgba(239,68,68,0.1); color: #fca5a5; }
  .auth-msg.success { background: rgba(34,197,94,0.1); color: #86efac; }

  .app-wrap { min-height: 100vh; background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(240,192,64,0.07) 0%, transparent 55%), var(--bg); }
  .header { position: sticky; top: 0; z-index: 50; background: rgba(8,9,13,0.88); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 0 32px; height: 66px; display: flex; align-items: center; justify-content: space-between; }
  .header-brand { display: flex; align-items: center; gap: 12px; }
  .header-badge { background: rgba(240,192,64,0.1); border: 1px solid rgba(240,192,64,0.25); color: var(--gold); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
  .header-right { display: flex; align-items: center; gap: 14px; }
  .header-user-name { font-size: 14px; font-weight: 600; text-align: right; }
  .header-user-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; text-align: right; }
  .btn-logout { padding: 8px 18px; border-radius: 10px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #fca5a5; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .btn-logout:hover { background: rgba(239,68,68,0.2); }

  .tabs { display: flex; gap: 4px; padding: 0 32px; border-bottom: 1px solid var(--border); overflow-x: auto; }
  .tab { padding: 14px 20px; background: none; border: none; border-bottom: 2px solid transparent; color: var(--muted); font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: color 0.2s, border-color 0.2s; margin-bottom: -1px; display: flex; align-items: center; gap: 7px; white-space: nowrap; }
  .tab:hover { color: var(--text); }
  .tab.active { color: var(--gold); border-bottom-color: var(--gold); }

  .lb-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
    table-layout: auto;
  }

  .lb-table th {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--muted);
    font-weight: 600;
    padding: 0 16px 8px;
    text-align: left;
  }

  .lb-table th:last-child {
    text-align: right;
  }

  .lb-row td {
    background: var(--card);
    border: 1px solid var(--border);
    padding: 14px 16px;
    font-size: 14px;
  }

  .lb-row td:first-child {
    width: 70px;
  }

  .lb-row td:last-child {
    width: 100px;
    text-align: right;
  }

  .main { max-width: 860px; margin: 0 auto; padding: 36px 24px 80px; }
  .section-label { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
  .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  .match-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 22px 26px; margin-bottom: 12px; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 20px; transition: border-color 0.2s, transform 0.15s; position: relative; overflow: hidden; }
  .match-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, var(--gold), var(--gold2)); opacity: 0; transition: opacity 0.2s; }
  .match-card:hover { border-color: rgba(240,192,64,0.22); transform: translateY(-1px); }
  .match-card:hover::before { opacity: 1; }
  .match-card.predicted { border-color: rgba(34,197,94,0.22); }
  .match-card.predicted::before { opacity: 1; background: var(--green); }

  .match-teams { font-size: 21px; font-weight: 700; display: flex; align-items: center; gap: 10px; }
  .vs-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--muted); background: rgba(255,255,255,0.05); padding: 3px 8px; border-radius: 6px; }
  .match-meta { display: flex; align-items: center; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
  .meta-pill { font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
  .meta-pill.stage { background: rgba(240,192,64,0.09); color: var(--gold); border: 1px solid rgba(240,192,64,0.18); }
  .meta-pill.time  { background: rgba(255,255,255,0.04); color: var(--muted); border: 1px solid var(--border); }
  .predicted-info { display: flex; align-items: center; gap: 8px; margin-top: 9px; flex-wrap: wrap; }
  .predicted-badge { font-size: 11px; font-weight: 600; color: var(--green); background: rgba(34,197,94,0.09); border: 1px solid rgba(34,197,94,0.2); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px; }

  .btn-predict { padding: 11px 20px; border-radius: 10px; background: linear-gradient(135deg, var(--gold), var(--gold2)); color: #080808; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; border: none; cursor: pointer; white-space: nowrap; transition: opacity 0.2s, transform 0.1s; flex-shrink: 0; }
  .btn-predict:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-predict:active { transform: translateY(0); }
  .btn-predict.done { background: rgba(34,197,94,0.12); color: var(--green); border: 1px solid rgba(34,197,94,0.25); }
  .btn-predict.done:hover { opacity: 0.88; }
  .btn-predict.locked { background: rgba(239,68,68,0.08); color: #f87171; border: 1px solid rgba(239,68,68,0.22); cursor: not-allowed; opacity: 0.7; }
  .btn-predict.locked:hover { opacity: 0.7; transform: none; }
  .countdown-pill { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px; }
  .countdown-pill.open   { background: rgba(34,197,94,0.08);  color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
  .countdown-pill.soon   { background: rgba(251,191,36,0.1);  color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
  .countdown-pill.locked { background: rgba(239,68,68,0.08);  color: #f87171; border: 1px solid rgba(239,68,68,0.2); }

  .skeleton { background: linear-gradient(90deg, var(--card) 25%, #181b26 50%, var(--card) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: var(--radius); height: 100px; margin-bottom: 12px; }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.72); backdrop-filter: blur(7px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.15s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal { width: 100%; max-width: 440px; background: var(--surface); border: 1px solid rgba(240,192,64,0.18); border-radius: 24px; padding: 34px 30px; box-shadow: 0 40px 100px rgba(0,0,0,0.7); animation: slideUp 0.2s ease; }
  @keyframes slideUp { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .modal-title { font-size: 18px; font-weight: 700; }
  .modal-close { width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: var(--muted); font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .modal-close:hover { background: rgba(255,255,255,0.1); color: var(--text); }
  .modal-stage-label { text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); margin-bottom: 22px; }
  .modal-matchup { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 26px; }
  .modal-team { flex: 1; }
  .modal-team-name { font-size: 16px; font-weight: 700; }
  .modal-score-wrap { display: flex; align-items: center; gap: 8px; }
  .score-input { width: 58px; height: 58px; border-radius: 12px; background: rgba(0,0,0,0.55); border: 2px solid var(--border); color: var(--text); font-family: 'Bebas Neue', sans-serif; font-size: 30px; text-align: center; outline: none; transition: border-color 0.2s; -moz-appearance: textfield; }
  .score-input::-webkit-inner-spin-button, .score-input::-webkit-outer-spin-button { -webkit-appearance: none; }
  .score-input:focus { border-color: var(--gold); }
  .score-colon { font-family: 'Bebas Neue', sans-serif; font-size: 34px; color: var(--muted); }
  .btn-submit { width: 100%; padding: 15px; border-radius: 12px; background: linear-gradient(135deg, var(--gold), var(--gold2)); color: #080808; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.04em; border: none; cursor: pointer; transition: opacity 0.2s; }
  .btn-submit:hover { opacity: 0.88; }
  .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
  .modal-error { color: #fca5a5; font-size: 12px; text-align: center; margin-top: 10px; }

  .btn-danger {

    background: #dc2626;

    color: white;

    border: none;

    padding: 10px 14px;

    border-radius: 10px;

    cursor: pointer;

  }

  .btn-danger:hover {

    opacity: 0.9;

  }

  .lb-podium { display: flex; justify-content: center; align-items: flex-end; gap: 12px; margin-bottom: 36px; }
  .lb-podium-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .lb-podium-block { border-radius: 12px 12px 0 0; width: 90px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 14px; padding-top: 10px; }
  .lb-podium-block.p1 { background: linear-gradient(180deg, rgba(240,192,64,0.3), rgba(240,192,64,0.08)); height: 110px; border: 1px solid rgba(240,192,64,0.3); }
  .lb-podium-block.p2 { background: linear-gradient(180deg, rgba(192,192,192,0.2), rgba(192,192,192,0.05)); height: 80px; border: 1px solid rgba(192,192,192,0.2); }
  .lb-podium-block.p3 { background: linear-gradient(180deg, rgba(180,120,60,0.2), rgba(180,120,60,0.05)); height: 60px; border: 1px solid rgba(180,120,60,0.2); }
  .lb-podium-pts { font-family: 'Bebas Neue', sans-serif; font-size: 26px; line-height: 1; }
  .lb-podium-pts.p1 { color: var(--gold); } .lb-podium-pts.p2 { color: #c0c0c0; } .lb-podium-pts.p3 { color: #b47840; }
  .lb-podium-label { font-size: 11px; font-weight: 600; text-align: center; max-width: 85px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lb-podium-rank { font-size: 18px; margin-bottom: 2px; }
  .lb-table { width: 100%; border-collapse: separate; border-spacing: 0 6px; }
  .lb-table th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); font-weight: 600; padding: 0 16px 8px; text-align: left; }
  .lb-table th:last-child { text-align: right; }
  .lb-row td { background: var(--card); border: 1px solid var(--border); padding: 14px 16px; font-size: 14px; transition: border-color 0.2s; }
  .lb-row td:first-child { border-radius: 12px 0 0 12px; border-right: none; }
  .lb-row td:last-child { border-radius: 0 12px 12px 0; border-left: none; text-align: right; }
  .lb-row td:not(:first-child):not(:last-child) { border-right: none; border-left: none; }
  .lb-row:hover td { border-color: rgba(240,192,64,0.2); }
  .lb-row.me td { border-color: rgba(240,192,64,0.3) !important; }
  .lb-rank { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--muted); width: 40px; }
  .lb-rank.top1 { color: var(--gold); } .lb-rank.top2 { color: #c0c0c0; } .lb-rank.top3 { color: #b47840; }
  .lb-name { font-weight: 600; } .lb-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .lb-pts { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--gold); }
  .lb-stat { font-size: 12px; color: var(--muted); font-weight: 500; }
  .lb-stat span { color: var(--text); font-weight: 600; }
  .lb-me-tag { font-size: 10px; font-weight: 700; background: rgba(240,192,64,0.12); color: var(--gold); padding: 2px 7px; border-radius: 20px; border: 1px solid rgba(240,192,64,0.25); margin-left: 8px; }

  .banner-card {
    margin-bottom: 20px;
    border-radius: 18px;
    overflow: hidden;
  }

  .banner-image {
    width: 100%;
    max-height: 320px;
    object-fit: cover;
    display: block;
  }

  .empty { text-align: center; padding: 80px 0; color: var(--muted); }
  .empty-icon { font-size: 46px; margin-bottom: 14px; }
  .empty-text { font-size: 14px; }
  .spinner { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.1); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.7s linear infinite; margin: 40px auto; }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 600px) {
    .header { padding: 0 16px; } .header-badge { display: none; }
    .tabs { padding: 0 16px; } .tab { padding: 12px 14px; font-size: 12px; }
    .main { padding: 22px 14px 60px; }
    .match-card { padding: 16px 14px; } .match-teams { font-size: 16px; }
    .auth-card { padding: 32px 22px; } .modal { padding: 26px 18px; }
    .lb-podium-block { width: 72px; } .lb-table th, .lb-row td { padding: 12px 10px; }
  }
`;

function injectStyles() {
  if (!document.getElementById("fifa-styles")) {
    const s = document.createElement("style");
    s.id = "fifa-styles";
    s.textContent = STYLES;
    document.head.appendChild(s);
  }
}
injectStyles();

/* ─── Helpers ──────────────────────────────────────────────────── */
function hashPassword(p) {
  return btoa(unescape(encodeURIComponent("wc2026_salt_" + p)));
}

async function api(action, body = {}, method = "POST") {
  if (method === "GET") {
    const params = new URLSearchParams({ action, ...body });
    const r = await fetch(`${APPS_SCRIPT_URL}?${params}`);
    return r.json();
  }
  const r = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...body }),
  });
  return r.json();
}

const FLAGS = {
  "Mexico": "https://flagcdn.com/mx.svg", "South Africa": "https://flagcdn.com/za.svg",
  "South Korea": "https://flagcdn.com/kr.svg", "Czechia": "https://flagcdn.com/cz.svg",
  "Canada": "https://flagcdn.com/ca.svg", "Switzerland": "https://flagcdn.com/ch.svg",
  "Qatar": "https://flagcdn.com/qa.svg", "Bosnia-Herzegovina": "https://flagcdn.com/ba.svg",
  "Brazil": "https://flagcdn.com/br.svg", "Morocco": "https://flagcdn.com/ma.svg",
  "Haiti": "https://flagcdn.com/ht.svg", "Scotland": "https://flagcdn.com/gb-sct.svg",
  "USA": "https://flagcdn.com/us.svg", "Paraguay": "https://flagcdn.com/py.svg",
  "Australia": "https://flagcdn.com/au.svg", "Turkey": "https://flagcdn.com/tr.svg",
  "Germany": "https://flagcdn.com/de.svg", "Curacao": "https://flagcdn.com/cw.svg",
  "Ivory Coast": "https://flagcdn.com/ci.svg", "Ecuador": "https://flagcdn.com/ec.svg",
  "Netherlands": "https://flagcdn.com/nl.svg", "Japan": "https://flagcdn.com/jp.svg",
  "Sweden": "https://flagcdn.com/se.svg", "Tunisia": "https://flagcdn.com/tn.svg",
  "Belgium": "https://flagcdn.com/be.svg", "Egypt": "https://flagcdn.com/eg.svg",
  "Iran": "https://flagcdn.com/ir.svg", "New Zealand": "https://flagcdn.com/nz.svg",
  "Spain": "https://flagcdn.com/es.svg", "Cape Verde": "https://flagcdn.com/cv.svg",
  "Saudi Arabia": "https://flagcdn.com/sa.svg", "Uruguay": "https://flagcdn.com/uy.svg",
  "France": "https://flagcdn.com/fr.svg", "Senegal": "https://flagcdn.com/sn.svg",
  "Iraq": "https://flagcdn.com/iq.svg", "Norway": "https://flagcdn.com/no.svg",
  "Argentina": "https://flagcdn.com/ar.svg", "Algeria": "https://flagcdn.com/dz.svg",
  "Austria": "https://flagcdn.com/at.svg", "Jordan": "https://flagcdn.com/jo.svg",
  "Portugal": "https://flagcdn.com/pt.svg", "Congo DR": "https://flagcdn.com/cd.svg",
  "Uzbekistan": "https://flagcdn.com/uz.svg", "Colombia": "https://flagcdn.com/co.svg",
  "England": "https://flagcdn.com/gb-eng.svg", "Croatia": "https://flagcdn.com/hr.svg",
  "Ghana": "https://flagcdn.com/gh.svg", "Panama": "https://flagcdn.com/pa.svg",
};

function fmtDate(dt) {
  try {
    return new Date(dt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
      hour12: true
    });
  } catch { return dt; }
}

function matchStatus(dateTimeStr, now) {
  const kickoff = new Date(dateTimeStr).getTime();
  if (isNaN(kickoff)) return { open: true, label: "⚽ Open", pillClass: "open" };
  if (now >= kickoff) return { open: false, label: "🔴 Match Started", pillClass: "locked" };
  const diff  = kickoff - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let label;
  if (hours >= 24) { const days = Math.floor(hours / 24); label = `⚽ Starts in ${days}d ${hours % 24}h`; }
  else if (hours > 0) label = `⚽ Starts in ${hours}h ${mins}m`;
  else label = `⚽ Starts in ${mins}m`;
  return { open: true, label, pillClass: hours <= 12 ? "soon" : "open" };
}

function getCountdown(lockTime) {

  const diff = new Date(lockTime).getTime() - Date.now();


  if (diff <= 0)
    return "🔒 Locked";

  const days =
    Math.floor(diff / 86400000);

  const hours =
    Math.floor(
      (diff % 86400000) / 3600000
    );

  const mins =
    Math.floor(
      (diff % 3600000) / 60000
    );

  return `⏳ ${days}d ${hours}h ${mins}m`;

}

function useNow() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ─── Predict Modal ────────────────────────────────────────────── */
function PredictModal({ match, existing, onClose, onSubmit }) {
  const [scoreA, setScoreA] = useState(existing?.scoreA ?? "");
  const [scoreB, setScoreB] = useState(existing?.scoreB ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const canSubmit = scoreA !== "" && scoreB !== "";

  async function handleSubmit() {
    setLoading(true); setError("");
    try {
      const res = await onSubmit({ matchID: match.matchID, scoreA: Number(scoreA), scoreB: Number(scoreB) });
      if (res && res.error) { setError(res.error); setLoading(false); return; }
    } catch { setError("Connection failed. Please retry."); }
    setLoading(false);
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">{existing ? "Edit Prediction" : "Your Prediction"}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-stage-label">{match.stage} · {fmtDate(match.dateTime)}</div>
        <div className="modal-matchup">
          <div className="modal-team">
            <div
              className="modal-team-name"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <img
                className="team-flag"
                src={FLAGS[match.teamA]}
                alt=""
              />

              <span>{match.teamA}</span>
            </div>
          </div>
          <div className="modal-score-wrap">
            <input className="score-input" type="number" min="0" max="99" placeholder="0" value={scoreA} onChange={(e) => setScoreA(e.target.value)} />
            <span className="score-colon">:</span>
            <input className="score-input" type="number" min="0" max="99" placeholder="0" value={scoreB} onChange={(e) => setScoreB(e.target.value)} />
          </div>
          <div className="modal-team" style={{ textAlign: "right" }}>
            <div
              className="modal-team-name"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px"
              }}
            >
              {FLAGS[match.teamB] && (
                <img
                  className="team-flag"
                  src={FLAGS[match.teamB]}
                  alt=""
                />
              )}

              <span>{match.teamB}</span>
            </div>
          </div>
        </div>
        <button className="btn-submit" disabled={!canSubmit || loading} onClick={handleSubmit}>
          {loading ? "Saving…" : existing ? "Update Prediction" : "Submit Prediction"}
        </button>
        {error && <div className="modal-error">{error}</div>}
      </div>
    </div>
  );
}

/* ─── Leaderboard ──────────────────────────────────────────────── */
function Leaderboard({ username, banner, data }) {
  const hasBanner = banner?.enabled && banner?.images?.length;
  if (!data.length) return (
    <div className="main">
      <div className="empty"><div className="empty-icon">🏅</div><div className="empty-text">No results yet — leaderboard unlocks after matches are played.</div></div>
    </div>
  );

  const rankClass = (r) => r === 1 ? "top1" : r === 2 ? "top2" : r === 3 ? "top3" : "";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: hasBanner ? "minmax(0, 1fr) 300px" : "minmax(0, 1fr)",
        gap: "24px",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "36px 24px 80px",
        alignItems: "start"
      }}
    >
      {/* LEFT — leaderboard */}
      <div style={{ minWidth: 0 }}>
        
        <div className="section-label">Full Rankings</div>
        <table className="lb-table">
          <thead><tr><th>#</th><th>Player</th><th>Exact</th><th>Points</th></tr></thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.username} className={`lb-row${p.username === username ? " me" : ""}`}>
                <td><span className={`lb-rank ${rankClass(p.rank)}`}>{p.rank}</span></td>
                <td>
                  <div className="lb-name">{p.fullName}{p.username === username && <span className="lb-me-tag">YOU</span>}</div>
                  <div className="lb-sub">@{p.username} · {p.total} predicted</div>
                </td>
                <td><span className="lb-stat"><span>{p.exact}</span> exact</span></td>
                <td><span className="lb-pts">{p.points}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT — banner */}
      {hasBanner && (
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >
            {banner.images.map((img, idx) => (
              <img
                key={img.fileId || idx}
                src={img.imageUrl}
                alt={`Banner ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  display: "block"
                }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

/* ─── Matches Tab ──────────────────────────────────────────────── */
function Matches({ user, banner, matchesProp, predictionsProp }) {
  // Local predictions state: initialised from prop, updated optimistically on submit
  const [predictions, setPredictions] = useState({});
  const [predictTarget, setPredictTarget] = useState(null);
  const now = useNow();

  // Sync whenever parent finishes loading
  useEffect(() => { setPredictions(predictionsProp); }, [predictionsProp]);

  // Keep a live-sync every 10s so predictions stay fresh without a full reload
  useEffect(() => {
    const syncId = setInterval(async () => {
      try {
        const predRes = await api("getPredictions", { username: user.username }, "GET");
        if (Array.isArray(predRes)) {
          const map = {};
          predRes.forEach((p) => { map[String(p.matchID)] = p; });
          setPredictions(map);
        }
      } catch { /* silent */ }
    }, 10_000);
    return () => clearInterval(syncId);
  }, [user.username]);

  const upcomingMatches = [...new Map((matchesProp || []).map(m => [String(m.matchID), m])).values()]
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  async function handlePredictSubmit(payload) {
    const res = await api("predict", { username: user.username, ...payload });
    if (!res.error) {
      setPredictions((prev) => ({ ...prev, [String(payload.matchID)]: { ...payload } }));
      setPredictTarget(null);
    }
    return res;
  }

  const loading = !matchesProp?.length && !upcomingMatches.length;

  return (
    <div className="main">
      
      <div className="section-label">Upcoming Matches</div>
      {loading && [1, 2, 3].map((i) => <div key={i} className="skeleton" />)}
      {!loading && upcomingMatches.length === 0 && (
        <div className="empty"><div className="empty-icon">📭</div><div className="empty-text">No matches scheduled yet.</div></div>
      )}
      {!loading && upcomingMatches.map((m) => {
        const pred   = predictions[String(m.matchID)];
        const status = matchStatus(m.dateTime, now);
        return (
          <div key={m.matchID} className={`match-card${pred ? " predicted" : ""}`}>
            <div>
              <div className="match-teams">
                <div className="team-name">
                  <img className="team-flag" src={FLAGS[m.teamA]} alt={m.teamA} />
                  <span>{m.teamA}</span>
                </div>
                <span className="vs-badge">VS</span>
                <div className="team-name">
                  <img className="team-flag" src={FLAGS[m.teamB]} alt={m.teamB} />
                  <span>{m.teamB}</span>
                </div>
              </div>
              <div className="match-meta">
                <span className="meta-pill stage">{m.stage}</span>
                <span className="meta-pill time">🕐 {fmtDate(m.dateTime)}</span>
                <span className={`countdown-pill ${status.pillClass}`}>{status.label}</span>
              </div>
              {pred && (
                <div className="predicted-info">
                  <span className="predicted-badge">✓ {pred.scoreA}–{pred.scoreB}</span>
                </div>
              )}
              
            </div>
            {!user.isAdmin && (
              status.open ? (
                <button className={`btn-predict${pred ? " done" : ""}`} onClick={() => setPredictTarget({ match: m, existing: pred || null })}>
                  {pred ? "Edit" : "Predict"}
                </button>
              ) : (
                <button className="btn-predict locked" disabled>🔒 Closed</button>
              )
            )}
          </div>
        );
      })}
      {predictTarget && (
        <PredictModal match={predictTarget.match} existing={predictTarget.existing}
          onClose={() => setPredictTarget(null)} onSubmit={handlePredictSubmit} />
      )}
    </div>
  );
}

function MyPredictions({ user, matches, predictions, bonusAnswers, questions }) {
  // predictions = array of {matchID, scoreA, scoreB}
  // bonusAnswers = array of {questionID, answer}

  const predictedMatches =
    predictions.map((p) => {

      const match =
        matches.find(
          (m) =>
            String(m.matchID) ===
            String(p.matchID)
        );

      return {
        ...match,
        prediction: p
      };

    }).filter(Boolean);

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "30px",
        alignItems: "start"
      }}
    >

      {/* LEFT COLUMN */}

      <div>

        <div className="section-label">
          My Predictions
        </div>

        {predictedMatches.map(m => (

          <div
            key={m.matchID}
            className="match-card predicted"
          >

            <div>

              <div className="match-teams">

                <div className="team-name">
                  <img
                    className="team-flag"
                    src={FLAGS[m.teamA]}
                    alt=""
                  />
                  {m.teamA}
                </div>

                <span className="vs-badge">
                  VS
                </span>

                <div className="team-name">
                  <img
                    className="team-flag"
                    src={FLAGS[m.teamB]}
                    alt=""
                  />
                  {m.teamB}
                </div>

              </div>

              <div className="match-meta">

                <span className="meta-pill stage">
                  {m.stage}
                </span>

                <span className="meta-pill time">
                  {fmtDate(m.dateTime)}
                </span>

              </div>

              <div className="predicted-info">

                <span className="predicted-badge">
                  ✓ Predicted:
                  {" "}
                  {m.prediction.scoreA}
                  -
                  {m.prediction.scoreB}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* RIGHT COLUMN */}

      <div>

        <div className="section-label">
          ⭐ My Bonus Predictions
        </div>

        {bonusAnswers.map(a => {

          const q =
            questions.find(
              x =>
                String(x.questionID) ===
                String(a.questionID)
            );

          return (

            <div
              key={a.questionID}
              className="admin-card"
            >

              <strong>
                {q?.question}
              </strong>

              <div
                style={{
                  marginTop: 10
                }}
              >
                {a.answer}
              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}

function AllPredictions({ matches, predictions, bonusPredictions, questions }) {
  // All data flows from parent — no fetch needed

  return (

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "30px"
    }}
  >

    {/* LEFT SIDE */}

    <div>

      <div className="section-label">
        Match Predictions
      </div>

      {[...new Map(matches.map(m => [String(m.matchID), m])).values()]
        .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
        .map(match => {

        const matchPredictions =
          predictions.filter(
            p =>
              String(p.matchID) ===
              String(match.matchID)
          );

        if (!matchPredictions.length)
          return null;

        return (

          <div
            key={match.matchID}
            className="admin-card"
          >

            <h3>
              {match.teamA} vs {match.teamB}
            </h3>

            <p
              style={{
                color: "var(--muted)",
                marginBottom: 15
              }}
            >
              {match.stage}
            </p>

            <div className="prediction-list">

              {matchPredictions.map(p => (

                <div
                  key={
                    p.username +
                    p.matchID
                  }
                  className="prediction-row"
                >

                  <strong>
                    {p.username}
                  </strong>

                  <div>
                    Prediction:
                    {" "}
                    {p.scoreA}
                    -
                    {p.scoreB}
                  </div>

                </div>

              ))}

            </div>

          </div>

        );

      })}

    </div>

    {/* RIGHT SIDE */}

    <div>

      <div className="section-label">
        ⭐ Bonus Predictions
      </div>

      {[...questions].reverse().map(q => {

        const answers =
          (bonusPredictions || []).filter(
            p =>
              p &&
              String(
                p.questionID
              ) ===
              String(
                q.questionID
              )
          );

        return (

          <div
            key={q.questionID}
            className="admin-card"
          >

            <h4>
              {q.question}
            </h4>

            {!answers.length ? (

              <div
                style={{
                  color: "var(--muted)"
                }}
              >
                No answers yet
              </div>

            ) : (

              answers.map(a => (

                <div
                  key={
                    a.username +
                    a.questionID
                  }
                  className="prediction-row"
                >

                  <strong>
                    {a.username}
                  </strong>

                  <div>
                    {a.answer}
                  </div>

                </div>

              ))

            )}

          </div>

        );

      })}

    </div>

  </div>

);

}
async function compressImage(file, maxWidth = 1200, quality = 0.75) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.src = url;
  });
}

function BonusQuestionSelector({ value, onChange }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    api("getBonusQuestions", {}, "GET")
      .then(res => setQuestions(Array.isArray(res) ? res : []))
      .catch(() => {});
  }, []);

  return (
    <select
      className="auth-field"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select a question…</option>
      {questions.map(q => (
        <option key={q.questionID} value={q.questionID}>
          {q.question}
        </option>
      ))}
    </select>
  );
}

/* ─── Admin Panel ──────────────────────────────────────────────── */
// FIX: renders ONLY the section matching the `section` prop
function AdminPanel({ section, matches = [], predictions = [] }) {
  const [matchForm, setMatchForm] = useState({ matchID: "", teamA: "", teamB: "", stage: "", dateTime: "" });
  const [resultForm, setResultForm] = useState({ matchID: "", scoreA: "", scoreB: "" });
  const [notes, setNotes] = useState([]);
  const [noteIndex, setNoteIndex] = useState(0);
  const [saveMsg, setSaveMsg] = useState("");
  const [note, setNote] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [previewUrl, setPreviewUrl]   = useState("");
  const [banner, setBanner] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState("");
  

  
  const [bonusForm, setBonusForm] =
    useState({

      question: "",

      options: "",

      correctAnswers: "",

      points: 1

    });

  useEffect(() => {

    if (section === "notes") {

      api("getNotes", {}, "GET")
        .then((res) => {
          setNotes(Array.isArray(res) ? res : []);
        })
        .catch(() => {});

    }

  }, [section, saveMsg]);

async function addMatch() {
  const form = {
    ...matchForm,
    dateTime: matchForm.dateTime
      ? new Date(matchForm.dateTime).toISOString()
      : ""
  };
  const res = await api("addMatch", form, "POST");
  setSaveMsg(res.success ? "✅ Match Added" : "❌ " + res.error);
}

  async function removeMatch(matchID) {

    if (
      !window.confirm(
        "Delete this match?"
      )
    ) {
      return;
    }

    const res = await api(
      "deleteMatch",
      { matchID },
      "POST"
    );

    setSaveMsg(
      res.success
        ? "✅ Match Deleted"
        : "❌ Delete Failed"
    );

    if (res.success) {

      window.location.reload();

    }
  }

  async function updateResult() {
    const res = await api("updateMatchResult", resultForm, "POST");
    setSaveMsg(res.success ? "✅ Result Updated" : "❌ " + res.error);
  }

  async function saveAdminNote() {
    const res = await api("saveNote", { message: note }, "POST");
    setSaveMsg(res.success ? "✅ Note Saved" : "❌ Failed");
  }

  async function deleteAdminNote() {
    const res = await api("deleteNote", {}, "POST");
    if (res.success) { setNote(""); setSaveMsg("🗑️ Note Deleted"); }
  }
 

  async function saveBonusQuestion() {
    const lockIso = bonusForm.lockTime ? new Date(bonusForm.lockTime).toISOString() : "none";
    const res = await api("saveBonusQuestion", { ...bonusForm, lockTime: lockIso }, "POST");

    setSaveMsg(
      res.success
        ? "✅ Bonus Question Saved"
        : "❌ Failed"
    );

  }
  async function setCorrectAnswer() {
    const res = await api("setBonusAnswer", {
      questionID: bonusForm.questionID,
      correctAnswers: bonusForm.correctAnswers,
    }, "POST");
    setSaveMsg(res.success ? "✅ Answer Set" : "❌ " + (res.error || "Failed"));
  }

  async function deleteBonusQuestion() {
    if (!bonusForm.questionID) { setSaveMsg("❌ Select a question"); return; }
    if (!window.confirm("Delete this bonus question?")) return;
    const res = await api("deleteBonusQuestion", { questionID: bonusForm.questionID }, "POST");
    setSaveMsg(res.success ? "✅ Question Deleted" : "❌ " + (res.error || "Failed"));
  }

  async function saveBanner() {
    if (!bannerImage) { setSaveMsg("❌ Select an image"); return; }
    setSaveMsg("⏳ Compressing & Uploading...");
    try {
      const compressed = await compressImage(bannerImage, 400, 0.4);
      const res = await api("uploadBanner", { image: compressed }, "POST");
      setSaveMsg(res.success ? "✅ Banner Uploaded" : "❌ " + (res.error || "Failed"));
    } catch (e) {
      setSaveMsg("❌ Failed: " + e.message);
    }
    await loadBanner();
  }
  async function handleDeleteBanner(fileId) {

    if (!window.confirm("Delete this banner?"))
      return;

    const res = await api(
      "deleteBanner",
      { fileId }
    );

    if (res.success) {

      alert("Banner deleted");

      loadBanner();

    } else {

      alert(res.error);

    }
  }
  async function loadBanner() {
    const res = await api(
      "getBanner",
      {},
      "GET"
    );

    setBanner(res);
  }
  useEffect(() => {
    loadBanner();
  }, []);


  // Admin result dropdown shows ALL matches (not just upcoming) so past matches can be updated
  const allMatchesSorted = [...matches].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  return (
    <div className="main">
      {saveMsg && <div className="notice-banner" style={{ marginBottom: 20 }}>{saveMsg}</div>}

      {/* ── ADD MATCH ── */}
      {section === "addMatches" && (
        <div className="admin-card">
          <div className="section-label">➕ Add Match</div>
          <input className="auth-field" placeholder="Match ID (e.g. M073)" onChange={(e) => setMatchForm({ ...matchForm, matchID: e.target.value })} />
          <input className="auth-field" placeholder="Team A" onChange={(e) => setMatchForm({ ...matchForm, teamA: e.target.value })} />
          <input className="auth-field" placeholder="Team B" onChange={(e) => setMatchForm({ ...matchForm, teamB: e.target.value })} />
          <input className="auth-field" placeholder="Stage (e.g. Round of 32)" onChange={(e) => setMatchForm({ ...matchForm, stage: e.target.value })} />
          <input className="auth-field" type="datetime-local" onChange={(e) => setMatchForm({ ...matchForm, dateTime: e.target.value })} />
          <button
            className="btn-gold"
            onClick={addMatch}
          >
            Add Match
          </button>

          <hr
            style={{
              margin: "20px 0",
              opacity: 0.2
            }}
          />

          <div className="section-label">
            🗑 Delete Match
          </div>

          <select
            className="auth-field"
            value={selectedMatch}
            onChange={(e) =>
              setSelectedMatch(
                e.target.value
              )
            }
          >
            <option value="">
              Select Match
            </option>

            {matches.map(match => (
              <option
                key={match.matchID}
                value={match.matchID}
              >
                {match.matchID} - {match.teamA} vs {match.teamB}
              </option>
            ))}

          </select>

          <button
            className="btn-danger"
            onClick={() =>
              removeMatch(
                selectedMatch
              )
            }
          >
            🗑 Delete Match
          </button>
        </div>
      )}

      {/* ── UPDATE RESULT ── */}
      {section === "results" && (
        <div className="admin-card">
          <div className="section-label">🏁 Update Match Result</div>
          <select className="auth-field" onChange={(e) => setResultForm({ ...resultForm, matchID: e.target.value })}>
            <option value="">Select Match</option>
            {allMatchesSorted.map(match => (
              <option key={match.matchID} value={match.matchID}>
                {match.teamA} vs {match.teamB} — {fmtDate(match.dateTime)}
              </option>
            ))}
          </select>
          <input className="auth-field" type="number" placeholder="Score A" onChange={(e) => setResultForm({ ...resultForm, scoreA: e.target.value })} />
          <input className="auth-field" type="number" placeholder="Score B" onChange={(e) => setResultForm({ ...resultForm, scoreB: e.target.value })} />
          <button className="btn-gold" onClick={updateResult}>Save Result</button>
        </div>
      )}

      {/* ── NOTES ── */}
      {section === "notes" && (
        <div className="admin-card">

          <div className="section-label">
            📢 Home Announcements
          </div>

          <textarea
            className="auth-field"
            rows="4"
            placeholder="Write announcement..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            className="btn-gold"
            onClick={saveAdminNote}
          >
            Save Note
          </button>

          <div style={{ marginTop: 20 }}>

            {notes.map((n) => (

              <div
                key={n.id}
                className="prediction-row"
                style={{ marginBottom: 10 }}
              >
                <div>{n.message}</div>

                <button
                  className="btn-link"
                  onClick={() =>
                    api(
                      "deleteNote",
                      { rowId: n.id },
                      "POST"
                    ).then(() =>
                      setSaveMsg("🗑️ Note Deleted")
                    )
                  }
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>
      )}

      {section === "bonus" && (
  <>
        {/* ── ADD QUESTION ── */}
        <div className="admin-card">
          <div className="section-label">⭐ Add Bonus Question</div>
          <input
            className="auth-field"
            placeholder="Question (e.g. Who will be the Champions?)"
            onChange={(e) => setBonusForm({ ...bonusForm, question: e.target.value })}
          />
          <input
            className="auth-field"
            placeholder="Options — comma separated (e.g. Brazil, France, Argentina)"
            onChange={(e) => setBonusForm({ ...bonusForm, options: e.target.value })}
          />
          <input
            className="auth-field"
            type="number"
            min="1"
            placeholder="Points for correct answer (e.g. 10)"
            onChange={(e) =>
              setBonusForm({
                ...bonusForm,
                points: Number(e.target.value)
              })
            }
          />
          <input
            className="auth-field"
            type="datetime-local"
            onChange={(e) => setBonusForm({ ...bonusForm, lockTime: e.target.value })}
          />
          <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>
            🔒 Set the date/time when this question locks (no more answers accepted)
          </p>
          <button className="btn-gold" onClick={saveBonusQuestion}>Save Question</button>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
            ✏️ Correct answer can be set later once the result is known.
          </p>
        </div>

        {/* ── SET ANSWER LATER ── */}
        <div className="admin-card" style={{ marginTop: 16 }}>
          <div className="section-label">✅ Set Correct Answer</div>
          <BonusQuestionSelector
            value={bonusForm.questionID}
            onChange={(id) => setBonusForm({ ...bonusForm, questionID: id })}
          />
          <input
            className="auth-field"
            placeholder="Correct Answer(s) — comma separated"
            onChange={(e) => setBonusForm({ ...bonusForm, correctAnswers: e.target.value })}
          />
          <button className="btn-gold" onClick={setCorrectAnswer}>Set Answer</button>
        </div>
        {/* ── DELETE QUESTION ── */}
        <div className="admin-card" style={{ marginTop: 16 }}>
          <div className="section-label">🗑 Delete Bonus Question</div>
          <BonusQuestionSelector
            value={bonusForm.questionID}
            onChange={(id) => setBonusForm({ ...bonusForm, questionID: id })}
          />
          <button className="btn-danger" onClick={deleteBonusQuestion}>
            🗑 Delete Question
          </button>
        </div>
      </>
    )}
    {section === "banner" && (
      <div className="admin-card">
        <div className="section-label">🖼 Banner Image</div>
        <input
          type="file"
          accept="image/*"
          className="auth-field"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            setBannerImage(file);
            setPreviewUrl(URL.createObjectURL(file));
          }}
        />
        {previewUrl && (
          <img src={previewUrl} alt="Preview"
            style={{ width: "100%", borderRadius: 12, marginBottom: 12, maxHeight: 200, objectFit: "cover" }}
          />
        )}
        <button className="btn-gold" onClick={saveBanner}>
          Upload Banner
        </button>

        {banner?.images?.length > 0 && (
          <div style={{ marginTop: 20 }}>

            <div
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                marginBottom: 12
              }}
            >
              Uploaded Banners
            </div>

            {banner.images.map((img) => (

              <div
                key={img.fileId}
                style={{
                  marginBottom: 20,
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 10
                }}
              >

                <img
                  src={img.imageUrl}
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    maxHeight: 180,
                    objectFit: "cover"
                  }}
                />

                <div
                  style={{
                    marginTop: 8,
                    fontSize: 11,
                    color: "var(--muted)",
                    wordBreak: "break-all"
                  }}
                >
                  {img.fileId}
                </div>

                <button
                  className="btn-danger"
                  style={{
                    width: "100%",
                    marginTop: 10
                  }}
                  onClick={() =>
                    handleDeleteBanner(img.fileId)
                  }
                >
                  🗑 Delete Banner
                </button>

              </div>

            ))}

          </div>
        )}

        
        
      </div>
    )}
      
    </div>
  );
}

function QuestionsPage({ user, questions, savedAnswers }) {
  // savedAnswers: map of { [questionID]: answer } pre-loaded by parent
  const [selected, setSelected]   = useState({});
  const [submitted, setSubmitted] = useState(savedAnswers || {});
  const [saving, setSaving]       = useState({});
  const now = useNow();

  // Sync submitted map when parent data arrives (covers initial load timing)
  useEffect(() => { setSubmitted(savedAnswers || {}); }, [savedAnswers]);

  async function handleSubmit(questionID) {
    const answer = selected[questionID];
    if (!answer) return;
    setSaving(prev => ({ ...prev, [questionID]: true }));
    const res = await api("submitBonusAnswer", { username: user.username, questionID, answer });
    if (res.success) setSubmitted(prev => ({ ...prev, [questionID]: answer }));
    setSaving(prev => ({ ...prev, [questionID]: false }));
  }

  if (!questions.length) return (
    <div className="main">
      <div className="empty"><div className="empty-icon">🎯</div><div className="empty-text">No bonus questions yet.</div></div>
    </div>
  );

  return (
    <div className="main">
      <div className="section-label">🎯 Bonus Questions</div>
      {[...questions].reverse().map(q => {
        const qID       = String(q.questionID);
        const options   = String(q.options).split(",").map(o => o.trim()).filter(Boolean);
        const lockMs = (() => {
          if (!q.lockTime || q.lockTime === "none" || q.lockTime === "0" || q.lockTime === 0) return null;
          const d = isNaN(Number(q.lockTime)) ? new Date(q.lockTime) : new Date(Number(q.lockTime));
          return d.getFullYear() < 2000 ? null : d.getTime();
        })();
        const isLocked = lockMs ? lockMs <= now : false;
        const savedAnswer  = submitted[qID];
        const chosenOption = selected[qID];

        return (
          <div key={qID} className="admin-card" style={{ marginBottom: 16 }}>
            {/* Question header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>{q.question}</div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginLeft: 12,
                background: isLocked ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.08)",
                color:      isLocked ? "#f87171"              : "#4ade80",
                border:     isLocked ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(34,197,94,0.2)",
              }}>
                {isLocked ? "🔒 Locked" : "✅ Open"}
              </span>
            </div>

            {/* Options or Free Text */}
<div style={{ marginBottom: 14 }}>
  {options.length > 0 ? (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const isChosen = chosenOption === opt || savedAnswer === opt;
        return (
          <button key={opt}
            disabled={isLocked}
            onClick={() => setSelected(prev => ({ ...prev, [qID]: opt }))}
            style={{
              padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600,
              cursor: isLocked || savedAnswer ? "not-allowed" : "pointer",
              background: isChosen ? "linear-gradient(135deg,var(--gold),var(--gold2))" : "rgba(255,255,255,0.05)",
              color:  isChosen ? "#080808" : "var(--text)",
              border: isChosen ? "none"    : "1px solid var(--border)",
              transition: "all 0.2s",
            }}
          >{opt}</button>
        );
      })}
    </div>
  ) : (
    <input
      className="auth-field"
      placeholder="Type your answer here..."
      disabled={isLocked}
      value={selected[qID] !== undefined ? selected[qID] : (savedAnswer || "")}
      onChange={(e) => setSelected(prev => ({ ...prev, [qID]: e.target.value }))}
      style={{ marginBottom: 0 }}
    />
  )}
</div>

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>
                ⭐ {q.points} pts
                <span style={{
                  marginLeft: 8, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: isLocked ? "rgba(239,68,68,0.1)" : lockMs ? "rgba(251,191,36,0.1)" : "rgba(255,255,255,0.04)",
                  color: isLocked ? "#f87171" : lockMs ? "#fbbf24" : "var(--muted)",
                  border: isLocked ? "1px solid rgba(239,68,68,0.2)" : lockMs ? "1px solid rgba(251,191,36,0.25)" : "1px solid var(--border)",
                }}>
                  {isLocked ? "🔒 Locked" : lockMs ? getCountdown(q.lockTime) : "No deadline"}
                </span>
              </span>
              {isLocked
                ? savedAnswer && <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>✓ Locked in: {savedAnswer}</span>
                : <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {savedAnswer && !chosenOption && (
                      <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>✓ {savedAnswer}</span>
                    )}
                    <button className="btn-predict"
                      disabled={!(chosenOption ?? (options.length === 0 && selected[qID])) || saving[qID]}
                      onClick={() => handleSubmit(qID)}>
                      {saving[qID] ? "Saving…" : savedAnswer ? "Update" : "Submit"}
                    </button>
                  </div>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Standings({ matches }) {
  if (!matches.length) return <div className="main"><div className="spinner" /></div>;

  const groups = {};
  [...new Map(matches.map(m => [String(m.matchID), m])).values()].forEach(m => {
    if (!String(m.stage || "").toLowerCase().includes("group")) return;
    if (!groups[m.stage]) groups[m.stage] = [];
    groups[m.stage].push(m);
  });

  function calcStandings(ms) {
    const teams = {};
    ms.forEach(m => {
      [m.teamA, m.teamB].forEach(t => {
        if (!teams[t]) teams[t] = { team: t, P:0, W:0, D:0, L:0, GF:0, GA:0, Pts:0 };
      });
      const sA = parseFloat(m.scoreA), sB = parseFloat(m.scoreB);
      if (isNaN(sA) || isNaN(sB) || m.scoreA === "" || m.scoreB === "") return;
      teams[m.teamA].P++; teams[m.teamB].P++;
      teams[m.teamA].GF += sA; teams[m.teamA].GA += sB;
      teams[m.teamB].GF += sB; teams[m.teamB].GA += sA;
      if (sA > sB)      { teams[m.teamA].W++; teams[m.teamA].Pts += 3; teams[m.teamB].L++; }
      else if (sA < sB) { teams[m.teamB].W++; teams[m.teamB].Pts += 3; teams[m.teamA].L++; }
      else              { teams[m.teamA].D++; teams[m.teamA].Pts++;     teams[m.teamB].D++; teams[m.teamB].Pts++; }
    });

    const rows = Object.values(teams).map(t => ({ ...t, GD: t.GF - t.GA }));

    // Primary sort: Pts → GD → GF
    rows.sort((a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF);

    // H2H helper: compute points/GD/GF only among a subset of tied teams
    function calcH2H(tiedTeams) {
      const names = new Set(tiedTeams.map(t => t.team));
      const h2h = {};
      tiedTeams.forEach(t => { h2h[t.team] = { Pts: 0, GD: 0, GF: 0 }; });
      ms.forEach(m => {
        if (!names.has(m.teamA) || !names.has(m.teamB)) return;
        const sA = parseFloat(m.scoreA), sB = parseFloat(m.scoreB);
        if (isNaN(sA) || isNaN(sB) || m.scoreA === "" || m.scoreB === "") return;
        h2h[m.teamA].GF += sA; h2h[m.teamA].GD += (sA - sB);
        h2h[m.teamB].GF += sB; h2h[m.teamB].GD += (sB - sA);
        if (sA > sB)      { h2h[m.teamA].Pts += 3; }
        else if (sA < sB) { h2h[m.teamB].Pts += 3; }
        else              { h2h[m.teamA].Pts++;  h2h[m.teamB].Pts++; }
      });
      return h2h;
    }

    // Re-sort any tied groups using H2H (steps 3–5)
    let i = 0;
    while (i < rows.length) {
      let j = i + 1;
      while (
        j < rows.length &&
        rows[j].Pts === rows[i].Pts &&
        rows[j].GD  === rows[i].GD  &&
        rows[j].GF  === rows[i].GF
      ) j++;

      if (j - i > 1) {
        const tiedGroup = rows.slice(i, j);
        const h2h = calcH2H(tiedGroup);
        tiedGroup.sort((a, b) =>
          (h2h[b.team].Pts - h2h[a.team].Pts) ||
          (h2h[b.team].GD  - h2h[a.team].GD)  ||
          (h2h[b.team].GF  - h2h[a.team].GF)
        );
        rows.splice(i, j - i, ...tiedGroup);
      }
      i = j;
    }

    return rows;
  }

  const groupEntries = Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));

  if (!groupEntries.length) return (
    <div className="main">
      <div className="empty"><div className="empty-icon">📊</div><div className="empty-text">No group results yet.</div></div>
    </div>
  );

  return (
    <div className="main">
      <div className="section-label"> Group Standings</div>
      {groupEntries.map(([stage, gMatches]) => {
        const rows = calcStandings(gMatches);
        return (
          <div key={stage} className="admin-card" style={{ marginBottom: 20 }}>
            <div className="section-label">{stage}</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ color: "var(--muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  <th style={{ textAlign: "left", padding: "6px 8px" }}>Team</th>
                  {["P","W","D","L","GF","GA","GD"].map(h => (
                    <th key={h} style={{ textAlign: "center", padding: "6px 8px" }}>{h}</th>
                  ))}
                  <th style={{ textAlign: "center", padding: "6px 8px", color: "var(--gold)" }}>Pts</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.team} style={{ borderTop: "1px solid var(--border)", background: i < 2 ? "rgba(34,197,94,0.04)" : "transparent" }}>
                    <td style={{ padding: "10px 8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {FLAGS[r.team] && <img src={FLAGS[r.team]} style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} alt="" />}
                        <span style={{ fontWeight: 600 }}>{r.team}</span>
                        {i < 2 && <span style={{ fontSize: 10, color: "var(--green)", background: "rgba(34,197,94,0.1)", padding: "1px 6px", borderRadius: 10, border: "1px solid rgba(34,197,94,0.2)" }}>Q</span>}
                      </div>
                    </td>
                    <td style={{ textAlign: "center", padding: "10px 8px", color: "var(--muted)" }}>{r.P}</td>
                    <td style={{ textAlign: "center", padding: "10px 8px" }}>{r.W}</td>
                    <td style={{ textAlign: "center", padding: "10px 8px" }}>{r.D}</td>
                    <td style={{ textAlign: "center", padding: "10px 8px" }}>{r.L}</td>
                    <td style={{ textAlign: "center", padding: "10px 8px" }}>{r.GF}</td>
                    <td style={{ textAlign: "center", padding: "10px 8px" }}>{r.GA}</td>
                    <td style={{ textAlign: "center", padding: "10px 8px", color: r.GD >= 0 ? "var(--green)" : "var(--red)" }}>{r.GD > 0 ? "+" : ""}{r.GD}</td>
                    <td style={{ textAlign: "center", padding: "10px 8px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "var(--gold)" }}>{r.Pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
function toISTDateKey(dt) {
  const d = new Date(dt);
  const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function TodaysPredictions({ matches, predictions }) {
  if (!matches.length) return <div className="main"><div className="spinner" /></div>;

  const now = Date.now();
  const todayMatches = [...new Map(matches.map(m => [String(m.matchID), m])).values()]
    .filter(m => m.dateTime && new Date(m.dateTime).getTime() > now)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    .slice(0, 4);

  if (!todayMatches.length) return (
    <div className="main">
      <div className="empty"><div className="empty-icon">📅</div><div className="empty-text">No upcoming matches.</div></div>
    </div>
  );

  return (
    <div className="main">
      <div className="section-label">📅 Next 4 Upcoming Matches</div>
      {todayMatches.map(m => {
        const mID = String(m.matchID).trim().toLowerCase();
        const matchPreds = predictions.filter(p => p && String(p.matchID).trim().toLowerCase() === mID);
        return (
          <div key={m.matchID} className="admin-card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              <div className="team-name">
                {FLAGS[m.teamA] && <img className="team-flag" src={FLAGS[m.teamA]} alt="" />}
                <span>{m.teamA}</span>
              </div>
              <span className="vs-badge">VS</span>
              <div className="team-name">
                {FLAGS[m.teamB] && <img className="team-flag" src={FLAGS[m.teamB]} alt="" />}
                <span>{m.teamB}</span>
              </div>
              <span className="meta-pill time" style={{ marginLeft: "auto" }}>🕐 {fmtDate(m.dateTime)}</span>
            </div>
            {!matchPreds.length ? (
              <div style={{ color: "var(--muted)", fontSize: 13, padding: "8px 0" }}>
                No predictions yet
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ color: "var(--muted)", fontSize: 11, textTransform: "uppercase" }}>
                    <th style={{ textAlign: "left", padding: "6px 10px" }}>Player</th>
                    <th style={{ textAlign: "center", padding: "6px 10px" }}>Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  {matchPreds.map(p => (
                    <tr key={`${p.username}-${m.matchID}`} style={{ borderTop: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 10px", fontWeight: 600 }}>{p.username}</td>
                      <td style={{ textAlign: "center", padding: "10px 10px" }}>
                        <span className="predicted-badge">⚽ {p.scoreA} – {p.scoreB}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LastDayMatches({ matches, predictions }) {
  if (!matches.length) return <div className="main"><div className="spinner" /></div>;

  const now = Date.now();
  const uniqueMatches = [...new Map(
    (matches || []).filter(m => m && m.matchID).map(m => [String(m.matchID), m])
  ).values()];

  const lastMatches = uniqueMatches
    .filter(m => m.dateTime && new Date(m.dateTime).getTime() <= now)
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    .slice(0, 4);

  if (!lastMatches.length) return (
    <div className="main">
      <div className="empty"><div className="empty-icon">🏁</div><div className="empty-text">No finished matches yet.</div></div>
    </div>
  );

  function calcPoints(predA, predB, actualA, actualB, hasResult) {
    if (!hasResult) return "-";
    const pA = parseFloat(predA), pB = parseFloat(predB);
    const aA = parseFloat(actualA), aB = parseFloat(actualB);
    if (pA === aA && pB === aB) return 3;
    const predOut = pA > pB ? "H" : pA < pB ? "A" : "D";
    const actOut  = aA > aB ? "H" : aA < aB ? "A" : "D";
    return predOut === actOut ? 1 : 0;
  }

  return (
    <div className="main">
      <div className="section-label">🏁 Last 4 Finished Matches</div>
      {lastMatches.map(m => {
        const hasResult =
          m.scoreA !== null && m.scoreB !== null &&
          m.scoreA !== "" && m.scoreB !== "" &&
          !isNaN(Number(m.scoreA)) && !isNaN(Number(m.scoreB));
        const matchPreds = predictions.filter(
          p => p && p.matchID != null && String(p.matchID).trim() === String(m.matchID).trim()
        );
        return (
          <div key={m.matchID} className="admin-card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <div className="team-name">
                {FLAGS[m.teamA] && <img className="team-flag" src={FLAGS[m.teamA]} alt="" />}
                <span>{m.teamA}</span>
              </div>
              <span className="vs-badge">VS</span>
              <div className="team-name">
                {FLAGS[m.teamB] && <img className="team-flag" src={FLAGS[m.teamB]} alt="" />}
                <span>{m.teamB}</span>
              </div>
              {hasResult ? (
                <span style={{ marginLeft: "auto", fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "var(--gold)" }}>
                  {parseFloat(m.scoreA)} - {parseFloat(m.scoreB)}
                </span>
              ) : (
                <span style={{ marginLeft: "auto", color: "#fbbf24", fontSize: 12 }}>⏳ Result pending</span>
              )}
            </div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 14 }}>
              {m.stage} · {fmtDate(m.dateTime)}
            </div>
            {!matchPreds.length ? (
              <div style={{ color: "var(--muted)", fontSize: 13 }}>No predictions for this match.</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ color: "var(--muted)", fontSize: 11, textTransform: "uppercase" }}>
                    <th style={{ textAlign: "left", padding: "6px 10px" }}>Player</th>
                    <th style={{ textAlign: "center", padding: "6px 10px" }}>Prediction</th>
                    <th style={{ textAlign: "center", padding: "6px 10px" }}>Result</th>
                    <th style={{ textAlign: "center", padding: "6px 10px", color: "var(--gold)" }}>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {matchPreds.map(p => {
                    const pts = calcPoints(p.scoreA, p.scoreB, m.scoreA, m.scoreB, hasResult);
                    return (
                      <tr key={`${p.username}-${m.matchID}`} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "10px 10px", fontWeight: 600 }}>{p.username}</td>
                        <td style={{ textAlign: "center", padding: "10px 10px" }}>
                          <span className="predicted-badge">⚽ {p.scoreA} - {p.scoreB}</span>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 10px", color: "var(--muted)" }}>
                          {hasResult ? `${parseFloat(m.scoreA)} - ${parseFloat(m.scoreB)}` : "-"}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 10px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                          color: pts === 3 ? "var(--gold)" : pts === 1 ? "var(--green)" : pts === 0 ? "var(--red)" : "var(--muted)" }}>
                          {pts}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AllBonusPredictionsTab({ questions, bonusPreds }) {
  if (!questions.length) return (
    <div className="main">
      <div className="empty"><div className="empty-icon">⭐</div><div className="empty-text">No bonus questions yet.</div></div>
    </div>
  );

  return (
    <div className="main">
      <div className="section-label">⭐ All Bonus Predictions</div>
      {[...questions].reverse().map(q => {
        const answers = bonusPreds.filter(p => String(p.questionID) === String(q.questionID));
        return (
          <div key={q.questionID} className="admin-card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{q.question}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>
              ⭐ {q.points} pts
              {q.correctAnswers && <span style={{ marginLeft: 8, color: "var(--green)" }}>✓ Answer: {q.correctAnswers}</span>}
            </div>
            {!answers.length ? (
              <div style={{ color: "var(--muted)", fontSize: 13 }}>No answers yet</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ color: "var(--muted)", fontSize: 11, textTransform: "uppercase" }}>
                    <th style={{ textAlign: "left", padding: "6px 10px" }}>Player</th>
                    <th style={{ textAlign: "center", padding: "6px 10px" }}>Answer</th>
                    <th style={{ textAlign: "center", padding: "6px 10px", color: "var(--gold)" }}>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map(a => {
                    const correct = q.correctAnswers
                      ? q.correctAnswers.split(",").map(x => x.trim().toLowerCase()).includes(String(a.answer).trim().toLowerCase())
                      : null;
                    return (
                      <tr key={a.username} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "10px 10px", fontWeight: 600 }}>{a.username}</td>
                        <td style={{ textAlign: "center", padding: "10px 10px" }}>
                          <span style={{
                            padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                            background: correct === true ? "rgba(34,197,94,0.1)" : correct === false ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.05)",
                            color: correct === true ? "var(--green)" : correct === false ? "#f87171" : "var(--text)",
                            border: correct === true ? "1px solid rgba(34,197,94,0.2)" : correct === false ? "1px solid rgba(239,68,68,0.2)" : "1px solid var(--border)"
                          }}>{a.answer}</span>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 10px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                          color: correct === true ? "var(--gold)" : correct === false ? "var(--red)" : "var(--muted)" }}>
                          {correct === true ? q.points : correct === false ? 0 : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}
/* ─── Auth Screen ──────────────────────────────────────────────── */
function AuthScreen({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage]   = useState({ text: "", type: "" });
  const [loading, setLoading]   = useState(false);

  async function handleAuth() {
    setLoading(true); setMessage({ text: "", type: "" });
    try {
      if (isSignup) {
        const res = await api("signup", { username, fullName, passwordHash: hashPassword(password) });
        if (res.error) setMessage({ text: res.error, type: "error" });
        else { setMessage({ text: "Account created! Please log in.", type: "success" }); setIsSignup(false); }
      } else {
        const res = await api("login", { username, password, passwordHash: hashPassword(password) });
        if (res.error) setMessage({ text: res.error, type: "error" });
        else onLogin({ username, fullName: res.fullName, isAdmin: res.isAdmin || false });
      }
    } catch { setMessage({ text: "Connection failed. Try again.", type: "error" }); }
    setLoading(false);
  }

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-card">
          <img
            src={logo}
            alt="DIVOLI 2026 Prediction Contest"
            className="auth-logo-full"
          />
          {isSignup && (
            <input className="auth-field" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          )}
          <input className="auth-field" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAuth()} />
          <input className="auth-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAuth()} />
          <button className="btn-gold" onClick={handleAuth} disabled={loading}>
            {loading ? "Please wait…" : isSignup ? "Create Account" : "Login"}
          </button>
          <button className="btn-link" onClick={() => { setIsSignup(!isSignup); setMessage({ text: "", type: "" }); }}>
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
          </button>
          {message.text && <div className={`auth-msg ${message.type}`}>{message.text}</div>}
        </div>
      </div>
      <div className="auth-right">
        <img className="auth-image" src={loginBg} alt="Football Stadium" />
        <div className="auth-overlay"></div>
        <div className="auth-right-content">
          <div className="auth-big-title">PREDICT.<br />COMPETE.<br /><span>WIN.</span></div>
          <div className="auth-big-sub">Join the FIFA World Cup 2026 prediction contest and compete live with your friends on the leaderboard.</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Root App ─────────────────────────────────────────────────── */
export default function App() {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem("fifa_user"); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });
  const [tab, setTab]             = useState("matches");
  const [matches, setMatches]     = useState([]);
  const [allPredictions, setAllPredictions] = useState([]);
  // FIX: note lives in root App and is loaded here — not inside Matches
  const [notes, setNotes] = useState([]);
  const [noteIndex, setNoteIndex] = useState(0);
  const [noteVisible, setNoteVisible] = useState(true);
  const [banner, setBanner] = useState(null);
  // ── Shared pre-loaded data (all fetched at once on login) ──────
  const [leaderboard, setLeaderboard]               = useState([]);
  const [userPredictions, setUserPredictions]       = useState({});
  const [bonusQuestions, setBonusQuestions]         = useState([]);
  const [allBonusPredictions, setAllBonusPredictions] = useState([]);
  const [bonusAnswersArr, setBonusAnswersArr]       = useState([]);  // array → MyPredictions
  const [bonusAnswersMap, setBonusAnswersMap]       = useState({});  // map   → QuestionsPage
 

  function handleLogin(u) {
    setUser(u);
    try { localStorage.setItem("fifa_user", JSON.stringify(u)); } catch {}
  }
  function handleLogout() {
    setUser(null);
    try { localStorage.removeItem("fifa_user"); } catch {}
  }

  // ── Single load: fire everything in parallel on login ──────────
  useEffect(() => {
    if (!user) return;
    async function loadAll() {
      try {
        const [notesRes, matchRes, predRes, lbRes, allPredRes, bqRes, abpRes, baRes] =
          await Promise.all([
            api("getNotes", {}, "GET"),
            api("getMatches", {}, "GET"),
            api("getPredictions", { username: user.username }, "GET"),
            api("getLeaderboard", {}, "GET"),
            api("getAllPredictions", {}, "GET"),
            api("getBonusQuestions", {}, "GET"),
            api("getAllBonusPredictions", {}, "GET"),
            api("getBonusAnswers", { username: user.username }, "GET"),
          ]);

        if (Array.isArray(notesRes) && notesRes.length) setNotes(notesRes);

        const mArr    = Array.isArray(matchRes)   ? matchRes   : [];
        const apArr   = Array.isArray(allPredRes) ? allPredRes : [];
        const predArr = Array.isArray(predRes)    ? predRes    : [];
        const predMap = {};
        predArr.forEach(p => { predMap[String(p.matchID)] = p; });

        const baArr = Array.isArray(baRes) ? baRes : [];
        const baMap = {};
        baArr.forEach(a => { baMap[String(a.questionID)] = a.answer; });

        setMatches(mArr);               // AdminPanel still reads from here
        setAllPredictions(apArr);       // AdminPanel still reads from here
        setLeaderboard(Array.isArray(lbRes)    ? lbRes    : []);
        setUserPredictions(predMap);
        setBonusQuestions(Array.isArray(bqRes) ? bqRes    : []);
        setAllBonusPredictions(Array.isArray(abpRes) ? abpRes : []);
        setBonusAnswersArr(baArr);
        setBonusAnswersMap(baMap);
      } catch(e) { console.error("loadAll error:", e); }
    }
    loadAll();
  }, [user]);

  // Note rotation ticker (unchanged)
  useEffect(() => {
    if (!notes.length) return;
    const id = setInterval(() => {
      setNoteVisible(false);
      setTimeout(() => {
        setNoteIndex(i => (i + 1) % notes.length);
        setNoteVisible(true);
      }, 1000);
    }, 5000);
    return () => clearInterval(id);
  }, [notes]);

  useEffect(() => {
    api("getBanner", {}, "GET")
      .then(data => {
        console.log("Banner loaded:", data); // for debugging
        setBanner(data);
      })
      .catch(err => console.error("Failed to load banner", err));
  }, []);

  if (!user) return <AuthScreen onLogin={handleLogin} />;

  return (
    <div className="app-wrap">
      <header className="header">
        <div className="header-brand">
          <span className="display" style={{ fontSize: 24, color: "var(--gold)" }}>Divoli 2026</span>
          <span className="header-badge">Prediction Contest</span>
        </div>
        <div className="header-right">
          <div>
            <div className="header-user-name">{user.fullName}</div>
            <div className="header-user-label">{user.isAdmin ? "Admin" : "Player"}</div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <nav className="tabs">
        <button className={`tab${tab === "matches" ? " active" : ""}`} onClick={() => setTab("matches")}>⚽ Matches</button>
        <button className={`tab${tab === "leaderboard" ? " active" : ""}`} onClick={() => setTab("leaderboard")}>🏆 Leaderboard</button>
        <button className={`tab${tab === "standings" ? " active" : ""}`} onClick={() => setTab("standings")}>📊 Standings</button>
        <button className={`tab${tab === "todayPreds" ? " active" : ""}`} onClick={() => setTab("todayPreds")}>📅 Upcoming Predictions</button>
        <button className={`tab${tab === "lastMatch" ? " active" : ""}`} onClick={() => setTab("lastMatch")}>🏁 Last Matches</button>
        <button className={`tab${tab === "bonusPreds" ? " active" : ""}`} onClick={() => setTab("bonusPreds")}>⭐ Bonus Picks</button>

        {!user.isAdmin && (
          <button
            className={`tab${tab === "myPredictions" ? " active" : ""}`}
            onClick={() => setTab("myPredictions")}
          >
            My Predictions
          </button>
        )}
       
        <button
          className={`tab${tab === "questions" ? " active" : ""}`}
          onClick={() => setTab("questions")}
        >
          🎯 Questions
        </button>


        {user.isAdmin && (
          <>
            <button className={`tab${tab === "addMatches" ? " active" : ""}`} onClick={() => setTab("addMatches")}>➕ Add Matches</button>
            <button className={`tab${tab === "results" ? " active" : ""}`} onClick={() => setTab("results")}>🏁 Add Results</button>
            <button className={`tab${tab === "notes" ? " active" : ""}`} onClick={() => setTab("notes")}>📢 Notes</button>
            <button className={`tab${tab === "bonus" ? " active" : ""}`} onClick={() => setTab("bonus")}>Add Bouns Questions</button>
            <button
              className={`tab${tab === "allPredictions" ? " active" : ""}`}
              onClick={() => setTab("allPredictions")}
            >
               Players Predictions
            </button>
            <button
              className={`tab${
                tab === "banner"
                  ? " active"
                  : ""
              }`}
              onClick={() =>
                setTab("banner")
              }
            >
              🖼 Banner
            </button>
          </>
        )}
      </nav>

      {/* Note banner shown on matches tab only */}
      {notes.length > 0 && tab === "matches" && noteVisible && (
        <div className="notice-banner" style={{ maxWidth: 860, margin: "16px auto 0" }}>
          ✦ {notes[noteIndex]?.message}
        </div>
      )}

      {tab === "matches"     && <Matches user={user} banner={banner} matchesProp={matches} predictionsProp={userPredictions} />}
      {tab === "leaderboard" && <Leaderboard username={user.username} banner={banner} data={leaderboard} />}
      {tab === "standings"   && <Standings matches={matches} />}
      {tab === "todayPreds"  && <TodaysPredictions matches={matches} predictions={allPredictions} />}
      {tab === "lastMatch"   && <LastDayMatches matches={matches} predictions={allPredictions} />}
      {tab === "bonusPreds"  && <AllBonusPredictionsTab questions={bonusQuestions} bonusPreds={allBonusPredictions} />}

      {!user.isAdmin && tab === "myPredictions" &&
        <MyPredictions user={user} matches={matches} predictions={Object.values(userPredictions)} bonusAnswers={bonusAnswersArr} questions={bonusQuestions} />
      }
      {tab === "allPredictions" && user.isAdmin &&
        <AllPredictions matches={matches} predictions={allPredictions} bonusPredictions={allBonusPredictions} questions={bonusQuestions} />
      }
      {tab === "questions" && <QuestionsPage user={user} questions={bonusQuestions} savedAnswers={bonusAnswersMap} />}
      {tab === "addMatches"  && <AdminPanel section="addMatches" matches={matches} predictions={allPredictions} />}
      {tab === "results"     && <AdminPanel section="results"    matches={matches} predictions={allPredictions} />}
      {tab === "notes"       && <AdminPanel section="notes"      matches={matches} predictions={allPredictions} />}
      {tab === "bonus"       && <AdminPanel section="bonus"      matches={matches} predictions={allPredictions} />}
      {tab === "banner" && (
        <AdminPanel
          section="banner"
          matches={matches}
          predictions={allPredictions}
        />
      )}
    </div>
  );
}