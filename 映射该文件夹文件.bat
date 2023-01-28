@echo off 
chcp 65001

::设置以管理员运行,但会发生路径被缩写为短路径的问题
rem %1 %2
rem ver|find "5.">nul&&goto :runas
rem mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :runas","","runas",1)(window.close)&goto :eof
rem :runas

rem echo %USERPROFILE% 
rem cd /d %~dp0

cd e:\
cd obsidian-101tool
echo "当前工作目录是: %cd%"


:: 设定文件夹映射 例子:mklink /j E:\Windows C:\Windows 这是在E盘建立C盘的映射快捷方式
set 工作OB库=e:\101工作文件夹\.obsidian\plugins\101tool
set 团队OB库=e:\团队共享同步\.obsidian\plugins\101tool
echo %OB库1%\main.js
echo %cd%\main.js

call:del_copy_file "%工作OB库%\main.js" main.js
call:del_copy_file "%工作OB库%\manifest.json" manifest.json
call:del_copy_file "%工作OB库%\styles.css" styles.css
call:del_copy_file "%团队OB库%\main.js" main.js
call:del_copy_file "%团队OB库%\manifest.json" manifest.json
call:del_copy_file "%团队OB库%\styles.css" styles.css


pause
exit

goto:eof
call:del_mkLink_file gcc_include\oneOone.h oneOone.h

:del_mkLink_file 
	if exist %~1 (del %~1)
	mklink /h %~1 %~2
	goto:eof

:del_copy_file 
	if exist %~1 (del %~1)
    echo 删除文件:%~1 成功
	copy %~2 %~1
	goto:eof

:del_mkLink_dir 
	if rd %~1 (del %~1)
	echo 删除文件夹:%~1 成功
	mklink /j %~1 %~2
	goto:eof

:if_exist_del_file
	if exist %~1 (del %~1)
    echo 删除文件:%~1 成功
	goto:eof


