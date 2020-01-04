# Manjaro 	

### 基本配置

#### 配置国内源

```shell
sudo pacman-mirrors -i -c China -m rank
sudo pacman -Syyu
```

#### 添加 archlinuxcn

配置 `sudo vi /etc/pacman.conf`

```conf
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server =https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

```shell
sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring
sudo pacman -Syyu
```

#### 安装工具

```shell
sudo pacman -S yay git net-tools tree vim
```

#### 安装软件

```shell
yay -S google-chrome electron-ssr visual-studio-code-bin netease-cloud-music typora enpass-bin flameshot
```

#### 输入法与字体

```shell
yay –S fcitx-rime  fcitx-im  fcitx-configtool
```

配置变量 `sudo vim  ~/.pam_environment `

```
GTK_IM_MODULE=fcitx  
QT_IM_MODULE=fcitx  
XMODIFIERS=@im=fcitx 
```

配置 rime

 `code ~/.config/fcitx/rime/default.custom.yaml `

```yaml
patch:
  "menu/page_size": 7
  schema_list:
    - {schema: luna_pinyin_simp}
  "ascii_composer/switch_key/Shift_L": commit_code
```

配置模糊音 https://gist.github.com/lotem/2320943

`code ~/.config/fcitx/rime/luna_pinyin_simp.custom.yaml`

```yaml
patch:
  'speller/algebra':
    - erase/^xx$/                      # 第一行保留
    - derive/^([zcs])h/$1/             # zh, ch, sh => z, c, s
    - derive/^([zcs])([^h])/$1h$2/     # z, c, s => zh, ch, sh
    - derive/([ei])n$/$1ng/            # en => eng, in => ing
    - derive/([ei])ng$/$1n/            # eng => en, ing => in
    # 模糊音定義先於簡拼定義，方可令簡拼支持以上模糊音
    - abbrev/^([a-z]).+$/$1/           # 簡拼（首字母）
    - abbrev/^([zcs]h).+$/$1/          # 簡拼（zh, ch, sh）
    # 以下是一組容錯拼寫，《漢語拼音》方案以前者爲正
    - derive/^([nl])ve$/$1ue/          # nve = nue, lve = lue
    - derive/^([jqxy])u/$1v/           # ju = jv,
    - derive/un$/uen/                  # gun = guen,
    - derive/ui$/uei/                  # gui = guei,
    - derive/iu$/iou/                  # jiu = jiou,
    # 自動糾正一些常見的按鍵錯誤
    - derive/([aeiou])ng$/$1gn/        # dagn => dang 
    - derive/([dtngkhrzcs])o(u|ng)$/$1o/  # zho => zhong|zhou
    - derive/ong$/on/                  # zhonguo => zhong guo
    - derive/ao$/oa/                   # hoa => hao
    - derive/([iu])a(o|ng?)$/a$1$2/    # tain => tian
```

配置 fcitx 主题

从 GDrive 下载解压到目录`~/.config/fcitx/skin`

修复文件 `code ~/.config/fcitx/conf/fcitx-classic-ui.config`  设置 `SkinType` 为主题名称

配置 emoji 字体

```shell
sudo pacman -S noto-fonts-emoji
```

#### 鼠标滚动

```shell
yay -S imwheel
```

配置 `code ~/.imwheelrc`

```
".*" 
None,      Up,   Button4, 3 
None,      Down, Button5, 3 
Control_L, Up,   Control_L|Button4 
Control_L, Down, Control_L|Button5 
Shift_L,   Up,   Shift_L|Button4 
Shift_L,   Down, Shift_L|Button5 
```

开机启动 `code  .config/autostart/imwheel.desktop`

```
 [Desktop Entry]
 Encoding=UTF-8
 Name=imwheel
 Type=Application
 Exec=/usr/bin/imwheel
 Hidden=false
 Terminal=false
 Categories=Application;Network;
 Icon=applications-system
```

#### 修改Home文件夹为英文

```shell
sudo pacman -S xdg-user-dirs-gtk
export LANG=en_US
xdg-user-dirs-gtk-update # 更新名称
export LANG=zh_CN.UTF-8 
```

#### Gnome 

主题 ：https://github.com/EliverLara/Ant-Dracula

图标：https://github.com/keeferrourke/la-capitaine-icon-theme

#### 终端

主题：https://github.com/Mayccoll/Gogh

fish shell : https://fishshell.com/

```shell
yay -S fish 

# 查找安装路径，并设置为默认shell
which fish 
chsh -s usr/bin/fish

# 配置
fish_config
```

oh-my-fish : https://github.com/oh-my-fish/oh-my-fish

```shell
curl -L https://get.oh-my.fish | fish
```



### 开发配置

#### Java  

 https://wiki.archlinux.org/index.php/Java

#### docker

https://wiki.archlinux.org/index.php/Docker

```shell
sudo pacman -S docker

sudo systemctl start docker 

sudo systemctl status docker

# 设置docker开机启动服务
sudo systemctl enable docker
```

添加用户到 docker 用户组

```shell
sudo gpasswd -a ${USER} docker
```

镜像 https://lug.ustc.edu.cn/wiki/mirrors/help/docker

#### Idea

```shell
yay -S intellij-idea-community-edition
```

#### Maven 

```shell
yay -S maven

# 复制配置文件
cp /opt/maven/conf/settings.xml ~/.m2/
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

```shell
yay -S gradle
```

镜像 `build.gradle`

```groovy
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
        mavenLocal()
        mavenCentral()
    }
}
```

#### Vmare

https://wiki.archlinux.org/index.php/VMware
