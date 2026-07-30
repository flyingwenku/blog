// docsify 风格的侧边栏折叠按钮
// PC 端: 点击后整个 sidebar 收起 (body.sidebar-collapsed), 按钮移到页面左上角
// 移动端: 点击后从左侧滑出 fixed sidebar (body.sidebar-open)
function setupSidebarToggle() {
  // 避免重复创建
  if (document.querySelector(".sidebar-toggle")) return

  const btn = document.createElement("button")
  btn.className = "sidebar-toggle"
  btn.type = "button"
  btn.setAttribute("aria-label", "切换目录")
  btn.setAttribute("aria-expanded", "true")
  // 菜单图标: 三条横线
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`

  // 初始化: 同步 aria 状态
  syncAria(btn)

  btn.addEventListener("click", () => {
    // 移动端 (CSS 控制在移动端才生效) -> 切换 sidebar-open
    // 桌面端 -> 切换 sidebar-collapsed
    // 两个 class 互不冲突, 可同时存在
    document.body.classList.toggle("sidebar-open")
    document.body.classList.toggle("sidebar-collapsed")
    syncAria(btn)
  })

  document.body.appendChild(btn)
}

function syncAria(btn: HTMLButtonElement) {
  // collapsed 状态优先: 一旦折叠, 视为关闭
  const isOpen = !document.body.classList.contains("sidebar-collapsed")
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false")
}

// 立即执行一次 (不依赖 nav 事件, 因为 SPA router 可能在监听器注册前已派发 nav)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupSidebarToggle)
} else {
  setupSidebarToggle()
}

// SPA 切换页面时也重新确保按钮存在
document.addEventListener("nav", setupSidebarToggle)
document.addEventListener("render", setupSidebarToggle)
