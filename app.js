// 作品站：读同目录 games.json，渲染卡片。
// 加新游戏 = 在 games.json 的 games 数组里加一条，不用改这个文件。

const KIND_ORDER = ["pc", "android", "web"];

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

function renderDownload(key, d) {
  const a = el("a", "dl");
  const ready = d && d.url;
  if (!ready) a.classList.add("off");
  else a.href = d.url;
  a.appendChild(el("span", "k", (d && d.label) || key));
  a.appendChild(el("span", "s", (d && d.size) || ""));
  return a;
}

function renderGame(g) {
  const card = el("article", "game");

  const head = el("div", "game-head");
  const cover = el("div", "cover");
  if (g.cover) cover.style.backgroundImage = `url("${g.cover}")`;
  head.appendChild(cover);

  const titles = el("div", "titles");
  titles.appendChild(el("h2", null, g.name));
  const meta = el("div", "meta");
  meta.innerHTML = `<b>${g.version || ""}</b>　更新 ${g.date || ""}　${g.tag || ""}`;
  titles.appendChild(meta);
  head.appendChild(titles);
  card.appendChild(head);

  card.appendChild(el("p", "desc", g.desc || ""));

  if (Array.isArray(g.highlights) && g.highlights.length) {
    const ul = el("ul", "highlights");
    g.highlights.forEach(h => ul.appendChild(el("li", null, h)));
    card.appendChild(ul);
  }

  const dl = el("div", "downloads");
  KIND_ORDER.forEach(k => {
    if (g.downloads && g.downloads[k]) dl.appendChild(renderDownload(k, g.downloads[k]));
  });
  card.appendChild(dl);

  if (Array.isArray(g.changelog) && g.changelog.length) {
    card.appendChild(el("div", "log-title", "更新日志"));
    const log = el("div", "log");
    g.changelog.forEach(c => {
      const row = el("div");
      row.appendChild(el("b", null, c.version || ""));
      row.appendChild(document.createTextNode(`${c.date || ""}　${c.note || ""}`));
      log.appendChild(row);
    });
    card.appendChild(log);
  }

  return card;
}

async function main() {
  const list = document.getElementById("games");
  try {
    const data = window.SITE_DATA || await (await fetch("games.json", { cache: "no-store" })).json();


    if (data.site) {
      document.title = data.site.name || document.title;
      document.getElementById("site-title").textContent = data.site.name || "";
      document.getElementById("site-sub").textContent = data.site.title || "";
      document.getElementById("site-desc").textContent = data.site.subtitle || "";
      document.getElementById("site-footer").textContent = data.site.footer || "";
    }

    (data.games || []).forEach(g => list.appendChild(renderGame(g)));
  } catch (e) {
    list.appendChild(el("p", "desc", "读不到 games.json —— 直接双击 index.html 时浏览器会拦本地文件读取，用本地服务器打开就好。"));
    console.error(e);
  }
}

main();
