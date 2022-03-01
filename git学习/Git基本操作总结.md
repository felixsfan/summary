**托管中心**`维护远程库`

- **内网：可以自己搭建一个GitLab服务器**
- **外网：可以使用码云、Github**

**版本控制工具**

- **集中式**：CSV ,**SVN**,VSS
- **分布式**：**Git**，Darcs,...

## 1. Git命令行操作

![git基本操作](/Users/fanqingwei/Desktop/学习/git学习/image/git基本操作.jpg)

### 1.1本地库初始化

```
进入文件夹
git init
注意：生成的 .git 目录中存放的是本地库相关文件，不要删除
```

### 1.2设置签名

- 项目(仓库)级别`仅在当前本地库有效`

  ```
  git config user.name tom  #设置用户名tom
  ```

  ```
  git config user.email liu@qq.com #设置用户邮箱
  ```

- 系统用户级别`仅在当前登录的操作系统用户有效`

  ```
  git config --global user.name tom
  ```

  ```
  git config --global user.email liu@qq.com
  ```

> 仅仅加了一个 `--global`
>
> 优先级别：`项目级别` > `系统级别`
>
> 信息保存位置：`~/.gitconfig 文件`

### 1.3基本操作

#### 1.3.1 状态查看

```
git status   #查看工作区、暂存区状态
```

#### 1.3.2 添加

```
git add fileName  #指定文件
git add . #所有
说明：将工作区的文件添加到暂存区
```

#### 1.3.3 提交

```
git commit -m 'commit message' fileName
说明：将暂存区内容提交到本地库
```

#### 1.3.4 查看历史记录

```shell
git log 
git reflog  #常用
git log --greph #图形显示,更直观
git log --pretty=oneline #漂亮一行显示
git log --oneline #简洁显示
说明：HEAD@{移动到当前版本需要多少步}
```

#### 1.3.5 前进后退

- 基于索引值`推荐`

  ```
  git reset --hard 指针位置
  ```

  ```
  例子：git reset --hard a6ace91 #回到这个状态
  ```

- 使用 **^** 符号`只能后退`

  ```
  git reset --hard HEAD^
  ```

  ```
  例子：git reset --hard HEAD^^
  ```

  ```
  注意：几个 ^ 表示后退几步
  ```

- 使用 **~** 符号`只能后退`

  ```
  git reset --hard HEAD~n
  ```

  ```
  例子：git reset --hard HEAD~3
  ```

- 回退仓库最新版本到暂存区（重置暂存区）

  ```shell
  git reset HEAD -- <file>
  ```

该操作 可以 拉取最近一次提交到版本库的文件到暂存区 并且该操作不影响工作区

#### 1.3.6 reset的三个参数比较

```
soft: 
  - 仅本地库移动HEAD 指针
mixed:
  - 在本地库移动HEAD指针
  - 重置暂存区
hard:
  - 在本地库移动HEAD指针
  - 重置暂存区
  - 重置工作区
```

#### 1.3.7 撤销修改和版本回退

##### 方法总结

- `git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区
- git checkout --readme.txt

##### 场景

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset head file`，就回到了场景1，第二步按场景1操作

##### git reset

1. soft 参数：git reset –soft HEAD～1 或者git reset –soft HEAD^意为将版本库软回退1个版本，所谓软回退表示将本地版本库的头指针全部重置到指定版本，且将这次提交之后的所有变更都移动到暂存区 ,就是回到上面第2种情况，这个时候你的修改还在暂存区
2. 默认的mixed参数：git reset HEAD～1 意为将版本库回退1个版本，将本地版本库的头指针全部重置到指定版本，且会重置暂存区，即这次提交之后的所有变更都移动到未暂存阶段就是工作区git add之前。
3. hard参数：git reset –hard HEAD～1 意为将版本库回退1个版本，但是不仅仅是将本地版本库的头指针全部重置到指定版本，也会重置暂存区，并且会将工作区代码也回退到这个版本

##### git checkout --readme.txt

命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在撤销修改就回到和版本库一模一样的状态；(上一次的git commit 后,修改readme.txt 但没有执行git add,回到上一次的git commit后的结果)

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。(修改readme.txt,并且git add,然后又修改了readme.txt, 此时执行git checkout,回到git add 后的状态)

总之，就是让这个文件回到最近一次git commit或git add时的状态。

https://www.jianshu.com/p/285302d1eb73

#### 1.3.8删除文件并找回

