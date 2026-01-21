---
slug: Linux regularly clears logs
title: Linux定时清除日志
date: 2026-01-20
authors: Clamber
tags: [Linux]
keywords: [Linux]
---

<!-- truncate -->
---

# Linux 服务器自动化清理：常规日志与特殊字符文件处理实践

在服务器运维中，日志堆积和程序产生的临时文件往往会耗尽磁盘空间。本文将分享两个实用的 Shell 脚本场景：一个是**按日期保留**的日志清理，另一个是处理**带反斜杠（\）的异常文件名**的强制清理。

## 场景一：智能保留最近两天的日志

**需求描述**：
清理 `/home/log/user` 目录。

1. `all` 开头的文件全部删除。
2. `info` 和 `error` 开头的文件，仅保留当天和前一天的，其余删除。
3. 严禁删除文件夹。

### 脚本实现：`clean_log.sh`

```bash
#!/bin/bash

# 1. 定义日志目录
LOG_DIR="/home/log/user"

# 2. 删除所有以 "all" 开头的文件
find "$LOG_DIR" -maxdepth 1 -type f -name "all*" -delete

# 3. 删除 2 天前的 "info" 和 "error" 文件
# -mtime +1 表示修改时间在 48 小时之前
find "$LOG_DIR" -maxdepth 1 -type f \( -name "info*" -o -name "error*" \) -mtime +1 -delete

echo "Log cleanup completed at $(date)"

```

---

## 场景二：处理带反斜杠（\）的异常文件名

**需求描述**：
由于某些程序（如 Java）路径配置问题，在 `/data/media` 下生成了大量以 `flv\` 开头的文件。这些文件不需要保留，每天凌晨 2 点需要彻底清空。

### 核心难点

在 Linux 中，反斜杠 `\` 是转义字符。如果文件名里真的包含 `\`，在编写脚本时需要使用双反斜杠 `\\` 进行匹配。

### 脚本实现：`clean_media.sh`

```bash
#!/bin/bash

TARGET_DIR="/data/media"

if [ -d "$TARGET_DIR" ]; then
    # -name 'flv\\*' 这里的双反斜杠用于匹配文件名中的单个反斜杠
    find "$TARGET_DIR" -maxdepth 1 -type f -name 'flv\\*' -delete
    echo "Special flv files cleanup finished at $(date)"
fi

```

---

## 场景三：Crontab 定时任务管理

编写好脚本后，我们需要让系统自动执行。

### 1. 查看现有任务

```bash
crontab -l

```

### 2. 编辑任务

输入 `crontab -e`，在末尾添加以下配置：

```cron
# 每天凌晨 2:00 清理常规日志（保留2天）
00 02 * * * /bin/bash /path/to/clean_log.sh >> /tmp/clean_log.log 2>&1

# 每天凌晨 2:00 清理特殊的 flv 媒体文件（全部删除）
00 02 * * * /bin/bash /path/to/clean_media.sh >> /tmp/clean_media.log 2>&1

```

---

## 关键技术点总结（避坑指南）

| 命令/参数 | 作用 | 备注 |
| --- | --- | --- |
| `-maxdepth 1` | 限制搜索深度为当前目录 | **非常重要**，防止误删子目录里的重要文件 |
| `-type f` | 只筛选“普通文件” | 确保不会删掉文件夹 |
| `-mtime +1` | 匹配 48 小时前的文件 | 配合 `find` 实现保留最近两天的逻辑 |
| `'flv\\*'` | 匹配以 `flv\` 开头的文件 | 单引号和双反斜杠是处理特殊字符的关键 |

## 结语

自动化脚本是解放双手的利器，但在执行 `rm` 或 `find -delete` 前，建议先将 `-delete` 换成 `-print` 进行测试，确认无误后再上线。