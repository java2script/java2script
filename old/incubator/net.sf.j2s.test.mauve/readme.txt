first attempt to run gnu mauve tests in java2script. 

This project try to help measuring java2script java compatibility. 
Applications like org.sgx.j2s.mauve.report2.JavaLangReport.html will execute 
all the tests from a certain java package, in this case java.lang, and print which tests passed successfully, which ones throw assertation erros, 
and which even doen't finish executing due to a native javascript exception, or class unsupported.. 

Hope this work will clarify the  user what parts of the java language and standar API
are (well) supported by Java2script.    

allmost all code taken from mauve java test suite.


Important Notes:

1) java main classes for running a single or all tests in a package are located at 
org.sgx.j2s.mauve.report package. For example org.sgx.j2s.mauve.report.JavaLangReport
will run all mauve tests related to java.lang

2) make sure to use the latest java2script version for compilating this project .java files into javascript

3) make sure to use the latest j2s lib when executing the generated htmls

4) make sure you execute the html outside your ide, and that the browser doesn't have a javascript debugger like 
firebug enabled because the test will generate a lot javascript errors.. 


contributed by sgurin - Sebastián Gurin