- **相当于建立一个快照，虽然删除了，但只要添加到暂存区，就能找回**

```
git reset --hard 指针位置
```

#### 1.3.9 文件差异比较

```
git diff 文件名
git diff 哈希值 文件名  #和历史中的一个版本比较
git diff  #不带文件名，则比较多个文件
```

### 1.4 分支管理

```
hot_fix` `master` `feature_x` `feature_y
```

#### 1.4.1 什么是分支管理

- 在版本控制中，使用推进多个任务

#### 1.4.2 分支的好处

- 同时并行推进多个功能开发，提高开发效率
- 某一分支开发失败，不会对其它分支有任何影响

#### 1.4.3 分支操作

- 创建分支

```
git branch 分支名
```

- 查看分支

```
git branch
git branch -v 
```

- 切换分支

```
git checkout 分支名
git checkout -b 分支名   #创建分支并直接切换到该分支
```

- 合并分支`相当于把修改了的文件拉过来`

```shell
git merge xxx
注意：合并分支的时候要明确谁谁合并
    我在a分支里面修改了。要合并到master，就先切换到master，然后合并b
```

**同时合并分支会更新本地和暂存区**

- 删除分支

```
git branch -d 分支名
```

### **1.5 分支合并**

#### 1.5.1 合并分支步骤

此时如果我正在我自生自灭的dev分支开发，开发完了，头头让我合并分支那我首先要干啥呢？

首先当然要提交自己写好的代码到dev分支啊！
当前在dev分支

```shell
#查看当前分支
git branch
#提交代码到缓存
git add .
#提交注释
git commit -m "完成的代码工作"
#提交到dev分支
git push origin dev
```

以上的流程就是提交代码到dev的过程！

下一步就是要将我们的dev分支和master分支合并了！那该如何操作？

```shell
#切换到master分支
git checkout master
#拉取master中最新的代码
git pull origin master
==========================================================================
#dev分支的代码合并到master         
git merge dev                   
#查看状态                         
git status                      
#提交代码
git push origin master           
```

#### 1.5.2 合并指定文件到主分支

1.首先切换到主分支 注意将分支上的数据全部提交 以免造成数据冲突或丢失

```shell
git checkeout master
```

2. 选择要合并的文件

```shell
 git checkout --patch 分支名称 要合并的文件路径
```

3.此时文件将合并完成 最重要的一步一定是 提交

```shell
#提交代码
git push origin master
```

#### 1.5.3 合并分支会更新本地和暂存区

两个分支合并会生成一个新的commit，因此不需要再add和commit了，push到远处仓库就行，详细见图解git;

但是合并指定文件到主分支需要commit后再push

#### 1.5.4 冲突

##### 1.5.4.1 冲突的原因

git 冲突出现的场景很多，`git rebase`，`git pull`，`git merge`，`git cherry-pick`， 等命令都有可能出现冲突，其实他们的本质是相同的。

两个分支各自都有新的提交，且都对代码同一行进行了修改，现在想将两个分支进行合并，就发生冲突了。

文字有点绕，看看下图：

![git冲突1](/Users/fanqingwei/Desktop/学习/git学习/image/git冲突1.jpeg)

我和同事都拿到一份提交历史为 a,b 的代码，我们两个都对同一部分代码进行修改并提交，分别为 c 和 d。

现在要将两个提交进行合并，git 不知道应该采用哪个修改，于是就提示冲突，让我们人为进行修改。

##### 1.5.4.1 Git冲突情况

**1、不同分支下的merge**

比如在不同分支下进行分支合并时，我们在本地修改了a文件并把a文件的修改push到了dev分支下，接着我们切换到master分支下将dev分支上的修改合并到当前master分支下时，如果master分支下的a文件也有修改的话，这时在进行merge也会产生冲突。

**dev分支回去的时候master分支已经不是当初离开时的样子了**

**2、同一个分支下的pull或push**

比如在同一个分支下，对本地的a文件做出了修改，此时我们在进行pull或push时如果远程分支下的a文件也有修改，那么代表本地和远程分支的代码是不同步的，此时也会引起冲突。

##### 1.5.4.2 Git冲突解决方案

###### git merge 冲突

知道冲突怎么来的，解决冲突就很简单了，这里以 `git merge`举例。

原始代码只有一个 README.md 文件，内容为：

```shell
This is first commit.
```

我在 master 分支上将该文件进行如下修改并提交：

```shell
This is second commit.
```

然后通过命令 `git checkout -b dev` ，新建一个 dev 分支，并切换到该分支。

