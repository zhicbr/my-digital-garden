---
title: Reverse Proxy for Gemini CLI
date: 2026-03-06
tags:
  - gemini
---

> [!NOTE]
>
> 该笔记仅作为记录，实质没有起作用。

# windows

## 注意

[github](https://github.com/su-kaka/gcli2api.git)

需要pro会员才行

## windows版下载

### 只用命令

```
iex (iwr "https://raw.githubusercontent.com/su-kaka/gcli2api/refs/heads/master/install.ps1" -UseBasicParsing).Content
```

### 输出

```
[2025-12-18 20:18:07] [INFO] SQLite storage initialized at ./creds\credentials.db
[2025-12-18 20:18:07] [INFO] Using SQLite storage backend
[2025-12-18 20:18:07] [INFO] ============================================================
[2025-12-18 20:18:07] [INFO] 启动 GCLI2API
[2025-12-18 20:18:07] [INFO] ============================================================
[2025-12-18 20:18:07] [INFO] 控制面板: http://127.0.0.1:7861
[2025-12-18 20:18:07] [INFO] ============================================================
[2025-12-18 20:18:07] [INFO] API端点:
[2025-12-18 20:18:07] [INFO]    OpenAI兼容: http://127.0.0.1:7861/v1
[2025-12-18 20:18:07] [INFO]    Gemini原生: http://127.0.0.1:7861
[2025-12-18 20:18:07] [INFO]    Antigravity (OpenAI格式): http://127.0.0.1:7861/antigravity/v1
[2025-12-18 20:18:07] [INFO]    Antigravity (claude格式): http://127.0.0.1:7861/antigravity/v1
[2025-12-18 20:18:07] [INFO]    Antigravity (Gemini格式): http://127.0.0.1:7861/antigravity
[2025-12-18 20:18:07] [INFO]    Antigravity (SD-WebUI格式): http://127.0.0.1:7861/antigravity
[2025-12-18 20:18:07] [INFO] 启动 GCLI2API 主服务
[2025-12-18 20:18:07] [INFO] 配置缓存初始化成功
[2025-12-18 20:18:07] [INFO] 凭证管理器初始化成功
[2025-12-18 20:18:07 +0800] [24896] [INFO] Running on http://0.0.0.0:7861 (CTRL + C to quit)
```

### 访问控制面板

默认密码pwd

```
http://127.0.0.1:7861  
```

![image-20251218202325040](https://img.mrx111.site/assets/20260306192013186.png)



## **完成 OAuth 认证**

### 点击获取认证链接

![image-20251218202541975](https://img.mrx111.site/assets/20260306192013187.png)



再chrome打开链接

![image-20251218202517319](https://img.mrx111.site/assets/20260306192013188.png)

### 获取认证文件

![image-20251218202728169](https://img.mrx111.site/assets/20260306192013189.png)

### 使用api

```
http://127.0.0.1:7861/
密码：pwd
```

cherry studio示例：

![image-20251218204645792](https://img.mrx111.site/assets/20260306192013190.png)









## zeabur部署

### zeabur绑定手机号

绑定后才能部署，+86的即可

### 部署

一键部署，设置密码和域名

### 暴露公网

设置后需要等几分钟才能访问

```
https://zhigemini.zeabur.app/
```

![image-20251218205019554](https://img.mrx111.site/assets/20260306192013192.png)

### 进入管理面板

```
https://zhigemini.zeabur.app/
```

密码就是刚才自己设置的密码

![image-20251218205116043](https://img.mrx111.site/assets/20260306192013193.png)





### 本地下载凭证

注意是本地

![image-20251218210912359](https://img.mrx111.site/assets/20260306192013194.png)

### zeabur上传凭证

![image-20251218210936905](https://img.mrx111.site/assets/20260306192013195.png)





### 使用zeabur的api

```
https://zhigemini.zeabur.app/v1
```

密码就是刚才部署时设置的密码

需要会员，否则报错403

> 已经删除了。
>

## Antigravity

在控制面板点击连接登录即可，虽然还是403，需要会员吧大概

接口：

```
http://127.0.0.1:7861/antigravity/v1
```









# Termux

## 注意



还是需要pro会员才行，11月好像可以，不过现在不行了

## github

[github](https://github.com/print-yuhuan/Gemini-CLI-Termux.git)



## 获取项目ID

浏览器- 打开 [Google Cloud Console](https://accounts.google.com/v3/signin/accountchooser?continue=https%3A%2F%2Fconsole.cloud.google.com%2Fwelcome%3Fhl=zh_CN&service=cloudconsole&flowName=GlifWebSignIn&flowEntry=AccountChooser) 

记录项目ID

## 启用项目

> \- [Gemini for Google Cloud](https://accounts.google.com/v3/signin/accountchooser?continue=https%3A%2F%2Fconsole.cloud.google.com%2Fapis%2Flibrary%2Fcloudaicompanion.googleapis.com%3Fhl=zh_CN&service=cloudconsole&flowName=GlifWebSignIn&flowEntry=AccountChooser)

> \- [Gemini Cloud Assist](https://accounts.google.com/v3/signin/accountchooser?continue=https%3A%2F%2Fconsole.cloud.google.com%2Fapis%2Fapi%2Fgeminicloudassist.googleapis.com%3Fhl=zh_CN&service=cloudconsole&flowName=GlifWebSignIn&flowEntry=AccountChooser)
>
> 不用创建凭证

## 不要使用Setup.sh

不要使用项目的Setup.sh，前提是你的Termux已经将需要的各种环境配好了，软件源可连接，使用Setup.sh只会破坏各种配置。

## 手动执行步骤

### 克隆仓库

```
git clone https://github.com/print-yuhuan/Gemini-CLI-Termux.git
```

```
cd Gemini-CLI-Termux
```

### 创建隔离环境

```
# 创建名为 venv 的虚拟环境
python -m venv venv

# 激活虚拟环境
source venv/bin/activate
```

### 安装依赖

```
pip install --upgrade pip
pip install -r requirements.txt
```

### 配置环境文件.env

```
# 使用编辑器创建并编辑 .env 文件
nano .env
```

填入项目ID

```
GEMINI_AUTH_PASSWORD=123
GOOGLE_APPLICATION_CREDENTIALS=oauth_creds.json
GOOGLE_CLOUD_PROJECT=gemini12-9
HOST= 127.0.0.1 
PORT=8888
```

### 运行run.py

```
# 确保在虚拟环境中
python run.py
```

会弹出浏览器登录，登录即可。

## 访问API

openai兼容格式

```
http://127.0.0.1:8888/v1
```



## 403

这是必然的，因为没有会员。

且rikkahub不知道做了什么魔改，根本无法发送正常请求。之前的build反代也是好不容易才让rikkahub连接上了。

但是这个由于使用的不是pro的gmail账号，所以不打算改代码。测试使用cherrystudio(电脑)和BotGem(安卓)等客户端即可。

## 跨设备访问

HOST改为0.0.0.0 局域网共享。

```
# 监听地址：127.0.0.1 仅本机，0.0.0.0 局域网共享
HOST=127.0.0.1
```

