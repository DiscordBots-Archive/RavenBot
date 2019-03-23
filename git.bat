@echo off
set GIT_PATH="C:\Program Files\Git\bin\git.exe"
set BRANCH = "origin"
%GIT_PATH% add -A
%GIT_PATH% pull %BRANCH%
exit /b