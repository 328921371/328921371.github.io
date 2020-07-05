---
title: GitHub 的使用
categories:
  - GitHub
tags:
  - GitHub
copyright: true
comments: true
abbrlink: '396150e5'
date: 2016-12-20 17:13:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

>许多刚刚进入公司的小白当拿到了公司分发的GitHub账号都会一脸懵B，这是这个啥，怎么用，今天就和大家简单的介绍一下

<!--more-->

关于GitHub的教程，推荐廖雪峰老师的官网，写的实在是太好了，尤其适合初学者 附上链接 [GitHub教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

我这里就不在做更多详细的介绍了，只是将git用到的命令总结下来，好记性不如烂笔头嘛

1. git init

2. git config user.name"cs"

3. git config user.email"328921371@qq.com"

4. git add readme.txt (添加 文件名)

5. git commit -m "add distributed 20161220" (提交文件名)

6. git status （查看仓库状态）

7. git diff readme.txt （查看文件修改了哪些内容）

8. git log(查看最近到最远的提交日志，我们可以看到3次提交)

9. git log --pretty=oneline（输出版本号）

10. git reset --hard HEAD^（回到上个版本，^几个就是几个版本  还可以用 hard~100）

11. cat readme.txt（查看文件）

12. git reset --hard 3628164（回到最近的一次）

13. git reflog （查看每次操作的命令记录）

14. git checkout -- readme.txt(撤销工作区的修改)

15. git reset HEAD readme.txt（撤销暂存区的修改，之后还要再撤销一下工作区的）

16. rm test.txt（删除文件，工作区的，git checkout -- test.txt 删错了可以回退）

17. git rm test.txt（删除文件，版本库中的 ，需要commit一下）

18. git remote add origin git@github.com:328921371/cs.git（建立连接）

19. git push -u origin master（将内容推送到远程仓库里，第一次要加-u）

20. git push origin master(推送)

21. git clone git@github.com:328921371/kelong.git（克隆，可以先创建一个文件夹，npm init一下，然后克隆下来）（ git clone https://github.com/lyc379980269/zhiyouAskAndAnswer.git）（克隆别人的）（克隆别人的，要先关联一下， git remote add origin https://github.com/lyc379980269/zhiyouAskAndAnswer.git）

22. git checkout -b dev（创建dev分支，然后切换到dev分支（相当于$ git branch dev  创建分支;$ git checkout dev 切换分支）

23. git branch（查看当前分支）

24. git checkout master  （切换到主分支master后，看不到之前在分支上的操作）

25. 在master下，将分支的内容合并，git merge dev

26. 合并完可以在主分支上看到，可以删除分支了 git branch -d dev

27. 如果创建分支修改数据后，切换到muster主分支上，如果muster没有进行分支合并，直接进行修改，则会产生冲突，这时将===<<>>删掉，再add和commit一下就行。。git log --graph --pretty=oneline --abbrev-commit（这个可以看到分支的情况）

最后附上两条git的流程和解决错误的方法

[git的操作方式](http://blog.csdn.net/helloworld183/article/details/72638413)

[git遇到错误的解决方案](http://blog.csdn.net/xinguan1267/article/details/39028789)
