---
title: Obsidian 语法效果演示
description: 展示 Quartz 对 Obsidian 特有语法的渲染效果
tags:
  - Obsidian
  - 测试
publish: true
---

# Obsidian 语法效果演示

这篇笔记展示了 Obsidian 的各种语法在 Quartz 中的渲染效果。你可以对照源码看效果。

## 双链

Obsidian 最核心的功能就是双链。在 Obsidian 中写 `[[posts/hello-quartz]]` 会变成一个可点击的链接：[[posts/hello-quartz]]。

Quartz 还会自动在页面右侧生成「反向链接」面板，显示哪些笔记引用了当前笔记。

## Callout 提示框

Obsidian 的 Callout 语法 `> [!type]` 会被渲染成彩色提示框：

> [!note] 这是一个 note 类型的提示
> 用于补充说明、额外信息

> [!tip] 这是一个 tip 类型的提示
> 用于分享技巧和最佳实践

> [!warning] 这是一个 warning 类型的提示
> 用于提醒注意事项

> [!info] 这是一个 info 类型的提示
> 用于提供背景知识

> [!danger] 这是一个 danger 类型的提示
> 用于警告潜在风险

## 代码高亮

```python
def fibonacci(n):
    """生成斐波那契数列"""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(10))
```

```javascript
// React 组件示例
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

## 标签

这篇笔记打了 `#Obsidian` 和 `#测试` 标签。Quartz 会自动生成标签页面，点击标签可以查看所有同标签的文章。

## 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## 表格

| 功能 | Obsidian 原生 | Quartz 渲染 |
|------|:---:|:---:|
| 双链 | ✅ | ✅ |
| Callout | ✅ | ✅ |
| 标签 | ✅ | ✅ |
| 反向链接 | ✅ | ✅ |
| 关系图谱 | ✅ | ✅ |

## 相关笔记

- [[posts/hello-quartz|用 Quartz 搭建 Obsidian 博客]]