修改 README.md 文件为如下内容，并进行提交：

```shell
This is third commit.
```

我这里在两个分支上，对同一个文件同一行进行了修改并提交。

然后切换到 master 分支上，通过命令 `git merge dev` ，将两个分支进行合并。

这时会提示 README.md 文件发生了冲突：

```shell
$ git merge dev
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

```shell
git status  # 查看哪些文件冲突
```

打开README.md

README.md 文件中的内容自动变成：

```shell
<<<<<<< HEAD
This is second commit.
=======
This is third commit.
>>>>>>> dev
```

通过 ======= 将发生冲突的两部分进行隔开，表示这两部分不同内容会在文件中的相同位置。

HEAD 表示当前本地所在分支的别名，dev 表示将要合并过来的分支。

手动修改 READ.md 文件去掉冲突，比如修改为：

```shell
This is second/third commit.
```

然后添加到暂存区并提交

```shell
$ git add readme.md
$ git commit -m "合并分支解决冲突"  # 冲突解决后git commit 不能跟文件名
```

###### **git pull 冲突**

`git pull`是将远程分支的修改同步到本地，并和本地分支进行合并，所以 git pull 实际上是两个命令：

```shell
git pull = git fetch + git merge FETCH_HEAD
```

因为有 git merge，如果我本地有一个新提交，且没上传到服务器，那么新提交和远程分支的修改有可能发生冲突，解决办法同上。

有些人使用 git pull 时喜欢加上参数`--rebase` ，表示

```shell
git pull --rebase = git fetch + git rebase FETCH_HEAD
```

git merge 和 git rebase 功能比较类似，是将两个分支的提交进行合并，它们的区别有：合并时是否创建新提交，提交树是否呈线性等。

git rebase 发生冲突后，解决办法也是很类似的，区别仅仅是最后的命令更改为 `git rebase --continue`

##### **1.5.4.3 避免 git 冲突**

我们知道怎么解决冲突，但是在工作中还是要尽量避免，养成以下好习惯，让你尽可能不产生代码冲突。

尽可能频繁地使用 git pull 同步代码，每次修改都基于最新的源码，大大减少发生冲突的概率。

还要减少每次提交代码的行数，每次做完一个小修改就提交并上传代码。这样即使发生冲突了，你也能很好地解决。

##### 1.5.4.4 注意

结合3.git原理

![git合并冲突问题](/Users/fanqingwei/Desktop/学习/git学习/image/git合并冲突问题.png)

![git合并冲突问题2](/Users/fanqingwei/Desktop/学习/git学习/image/git合并冲突问题2.png)

### 1.6 Git恢复数据

<img src="/Users/fanqingwei/Desktop/学习/git学习\image\git恢复数据.png" style="zoom:50%;" />

## 2. Git 结合Github

### 2.1 创建远程库地址别名

```
git remote -v  #查看远程地址别名
git remote add 别名 远程地址 
例子：git remote add origin https://xx
```

### 2.2 新建远程仓库

通常有两种获取 Git 项目仓库的方式：

1. 将尚未进行版本控制的本地目录转换为 Git 仓库；
2. 从其它服务器 **克隆** 一个已存在的 Git 仓库。

#### 2.2.1 把本地项目提交到远程

   1、在本地创建一个版本库（即文件夹），通过git init把它变成Git仓库；

   2、把项目复制到这个文件夹里面，再通过git add .把项目添加到仓库；

   3、再通过git commit -m "注释内容"把项目提交到仓库；

   4、在Github上设置好SSH密钥后，新建一个远程仓库，通过`git remote add 远程仓库别名 远程仓库地址` 将本地仓库和远程仓库进行关联；

   5、最后通过git push -u origin master把本地仓库的项目推送到远程仓库（也就是Github）上；（若新建远程仓库的时候自动创建了README文件会报错）

#### 2.2.2 从远程仓库clone

完整的把远程库克隆到本地，克隆下来后不要在主分支里面做开发；clone进行一次，从无到有的过程，更新用pull

```shell
git clone  远程地址

例子：git clone https://xx
如果你想在克隆远程仓库的时候，自定义本地仓库的名字，你可以通过额外的参数指定新的目录名：

