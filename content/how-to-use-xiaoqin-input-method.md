---
title: How to Use Xiaoqin Input Method -- Trying Out Open Source Input Methods
date: 2026-02-26
tags: 
  - tutorial
---

## 下载&安装

[fcitx5-android/fcitx5-android: Fcitx5 input method framework and engines ported to Android](https://github.com/fcitx5-android/fcitx5-android)

**Fcitx5 主程序**：找到后缀`arm64-v8a-release.apk`

**Rime 插件**：找到包含`plugin.rime`，且后缀**`arm64-v8a-release.apk`** 

安装上述两个apk，其中插件安装后**没有**图标。	

[iDvel/rime-ice: Rime 配置：雾凇拼音 | 长期维护的简体词库](https://github.com/iDvel/rime-ice)[iDvel/rime-ice: Rime 配置：雾凇拼音 | 长期维护的简体词库](https://github.com/iDvel/rime-ice)

下载release里的`full.zip`。

在电脑解压缩zip，得到`full`文件夹，里面有几个文件夹和大量ymal文件

安卓手机连接电脑，将`full`文件夹移动至手机的`Download`文件夹内

## 导入

并没有一键导入，需要打开文件管理器导入。

打开小企鹅输入法

点击`输入法`

点击`+号`，选择`中州韵`

点击中州韵后的齿轮符号，点击`用户数据目录`，用文件管理器打开。

打开后直接就是`小企鹅输入法`，里面有config、theme、data三个目录，需要的就是data里的`/data/rime`目录

先点击右上角三横按钮，看到有`下载内容`、`小企鹅输入法`两个快捷入口。

在此文件管理器中，进入`下载内容`，即对应刚才的Download文件夹，找到full文件夹，全选full文件夹内的所有内容，选择移动文件，然后选择`/data/rime`目录，即将`full`文件夹**内**的所有内容移动到`/data/rime`里。



## 使用

此时在输入法设置里启用并切换到小企鹅输入法，然后就能使用，点击地球符号就可以切换简/繁/英。

另外，软件在并没有实现一些习惯配置（例如中文键盘大写，英文小写）。优点在于，完全隐私。

## 参考

[(70 封私信 / 64 条消息) 第一次在Android下使用RIME - 知乎](https://zhuanlan.zhihu.com/p/1915722421593433171)