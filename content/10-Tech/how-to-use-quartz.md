---
title: 如何用Quartz搭建静态博客
date: 2026-02-17
tags: 
  - tutorial
  - quartz	
  - blog
---

## 前提准备

### 软件安装

git
obsidian
vscode(推荐)
typora(推荐)

### 账号注册

github
vercel(或者netlify,cloudflare)
aliyun

以下内容，出现[:small_red_triangle:]​为必做

### 必须解决的问题

图片存储、链接格式/前缀



## Quartz 

### 自动化批处理脚本

配置好后（Obsidian+Quartz+Git+Vercel+Aliyun DNS）

以后的更新流程只需要运行以下命令：

```
npx quartz sync
```

这条命令的本质是自动执行以下三个 Git 步骤。当代码被推送到 GitHub 云端后，便会自动触发 Vercel 的页面构建：

```
git add .
git commit -m "Quartz sync: <自动生成的时间戳>"
git push
```

或者带上-m，例如：

```
npx quartz sync -m "修复了主页的外部链接图标，并添加了 Bento Box 布局"
```

如果push不了，在命令后再执行git push即可。

### [:small_red_triangle:]本地初始化 Quartz 项目

`your-repo-name`换成自己的仓库名称

```
git clone https://github.com/jackyzha0/quartz.git your-repo-name

npm i
```



### [:small_red_triangle:]与 Obsidian 建立连接

#### 打开仓库

在 Obsidian 中，选择「打开文件夹作为库（Open folder as vault）」，并选中 Quartz 项目里的 content 文件夹即可

#### 新建index.md

在content下新建一个index.md文件，作为网站首页。

#### 新建笔记（md）

md文件命名采用烤肉串式命名（连字符命名法），如how-to-use-quartz.md

前置元数据至少有：title，date，tags

### 本地预览网站

```
npx quartz build --serve
```

如果渲染有问题，例如没有顶部的路径，Ctrl+C，然后重新运行上述命令即可。

### Quartz 稍作修改

详见 Git 提交记录：`feat: init my own digital garden`

#### pageTitle

quartz.config.ts`

将网站左上角的名字`Quartz 4`修改为自己的标识



#### links

quartz.layout.ts`

删除 `links: { }`里的GitHub 和 Discord 链接



#### footer

\quartz\components\Footer.tsx`

删除`Created with Quartz`，改成自己的



#### custom.scss

添加自己的样式

```
//让标识符为 index 的页面里的元数据（日期和阅读时间）不显示，即首页无需显示元数据。
body[data-slug="index"] .content-meta {
  display: none;
}
```



### [:small_red_triangle:]​推送到github

#### 解绑原作者仓库

```
git remote remove origin
```

#### 绑定自己的仓库

```
git remote add origin https://github.com/your-repo-name/your-repo-name.git
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

找到 `使用 WIKI链接`，将其**关闭**。以后在 Obsidian 里拖入图片或链接文件时，它会自动生成 Typora 能识别的标准` [how-to-use-quartz](how-to-use-quartz.md)` 语法。

**设置相对路径：**

找到 `内部链接类型`，选择 **基于当前笔记的相对路径 **。

**统一图片存放文件夹：**

找到 `附件默认存放路径`，选择 **指定的附件文件夹**，附件文件夹路径设置为`assets`，与Typora保持一致。

### 自动更新内部链接

设置--> 文件与链接--> 打开`始终更新内部链接`

### 默认应用打开

设置->快捷键，进行如下设置（默认没有，需要自己设置）：

默认应用打开：

`Alt + O` 和 `Ctrl + Shift + O`

 

### 插件Link Converter

可将wiki链接、markdown（相对路径，绝对路径，最短路径）相互转换

#### 安装

在第三方插件

#### 使用

选择markdown格式的相对路径，绝对路径，最短路径之一

设置--> 第三方插件--> Converted Link Format选择（relevant，absolute，shortest）

单个文件转换：右键下方

