---
title: Git Operations Notes
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
