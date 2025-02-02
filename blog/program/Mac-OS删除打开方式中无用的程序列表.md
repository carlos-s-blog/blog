---
slug: Delete useless program list in Mac OS open mode
title: Mac OS删除打开方式中无用的程序列表
date: 2022-06-19
tags: [Mac OS]
authors: Clamber
keywords: [Mac OS]
description: Mac OS删除打开方式中无用的程序列表
---

<!-- truncate -->

### 右键无效图标
如果右键菜单的「打开方式」里出现了已不存在的应用程序或者重复的项目，打开终端，执行以下命令：

/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -kill -r -domain local -domain system-domainuser

此命令的作用是重建 LaunchServices 的数据库，这样重复或无效的项目就会被清理掉了。

### 控制台无效图标
```
sqlite3 $(find /private/var/folders \( -name com.apple.dock.launchpad -a -user $USER \) 2> /dev/null)/db/db "DELETE FROM apps WHERE title='xxx';" && killall Dock
```
将title中的xxx替换为应用名称，需要区分大小写