整个仓库文件转换：

`Ctrl + P` 打开命令面板，输入`Link Converter`（实际上输入L即可）

选择Vault: Links to Markdown，或者Vault: Links to Wiki，即可转换为md格式或Wiki格式。

## Vercel

### [:small_red_triangle:]​授权并导入github仓库

登录Vercel

进入 Vercel 的控制台主页。点击右上角黑色的 **Add New...** 按钮，选择 **Project**。

在左侧下方的 "Import Git Repository" 中，授权github，选择上面创建的github仓库并import项目

Project Name不用改，会作为免费分配域名的前缀

Application Preset选择`other`

Build Command填写`npx quartz build`

Install Command填写`npm install`

### 使用自己的域名绑定项目

#### Vercel

进入Domains，点击Add Existing

在弹窗中填写自己的域名：`blog.your-domain.com`,其中blog是子域名

Save后会显示红色警告Invalid Configuration，因为此时阿里云还没进行配置，Vercel 暂时还找不到这个域名。

此时点击`DNS Records`标签页，注意不是Vercel DNS	

复制`Value`字段：xxx.xxx.com

#### Aliyun

[云解析DNS](https://dnsnext.console.aliyun.com/authoritative/domains/your-domain.com)

云解析 DNS--->权威域名解析--->解析设置，点击添加记录

记录类型Type，选择`CNAME`（即将域名指向另外一个域名）

主机记录选择`blog`（不用写后面的域名）

记录值选择刚才的`Value`

点击确定即可。

稍等片刻即可访问https://garden.your-domain.com/

> [!CAUTION]
>
> Vercel 默认分配的全球边缘节点对中国大陆的访问链路可能不稳定或速度较慢，这是国际网络互连中常见的现象。
>
> 如果不使用魔法，国内访问奇慢无比。
>
> 在aliyun的域名解析控制台，将记录值改成以下内容（专门针对中国大陆优化的备用解析地址）：
>
> **CNAME:** `cname-china.vercel-dns.com`
>
> 更好的选择是将博客也部署在cloudflare，Cloudflare 的边缘节点（CDN）在全球（包括对国内的连通性）比 Vercel 稳健得多，但是目前这个可以接受，如果以后也被墙了，再迁移。



### [:small_red_triangle: ]添加 vercel.json 配置文件

Quartz 默认采用了不带扩展名的简洁链接设计（Clean URL，无技术后缀且语义化，便于阅读和 SEO 优化）。但在 Vercel 部署时，这类无后缀链接容易被错误重定向到 404 页面。添加此配置可以强制 Vercel 精确匹配底层的 .html 文件，而不是显示404页面。

```
{
  "cleanUrls": true,
  "trailingSlash": false
}
```



## Timeline（时间线）组件

### 设计

单独创建一个timeline.md，入口有两种选择

方法一：类似index.md，使用一个单独的按钮进入

方法二：通过在目录里置顶timeline.md。目前选择方法二。

### 代码改动

#### 新建文件

- **`content/timeline.md`**（或你的笔记库对应目录）
  - **作用**：时间线的物理入口页面。只需包含核心元数据`title: Timeline`、 `isTimeline: true`，用于向系统宣告它的特殊身份。
- **`quartz/components/Timeline.tsx`**
  - **作用**：时间线的核心逻辑“大脑”。负责拉取全站笔记、剔除自身、按时间倒序排列、进行“年月”与“日”的双重分组，并最终渲染出带有标题和标签的 HTML 结构。

#### 修改文件

- **`quartz/components/index.ts`**
  - **作用**：组件注册表。在此处导出了新写的组件，让 Quartz 系统能够认识并使用它。
- **`quartz.layout.ts`**
  - **作用**：全局布局与目录规则。
  - 在 `defaultContentPageLayout` 的正文上方（`beforeBody`）注入了 `Component.Timeline()`。
  - 重写了两个 `Component.Explorer()` 的排序逻辑（`sortFn`），利用底层属性 `a.data?.slug === "timeline"` 实现了左侧文件树的“绝对置顶”。
- **`quartz/styles/custom.scss`**
  - **作用**：视觉“精装修”。添加了时间轴的垂直主线、高亮圆点节点、清晰的排版间距，以及解决了悬浮黑屏问题的“小药丸”标签样式。



## AI辅助状态标记组件

### **核心逻辑**

- **数据层 (Markdown 侧)：** 摒弃了会污染全局知识图谱的 Tag 标签，改用笔记头部的 YAML Frontmatter 属性（`ai-assisted: true`）作为唯一的触发开关，实现了“文档元数据”与“内容分类”的严格分离。
- **逻辑层 (TypeScript 侧)：** 新增自定义组件 `AIBadge.tsx`，在 Quartz 的构建阶段（Build step）读取当前文件的 `fileData.frontmatter`。
- **渲染层 (UI/CSS 侧)：** 若检测到 AI 辅助状态为真，则渲染包含 W3C 标准 SVG 矢量图标和响应式 CSS 样式（支持亮暗色主题变量、胶囊圆角、悬停上浮）的 HTML 节点；若为假，则返回 `null`，确保普通页面不产生多余的 DOM 结构。

### **代码改动**

#### 新增文件

- `quartz/components/AIBadge.tsx`：实现核心逻辑、DOM 结构与专属 CSS 样式的封装。

#### 修改文件

- `quartz/components/index.ts`：将新组件注册并暴露给全局上下文。
- `quartz.layout.ts`：在 `defaultContentPageLayout` 中编排页面 UI 结构，将该组件精准挂载至文章标签下方。



## 仓库名称命名（blog、images）

博客和图片的仓库分别改成以下名称

```
https://github.com/your-repo-name/your-repo-name-quartz-blog
https://github.com/your-repo-name/your-repo-name-quartz-images
```

仓库改名见[如何改名github仓库](10-Tech/how-to-rename-github-repository.md)



## 图片存储



### Cloudflare 关联 GitHub 仓库并绑定域名

#### GitHub 准备仓库

新建仓库`your-repo-name-quartz-images`

手动上传一张图片`test.png`，确保仓库不是空的。

#### 在 Cloudflare 创建 Pages 项目

登录 Cloudflare，点击左侧菜单的 **Workers 和 Pages**。

点击 **create application** -> 不要直接创建worker，点击下方的`Looking to deploy Pages？**Get started**` -> **连接到 Git**。

# 选择Import an existing Git repository，选择你刚才创建的图片仓库。

**构建设置**：全部保持默认（因为我们只是存图，不需要编译），直接点击 **保存并部署**。

<img src="https://img.mrx111.site/assets/20260306201110919.png" alt="image-20260306163419774" style="zoom: 33%;" />



#### 将 Aliyun 域名接入 Cloudflare（域名托管）

略，见笔记[]() 



#### 在 Pages 中绑定子域名

在 CF 回到你刚才创建的 Pages 项目界面。

点击 **Custom domains（自定义域）** 选项卡 -> **Set up a custom domain(设置自定义域)**。

输入你预想的图床子域名，例如 `img.example.com`。

点击下一步。如果你的域名已经成功托管在 CF，它会提示“将自动为你添加 CNAME 记录”。这也是直接托管在cloudflare的好处。

点击 **activate domain激活域**。稍等一会。

激活成功后，显示Active

![image-20260306163851151](https://img.mrx111.site/assets/20260306200830726.png)

#### 完成状态检查

一旦显示“已激活”，访问 `https://img.example.com/test.png`，只要能看到图，就成功.

### 本地配置 PicGo

#### PicGo介绍

PicGo 是一个跨平台的桌面端图床管理软件。你可以把它理解为一个“无情的传图搬运工”：

- **没有它时**：你得先打开浏览器登录 GitHub，手动上传图片，复制链接，再回到 Obsidian 粘贴。这套流程非常繁琐。
- **有了它后**：它在你的电脑后台静默运行，支持快速将图片上传到远端。你只需复制一张图片，它就会自动把剪贴板里的图片“搬运”到你的仓库里，然后瞬间把生成好的网址链接还给你。

#### 安装PicGo

官网：https://picgo.app/

github：[Molunerfinn/PicGo: :rocket: The Ultimate Image Uploader for Efficient Creators. Supports Obsidian, Typora, VS Code etc. and 60+ image hosting services (S3, GitHub, Cloudflare R2, Imgur, Aliyun OSS...). Paste, upload, done.](https://github.com/Molunerfinn/PicGo)

安装完成后打开，先在PicGo setting里讲语言改成简体中文

#### 获取Github的Token

PicGo 需要你的授权才能把图片推送到你的 GitHub 仓库。

1. 登录 GitHub，点击右上角你的头像，选择 **Settings**（设置）。
2. 在左侧菜单栏拉到最底端，点击 **Developer settings**（开发者设置）。
3. 展开左侧的 **Personal access tokens**，点击 **Tokens (classic)**。
4. 点击右上角的 **Generate new token** -> **Generate new token (classic)**。
5. 输入密码
6. **设置 Token 的属性**：
   - **Note（备注）**：随便填，比如 `PicGo-Upload`。
   - **Expiration（有效期）**：建议选择 **No expiration**（永不过期），这样以后不用每年都来重新配置一次。
   - **Select scopes（权限范围）**：**这是最重要的一步！** 找到并勾选 **`repo`**（Full control of private repositories），勾选这一个主选项就足够了。
7. 滑到页面最底部，点击 **Generate token**。
8. 页面会生成一串很长的字符（比如 `ghp_xxxxxx...`）。**请立刻复制并保存好它！**（出于安全机制，一旦刷新页面这串代码就再也看不到了）。

#### PicGo 图床配置

开你电脑上安装好的 PicGo。

1. 在 PicGo 的左侧菜单找到 **图床设置** -> 选择 **GitHub 图床**。
2. 按照以下格式准确填写你的信息：

- **设定仓库名**：根据你之前截图里的信息，填写你的用户名和仓库名：`your-repo-name/your-repo-name-quartz-images`

- **设定分支名**：目前 GitHub 默认的主分支通常是 main，填入：`main`

- **设定 Token**：粘贴你刚才在第一步复制的那串 `ghp_` 开头的密钥。
- **指定存储路径**：这是图片上传后在你仓库里存放的文件夹名称。为了方便管理，建议填入（注意后面要带上斜杠 `/`）：

```
assets/
```

- **设定自定义域名（最核心）**：将你刚刚在 Cloudflare 激活的那个子域名填进去。**必须带上 `https://`**。假设你的域名是 `img.example.com`，那就填入：

```
https://img.example.com
```

点击 **确定** 保存，然后点击 **设为默认图床**。

#### 测试上传

在电脑上随便截一张图（让图片保存在剪贴板里）。

打开 PicGo 的 **上传区**，点击“剪贴板图片上传”。

留意电脑右下角的弹窗提示。如果提示“上传成功”，你去随便找个文本框粘贴一下，如果粘贴出来的链接是你漂亮的自定义域名（例如 `https://img.你的域名.com/images/xxx.png`），并且能在浏览器里打开，即成功。



#### PicGo设置

打开 **时间戳重命名** 的开关。（放弃“上传前重命名”，防止打断心流）。

打开 **开机自启** 的开关。

#### 设置 Typora

打开 Typora，点击菜单栏 `文件` -> `偏好设置` -> `图像`。

**插入图片时...**：下拉选择 `上传图片`。

勾选下面这三个选项：`对本地位置的图片应用上述规则`、`对网络位置的图片应用上述规则`、`自动转义图片 URL`。

**上传服务设定**：选择 `PicGo (app)`。

**PicGo 路径**：点击右侧的文件图标，找到你电脑上安装的 PicGo 程序的路径。

点击**“验证图片上传选项”**，如果弹出一个绿色提示成功的窗口，Typora 就彻底搞定了！

> [!CAUTION]
>
> 鉴于上述设置在任何地方的md文档里，图片都会上传，故不采用。依然选择复制图片到./assets文件夹
>
> 上传服务设定保持即可。
>
> 不采用根据YAML设置自动上传图片，其一太麻烦，其二Quartz有顶部元数据YAML。

> [!NOTE]
>
> **采用写完博客统一上传的方式：**
>
> **日常写作**：所有的图片都安安静静地保存在你的本地电脑里。
>
> **写完博客准备发布时：**点击菜单栏 `格式` -> `图像` -> `上传所有本地图像`
>
> 这时，软件才会呼叫 PicGo，把这篇特定的、准备公开的博客里的所有本地图片，一次性全传到云端并替换链接。
>



#### 设置 Obsidian

在 Obsidian 的“第三方插件”市场里搜索并安装 **Image auto upload **。

启用该插件，并点击插件旁边的齿轮进入设置界面。

**Default uploader（默认上传器）**：选择 `PicGo`。

下方的设置基本保持默认即可。它是通过本地端口（`http://127.0.0.1:36677`）和 PicGo 通信的，只要你的 PicGo 在后台运行，它就能自动连上。

> [!CAUTION]
>
> 关闭剪切板自动上传
>

需要上传时，Ctrl+P打开命令面板，输入`upload`即可。选择：`image auto upload：upload all images`





# =============================================

## Quartz 项目结构&原理

### Quartz 本质

极其现代化的 **静态网站生成器 (Static Site Generator, SSG)**。

它的核心使命只有一个：**完美无缝地将你的 Obsidian 个人知识库，转化为一个可以通过浏览器访问的“数字花园 (Digital Garden)”。**

- **传统博客的逻辑是“时间流”：** 就像一本日记，按照时间顺序排列，旧文章很容易被遗忘。
- **Quartz 的逻辑是“网状知识”：** 它原生支持 Obsidian 的 双向链接 语法。它鼓励你把笔记打碎，通过链接像神经元一样连接起来，最终在网页上生成一个极其炫酷的**知识关系图谱（Graph View）**。

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

## 新增组件

读取 `content/` 中的元数据 ➡️ 根据 `quartz.layout.ts` 抓取对应的 `components/` ➡️ 将数据喂给组件生成 HTML ➡️ 套上 `styles/` 的 CSS 样式 ➡️ 最终输出成漂亮的静态网页。

### 数据源

`content/`

### 组件UI&核心逻辑

`quartz/components/`

功能组件库。以 `.tsx`（TypeScript + React 语法）编写。它们负责接收原始数据（比如所有的文章列表），然后把数据变成带有 HTML 标签的网页模块。

所有的页面元素（比如侧边栏目录、搜索框、面包屑导航）都在这里

### index.ts

注册登记。

### 页面布局

`quartz.layout.ts`,决定了组建的位置。

#### 三大核心

Quartz 把所有的页面分成了三种渲染情境，也就是代码中导出的三个常量：

- **`sharedPageComponents` (全局共享)**：全站所有页面的“页眉”和“页脚”。
- **`defaultContentPageLayout` (内容页)**：每篇 Markdown 笔记的样子
- **`defaultListPageLayout` (列表页)**：点击一个 `#标签` 或者一个 `文件夹` 时，Quartz 自动生成的那个“文件列表”页面

#### 内容页

Quartz 把单篇笔记的页面划分成了几个**插槽 (Slots)**，只需要把组件塞进数组里即可。

##### 插槽 A：`beforeBody` (正文上方区域)

这里的内容会显示在文章大标题和正文内容之间。

##### 插槽 B：`left` (左侧边栏)

网站的导航枢纽。

#####  插槽 C：`right` (右侧边栏)

辅助阅读区域：知识图谱，反向链接

##### 高级技巧

**`ConditionalRender` (条件渲染)**

高阶包裹组件 `Flex` 和 `MobileOnly`

组件内传参过滤 `filterFn`



#### 列表页

**保持左侧导航不变，清空右侧边栏 (`right: []`)**。





### CSS样式

`quartz/styles/custom.scss`

组件视觉美化

自定义的样式写在 `custom.scss` 里，这样下次 Quartz 更新底层代码时，自定义样式就不会被覆盖丢失。

### 



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

​	自定义路径：如果笔记标题或文件名是中文，可以通过此属性将其强制指定为易读的英文路径。





## 一些问题

### 热更新缓存处理

大多数问题都可能是本地开发服务器的热更新（Hot Reload）在处理缓存时出了问题，页面没有及时渲染。

此时`Ctrl+C`关闭，再运行`npx quartz build --serve`即可



### 幽灵链接

使用md链接示例时请使用反引号包裹，示例：`[how-to-use-quartz](how-to-use-quartz.md)`。

否则会被解析为双向链接，链接至index.md

因为圆括号 `()` 里面是空的，转换成底层的 HTML 代码就是 `<a href=""></a>`（一个指向空地址的链接），而Quartz 的文件树里，根目录 `/` 唯一对应的实体文件就是入口主页 `index.md`。

 Quartz 理所当然地认为，这篇笔记链接到了根目录index.md，于是 Graph View 里就能看到这个幽灵链接。

### 关于时区

不用设置时区，具体见[Quartz时间线组件](https://gemini.google.com/app/888f67656a4e14c3)

### 外部链接图标

写外部链接时，不要漏掉链接文本而只写链接地址，否则只会有一个链接图标，而没有文字

还有，链接地址不要写本地地址

### 

## 新建笔记注意事项

### 文件名格式

采用烤串命名法（注意必须是小写）

### 不要写重复名称

文件名在整个笔记系统中都不要重复

### 元数据引号后需要空格否则会报错

始终确保属性块在最顶部。

属性块内为YAML 语法，非常严格，冒号 `:` 后面必须跟一个空格。

### Tags 标签格式

tag必须小写，否则会导致tag大写的文件在tag界面无法显示。

## ToDo

### 目录组织策略：文件夹

将所有笔记分类，应该弄哪些文件夹？
杜威十进制分类法（按领域划分）
### [:white_check_mark: ]图片

#### 存储

使用github仓库，部署到cloudflare，利用cf的全球cdn

#### 命名

图片如何命名？放弃单独明明，采用时间戳

### [:white_check_mark: ]链接

文件夹，移动文件时是否有影响

到底用wiki链接，还是markdown标准格式？md用相对路径，还是最短路径？

obsidian默认wiki链接，但是Typora不支持，只支持md格式。

相对路径的话，如果有文件夹需要移动，则在obsidian里移动可以自动修改相对路径，但是如果在资源管理器里移动就不行。

解决：

> 通过链接转换插件`Link Converter`实现随意转换，只需要保证文件名不重复即可。
>
> 既然可以随意转换，而且Quartz 无论那种格式都能解析，故链接问题解决。

### 光标cursor

设置鼠标在该网页的光标

### custom样式

设置自己的css：在文件custom.scss

是否可以实现渲染自己设置的md样式？达到更好的效果

### [:white_check_mark: ]Timeline

一个timeline界面，专门用于按照时间线查看

单独创建一个timeline.md，入口有两种选择

方法一：类似index.md，使用一个单独的按钮进入

方法二：通过在目录里置顶timeline.md。目前选择方法二。



### [:white_check_mark: ]标记ai辅助

通过YAML元数据标注，实现相关组件，渲染对应状态徽章。

### [:white_check_mark: ]博客/图片仓库命名







## 总结

本记录可直接作为vibe coding进行Quartz的自定义改造的参考。