git clone <url> 文件名
```

### 

### 2.3 git本地分支和远程分支如何关联

#### 2.3.1 创建分支并关联远程分支

一、如何把本地新建分支同步到远程分支上（注：该分支在远程上没有）？
二、又如何在本地把远程分支上新建分支同步到本地（本地没有该分支）？

1.其实从远程分支分出来的分支都是跟踪分支（track）,当对该分支进行`push`和`pull`时，如果该分支和远程分支同名，`git`会知道推送到远程哪个分支，从哪个远程分支同步到本地分支。其实每次克隆一个仓库时，本地就新建一个`master`分支来`track`远程`origin/master`。如果不同名，我们需要人为指定`git push origin branch_name`

2.如果本地新建了一个分支`branch_name`，但是在远程没有，这时候`push`和`pull`指令就无法确定该跟踪谁,一般来说我们都会使其跟踪远程同名分支，所以可以利用`git push --set-upstream origin branch_name`，这样就可以自动在远程创建一个`branch_name`分支，然后本地分支会`track`该分支。后面再对该分支使用`push`和`pull`就自动同步。无需再指定分支。

3.跟踪远程分支
1）如果远程新建了一个分支，本地没有该分支，可以用`git checkout --track origin/branch_name`，这时候本地会新建一个分支名叫`branch_name`，会自动跟踪远程的同名分支`branch_name`。
2）用上面中方法，得到的分支名永远和远程的分支名一样，如果想新建一个本地分支不同名字，同时跟踪一个远程分支可以利用。
`git checkout -b new_branch_name branch_name`，这条指令本来是根据一个`branch_name`分支分出一个本地分支`new_branch_name`，但是如果所根据的分支`branch_name`是一个远程分支名，那么本地的分支会自动的track远程分支。建议跟踪分支和被跟踪远程分支同名。

**总结：一般我们就用`git push --set-upstream origin branch_name`来在远程创建一个与本地`branch_name`同名的分支并跟踪；利用`git checkout --track origin/branch_name`来在本地创建一个与`branch_name`同名分支跟踪远程分支。**

### 2.4 解除已经关联的远程分支

```
git remote remove origin
```

### 2.5 origin / master与origin master的区别

**`origin master`是远程仓库分支，`origin/master`是名为“origin” 的远程分支的*本地副本*，名为`master`**

`pull origin matser:develop`命令原理就是先git  fetch到`origin/master`，再`git merge`到本地`develop`分支

### 2.6 远程仓库操作

#### 2.6.1 关联远程仓库

```shell
git remote add origin git@github.com:tianqixin/runoob-git-test.git
```

#### 2.6.2 显示所有远程仓库：

```shell
git remote -v
```

以下我们先载入远程仓库，然后查看信息：

```shell
$ git clone https://github.com/tianqixin/runoob-git-test
$ cd runoob-git-test
$ git remote -v
origin https://github.com/tianqixin/runoob-git-test (fetch)
origin https://github.com/tianqixin/runoob-git-test (push)
```

#### 2.6.3 其他相关命令：

```shell
git remote rm name  # 删除远程仓库
git remote rename old_name new_name  # 修改仓库名
```

### 2.6 远程分支的最新内容更新到本地

####  **2.6.1 merge和pull都会更新本地和暂存区代码**

```shell
本地存在clone下来的文件 就用pull更新,同时会更新工作去和暂存区
pull = fetch + merge
    git fetch 别名 分支名
    git merge 别名 分支名
git pull 别名 分支名
```

#### 2.6.2 fetch

git fetch ：相当于是从远程获取最新版本到本地，不会自动merge

```
git fetch origin master
git log -p master..origin/master
git merge origin/master
```

以上命令的含义：

首先从远程的origin的master主分支下载最新的版本到origin/master分支上，然后比较本地的master分支和origin/master分支的差别，最后进行合并。

#### 2.6.3 pull

git pull：相当于是从远程获取最新版本并merge到本地

格式：

```sh
git pull <远程主机名> <远程分支名>:<本地分支名>
```

将远程主机 origin 的 master 分支拉取过来，与本地的 brantest 分支合并。

```sh
git pull origin master:brantest
```

如果远程分支是与当前分支合并，则冒号后面的部分可以省略。

```shell
git pull origin master
```

上述命令其实相当于git fetch 和 git merge。在实际使用中，git fetch更安全一些，因为在merge前，我们可以查看更新情况，然后再决定是否合并

例如：

```
     A---B---C master on origin
	/
D---E---F---G master
	^
    origin/master in your repository
```

远程的`master`分支到了`C`，本地的开发到了`G`。

```
	 A---B---C origin/master
	/         \
