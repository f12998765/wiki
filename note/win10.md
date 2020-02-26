# Win 10

打开 Windows 预览体验计划，更新系统到 **18917** 以上 



## 基本配置

### Scoop

wiki：https://github.com/lukesampson/scoop/wiki/Quick-Start



安装到自定义目录

```powershell
$env:SCOOP='d:\scoop'
[environment]::setEnvironmentVariable('SCOOP',$env:SCOOP,'User')
iwr -useb get.scoop.sh | iex
```

指定软件安装目录

```powershell
$env:SCOOP_GLOBAL='d:\apps'
[environment]::setEnvironmentVariable('SCOOP_GLOBAL',$env:SCOOP_GLOBAL,'Machine')
scoop install -g <app>
```

安装依赖软件

```powershell
scoop install 7zip git
```

添加 bucket

```powershell
scoop bucket add extras
scoop bucket add versions
```



### 系统软件

```powershell
scoop install dismplusplus 
```



### 日常软件

```powershell
scoop install googlechrome listary snipaste quicklook
```



### 文件处理

```powershell
scoop install sumatrapdf imageglass motrix
```



### 独立安装

- usbeam https://usbeam.net
- 网易云音乐 https://music.163.com
- steam https://store.steampowered.com/
- uninstall-tool https://www.crystalidea.com/uninstall-tool
- 备份与同步 https://www.google.com/drive/download/
- 火绒 https://www.huorong.cn/
- PicGo https://github.com/Molunerfinn/PicGo
  - ![](https://raw.githubusercontent.com/f12998765/image/image/hub/20200202222848.png)



### 绿色软件

- NetSpeedMonitor
- OpenVPN



### 商店应用

- Microsoft  To Do
- OneNote
- Windows Terminal



## 开发配置

### WSL2

安装：[Installation Instructions for WSL 2](https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-index)



ubuntu 换源：https://developer.aliyun.com/mirror/ubuntu



Windows Terminal 添加 Dracula 配色后，设置  `"background" : "#282A36","colorScheme" : "Dracula"`

```json
        {
            "background" : "#282A36",
            "black" : "#21222C",
            "blue" : "#BD93F9",
            "brightBlack" : "#6272A4",
            "brightBlue" : "#D6ACFF",
            "brightCyan" : "#A4FFFF",
            "brightGreen" : "#69FF94",
            "brightPurple" : "#FF92DF",
            "brightRed" : "#FF6E6E",
            "brightWhite" : "#FFFFFF",
            "brightYellow" : "#FFFFA5",
            "cyan" : "#8BE9FD",
            "foreground" : "#F8F8F2",
            "green" : "#50FA7B",
            "name" : "Dracula",
            "purple" : "#FF79C6",
            "red" : "#FF5555",
            "white" : "#F8F8F2",
            "yellow" : "#F1FA8C"
        }
```



wsl2 中安装 docker  : [Get Docker Engine - Community for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)



widnows 中使用 docker desktop 连接wsl2中的docker : [Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl-tech-preview/)



### 开发依赖

#### Java

https://github.com/lukesampson/scoop/wiki/Java



添加 bucket 

```powershell
scoop bucket add java
```



安装  jdk

```powershell
scoop install  adopt8-hotspot
```



#### Maven

```powershell
scoop install maven
```



镜像

```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```



#### Gradle

```powershell
scoop install gradle4
```



镜像 `build.gradle`

```xml
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
        mavenLocal()
        mavenCentral()
    }
}
```



### 开发工具



```powershell
scoop install idea  insomnia gitkraken mobaxterm screentogif
```

- insomnia https://support.insomnia.rest/


### 独立安装

- vscode https://code.visualstudio.com/  （scoop 安装使 wsl2 打开文件异常）
- Another.Redis.Dsektop.Manager https://github.com/qishibo/AnotherRedisDesktopManager
- Navicat  https://www.navicat.com.cn/products/navicat-premium








