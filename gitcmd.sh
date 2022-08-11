#  将当前目录初始化为本地仓库(不要反复初始化，的确需要时可以手动删除.git目录后重新git init)
git init

#  手动创建.gitignore文件 声明哪些文件(夹)不许要添加到版本控制

#  关联远程源(远程仓库最好空空如也)
git remote add origin https://gitee.com/he-pron/JS.git
git remote -v

git add .
git commit -m "temp"
git push -u origin master