# Git 常用命令

## 设置配置文件
```bash
git config [--global] user.name "[name]"
git config [--global] user.email "[email]"
git config --global color.ui true
git config list
```
## 生成SSH Key
```bash
# 检查是否存在
cd ~/.ssh
# 生成SSH Key，在id_rsa.pub中
ssh-keygen -t rsa -C "your_email@example.com"
# 测试
ssh -T git@github.com
```
## HTTPS 方式记住密码
```bash
git config credential.helper store
```

## 设置不同的远程仓库
在 .ssh 文件夹下生成不同的 SSH key ，创建 `config` 文件

```
# gitlab
Host gitlab.com
    User git
    HostName gitlab.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_gitlab

# github
Host github.com
    User git
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_github
```

> 注意设置邮箱和用户名

## 初始化仓库
```bash
# 初始化仓库
git init [project-name]
# 克隆远程仓库
git clone [project-URL]
```
## 查看当前状态
```bash
git status
```
## 添加到暂存区
```bash
git add [-A/.]
```
## 提交代码
```bash
git commit -m "edit message"
```
## 创建分支
```bash
# 列出所有本地分支
git branch

# 新建一个分支，但依然停留在当前分支
git branch [branch-name]
# 新建一个分支，并切换到该分支
git checkout -b [branch]

# 切换到指定分支，并更新工作区
git checkout [branch-name]

# 删除分支
git branch -d [branch-name]

# 合并指定分支到当前分支
git merge [branch]
```
## 远程仓库
```bash
# 增加一个新的远程仓库，并命名
git remote add [name] [url]

# 查看当前的远程仓库
git remote -v
# 需要多个远程仓库时，再添加一个新的远程仓库
git remote set-url --add [name] [url]
# 推送多个远程仓库
git push all --all
```
## 推送
```bash
# 完整命令
git push origin [localbranch]:[remotebranch]
# 忽略远程分支，代表远程分支与本地分支名相同
git push origin [localbranch]
# 忽略本地分支，代表删除远程分支
git push origin :[remotebranch]
# 忽略分支，默认本地分支与远程分支关联
git push
# 设置分支关联
git push --set-upstream origin [remotebranch]
```
## 拉取
```bash
# 从远程仓库下载分支
git fetch origin master
# 合并分支到当前分支
git merge origin/master
# 拉取远程仓库分支，与当前分支合并
git pull origin master
```
## 强制覆盖本地修改
```bash
#清除本地修改
git reset --hard
#拉代码
git pull
```
待补充……
