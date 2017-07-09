# win10 重装恢复手册

## 删除令牌会话
- 删除 OneDriver 上的电脑
    - [https://onedrive.live.com](https://onedrive.live.com)
- 清除同步隐私
    - [https://account.microsoft.com/privacy#/](https://account.microsoft.com/privacy#/)
- 删除应用商店设备
    - [https://account.microsoft.com/devices/store](https://account.microsoft.com/devices/store)
- 删除 Github 上的 SSH 密钥
    - [https://github.com/settings/keys](https://github.com/settings/keys)
- 删除 Chrome 浏览器同步
    - [https://www.google.com/settings/chrome/sync](https://www.google.com/settings/chrome/sync)
- 删除 Telegram 的活动设备

## 系统安装
1. 断网安装，创建本地英文账户
2. 禁止预装应用自动安装
    * 打开注册表 regedit
    * 进入路径 `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\`
    * 右键点击新建项“CloudContent
    * 双击新建的CloudContent，在右栏右键新建DWORD (32位) 值或新建DWORD (64位)值，并命名为DisableWindowsConsumerFeatures
    * 双击DisableWindowsConsumerFeatures，在数值数据输入1，确定
3. 设置资源管理器默认打开我的电脑，右键隐藏 OneDirve
4. 运行组策略 `gpedit.msc` ，打开 `计算机配置 --> 管理模块 --> windows 组件`
    * OneDrive，启用 `禁止使用 OneDrive 进行文件存储`
    * 搜索，禁用小娜
    * 可以跳过此步骤，使用 `Dism++`
> [关闭或卸载 OneDrive](https://support.office.com/zh-cn/article/%E5%85%B3%E9%97%AD%E6%88%96%E5%8D%B8%E8%BD%BD-OneDrive-f32a17ce-3336-40fe-9c38-6efb09f944b0?ui=zh-CN&rs=zh-CN&ad=CN)
5. 创建文档结构

## 连接网络，配置系统
1. Flower Password  - - [https://flowerpassword.com/](https://flowerpassword.com/) 
2. YoMail - - [http://www.yomail.com/](http://www.yomail.com/) 
3. 登陆微软账号，激活系统
4. Dism++ - - [https://www.chuyu.me/](https://www.chuyu.me/) 
5. 更新系统

## 必备软件
1. 7-zip  - - [http://www.7-zip.org/](http://www.7-zip.org/) 
2. 坚果云  - - [https://www.jianguoyun.com](https://www.jianguoyun.com) 
    - 网速监控 NetSpeedMonitor
    - 开始菜单优化 StartIsBack 
3. Enpass - - [https://www.enpass.io/](https://www.enpass.io/)
    - 设置主密码，导入备份数据
    - 设置同步文件夹
        - D:\JianGuoYun
4. shadowsocks-windows - - [https://github.com/shadowsocks/shadowsocks-windows/releases](https://github.com/shadowsocks/shadowsocks-windows/releases) 
5. Google Chrome  - - [https://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html](https://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html) 
    - 登陆账号，同步插件及相关配置
    - 插件：Enpass、Flower Password、Humble New Tab Page、uBlock Origin、Octotree、Enhanced Steam、哔哩哔哩助手
    - 应用：Google Keep、Web Server for Chrome

## 效率工具
1. 滴答清单 - - [https://www.dida365.com](https://www.dida365.com)
2. MarkEditor - -  [http://zrey.com/app/markeditor](http://zrey.com/app/markeditor)
    - 停止版本控制
    - 添加工作目录
        - D:\JianGuoYun\XIZERO
        - D:\JianGuoYun\Tree hole
3. Listary - -  [http://www.listary.com/](http://www.listary.com/)

## 娱乐软件
1. 网易云音乐 - -  [http://music.163.com/](http://music.163.com/)
2. Steam  - -  [http://store.steampowered.com/](http://store.steampowered.com/)
3. ASF - - [https://github.com/JustArchi/ArchiSteamFarm](https://github.com/JustArchi/ArchiSteamFarm)
    - wiki - - [http://steamcn.com/t187703-1-1](http://steamcn.com/t187703-1-1)

## 扩展软件
1. 迅雷极速版
2. SumatraPDF - - [https://www.sumatrapdfreader.org/free-pdf-reader-cn.html](https://www.sumatrapdfreader.org/free-pdf-reader-cn.html)
3. Snipaste - - [https://zh.snipaste.com/](https://zh.snipaste.com/)

## 备注 - - 文件结构
- C - System
- D - Data
    - Project - Git 项目
    - iProject - IDEA 项目
    - m2 - Maven 本地仓库
    - Software - 绿色软件
    - CloudMusic - 网易云音乐本地
    - Thunder - 迅雷下载
    - JianGuoYun - 我的坚果云
- E - Game
