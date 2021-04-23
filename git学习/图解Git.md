## 综述

![](C:\Users\felixsfan\Desktop\办公机备份\学习\git学习\image\思维导图.bmp)

![](C:\Users\felixsfan\Desktop\办公机备份\学习\git学习\image\git.jpg)

![](C:\Users\felixsfan\Desktop\办公机备份\学习\git学习\image\git.png)

## 基本用法

>  https://www.runoob.com/w3cnote/git-graphical.html 
>

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394755-3986-basic-usage.svg-.png)

上面的四条命令在工作目录、暂存目录(也叫做索引)和仓库之间复制文件。

- `git add files` 把当前文件放入暂存区域。
- `git commit` 给暂存区域生成快照并提交。
- `git reset -- files` 用来撤销最后一次`git add files`，你也可以用`git reset` 撤销所有暂存区域文件。
- `git checkout -- files` 把文件从暂存区域复制到工作目录，用来丢弃本地修改。

你可以用 `git reset -p`, `git checkout -p`, or `git add -p`进入交互模式。

也可以跳过暂存区域直接从仓库取出文件或者直接提交代码。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394755-5406-basic-usage-2.svg-.png)

- `git commit -a `相当于运行 `git add` 把所有当前目录下的文件加入暂存区域再运行`git commit`.
- `git commit files` 进行一次包含最后一次提交加上工作目录中文件快照的提交。并且文件被添加到暂存区域。
- `git checkout HEAD -- files` 回滚到复制最后一次提交。

## 约定

后文中以下面的形式使用图片。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394755-9088-conventions.svg-.png)

绿色的5位字符表示提交的ID，分别指向父节点。分支用橘色显示，分别指向特定的提交。当前分支由附在其上的*HEAD*标识。 这张图片里显示最后5次提交，*ed489*是最新提交。 *master*分支指向此次提交，另一个*maint*分支指向祖父提交节点。

## 命令详解

### Diff

有许多种方法查看两次提交之间的变动。下面是一些示例。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394756-8361-diff.svg-.png)

### Commit

提交时，git用暂存区域的文件创建一个新的提交，并把此时的节点设为父节点。然后把当前分支指向新的提交节点。下图中，当前分支是*master*。 在运行命令之前，*master*指向*ed489*，提交后，*master*指向新的节点*f0cec*并以*ed489*作为父节点。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394758-7356-commit-master.svg-.png)

即便当前分支是某次提交的祖父节点，git会同样操作。下图中，在*master*分支的祖父节点*maint*分支进行一次提交，生成了*1800b*。 这样，*maint*分支就不再是*master*分支的祖父节点。此时合并(或者衍合) 是必须的。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394758-4847-commit-maint.svg-.png)

如果想更改一次提交，使用 `git commit --amend`。git会使用与当前提交相同的父节点进行一次新提交，旧的提交会被取消。 ![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394758-1429-commit-amend.svg-.png)

另一个例子是分离HEAD提交,后文讲。

### Checkout

checkout命令用于从历史提交（或者暂存区域）中拷贝文件到工作目录，也可用于切换分支。

当给定某个文件名（或者打开-p选项，或者文件名和-p选项同时打开）时，git会从指定的提交中拷贝文件到暂存区域和工作目录。比如，`git checkout HEAD~ foo.c`会将提交节点*HEAD~*(即当前提交节点的父节点)中的`foo.c`复制到工作目录并且加到暂存区域中。（如果命令中没有指定提交节点，则会从暂存区域中拷贝内容。）注意当前分支不会发生变化。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394762-8267-checkout-files.svg-.png)

当不指定文件名，而是给出一个（本地）分支时，那么*HEAD*标识会移动到那个分支（也就是说，我们"切换"到那个分支了），然后暂存区域和工作目录中的内容会和*HEAD*对应的提交节点一致。新提交节点（下图中的a47c3）中的所有文件都会被复制（到暂存区域和工作目录中）；只存在于老的提交节点（ed489）中的文件会被删除；不属于上述两者的文件会被忽略，不受影响。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394763-1721-checkout-branch.svg-.png)

