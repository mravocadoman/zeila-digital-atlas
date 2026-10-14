// Reliable page captures via the Chrome DevTools Protocol.
// Usage: node shoot.mjs URL OUTDIR WIDTH HEIGHT [scrollTarget ...]
// scrollTarget: a number (px), "#id" (element top), or "#id+px" (offset after the element top).
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, out, w, h, ...targets] = process.argv.slice(2);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", "--remote-debugging-port=9333", "--hide-scrollbars", "--disable-gpu",
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "shoot-"))}`, "about:blank",
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 40 && !ws; i++) {
  try {
    const list = await (await fetch("http://127.0.0.1:9333/json")).json();
    const page = list.find((t) => t.type === "page");
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch { await sleep(250); }
}
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result ?? msg.error); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const evalJs = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }))?.result?.value;

const mobile = Number(w) < 768;
await send("Emulation.setDeviceMetricsOverride", { width: Number(w), height: Number(h), deviceScaleFactor: 1, mobile });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(3500);
// Load every lazy image up front so captures aren't racing the network.
await evalJs(`Promise.all([...document.images].map(i => { i.loading = "eager"; return i.decode().catch(() => {}); }))`);
await sleep(800);

const shots = targets.length ? targets : ["0"];
for (const [n, t] of shots.entries()) {
  const y = await evalJs(`(() => {
    const t = ${JSON.stringify(t)};
    if (!t.startsWith("#")) return Number(t);
    const [sel, off] = t.split("+");
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().top + scrollY + Number(off || 0) : 0;
  })()`);
  // Scroll in small steps so scroll listeners, observers and scroll timelines all see it.
  await evalJs(`(async () => { const to = ${y}; const from = scrollY; for (let i = 1; i <= 12; i++) { scrollTo(0, from + (to - from) * i / 12); await new Promise(r => setTimeout(r, 40)); } })()`);
  await sleep(1600);
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  const file = join(out, `shot-${w}-${String(n).padStart(2, "0")}.png`);
  writeFileSync(file, Buffer.from(data, "base64"));
  console.log(file, "y=" + Math.round(y));
}
ws.close();
chrome.kill();
