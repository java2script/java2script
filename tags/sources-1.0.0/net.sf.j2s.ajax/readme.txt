This plugin project should be exported with option "Include 
source code" CHECKED and with option "Package plug-ins as 
individual Jar archives" UNCHECKED!

Aug 20, 2006

This project requires JAVAX_SERVLET classpath variables for 
building. You can use the plugin org.eclipse.tomcat's servlets.jar
for JAVAX_SERVLET variables. 

But JAVAX_SERVLET are not required for running AJAX client.

Trying to export this plugin will fail because there are no
dependency for JAVAX_SERVLET in the plugin dependencies. In
order to export correct plugin, follow the instructions here:
1. Export as plugin with sources, ignore the errors
2. Select source folder ajaxrpc and export it as Jar into the
previous plugin location, replacing older ajaxrpc.jar

Oct 13, 2006

