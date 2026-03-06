---
title: How to Rename a GitHub Repository
date: 2026-03-05
tags: 
  - git/github
  - tutorial
ai-assisted: true
---

## 修改 GitHub 上的仓库名（云端）

这是最简单的部分。

1. 进入你想改名的 GitHub 仓库主页。
2. 点击上方的 **Settings**（设置）。
3. 在第一项 **General**（常规）里，直接在 **Repository name** 框里输入新名字。
4. 点击旁边的 **Rename**（重命名）按钮即可。

## 更新本地的远程地址（本地）

虽然 GitHub 很聪明，你在云端改名后，它会自动把旧地址的请求重定向到新地址，但为了避免日后出现奇怪的同步报错，**必须更新本地电脑里的远程连接地址**。

打开你的终端（Terminal 或命令提示符），使用 `cd` 命令进入你本地的博客或图片文件夹，然后依次执行：

首先，确认一下当前的旧地址：

```
git remote -v
```

然后，将本地仓库关联到新的 GitHub 地址（请把链接替换为你改名后的真实链接）：

```
git remote set-url origin https://github.com/你的用户名/你的新仓库名.git
```

再次输入 `git remote -v` 确认一下，只要显示的是新名字，本地这部分就搞定了。



## 更改本地文件夹名称

改成你的新仓库名即可。

## 更新第三方工具的配置

如果部署或者使用了第三方，则需要一并修改。

### Vercel

#### 修改 Vercel 上的项目名称（纯显示作用）

1. 登录 Vercel，进入你的这个博客项目仪表盘（Dashboard）。
2. 点击顶部的 **Settings**（设置）。
3. 在左侧菜单选择 **General**（常规）。
4. 找到 **Project Name**（项目名称），把它改成你的新名字 。
5. 点击 **Save**（保存）。

####  更新关联的 GitHub 仓库名称（实际不需要自己改，确认以下即可）

为了确保万无一失，让 Vercel 彻底认识你的新仓库名：

1. 依然在 **Settings** 页面，点击左侧菜单的 **Git**。
2. 在 **Connected Git Repository** 区域，你会看到它连着的还是旧名字。点击旁边的 **Disconnect**（断开连接）。
3. 断开后，马上重新点击 **Connect**，然后在弹出的 GitHub 仓库列表里，搜索并选中你改名后的 `zhicbr-quartz-blog` 重新连上即可。

### PicGo

打开 PicGo 的设置，找到 GitHub 图床的配置项，把里面的“仓库名”从旧名字更新为新名字（例如从 `用户名/old-name` 改为 `用户名/new-name`），保存并设为默认。

