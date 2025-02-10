# Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package

# Runtime stage
FROM amazoncorretto:17

ENV APP_VERSION=0.0.1-SNAPSHOT
ENV DB_URL=jdbc:postgresql://poly_postgres:5432/centre-formation
ENV ACTIVE_PROFILE=prod

WORKDIR /app
COPY --from=build /build/target/centre-api-*.jar /app/

EXPOSE 8088

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL}  centre-api-${APP_VERSION}.jar