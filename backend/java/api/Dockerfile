FROM openjdk:17-alpine
FROM maven:latest

WORKDIR /app

COPY pom.xml pom.xml
COPY src src
RUN mvn clean package -DskipTests
ARG JAR_FILE=target/*.jar
COPY target/*.jar /app/api.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "api.jar" ]