D---E---F---G---H master
```

`git pull`之后会生成一个新的`H`，合并两个分支。

### 2.7 推送

```
开发修改完把本地库的文件推送到远程仓库的前提是提交到了本地库才可以推送
git push 别名 分支名
git push -u 别名 分支名    #-u指定默认主机
例子：git push origin master
```

### 2.8 克隆

```shell
完整的把远程库克隆到本地，克隆下来后不要在主分支里面做开发；clone进行一次，从无到有的过程，更新用pull

git clone  远程地址

例子：git clone https://xx
如果你想在克隆远程仓库的时候，自定义本地仓库的名字，你可以通过额外的参数指定新的目录名：

git clone <url> 文件名
```

### 2.9 push时解决冲突

比如在同一个分支下，对本地的a文件做出了修改，此时我们在进行pull或push时如果远程分支下的a文件也有修改，那么代表本地和远程分支的代码是不同步的，此时就会引起冲突。

1. 如果本地代码和远程仓库代码冲突是push不上去的
2. 必须先pull下来合并代码，解决冲突再push

### 2.10 rebase

```shell
提交记录简洁不分叉`没学懂，感觉有点鸡肋`混眼熟
git rebase -i 索引号
git rebase -i HEAD~3  #合并最近三条记录
说明：在vim编辑里面改成s
```

### 2.11 beyond compare

```shell
用软件解决冲突
1.安装 ：
    beyond compare 
2.配置：
    git config --local merge.tool bc3  #合并名称
    git config --local mergetool.path '/usr/local/bin/bcomp' #软件路径
    git config --local mergetool.keepBackup false  #False不用保存备份
3.应用：
    git mergetool
说明：--local指只在当前操作系统有效
```

### 2.12 跨团队合作

```shell
代码review之后合并
```

- **适用于个人**

  **邀请成员**:`Settings` --> `Collaborators` -->`填写用户名` -->`打开链接接受邀请`

- **企业** `创建一个组织` `方便管理`

- **review**

  `组织做review` `通过Pull request`

- **给开源社区共享代码**

  `点击别人仓库的fork 到自己的仓库` -- > `然后clone下来 修改后推送到远程库` --> `点击Pull Request请求` --> `Create pull request发消息`

### 2.1 Tag标签

```
为了清晰的版本管理，公司一般不会直接使用commit提交
git tag -a v1.0 -m '版本介绍'   #创建本地tag信息
git tag -d v1.0         #删除tag
git push origin --tags   #将本地tag信息推送到远程库
git pull origin --tags    #拉取到本地

