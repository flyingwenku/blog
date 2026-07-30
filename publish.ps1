# ============================================================
# Publish: git add + commit + push
# 在 Obsidian 编辑完文章后, 运行此脚本一键发布
# 用法: 在本仓库目录下运行 powershell -ExecutionPolicy Bypass -File publish.ps1
# ============================================================

$repoPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "=== Publish to GitHub ===" -ForegroundColor Cyan

Set-Location $repoPath

# 检查是否有改动
Write-Host "Checking for changes..." -ForegroundColor Yellow
$status = git status --short

if (!$status) {
    Write-Host "No changes to publish." -ForegroundColor Green
    Write-Host ""
    exit 0
}

# 显示改动的文件
Write-Host ""
Write-Host "Changed files:" -ForegroundColor Yellow
Write-Host $status
Write-Host ""

# 输入 commit message
$msg = Read-Host "Enter commit message (or press Enter for auto)"

if (!$msg) {
    $msg = "publish at $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

# 执行 git 操作
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan

git add -A
git commit -m $msg
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "DONE! Wait 1-2 min for GitHub Actions to deploy." -ForegroundColor Green
    Write-Host "Site: https://flyingwenku.github.io/blog/" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Push FAILED. Check the error above." -ForegroundColor Red
    Write-Host ""
}
