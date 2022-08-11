Git的常用操作总结

初始化仓库
# 将当前目录初始化为本地仓库（不要反复初始化 的确需要时可以手动删除.git目录后重新git init）
git init

# 手动创建.gitignore文件 声明哪些文件（夹）不需要添加到版本控制
# **/node_modules

# 在码云或Github上创建远程仓库先
# 关联远程源（远程仓库最好空空如也）
# 添加远程源
git remote add origin https://gitee.com/steveouyang/test_repo_2204.git
# 查看远程源
git remote -v
# 团队其它成员克隆代码（应该在码云上提前添加各位大神为共同开发者）
git clone https://gitee.com/steveouyang/test_repo_2204.git

# 将当前工作分支的内容提交（到本地仓库形成快照）并推送远程（落袋为单）
git add .
git commit -m "add readme.md"
git push -u origin master

# 标准工作流（gitflow）所需要的分支
# master分支用于上线 dev分支用于合并团队成员的工作分支 test分支用于测试
# feat-xxx分支用于开发新功能/特性 
# fix-xxx分支用于修复BUG
# hotfix-xxx紧急修复线上版本的BUG 从master分支拉出 修改完毕后直接同步回master分支
git checkout master
git checkout -b dev

# 开发者准备自己的工作分支
git checkout -b feat-login
# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看所有分支
git branch -a
复制代码
将自己的工作分支合并到dev分支
# 先确保dev分支已更新到最新
git checkout dev
git pull

# 首先确保在自己的工作分支上 并确保所有的工作内容都已提交
git checkout feat-login
git add .
git commit -m "预备合并dev"

# 基于工作分支拉出一个副本分支用于合并dev 
git checkout -b featlogin-merge-dev


# 吃入dev分支 
# 可能会产生冲突在当前副本分支上（总好过冲突发生在dev或工作分支上）
git merge dev

# 解决完冲突 重新提交 
# 生成一个功能已合并且无冲突的新快照（该快照与dev及工作分支都无冲突）
git add .
git commit -m "合并dev分支并解决冲突"

# 返回dev分支 吃入已经解决了冲突的副本分支
git checkout dev
git merge featlogin-merge-dev

# 重新提交并推送已经合并了工作分支的dev分支（其它成员可以在dev分支上直接git pull）
git add .
git commit -m "合并了login分支的工作"
git push -u origin dev

# 删除已经无用的副本分支 卸磨杀驴
git branch -D featlogin-merge-dev
复制代码
团队成员同步最新的代码
# 将远程的所有分支与快照拉取到本地仓库（而不是直接合并到工作区）
git fetch
# 查看远程分支（从而知道队友们最近都干了些什么）
git branch -r

# 更新dev分支到最新
git checkout dev
# 本地的dev合并远程的dev 也可以直接git pull（只要团队里没人在dev上直接撸码）
git merge origin/dev

# 合并工作分支到dev分支并将dev分支推远程
git checkout feat-cart
git add .
git commit -m "预备加入dev"
git checkout -b featcart-mergedev
git merge dev
git checkout dev
git merge featcart-mergedev
git add .
git commit -m "dev合并cart分支over"
git push -u origin dev
复制代码
将dev分支并入master(并上线)
# 先更新一下master分支
git checkout master
git pull

# 将dev的最新功能并入master
git checkout dev
git add .
git commit -m "预备将dev并入master"
git checkout -b dev-mergemaster
git merge master
git checkout master
git merge dev-mergemaster
git add .
git commit -m "合并dev并准备上线"
git push -u origin master
复制代码
回退版本
# 查看所有历史记录（版本快照 每个快照都有一个唯一的哈希/id/指纹）
git log

# 硬回退到上一个（或多个）版本（该版本之后的历史记录在本地将灰飞烟灭）
# 没有充分把握时不要硬回退
git reset --hard HEAD^
git reset --hard HEAD^^
git reset --hard f38b561874

# 回退到指定版本（将指定版本的副本作为最新的HEAD 放在最新的记录之前 这样所有历史记录都完好无损）
# （可能会形成冲突）直接接收incomming的代码即形成回退的效果
git revert d1a8a6d67d
复制代码
暂存未提交的代码
# 将当前工作区中的未提交代码打包抽取出来并丢入【缓存栈】顶端
# 可以反复抽取并压栈
git stash

# 弹出栈顶的快照并合并到当前的工作区（可能会形成冲突）
git stash pop

# 弹出栈顶的快照【的副本】并合并到当前的工作区（可能会形成冲突）
git stash apply
复制代码
几个高频面试题
git pull VS git fetch
# git pull = 远程仓库的默认分支的HEAD版本合并到当前工作区（同时远程仓库中的信息也同步到了本地仓库）
# git fetch = 将远程仓库中的信息同步到本地仓库（工作区无变化）
# git pull = git fetch + git merge origin/master（或其它默认分支）
复制代码
git reset VS git revert
# git reset --hard <trump-hash-id> 
# 硬回滚到川普时代 拜登快照湮灭

# git revert <trump-hash-id> 
# 撤销川普（不考虑冲突的话=回滚到奥巴马时代）
# 所有历史记录/快照完整保留 （相当于把奥巴马的快照拷贝了一份到历史记录的最前面）
# git revert 更被推荐
复制代码
git merge VS git rebase
# git merge xxx = 兼并别的分支（吃它到自己肚子里） 当前分支没有xxx的历史记录
# git rebase xxx = 搬取xxx分支的所有快照到当前分支的最前面