git checkout v.10    #切换tag
git clone -b v0.1 地址   #指定tag下载代码
```

### 2.14 SSH 免密登录

- 输入:`ssh-keygen -t rsa -C felixsfan@tencent.com`
- 进入`.ssh`目录，复制`id_rsa.pub`文件内容
- 登录GitHub。`Settings`  --> `SSH and GPG keys` --> `New SSH Key`
- 回到git通过ssh地址创建。`git remote add 别名 SSH地址`

## 3. Git原理

git add生成tree和blob
git commit生成commit

https://ml.mbd.baidu.com/r/lp17zkkwJq?f=cp&u=baf312b7c41d564f

### 3.1 git工作流程原理分析

假定现在我们有一个 git仓库，在这个 git仓库中已经添加了两个文件分别叫做 file1和 file2，两个文件中的内容分别是 foo和 bar。并且都做了 commit操作。这时候的图如下：

![](/Users/fanqingwei/Desktop/学习/git学习\image\git原理1.png)

在 Git中，从理解上来讲是分成三种区，分别是**工作目录**、**暂存区**以及**Git仓库**。其中**工作目录**是我们写代码的文件，**暂存区**是已经把代码进行了 add操作，但是并没有进行 commit操作。**Git仓库**则是已经把代码提交到仓库中了，只要仓库不丢失，代码是不会丢失的了。

再来理解下 add操作和 commit操作分别做了什么事。用上图的例子来说，工作目录中包含了 file1和 file2，然后在做 add操作的时候，理解上来讲是说把代码提交到了暂存区，实际上 Git是将代码修改了的部分进行了记录，然后进行 SHA1操作，生成了一个 blob对象（ blob是一个类似文件对象的二进制数据，不懂可以理解为一个快照），并存储到仓库中了（**注意，此时代码快照实际上已经存储到仓库中了**），但是并没有在目录树上进行映射，而是在一个索引文件中进行了映射。此后如果我们再执行 commit操作，才会把索引中的映射，真正更改到对象树中，对象树会记录所有的 commitid与 blob的映射。这样就实现了根据 commitid就可以找到对应代码的功能了。

来，我们继续用图来讲解一下。

然后我们现在对 file1文件内容进行修改，从 foo变成 quux。图将发生如下的改变：

![](/Users/fanqingwei/Desktop/学习/git学习\image\git原理2.png)

我们再执行 git add操作的时候，图将变成如下：

![](/Users/fanqingwei/Desktop/学习/git学习\image\git原理3.png)

在执行 git add操作的时候，会在仓库对象中生成一个 blob对象，这个对象记录的是与之前文件相比发生的改变。但是此时并没有生成 commit操作，而是在索引文件中对其进行了索引。

此时如果我们再执行 commit操作，那么将变成如下：

![](/Users/fanqingwei/Desktop/学习/git学习\image\git原理4.png)

因为进行了 commit操作，所以现在生成了一个新的 commit，这个 commit指向原来的 commit，并且还指向了新生成的 blob对象。因为 file2文件没有发生改变，所以依然还是会指向原来的 bar那个blob对象。并且做完提交后，当前的分支 HEAD指针会移动到现在的 commit。

### 3.2 Git仓库介绍

Git给自己的定义是一套内存寻址文件系统，当你在一个目录下执行git init命令时，会生成一个.git目录，它的目录结构是这样的：

```
.git/
├── branches
├── config
├── description
├── HEAD
├── hooks
│   ├── applypatch-msg.sample
│   ├── commit-msg.sample
│   ├── post-update.sample
│   ├── pre-applypatch.sample
│   ├── pre-commit.sample
│   ├── prepare-commit-msg.sample
│   ├── pre-push.sample
│   ├── pre-rebase.sample
│   └── update.sample
├── info
│   └── exclude
├── objects
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags
```

其中branches目录已经不再使用，description文件仅供GitWeb程序使用，config文件保存了项目的配置。

**1. .git/index：**

索引文件。每当我们执行 git add操作的时候， git会给添加的每个文件的内容创建一个对象，然后把这个文件的路径和生成的对象进行映射，存放到 .git/index文件中。等到后期新的命令（比如：git add、 git rm或者 git mv）执行的时候，又会重新更新索引。

**2. .git/HEAD：**

表示当前指向的是哪个分支。

**3. .git/config：**

当前 git仓库的配置文件。保存这 git仓库的远程地址，远程仓库分支等。

**4. .git/objects：**

真正保存代码的地方。其中分成两种类型的文件，一种是 pack，另外的是 blob文件。其中 pack是根据定位内容非常相似的全部文件，然后为他们之一存储整个内容。之后计算相似文件之间的差异并且只存储差异。而 blob文件就是记录差异。blob是“二进制大对象”（ binary largeobject）的简写，是计算机领域常用术语，用来指代某些可以包含任意数据的变量或文件。

**5. .git/logs：**

这个地方是记录分支上做的 commit操作的日志。我们通过 git log命令就可以查看到这个里面的内容。

## 补充

### git大小限制

git的默认提交文件大小，网上都说是1M，只需要设置把git的允许提交大小设为500M即可

```
git config --global http.postBuffer 524288000
```

### Git解决中文乱码问题

`git status` 乱码

解决方法：

```
git config --global core.quotepath false
```

`git commit` 乱码

解决方法：

```
git config --global i18n.commitencoding utf-8
```

注意：如果是Linux系统，需要设置环境变量 `export LESSCHARSET=utf-8`

### git pull origin master与git pull --rebase origin master的区别

区别：

```
git pull=git fetch + git merge
git pull --rebase=git fetch+git rebase
```

例如：现在有两个分支：test和master，假设远端的master的代码已经更改了（在B基础上变动：C,E），test的代码更改了要提交代码（在B基础上变动：D,E），如下图：

```
      D---E test
      /
 A---B---C---F--- master
```

问题就来了，如果C,F和D,E的更改发生冲突，那么就需要我们合并冲突了，下面我们来看看git merge和git rebase怎么合并的

git merge:

```
       D--------E
      /          \
 A---B---C---F----G---   test, master
```

git rebase

```
A---B---D---E---C‘---F‘---   test, master
```

对比可看出：git merge多出了一个新的节点G，会将远端master的代码和test本地的代码在这个G节点合并，之前的提交会分开去显示。

git --rebase会将两个分支融合成一个线性的提交，不会形成新的节点。

## 5. Git中submodule的使用

