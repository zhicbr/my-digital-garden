---
title: How to use Quartz 
date: 2026-02-17
---

## Quartz 

### 自动化批处理脚本

配置好后（Obsidian+Quartz+Git+Vercel+Aliyun DNS）

以后的更新流程只需要运行以下命令：

```
npx quartz sync
```

本质是自动执行以下三个步骤，推送到github云端后，会触发Vercel的自动构建：

```
git add .
git commit -m "Quartz sync: <自动生成的时间戳>"
git push
```

或者带上-m，例如：

```
npx quartz sync -m "修复了主页的外部链接图标，并添加了 Bento Box 布局"
```



### 本地初始化 Quartz 项目

```
git clone https://github.com/jackyzha0/quartz.git my-digital-garden

npm i
```



### 与 Obsidian 建立连接

#### 打开仓库

使用Obsidian打开Quartz 项目中的 content 文件夹为一个仓库即可。

#### 新建index.md

在content下新建一个index.md文件，作为网站首页。



### 本地预览网站

```
npx quartz build --serve
```



### Quartz 稍作修改

见：`feat: init my own digital garden`

#### pageTitle

`路径：Quartz\my-digital-garden\quartz.config.ts`

将网站左上角的名字`Quartz 4`修改为自己的标识



#### links

路径：`Quartz\my-digital-garden\quartz.layout.ts`

删除 `links: { }`里的去掉 GitHub 和 Discord 链接



#### footer

路径：`Quartz\my-digital-garden\quartz\components\Footer.tsx`

删除`Created with Quartz`，改成自己的



#### custom.scss

路径：`Quartz\my-digital-garden\quartz\styles\custom.scss`

添加自己的样式

```
//让标识符为 index 的页面里的元数据（日期和阅读时间）不显示，即首页无需显示元数据。
body[data-slug="index"] .content-meta {
  display: none;
}
```



### 推送到github

#### 解绑原作者仓库

```
git remote remove origin
```

#### 绑定自己的仓库

```
git remote add origin https://github.com/zhicbr/my-digital-garden.git
```

####  提交并推送

```
git add .

git commit -m "feat: init my own digital garden"

git push -u origin v4
```



## Obsidian设置

### 目的

Obsidian仅仅做管理，编辑使用Typora，因此要统一链接图片格式，并且能在Obsidian快速打开Typora

### 图片链接格式

打开 Obsidian 的 **设置 (Settings) -> 文件与链接 (Files and Links)**：

**关闭维基链接：**

找到 `使用 WIKI链接`，将其**关闭**。以后在 Obsidian 里拖入图片或链接文件时，它会自动生成 Typora 能识别的标准 []() 语法。

**设置相对路径：**

找到 `内部链接类型`，选择 **基于当前笔记的相对路径 **。

**统一图片存放文件夹：**

找到 `附件默认存放路径`，选择 **指定的附件文件夹**，附件文件夹路径设置为`assets`，与Typora保持一致。

### 默认应用打开

设置->快捷键，进行如下设置

默认应用打开：

`Alt + O` 和 `Ctrl + Shift + O`

 

## Vercel

### 授权并导入github仓库

使用登录Vercel

进入 Vercel 的控制台主页。点击右上角黑色的 **Add New...** 按钮，选择 **Project**。

在左侧下方的 "Import Git Repository" 中，授权github，选择上面创建的github仓库并import项目

Project Name不用改，会作为免费分配域名的前缀

Application Preset选择`other`

Build Command填写`npx quartz build`

Install Command填写`npm install`

项目页：https://vercel.com/2819579394-qqcoms-projects

本项目：https://vercel.com/2819579394-qqcoms-projects/my-digital-garden

### 使用自己的域名绑定项目

#### Vercel

进入Domains，点击Add Existing

在弹窗中填写自己的域名：`garden.zhicbr.space`,其中garden是子域名

Save后会显示红色警告Invalid Configuration，因为此时阿里云还没进行配置，Vercel 暂时还找不到这个域名。

此时点击`DNS Records`标签页，注意不是Vercel DNS	

复制`Value`字段：xxx.xxx.com

#### Aliyun

[云解析DNS](https://dnsnext.console.aliyun.com/authoritative/domains/zhicbr.space)

云解析 DNS--->权威域名解析--->解析设置，点击添加记录

记录类型Type，选择`CNAME`（即将域名指向另外一个域名）

主机记录选择`garden`（不用写后面的域名）

记录值选择刚才的`Value`

点击确定即可。



## Quartz 项目结构&原理

### Quartz 本质

极其现代化的 **静态网站生成器 (Static Site Generator, SSG)**。

它的核心使命只有一个：**完美无缝地将你的 Obsidian 个人知识库，转化为一个可以通过浏览器访问的“数字花园 (Digital Garden)”。**

- **传统博客的逻辑是“时间流”：** 就像一本日记，按照时间顺序排列，旧文章很容易被遗忘。
- **Quartz 的逻辑是“网状知识”：** 它原生支持 Obsidian 的 `[[双向链接]]` 语法。它鼓励你把笔记打碎，通过链接像神经元一样连接起来，最终在网页上生成一个极其炫酷的**知识关系图谱（Graph View）**。

### 现代技术栈 

**核心语言：** TypeScript

**编译引擎：** 使用了基于 Go 语言编写的 **esbuild**

**前端框架：**  **Preact**

**Markdown 解析：** 基于底层的 `remark` 和 `rehype` 抽象语法树（AST）生态

### 源码目录结构

- **`content/` (即笔记数据库)**：存放纯文本的 `.md` 文件和图片
- **`quartz/` (底层引擎与组件库)**：
  - `components/`：用 Preact 写的各种网页积木（比如侧边栏、搜索框、目录树）。
  - `styles/`：全站的 CSS 样式文件，之前修改的 `custom.scss` 就在这里。
- **`quartz.config.ts` (全局属性)**：控制整个网站的“宏观属性”。比如网站的名字、全局使用什么字体、日间/夜间模式的主题色等。
- **`quartz.layout.ts` (页面骨架)**：控制网页的“排版”。你可以在这里决定左边栏放什么组件（比如最近更新），右边栏放什么组件（比如文章目录和知识图谱）。



## Quartz 管理

### 前置元数据Frontmatter

控制笔记的样式、路由、分类等

#### 示例

```
---
title: 网页标题
date: 2026-02-17
aliases:
  - 别名1
  - 别名2
tags:
  - 后端/架构
  - 日常踩坑
draft: false
cssclasses:
  - disable-meta
permalink: /my-cool-post
---
```

#### 详细解释

`title`:

​	默认为文件名

`Date`:

​	**第一顺位：Frontmatter**

​	**第二顺位：Git 提交历史** ，若 `git add/commit` 了，Quartz 就会读取它第一次被提交进 Git 的时间。

​	**第三顺位：操作系统的文件创建时间**，未提交 Git ， Quartz 显示Windows 系统里这个 `.md` 文件的创建时间。

**`aliases` (别名)**：

​	双向链接时不仅匹配标题，也匹配别名

**`tags` (标签)**：

​	默认抓取正文里的#

​	使用顶部tags：顶部进行严格分类管理

**`draft: true` (草稿模式)**：

​	默认全部公开

​	只要加上 `draft: true`。本地预览能看到，但外网绝对看不见。写完再改成 `false`

**`permalink: /xxx` (自定义路径)**：

​	默认路径为：本地的文件树结构映射为网站 URL	

​	自定义路径：将（如果标题或者文件名是中文）中文网址改为自定义的英文
