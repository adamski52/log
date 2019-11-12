FROM maven:3.6.2-jdk-11
WORKDIR /app

COPY pom.xml pom.xml
COPY src src

RUN mvn package -q

CMD ["java", "-server", "-Xms512m", "-Xmx2g", "-jar", "target/diary.jar"]
