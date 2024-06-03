---
title: sourceTree中使用SSH
categories: GitHub
tags:
  - GitHub
copyright: true
comments: true
abbrlink: '85840953'
date: 2024-06-03 23:33:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 在GitHub中配置SSH公钥

<!--more-->

之前其实有写过[SSH](https://www.chensheng.group/2021/08/31/143-%E4%BD%BF%E7%94%A8SSH%E4%B8%8A%E4%BC%A0%E9%83%A8%E7%BD%B2/) , 但是并没有具体写出git以及sourceTree是怎么配置的，在这里补充一下

## 前提条件

1. **安装 SourceTree**：从 [SourceTree 官方网站](下载并安装。
2. **配置 SSH 密钥**：生成 SSH 密钥对，并将公钥添加到 GitHub 的 SSH 密钥设置中。

## 步骤

### 1. 生成 SSH 密钥（如果尚未生成）

#### Windows 和 macOS

1. 打开终端（macOS）或 Git Bash（Windows）。
2. 运行以下命令生成 SSH 密钥：

    ```
    ssh-keygen -t ed25519 -C "youremail@example.com"
    ```

3. 按提示完成密钥生成过程。
4. 将生成的公钥内容添加到 GitHub 的 SSH 密钥设置中。公钥文件通常位于
    ```
    ~/.ssh/id_ed25519.pub
    ```

### 2. 将公钥添加到 GitHub

1. 登录 GitHub。
2. 点击右上角的头像，然后选择“Settings”。
3. 在左侧菜单中选择“SSH and GPG keys”。
4. 点击“New SSH key”按钮。
5. 输入一个标题（例如“SourceTree Key”），然后将 `id_ed25519.pub` 文件中的内容粘贴到“Key”字段中。
6. 点击“Add SSH key”。

### 3. 添加 SSH 密钥到 SSH 代理

#### macOS 和 Windows（使用 OpenSSH）

1. 启动 SSH 代理：

    ```
    eval "$(ssh-agent -s)"
    ```

2. 添加私钥到 SSH 代理：

    ```
    ssh-add ~/.ssh/id_ed25519
    ```

### 4. 配置 SourceTree 使用 SSH

1. 打开 SourceTree。
2. 进入“工具”菜单，选择“选项”。

#### Windows

- 在“Git”选项卡下，将 SSH 客户端设置为“OpenSSH”或“PuTTY/Plink”（取决于你使用的 SSH 客户端）。

#### macOS

- 在“Git”选项卡下，确保 SourceTree 使用系统的 SSH 客户端。

### 5. 克隆 Git 仓库

1. 点击 SourceTree 的“克隆/新建”按钮。
2. 在弹出的窗口中，输入 GitHub 仓库的 SSH URL（例如 `git@github.com:username/repository.git`）。
3. 选择本地路径以存储克隆的仓库。
4. 点击“克隆”按钮。

### 6. 验证连接

确保配置正确后，SourceTree 将通过 SSH 成功克隆仓库。如果遇到连接问题，请检查以下几点：

1. SSH 密钥已正确添加到 GitHub。
2. SSH 代理正在运行，并且密钥已添加到代理中。
3. SourceTree 的 SSH 客户端配置正确。

## 常见问题

### 1. SSH 密钥未缓存

如果在克隆仓库时提示未缓存密钥指纹，请手动添加：

```
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

以上就是我对sourceTree使用SSH拉取git的理解，如有错误，欢迎大佬指出 
