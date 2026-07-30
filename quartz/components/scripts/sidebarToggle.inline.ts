// docsify 风格的左下角侧边栏折叠按钮
// 桌面端隐藏, 移动端显示; 点击切换 body.sidebar-open 控制左侧 TOC 显隐
function setupSidebarToggle() {
  // 避免重复创建
  if (document.querySelector(".sidebar-toggle")) return

  const btn = document.createElement("button")
  btn.className = "sidebar-toggle"
  btn.type = "button"
  btn.setAttribute("aria-label", "切换目录")
  btn.setAttribute("aria-expanded", "false")
  // 三条横线图标 + 目录线条样式
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`

  btn.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("sidebar-open")
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false")
  })

  document.body.appendChild(btn)
}

document.addEventListener("nav", setupSidebarToggle)
document.addEventListener("render", setupSidebarToggle)
