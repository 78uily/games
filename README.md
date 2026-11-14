# 作品站 · 部署说明

## 这是什么

一个纯静态网站：游戏介绍 + 更新日志 + 下载入口（电脑版 / 手机版 / 网页试玩）。

- 不要数据库，不要后端
- 加新游戏 = 改 `games.js` 里一条数据
- 站点自带网页试玩版（`play/backsider/`，43 MB，点开就玩）

## 一键部署（推荐）

双击 `deploy.cmd`，按提示填两项：

1. **你的 GitHub 用户名**
2. **仓库名**（直接回车用 `games`）

脚本会自动 `git init → add → commit → push`，然后打开 Pages 设置页。

**但第一次要先手动建仓库**：

1. 打开 https://github.com/new
2. Repository name 填 `games`
3. 选 **Public**
4. **不要**勾 "Add a README file"（不然会冲突）
5. Create repository

建好后再跑 `deploy.cmd`。

## 开启 Pages

推送成功后：

1. 打开 `https://github.com/<用户名>/games/settings/pages`
2. Source 选 **Deploy from a branch**
3. Branch 选 **main**，目录选 **/ (root)**
4. Save

等 1–2 分钟，站点在：

```
https://<用户名>.github.io/games/
```

## 大文件放哪

| 文件 | 大小 | 放哪 |
|---|---|---|
| 站点 + 网页试玩 | 约 44 MB | 直接进仓库（Pages 上限 1 GB） |
| PC 版压缩包 | 47.8 MB | **GitHub Releases**（单文件上限 2 GB），别塞仓库 |
| 手机 APK | 约 70 MB | 同上，Releases |

发 Release：仓库页 → Releases → Draft a new release → 填版本号 → 拖入 zip → Publish。

拿到直链后，填回 `games.js`：

```js
pc: { label: "电脑版 · Windows", size: "47.8 MB", url: "https://github.com/<用户名>/games/releases/download/v0.3/背对者_v0.3_PC.zip" }
```

## 本地预览（不联网也能看）

```
python -m http.server 8765 --directory .
```

然后浏览器打开 `http://127.0.0.1:8765/`。

> 直接双击 `index.html` 也能看，因为数据内联在 `games.js` 里，不依赖 fetch。

## 文件说明

```
index.html    页面骨架
styles.css    样式（暗底金边）
app.js        渲染逻辑：读 games.js 生成卡片
games.js      游戏数据（加新游戏改这个）
games.json    同一份数据的纯 JSON 版（可选，给服务器用）
assets/       封面图
play/         网页试玩版
deploy.cmd    一键部署脚本
```
