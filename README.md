# MEMSOURCE - Test Project

## Assignment
- Create a Grails or Spring Boot application.
  - We are still on Grails 2.5.x. You can choose whether you will use 2.5.x or 3.x.
  - You can also use Spring Boot if you do not want to use Grails (some parts of
Memsource Cloud use Spring Boot, too).
- The application will have 2 pages:

### Setup Page
- Memsource account can be configured here.
- The configuration should be represented as a Grails domain class (or an equivalent solution when using Spring Boot).
- Two text fields for username and password.
- Configuration can be edited and must be saved on persistent storage (H2 database, for example).
- No need to care about the security of a password.

### Projects Page
- List projects retrieved from https://cloud.memsource.com/web/docs/api#operation/listProjects
  - You will need a token from https://cloud.memsource.com/web/docs/api#operation/login
- Name, status, source language and target languages should be displayed.
- You should load and render the projects in JavaScript.
   - You will need to implement an endpoint in your application that will provide the data for an AJAX call.

# How to compile project
Currently, there is no released version, but you can use``1.0.0-SNAPSHOT``version to test the application.
``mvn clean install``

# How to start project
`` java -jar ./memsource-test-1.0.0-exec.jar ``

### Configure DB persistence
    java -jar ./memsource-test-1.0.0-exec.jar \
    --spring.datasource.url="jdbc:h2:file:~/memsource-test;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE" \
    --spring.datasource.username=admin \
    --spring.datasource.password=password

