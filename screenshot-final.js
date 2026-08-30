const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });

  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const dp = await desktop.newPage();
  await dp.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await dp.screenshot({ path: "/home/claude/cdcs-website/screenshots/home-desktop.png" });
  await dp.goto("http://localhost:4173/services/pressure-washing/", { waitUntil: "networkidle" });
  await dp.screenshot({ path: "/home/claude/cdcs-website/screenshots/service-detail-desktop.png" });
  await dp.goto("http://localhost:4173/quote/", { waitUntil: "networkidle" });
  await dp.screenshot({ path: "/home/claude/cdcs-website/screenshots/quote-desktop.png" });

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mp = await mobile.newPage();
  await mp.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await mp.screenshot({ path: "/home/claude/cdcs-website/screenshots/home-mobile.png", fullPage: true });

  await browser.close();
  console.log("done");
})();
