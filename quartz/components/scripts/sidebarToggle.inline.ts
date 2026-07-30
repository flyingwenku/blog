// 左下角固定工具栏: ☰ (目录折叠) + 主题切换
// 主题切换逻辑自己实现, 不依赖 Quartz darkmode 组件 (已禁掉, 避免它在 sidebar 顶部重复渲染)

type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

// 立即执行一次: 读取 localStorage, 设置 saved-theme (在工具栏 UI 创建之前,
// 避免 darkmode 图标先按默认 dayIcon 渲染, 后被覆盖闪一下)
;(function applyInitialTheme() {
  const prefers = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
  const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? prefers
  document.documentElement.setAttribute("saved-theme", saved)
  document.body.classList.remove("theme-dark", "theme-light")
  document.body.classList.add(`theme-${saved}`)
})()

function setTheme(theme: Theme, dispatchEvent = true) {
  document.documentElement.setAttribute("saved-theme", theme)
  localStorage.setItem(STORAGE_KEY, theme)
  document.body.classList.remove("theme-dark", "theme-light")
  document.body.classList.add(`theme-${theme}`)
  if (dispatchEvent) {
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }))
  }
}

function setupToolbar() {
  if (document.querySelector(".toolbar-fixed")) {
    // 已存在, 只需要重新绑定 darkmode 按钮 (SPA 切换时)
    bindDarkmode()
    return
  }

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

  // 主题切换按钮 (class="darkmode" 复用 Quartz darkmode 组件的 CSS 显隐规则)
  const darkBtn = document.createElement("button")
  darkBtn.type = "button"
  darkBtn.className = "darkmode"
  darkBtn.setAttribute("aria-label", "切换主题")
  darkBtn.innerHTML = `<svg class="dayIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg class="nightIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`

  container.appendChild(toggleBtn)
  container.appendChild(darkBtn)
  document.body.appendChild(container)

  bindDarkmode()

  // 工具栏已就绪, 设为可见 (避免页面渲染时按 light 主题显示 dayIcon 后闪烁)
  container.classList.add("ready")

  syncToggleAria(toggleBtn)
}

function bindDarkmode() {
  for (const btn of document.getElementsByClassName("darkmode")) {
    if ((btn as HTMLElement).dataset.bound) continue
    ;(btn as HTMLElement).dataset.bound = "1"
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("saved-theme") as Theme
      setTheme(current === "dark" ? "light" : "dark")
    })
  }
}

function syncToggleAria(btn: HTMLButtonElement) {
  const isOpen = !document.body.classList.contains("sidebar-collapsed")
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false")
}

// 监听系统主题变化
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  // 只在用户没手动选过时跟随系统
  if (!localStorage.getItem(STORAGE_KEY)) {
    setTheme(e.matches ? "dark" : "light", false)
  }
})

// 立即执行 (afterDOMLoaded 时 DOM 已就绪)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupToolbar)
} else {
  setupToolbar()
}

// SPA 切换页面时重新确保工具栏存在
document.addEventListener("nav", setupToolbar)
document.addEventListener("render", setupToolbar)