如果既没有指定文件名，也没有指定分支名，而是一个标签、远程分支、SHA-1值或者是像*master~3*类似的东西，就得到一个匿名分支，称作*detached HEAD*（被分离的*HEAD*标识）。这样可以很方便地在历史版本之间互相切换。比如说你想要编译1.6.6.1版本的git，你可以运行`git checkout v1.6.6.1`（这是一个标签，而非分支名），编译，安装，然后切换回另一个分支，比如说`git checkout master`。然而，当提交操作涉及到"分离的HEAD"时，其行为会略有不同，详情见在下面。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394761-6610-checkout-detached.svg-.png)



### HEAD标识处于分离状态时的提交操作

当*HEAD*处于分离状态（不依附于任一分支）时，提交操作可以正常进行，但是不会更新任何已命名的分支。(你可以认为这是在更新一个匿名分支。)

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394763-4695-commit-detached.svg-.png)

一旦此后你切换到别的分支，比如说*master*，那么这个提交节点（可能）再也不会被引用到，然后就会被丢弃掉了。注意这个命令之后就不会有东西引用*2eecb*。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394764-3676-checkout-after-detached.svg-.png)

但是，如果你想保存这个状态，可以用命令`git checkout -b *name*`来创建一个新的分支。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394764-5711-checkout-b-detached.svg-.png)

### Reset

reset 命令把当前分支指向另一个位置，并且有选择的变动工作目录和索引。也用来在从历史仓库中复制文件到索引，而不动工作目录。

如果不给选项，那么当前分支指向到那个提交。如果用`--hard`选项，那么工作目录也更新，如果用`--soft`选项，那么都不变。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394765-1511-reset-commit.svg-.png)



如果没有给出提交点的版本号，那么默认用*HEAD*。这样，分支指向不变，但是索引会回滚到最后一次提交，如果用`--hard`选项，工作目录也同样。





![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394768-4127-reset.svg-.png)





如果给了文件名(或者 `-p`选项), 那么工作效果和带文件名的 checkout 差不多，除了索引被更新。





![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394768-4895-reset-files.svg-.png)

### 撤销修改和版本回退

#### 方法总结

- `git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区

  **参考尚硅谷**

- git checkout --readme.txt

#### 场景

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD file`，就回到了场景1，第二步按场景1操作

#### git reset

1. soft 参数：git reset –soft HEAD～1 或者git reset –soft HEAD^意为将版本库软回退1个版本，所谓软回退表示将本地版本库的头指针全部重置到指定版本，且将这次提交之后的所有变更都移动到暂存区 ,就是回到上面第2种情况，这个时候你的修改还在暂存区
2. 默认的mixed参数：git reset HEAD～1 意为将版本库回退1个版本，将本地版本库的头指针全部重置到指定版本，且会重置暂存区，即这次提交之后的所有变更都移动到未暂存阶段就是工作区git add之前。
3. hard参数：git reset –hard HEAD～1 意为将版本库回退1个版本，但是不仅仅是将本地版本库的头指针全部重置到指定版本，也会重置暂存区，并且会将工作区代码也回退到这个版本

#### git checkout --readme.txt

命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；(上一次的git commit 后,修改readme.txt 但没有执行git add,回到上一次的git commit后的结果)

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。(修改readme.txt,并且git add,然后又修改了readme.txt, 此时执行git checkout,回到git add 后的状态)

总之，就是让这个文件回到最近一次git commit或git add时的状态。

### Merge

merge 命令把不同分支合并起来。合并前，索引必须和当前提交相同。如果另一个分支是当前提交的祖父节点，那么合并命令将什么也不做。 另一种情况是如果当前提交是另一个分支的祖父节点，就导致*fast-forward*合并。指向只是简单的移动，并生成一个新的提交。



![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394767-3629-merge-ff.svg-.png)





