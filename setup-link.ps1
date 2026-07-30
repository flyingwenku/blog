# ============================================================
# Setup Obsidian <-> GitHub Blog Link
# 在 Obsidian 知识库下创建 github_blog 目录链接, 指向本仓库的 content/
# 用法: 在本仓库目录下运行 powershell -ExecutionPolicy Bypass -File setup-link.ps1
# ============================================================

$repoPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$contentPath = Join-Path $repoPath "content"

Write-Host ""
Write-Host "=== Setup Obsidian <-> GitHub Blog Link ===" -ForegroundColor Cyan
Write-Host "Repo content path: $contentPath"
Write-Host ""

# 检查 content 目录是否存在
if (!(Test-Path $contentPath)) {
    Write-Host "Error: content/ directory not found in repo!" -ForegroundColor Red
    Write-Host "Make sure you are running this from the blog repo root." -ForegroundColor Red
    exit 1
}

# 输入 Obsidian 知识库路径
$vaultPath = Read-Host "Enter your Obsidian vault root path"

# 去除末尾的反斜杠和引号
$vaultPath = $vaultPath.TrimEnd('\').TrimEnd('/').Trim('"').Trim("'")

if (!(Test-Path $vaultPath)) {
    Write-Host "Error: Path not found: $vaultPath" -ForegroundColor Red
    exit 1
}

# 检查是否是 Obsidian 知识库 (有 .obsidian 目录)
$obsidianDir = Join-Path $vaultPath ".obsidian"
if (!(Test-Path $obsidianDir)) {
    Write-Host "Warning: No .obsidian folder found. Are you sure this is an Obsidian vault?" -ForegroundColor Yellow
    $confirm = Read-Host "Continue? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit 0
    }
}

$linkPath = Join-Path $vaultPath "github_blog"

# 如果已存在, 先删除
if (Test-Path $linkPath) {
    Write-Host "github_blog already exists, removing old link..." -ForegroundColor Yellow
    (Get-Item $linkPath).Delete()
}

# 创建 Junction (不需要管理员权限, 效果等同 SymbolicLink)
try {
    New-Item -ItemType Junction -Path $linkPath -Target $contentPath -ErrorAction Stop | Out-Null
    Write-Host ""
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host "  Link:   $linkPath"
    Write-Host "  Target: $contentPath"
    Write-Host ""
    Write-Host "Now you can:" -ForegroundColor Cyan
    Write-Host "  1. Open Obsidian, edit files under 'github_blog' folder"
    Write-Host "  2. Run publish.ps1 to push changes to GitHub"
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "FAILED: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try running PowerShell as Administrator." -ForegroundColor Yellow
}
