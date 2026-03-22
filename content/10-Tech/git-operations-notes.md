---
title: Git 相关操作
date: 2026-03-08
tags:
  - git
---

## 撤销上一个commit（本地）

### 1. 撤销 commit，但保留代码修改并保持在暂存区（推荐）

修改一下 commit message，或者想补充几个文件重新提交，可以使用 `--soft` 参数。

这会撤销 commit，但你修改的代码依然保留在工作区，并且已经是 `git add` 过的状态。

```
git reset --soft HEAD~1
```

### 2. 撤销 commit，保留代码修改但移出暂存区（默认）

撤销 commit，并且需要重新整理哪些文件需要被提交（撤销 `git add` 状态），可以使用 `--mixed` 参数（这也是不带参数时的默认行为）。你的代码修改会完好无损地留在工作区。

```
git reset HEAD~1
```

### 3. 彻底撤销 commit，并丢弃所有代码修改（危险）

如果你觉得上一个 commit 的代码完全写错了，想要直接把代码恢复到上一次提交前的状态，可以使用 `--hard` 参数。

> **注意：** 此操作会永久删除你上一个 commit 中修改的本地代码，请务必确认你不再需要这些代码。

```
git reset --hard HEAD~1
```

------

**提示：** 命令中的 `HEAD~1` 代表当前所在的 commit 的上一个版本。如果你想撤销最近的两个 commit，可以把它改成 `HEAD~2`。



## 将本地仓库关联到 GitHub 的空仓库

将本地仓库关联到 GitHub 的空仓库是一个标准流程，主要分为配置关联和推送代码两个阶段。

### 1. 获取 GitHub 仓库地址

在 GitHub 上创建好空仓库后，在仓库的主页找到并复制它的地址。

你可以选择 HTTPS 格式（如 `https://github.com/用户名/仓库名.git`）或 SSH 格式（如 `git@github.com:用户名/仓库名.git`）。

### 2. 确保本地代码已提交

如果你的本地项目还没有初始化 Git，或者有代码尚未提交，请先在项目根目录下执行以下命令：

```
git init
```

```
git add .
```

```
git commit -m "Initial commit"
```

### 3. 关联远程仓库

使用 `git remote add` 命令将你的本地仓库与刚才复制的 GitHub 地址关联起来。

通常我们将远程仓库命名为 `origin`。请将命令中的 `<你的仓库地址>` 替换为你实际复制的链接：

```
git remote add origin <你的仓库地址>
```

确认

```
git remote -v
```

### 4. 统一主分支名称（推荐）

目前 GitHub 默认的主分支名称为 `main`，而本地 Git 初始化的默认分支可能还是 `master`。

为了避免冲突，建议将本地分支重命名为 `main`：

```
git branch -M main
```

### 5. 推送本地代码到 GitHub

最后，将本地代码推送到 GitHub 的 `main` 分支。

`-u` 参数（或 `--set-upstream`）的作用是将本地的 `main` 分支与远程的 `origin/main` 分支关联起来，以后你只需要直接输入 `git push` 即可。

```
git push -u origin main
```





## 修改github仓库名

见[如何修改github仓库名](how-to-rename-github-repository.md)



## 如何下载github仓库中的某个文件夹

### 第三方网页工具

**DownGit**: `https://minhaskamal.github.io/DownGit/#/home`

**GitDown**: `https://gitdown.dev/`

### 使用 SVN 命令行工具（没试过）

如果你电脑上安装了 `svn` (Subversion)，可以直接用一行命令把这个文件夹拉取下来，不需要克隆整个仓库。

你需要把 GitHub 网址中的 `tree/main`（或 `tree/master`）替换为 `trunk`。

假设所在分支是 `main`，你可以直接在终端运行以下命令：

```
svn export https://github.com/AstrBotDevs/AstrBot/trunk/docs/zh/dev/star
```

### 使用 Git Sparse-Checkout（Git 原生方案）（没试过）

如果你想用纯 Git 命令，并且保留 Git 仓库的特性（方便以后更新），可以使用 Git 的“稀疏克隆”功能。这只会下载你指定的文件夹：

依次在终端执行以下命令：

```
git clone --no-checkout https://github.com/AstrBotDevs/AstrBot.git
cd AstrBot
git sparse-checkout init --cone
git sparse-checkout set docs/zh/dev/star
git checkout
```

执行完毕后，你的本地仓库里就只会有 `docs/zh/dev/star` 这个目录里的文件了。

### 浏览器插件

GitZip for github

## vscode插件

### Git Graph

### GitLens

适用于团队工作，功能如下：

#### 1. 实时行内 Blame (Current Line Blame)

这是 GitLens 最出名的功能。当你把光标停留在任意一行代码上时，当前行的末尾会以浅色字体自动显示：**这行代码的作者是谁、几年前/几个月前提交的、以及当时的 Commit 信息。**

- **痛点解决：** 当你看到一行极其奇怪的 Bug 代码准备骂人时，它能立刻告诉你这到底是谁写的（很多时候你会发现是半年前的自己写的）。

#### 2. 强大的悬浮提示 (Rich Hovers)

如果你对行尾的那句简短提示感兴趣，只要把鼠标悬停上去，就会弹出一个信息丰富的面板：

- 完整的 Commit Message。
- 这行代码修改前后的 Diff（差异对比）。
- 一个快捷链接，可以直接跳转到 GitHub/GitLab 上的对应 PR（Pull Request）或 Issue。

#### 3. 文件与代码块的时间旅行 (File & Line History)

如果你想知道某个函数是怎么一步步演变成今天这个鬼样子的，GitLens 可以让你针对**某一个文件**甚至**选中的某几行代码**，查看它们专属的演变历史，而不是去翻整个项目的巨大时间线。

#### 4. 代码透镜 (Code Lens)

它会在你的函数或类名上方，自动添加一行灰色小字，告诉你：“这个函数最近由张三修改过，共有 4 个作者参与过”。点击这行字，就能看到这个函数的所有修改记录。

### Conventional Commits

提供了一个引导式的表单面板，只要点几下鼠标，就能帮你生成符合行业标准（如 `feat: 增加登录功能`、`fix: 修复空指针异常`）的规范化 Commit Message。





## Github登录免密钥配置（IDEA）

### IDEA 的密码保存策略

 `File` -> `Settings`

`Appearance & Behavior` -> `System Settings` -> `Passwords`‘

勾选：

- **In native Keychain** ( macOS 或 Linux)
- **In KeePass** (是 Windows，系统会自动在 IDEA 配置目录下生成一个密码库文件)

**不要**选择 `Do not save, forget passwords after restart`。

### 开启 Git 凭据助手

让 IDEA 的底层 Git 操作直接使用系统自带的密码管理器

 `File` -> `Settings`  -> `Version Control` -> `GitHub`

查看右侧列表，如果有账号，选中它并点击 `-` 号（减号）将它删除，清除旧的缓存。

点击 `+` 号重新添加账号。

这里有两个选项：

- **Log In via GitHub...**: 网页授权登录（推荐普通用户使用）。
- **Log In with Token...**: 使用 GitHub 的 Personal Access Token 登录（推荐高级用户使用，即使你的网络环境不稳定，Token 登录也更可靠）。

按照提示完成登录。

