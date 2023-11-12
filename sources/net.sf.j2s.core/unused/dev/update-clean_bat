rem rough update script for Windows for new transpiler and/or runtime
rem plugin is set to deliver to c:\temp\plugins\plugins
set ver=3.2.3

echo %ver%

copy C:\temp\plugins\plugins\net.sf.j2s.core_%ver%.jar c:\users\hansonr\eclipse\dropins\net.sf.j2s.core.jar
copy C:\users\hansonr\eclipse\dropins\net.sf.j2s.core.jar C:\users\hansonr\git\java2script\sources\net.sf.j2s.core\dist\swingjs\ver\%ver%\
copy c:\users\hansonr\eclipse\dropins\net.sf.j2s.core.jar C:\users\hansonr\git\java2script\sources\net.sf.j2s.core\dist\swingjs\

copy C:\users\hansonr\git\java2script\sources\net.sf.j2s.java.core\dist\SwingJS-site.zip C:\users\hansonr\git\java2script\sources\net.sf.j2s.core\dist\swingjs\ver\%ver%\
copy C:\users\hansonr\git\java2script\sources\net.sf.j2s.java.core\dist\SwingJS-site.zip C:\users\hansonr\git\java2script\sources\net.sf.j2s.core\dist\swingjs\

for /f %%a in ('powershell -Command "Get-Date -format yyyyMMddHHmmss"') do set datetime=%%a
echo %datetime% > C:\temp\timestamp

copy C:\temp\timestamp C:\users\hansonr\git\java2script\sources\net.sf.j2s.core\dist\swingjs\ver\%ver%\
copy C:\temp\timestamp C:\users\hansonr\git\java2script\sources\net.sf.j2s.core\dist\swingjs\
type C:\temp\timestamp

copy test.log t.log
eclipsec.exe -clean > test.log
rem eclipsec.exe > test.log