否则就是一次真正的合并。默认把当前提交(*ed489* 如下所示)和另一个提交(*33104*)以及他们的共同祖父节点(*b325c*)进行一次[三方合并](http://en.wikipedia.org/wiki/Three-way_merge)。结果是先保存当前目录和索引，然后和父节点*33104*一起做一次新提交。





![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394768-9049-merge.svg-.png)



### Cherry Pick

cherry-pick命令"复制"一个提交节点并在当前分支做一次完全一样的新提交。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394768-6031-cherry-pick.svg-.png)

### Rebase

衍合是合并命令的另一种选择。合并把两个父分支合并进行一次提交，提交历史不是线性的。衍合在当前分支上重演另一个分支的历史，提交历史是线性的。 本质上，这是线性化的自动的 cherry-pick

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394769-8202-rebase.svg-.png)

上面的命令都在*topic*分支中进行，而不是*master*分支，在*master*分支上重演，并且把分支指向新的节点。注意旧提交没有被引用，将被回收。

要限制回滚范围，使用`--onto`选项。下面的命令在*master*分支上重演当前分支从*169a6*以来的最近几个提交，即*2c33a*。

![img](https://www.runoob.com/wp-content/uploads/2019/05/1557394772-3197-rebase-onto.svg-.png)

同样有`git rebase --interactive`让你更方便的完成一些复杂操作，比如丢弃、重排、修改、合并提交。没有图片体现这些，细节看这里:[git-rebase(1)](http://www.kernel.org/pub/software/scm/git/docs/git-rebase.html#_interactive_mode)

## 技术说明

文件内容并没有真正存储在索引(*.git/index*)或者提交对象中，而是以blob的形式分别存储在数据库中(*.git/objects*)，并用SHA-1值来校验。 索引文件用识别码列出相关的blob文件以及别的数据。对于提交来说，以树(*tree*)的形式存储，同样用对于的哈希值识别。树对应着工作目录中的文件夹，树中包含的 树或者blob对象对应着相应的子目录和文件。每次提交都存储下它的上一级树的识别码。

如果用detached HEAD提交，那么最后一次提交会被the reflog for HEAD引用。但是过一段时间就失效，最终被回收，与`git commit --amend`或者`git rebase`很像。

## 本地仓库与远程仓库

见尚硅谷教程

## git本地分支和远程分支如何关联

一、如何把本地新建分支同步到远程分支上（注：该分支在远程上没有）？
二、又如何在本地把远程分支上新建分支同步到本地（本地没有该分支）？

1.其实在从远程分支分出来的分支都是跟踪分支（track）,当对该分支进行`push`和`pull`时，如果该分支和远程分支同名`git`会知道推送到远程哪个分支，从哪个远程分支同步到本地分支。其实每次克隆一个仓库时，本地新建一个`master`分支来`track`远程`origin/master`。如果不同名，我们需要人为指定`git push origin branch_name`

2.如果本地新建了一个分支`branch_name`，但是在远程没有，这时候`push`和`pull`指令就无法确定该跟踪谁,一般来说我们都会使其跟踪远程同名分支，所以可以利用`git push --set-upstream origin branch_name`，这样就可以自动在远程创建一个`branch_name`分支，然后本地分支会`track`该分支。后面再对该分支使用`push`和`pull`就自动同步。无需再指定分支。

3.跟踪远程分支
1）如果远程新建了一个分支，本地没有该分支，可以用`git checkout --track origin/branch_name`，这时候本地会新建一个分支名叫`branch_name`，会自动跟踪远程的同名分支`branch_name`。
2）用上面中方法，得到的分支名永远和远程的分支名一样，如果想新建一个本地分支不同名字，同时跟踪一个远程分支可以利用。
`git checkout -b new_branch_name branch_name`，这条指令本来是根据一个`branch_name`分支分出一个本地分支`new_branch_name`，但是如果所根据的分支`branch_name`是一个远程分支名，那么本地的分支会自动的track远程分支。建议跟踪分支和被跟踪远程分支同名。

**总结：一般我们就用\**`git push --set-upstream origin branch_name`\**来在远程创建一个与本地`branch_name`同名的分支并跟踪；利用\**`git checkout --track origin/branch_name`\**来在本地创建一个与`branch_name`同名分支跟踪远程分支。**