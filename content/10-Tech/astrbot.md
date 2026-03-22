---
title: 使用AstrBot
date: 2026-3-11
tags:
  - bot
  - qq
---
# TL;DR
## 常用命令

```
启动&关闭&重启（或者直接在docker desktop里操作）
docker start astrbot
docker stop astrbot
docker restart astrbot

docker start napcat
docker stop napcat
docker restart napcat

一键全开
docker start astrbot napcat

一键全关
docker stop astrbot napcat

日志
docker logs -f astrbot
docker logs -f napcat
docker logs -t -f napcat

查看容器状态
docker ps -a

删除容器
docker rm -f astrbot
docker rm -f napcat

获取NapCat token
cat ./napcat_data/config/webui.json

清理 QQ 缓存
docker stop napcat
sudo rm -rf ./napcat_data/.config/QQ/*
docker start napcat
```

## 入口

[AstrBot - 仪表盘](http://localhost:6185/#/about)

[WebUI登录 - NapCat WebUI](http://localhost:6099/webui/web_login)

# 环境

windows11，wsl2，docker

# 链接

Github：[AstrBotDevs/AstrBot: Agentic IM Chatbot infrastructure that integrates lots of IM platforms, LLMs, plugins and AI feature, and can be your openclaw alternative. ✨](https://github.com/AstrBotDevs/AstrBot)

AstrBot文档：[👋 I'm AstrBot | AstrBot](https://docs.astrbot.app/what-is-astrbot.html)

Github：[NapNeko/NapCatQQ: Modern protocol-side framework based on NTQQ](https://github.com/NapNeko/NapCatQQ)

NpacatQQ文档：[NapCat | NapCatQQ](https://napcat.napneko.icu/guide/start-install)

# Docker安装

## 创建数据文件夹并安装

```
cd ~
存数据的文件夹
mkdir -p ./astrbot_data

一次性拉取并启动容器
docker run -d \
  --name astrbot \
  -p 6185:6185 \
  -p 6199:6199 \
  -p 11451:11451 \
  -v "$PWD/astrbot_data:/AstrBot/data" \
  --restart unless-stopped \
  soulter/astrbot:latest
```

> [!NOTE]
>
> `-d`：让机器人在后台静默运行
>
> `-p` 系列：三个核心端口。`6185` 访问网页控制台必须；`6199` 和 `11451` 是接入 QQ 或微信等平台常用的通信端口
>
> `-v` 这一行：把容器内部的 `/AstrBot/data` 绑定到刚才创建的 `./astrbot_data` 上。所有数据都会直接写在 WSL2 硬盘

**程序的本体（镜像）：** Docker 自己存储，不需要管。

**产生的数据（聊天记录、配置、插件）：** 通过 `-v` 参数，把容器内部的 `/AstrBot/data` 强行绑定到了前的文件夹 `$PWD/astrbot_data`。



## 查看日志

```
docker logs -f astrbot
```



## 进入管理后台

```
http://localhost:6185
```

初始用户名密码

**用户名**：`astrbot`

**密码**：`astrbot`

登录成功后会立刻要求修改密码。



## 开启&关闭&重启

```

docker start astrbot
docker stop astrbot
docker restart astrbot
```



# 接入LLM

## 注意事项

url需要在后面加上`/v1`

和其他平台一样正常接入，但是通过cloudflare中转的api，需要在cloudflare放行才行。

见：

## 代理地址

可以设置代理地址，但是为什么我没设置也行？和wsl，docker怎么联网有关。

见：

# 接入消息平台

## Discord

见官方文档即可：[接入 Discord | AstrBot](https://docs.astrbot.app/platform/discord.html)

Discord创建应用链接：[My Applications | Discord Developer Portal](https://discord.com/developers/applications)

### AstrBot设置

勾选`启用`，`注册Discord指令`

`Discord代理地址`填写（Docker 专属的“宿主机穿透地址”，加上代理软件的端口号）：

```
http://host.docker.internal:7890
```

`Discord Bot Token`在Discord拿到。

> [!NOTE]
>
> `host.docker.internal` 是 Docker 提供的一个魔法地址

### Discord创建机器人应用

按照教程进行设置，创建好机器人后，然后拉入服务器即可。

## QQ

教程：[使用 NapCat | AstrBot](https://docs.astrbot.app/platform/aiocqhttp/napcat.html)

### Docker 安装 NapCatQQ

#### 执行安装命令

```
cd ~

创建存 NapCat 数据的文件夹
mkdir -p ./napcat_data

拉取并运行 NapCatQQ 容器
docker run -d \
--name napcat \
-e NAPCAT_GID=$(id -g) \
-e NAPCAT_UID=$(id -u) \
-p 6099:6099 \
-v "$PWD/napcat_data/config:/app/napcat/config" \
-v "$PWD/napcat_data/.config/QQ:/app/.config/QQ" \
--restart unless-stopped \
mlikiowa/napcat-docker:latest
```

> [!NOTE]
>
>  NapCat 镜像把 QQ 的核心登录数据存在了容器内部的 `/app/.config/QQ` 目录下

#### 扫码登录

执行命令查看日志

```
docker logs -f napcat
```

屏幕上看到一个由字符拼成的 **巨大的二维码**。扫码登录qq小号。

#### 访问后台界面

```
http://localhost:6099/webui
```

webui login界面，需要`WebUI Token`

在命令行二维码上方找到`[WebUi] WebUi Token: xxxxxxxxxxxxx`

输入即可进入。

也可以使用以下命令查看WebUi Token：

```
cat ./napcat_data/config/webui.json
```



#### 网络配置

左侧菜单找到`网络配置`

新建`websocket客户端`（注意，AstrBot里叫反向 Websocket）

打开`启用`

自己的AstrBot用不用设置token

URL填写：`ws://host.docker.internal:6199/ws`

### AstrBot配置

创建机器人，类别选择`OneBot v11`（NapCat基于 OneBot 协议）

打开`启用`

反向websocket端口：6199

反向 Websocket Token刚才没设置不用填写。

保存即可。



## 问题&解答

### 一次输出多句

普通配置--> 扩展功能，关闭启用分段回复	

### 选择分段回复时输出太快

间隔方法random模式，将(min,max)均调大

或者log模式将数字调小

### 切换qq

停止容器

```
docker stop napcat
```

清除qq缓存

```
sudo rm -rf ./napcat_data/.config/QQ/*
```

重新启动

```
docker start napcat
```

然后重新扫描登录qq即可。

### 重启后不记录登录信息

问题：NapCatQQ关闭重启后，无法记忆登录qq信息。

原因：根本没有写入，没有权限。

现在的安装命令已解决。涉及docker，见



### webui token vs. qq信息

为什么webui token一开始就可以保存，但是qq信息却费这么大劲才能保存？

`/app/napcat/config`（存 Token ）

`/app/.config/QQ`（存 QQ ）

`.` 开头的文件夹（如 `.config`）是**隐藏文件夹**，通常用来存放敏感的系统级配置，Docker 对隐藏文件夹的挂载权限要求比普通文件夹严苛得多

**UID (User ID)**：你当前系统的用户身份证号。

**GID (Group ID)**：你当前系统的用户组身份证号。

> [!NOTE]
>
> 导致 WebUI Token 能够轻易保存，而 QQ 登录数据无法保存的根本原因在于**容器内部不同进程的权限分离（Process Privilege Separation）机制**，以及**底层应用程序对 Linux 文件系统权限校验的标准差异**。
>
> 这涉及到 Docker 挂载卷的 UID/GID（用户 ID 与用户组 ID）映射机制。以下是具体的技术原理解析：
>
> ## 1. 进程的权限级别差异
>
> NapCatQQ 容器内部运行的并非单一程序，主要存在两层独立的业务逻辑：
>
> - **WebUI/外层封装服务（Node.js）**：负责生成 Token、启动 HTTP/WebSocket 服务。
> - **NTQQ 核心引擎**：腾讯官方的 QQ 客户端底层依赖于 Chromium/Electron 架构，负责实际的协议通信和数据存储。（腾讯官方的 Linux 版 QQ 核心程序。商业级的闭源软件，有着极其严苛的安全机制和权限检查。）
>
> ## 2. 为什么 WebUI Token 能直接写入？
>
> 当执行没有指定 UID/GID 的 `docker run` 命令时，通过 `-v` 参数映射宿主机路径到容器内部（如 `-v "$PWD/napcat_data/config:/app/napcat/config"`）：
>
> - 如果宿主机的 `$PWD/napcat_data/config` 目录不存在，Docker Daemon 默认会以系统最高权限 `root` (UID=0, GID=0) 在宿主机创建该目录。
> - 容器启动时，外层的 WebUI 进程在启动脚本上下文中具有足够的权限（或容器本身默认以 root 身份执行初始化），能够直接调用系统的标准 I/O 接口向该目录写入一个简单的文本文件 `webui.json`。因此，Token 的持久化未受阻碍。
>
> ## 3. 为什么 QQ 数据写入会失败？（EACCES 错误）
>
> QQ 的核心数据持久化过程远比单文件写入复杂，且受严格的安全校验限制：
>
> - **Chromium 沙箱机制与权限降级**：基于 Chromium 架构的 NTQQ 引擎出于安全规范，通常会拒绝以 `root` 特权用户身份运行。引擎在启动时会执行权限降级，切换到一个非特权的普通用户（例如 UID=1000）来运行核心渲染和数据读写进程。
> - **文件系统读写校验被拒绝**：当降级后的 NTQQ 进程（UID=1000）尝试向宿主机挂载的目录（即前文提到被 Docker Daemon 以 `root` UID=0 创建的 `/app/.config/QQ`）写入复杂的 SQLite 数据库、缓存文件或执行目录锁定操作时，Linux 内核的虚拟文件系统（VFS）会进行 UID 对比。因为 1000 不等于 0，内核直接返回 `EACCES (Permission denied)` 权限拒绝异常。
> - **应用的 Fallback（降级）行为**：在遭遇目录写入拒绝后，NTQQ 核心进程并未选择让程序直接崩溃（Crash），而是将其运行时产生的 Session（登录状态）和数据库文件转移到了容器内部具有写入权限的临时目录或内存文件系统（`tmpfs`）中运行。由于数据只停留在容器的非持久化层，只要执行 `docker restart` 或 `docker rm`，临时数据即被销毁，表现出的结果就是“重启后必须重新扫码”。
>
> ## 4. 命令参数的技术介入原理
>
> 官方文档提供的解决方案通过传入两个环境变量解决了权限边界的错位：
>
> - `$(id -u)` 和 `$(id -g)` 属于 Shell 指令，作用是向宿主机系统查询当前执行命令的用户的真实 User ID 和 Group ID。
> - 当环境变量 `-e NAPCAT_UID=$(id -u)` 传入容器后，容器的入口点脚本（Entrypoint）在执行真正的 NTQQ 二进制文件之前，会先读取该变量，并动态修改容器内部运行 QQ 进程的用户的 UID 和 GID，使其与宿主机的目标挂载目录完全一致。
> - 在保证了宿主机目录拥有者与容器内发起写操作的进程的 UID 严格一致后，Linux 内核放行了所有的系统级 I/O 调用。此时，NTQQ 引擎生成的加密 SQLite 数据库文件得以成功跨越 Docker 边界，实打实地持久化写入宿主机的磁盘扇区中。
>
> `QQ 核心准备写数据，检查映射进来的文件夹的身份证号（UID/GID）和自己现在的运行身份（UID/GID），完美匹配，于是将登录凭证写进电脑硬盘。`



# 编排逻辑

配置文件

人格设定

LLM

机器人

# 插件开发

## 链接

官方模板：[Soulter/helloworld: AstrBot Plugin Template](https://github.com/Soulter/helloworld)

教程：[AstrBot 插件开发指南 🌠 | AstrBot](https://docs.astrbot.app/dev/star/plugin-new.html)

教程仓库位置：[AstrBot/docs/zh/dev/star at master · AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot/tree/master/docs/zh/dev/star)

## pc管理插件

### 前提

windows上有python环境。

### 需求

（查看电量、锁屏状态、音量、亮度）都是**高度依赖 Windows 操作系统底层 API** 

### 架构

Docker 沙盒与 Windows 宿主机的隔离：AstrBot 是运行在 Docker 里的。Docker 是一个封闭的 Linux 沙盒（WSL2）。

Linux 沙盒里的程序，不可能直接读取到外面 Windows 宿主机的硬件状态和屏幕信息的。 甚至不知道“屏幕”和“音量”的存在。

需要采用“C/S 架构（客户端-服务端）”的思路，里应外合：

1. 服务端（驻留 Windows）：  Windows 电脑上本地运行一个极轻量级的 Python 脚本。它调用 Windows API 获取电量、音量等信息，并把这些信息变成一个简单的网页接口（API）。
2. 客户端（AstrBot 插件）： 在 Docker 里的 AstrBot 插件只需要负责一件事：向宿主机发送网络请求，拿到数据，然后通过聊天平台发给用户。

Docker Desktop 提供魔法域名：`host.docker.internal`。容器里的插件可以通过这个域名，直接访问到Windows 本地的网络



### 项目结构&代码

```
PC_Monitor_Project/
├── windows_agent/                # Windows 本地服务端
│   ├── main.py                   # 服务端主程序
│   └── requirements.txt          # Python 依赖清单
└── astrbot_plugin_pcmonitor/     # AstrBot 插件端 (将打包为 zip)
    ├── main.py                   # 插件主逻辑代码
    └── metadata.yaml             # 插件元数据（注意：使用 yaml 格式）
```



代码见：[zhicbr/AstrBot_Plugin-PC_Monitor](https://github.com/zhicbr/AstrBot_Plugin-PC_Monitor)

### 上传插件

#### 压缩上传失败

##### AstrBot后台上传插件zip压缩包

压缩，在astrbot_plugin_pcmonitor/外打包，即打包一个包含所有文件的文件夹。

手动或者命令行：

```
Compress-Archive -Path .\astrbot_plugin_pcmonitor -DestinationPath .\astrbot_plugin_pcmonitor.zip
```

但是，使用系统自带的右键压缩或 PowerShell 的 `Compress-Archive`。Windows 的压缩工具在打包时，把文件路径写成了带有反斜杠的 astrbot_plugin_pcmonitor\main.py。

当这个压缩包被传到 Docker（ Linux 环境）里解压时，Linux **完全不认识** `\` 作为路径分隔符。它不会把它当成“文件夹里的文件”，而是直接粗暴地把它当成了一个**名字特别长、且名字里带有斜杠的单文件**。



##### 复制文件夹

即在windows资源管理器里打开 `astrbot_data` -> `plugins`。把 `astrbot_plugin_pcmonitor` 这个文件夹（不是压缩包，是整个未压缩的文件夹），直接复制粘贴进去。

失败，没有权限，`astrbot_data` 文件夹虽然在Windows 硬盘上，但它最初是由 Docker 容器（一个 Linux 系统）创建的。Docker 在里面拥有 `root`（超级管理员）权限。Windows 没权限改动这个文件夹。

#### docker cp直接将文件放进去

放弃压缩上传，直接使用Docker 官方提供的“空间传送门”命令。这个命令可以无视所有 Windows 和 Linux 的权限壁垒，直接把外部的文件“塞”进容器的指定位置。（同样不是压缩包）

```
docker cp ./astrbot_plugin_pcmonitor astrbot:/AstrBot/data/plugins/
docker restart astrbot
```



#### 在 VS Code 里直接编辑 WSL 里的文件

PowerShell，运行下面这行命令（它会强行把插件文件夹的权限全部放开）：

```
wsl -u root chmod -R 777 /home/***/astrbot_data/plugins/
```

如此，即可在vscode里直接编辑wsl里的文件。此时也不用docker cp了，直接复制或者拖拽即可。



### windowsPython服务改成Go

Go官网：[All releases - The Go Programming Language](https://go.dev/dl/)

claude写代码对话：https://claude.ai/chat/3fbcd638-66a7-4bd3-a62e-46ee054d11ea

创建文件夹windows_agent_go，在此打开终端。

代码见main.go.

配置代理：

```
$env:HTTP_PROXY = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"
```

执行以下命令：

```
# 第 1 步：给项目建个身份证（瞬间完成）
go mod init pc-agent

# 第 2 步：下载唯一的一个底层通信库（瞬间完成）
go get github.com/go-ole/go-ole

# 第 3 步：整理并锁定版本（瞬间完成）
go mod tidy

# 第 4 步：编译
go build -ldflags="-s -w -H windowsgui" -o pc_monitor.exe main.go
```

出现pc_monitor.exe ，点击即可运行。

加了 `-H windowsgui` 编译出来的 Go 程序，是一个**没有任何界面的幽灵程序**，在任务管理器搜索pc_monitor.exe 即可看到程序，占用不到3MB的内存。

如果代码修改了需要重新编译，在资源管理器结束程序，再执行上面的编译命令。

开机自启：

右键pc_monitor.exe创建快捷方式，win+R输入shell:startup，弹出名为“启动”的文件夹，将创建的快捷方式拖进去即可。



### 注意事项

#### 1.本地python服务

python程序采用虚拟环境，只能手动或者开启自启，无法通过机器人唤醒。

注意python缩进

#### 2.反斜杠

- **Windows**：默认使用 **反斜杠 `\`** 作为路径分隔符，例如 `C:\Users\Public` 。
- **Linux**：使用 **正斜杠 `/`** 作为路径分隔符，例如 `/home/username` 

#### 3.文件夹无法复制进去，vscode修改无法保存

问题描述：

- **VS Code 无法保存文件**：通过 `\\wsl.localhost\...` 访问容器内的文件时，保存操作会失败，报错 `EPERM`（操作不允许）。
- **文件无法复制到容器内**：尝试向容器内的某些路径拖放或复制文件时，被系统拒绝。

Linux 采用严格的权限模型，主要涉及三类角色：

- **超级管理员（root）**：拥有最高权限，可操作任何文件。
- **普通用户**：仅能操作自己拥有的文件或目录。
- **其他用户**（如通过网络访问的 VS Code 进程）：权限受限于文件对“其他人”（others）的设置。

问题产生原因：

1. **VS Code 无法保存**
   使用 `docker cp` 将文件夹复制到容器时，Docker 默认将这些文件的**所有者设置为 root**。当 VS Code 通过 `\\wsl.localhost\...` 访问时，它是以普通用户的身份操作，Linux 内核检查发现文件所有者非当前用户且未授予“其他人”写权限，因此拒绝写入，返回 `EPERM` 错误。
2. **文件无法复制到容器内**
   同理，目标路径的文件权限若只允许 root 写入，普通用户发起的复制操作会被内核拦截。

执行以下命令可临时解决上述问题：

```
wsl -u root chmod -R 777 /path/to/target
```

该命令的每个部分含义如下：

- **`wsl -u root`**：以 root 身份进入 WSL 环境，确保后续操作具有最高权限。
- **`chmod`**：修改文件模式（change mode）。
- **`-R`**：递归处理，对指定目录及其内部所有文件和子目录生效。
- **`777`**：赋予三类角色（所有者、所属组、其他人）全部权限（读、写、执行）。
  - 第一个 `7`：文件所有者可读、写、执行。
  - 第二个 `7`：文件所属组成员可读、写、执行。
  - 第三个 `7`：其他用户（包括 VS Code 进程）可读、写、执行。

执行后，容器内的文件权限被放宽，VS Code 即可正常保存和修改，同样也可以拖拽文件复制进去。

- **注意**：在生产环境中，开放 `777` 权限是严重的安全隐患（相当于允许任何用户完全控制文件）。但在本地开发环境中，为提升效率可酌情使用，操作完成后建议尽快恢复为更严格的权限（如 `755` 或 `750`）。

#### 4.换行符冲突（CRLF vs LF）

**Windows 的习惯：** 敲回车换行时，底层代码是 `CRLF`（回车+换行）。

**Linux/Docker 的习惯：** 敲回车换行时，底层代码是 `LF`（仅换行）。

通过vscode最右下角状态栏切换CRLF，LF。







## 问题

windows端python服务是否占内存？

除了已经实现的功能，还可以实现哪些功能？

 

# 常见问题

## 修改配置但是没变化

修改后记得手动点击保存按钮。

# Debug

## Docker start astrbot，报错(HTTP code 500) server error - ports are not available

### 问题

```
(HTTP code 500) server error - ports are not available: exposing port TCP 0.0.0.0:6185 -> 127.0.0.1:0: listen tcp 0.0.0.0:6185: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
```

Windows 系统拒绝把 `6185` 这个端口交给 Docker 使用。

### 解决方案：重启 Windows 的网络服务

打开powershell管理员运行

```
net stop winnat
```

再运行

```
net start winnat
```

再次启动astrbot即可。
