@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 部署到 GitHub Pages

echo ============================================
echo   背对者 / 作品站 一键部署
echo ============================================
echo.

set /p GHUSER=你的 GitHub 用户名（例如 zhangsan）:
if "%GHUSER%"=="" (echo 没填用户名，退出 & pause & exit /b 1)

set /p GHREPO=仓库名（直接回车用 games）:
if "%GHREPO%"=="" set GHREPO=games

echo.
echo 目标：https://github.com/%GHUSER%/%GHREPO%
echo.
echo 注意：仓库必须先在 GitHub 网页上手动创建一次（Public，不要勾 README）
echo        建好后再按任意键继续。
pause >nul

if not exist ".git" (
    echo [1/4] 初始化仓库...
    git init
    git branch -M main
) else (
    echo [1/4] 已有仓库，跳过初始化
)

echo [2/4] 添加文件...
git add -A

echo [3/4] 提交...
git -c user.name="%GHUSER%" -c user.email="%GHUSER%@users.noreply.github.com" commit -m "site: 作品站 + 背对者网页试玩"
if errorlevel 1 echo   （没有新改动，继续）

echo [4/4] 推送...
git remote remove origin 2>nul
git remote add origin https://github.com/%GHUSER%/%GHREPO%.git
git push -u origin main

if errorlevel 1 (
    echo.
    echo 推送失败。常见原因：
    echo   - 还没登录 GitHub（会弹浏览器登录窗，跟着走）
    echo   - 仓库名写错
    echo   - 网络需要代理
    pause
    exit /b 1
)

echo.
echo 推送成功。
echo 现在去打开：https://github.com/%GHUSER%/%GHREPO%/settings/pages
echo    Source 选  Deploy from a branch
echo    Branch 选  main  /  (root)
echo    保存后等 1-2 分钟
echo.
echo 你的站点会是：https://%GHUSER%.github.io/%GHREPO%/
echo.
start https://github.com/%GHUSER%/%GHREPO%/settings/pages
pause
