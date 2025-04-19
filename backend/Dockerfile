FROM maven:3.8.5-openjdk-17-slim AS maven_build

WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-slim

WORKDIR /app
ENV TZ=America/Sao_Paulo

COPY --from=maven_build /build/target/*.jar /app/app.jar

RUN apt-get update && \
    apt-get install -y libfontconfig1 && \
    rm -rf /var/lib/apt/lists/* && \
    chown 1001 /app

USER 1001

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

