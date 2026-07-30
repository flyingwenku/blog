// 左下角固定工具栏: ☰ (目录折叠) + 主题切换
// darkmode 按钮带 class="darkmode", Quartz darkmode inline 脚本会自动绑定点击事件
function setupToolbar() {
  if (document.querySelector(".toolbar-fixed")) return

  const container = document.createElement("div")
  container.className = "toolbar-fixed"

  // ☰ 目录折叠按钮
  const toggleBtn = document.createElement("button")
  toggleBtn.type = "button"
  toggleBtn.className = "sidebar-toggle"
  toggleBtn.setAttribute("aria-label", "切换目录")
  toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-open")
    document.body.classList.toggle("sidebar-collapsed")
    syncToggleAria(toggleBtn)
  })

  // 主题切换按钮 (class="darkmode" 让 Quartz darkmode inline 脚本自动绑定)
  const darkBtn = document.createElement("button")
  darkBtn.type = "button"
  darkBtn.className = "darkmode"
  darkBtn.setAttribute("aria-label", "切换主题")
  // 太阳图标 (dayIcon) + 月亮图标 (nightIcon)
  // darkmode 组件 CSS 根据 :root[saved-theme] 控制显隐
  darkBtn.innerHTML = `<svg class="dayIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg class="nightIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`

  container.appendChild(toggleBtn)
  container.appendChild(darkBtn)
  document.body.appendChild(container)

  syncToggleAria(toggleBtn)
}

function syncToggleAria(btn: HTMLButtonElement) {
  const isOpen = !document.body.classList.contains("sidebar-collapsed")
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false")
}

// 立即执行 (afterDOMLoaded 时 DOM 已就绪, readyState 不是 loading)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupToolbar)
} else {
  setupToolbar()
}

// SPA 切换页面时重新确保工具栏存在
document.addEventListener("nav", setupToolbar)
document.addEventListener("render", setupToolbar)
