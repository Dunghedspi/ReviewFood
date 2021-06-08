FROM openjdk:11

WORKDIR /app

COPY ./Review-Shop-Food /app

RUN ./mvnw install

EXPOSE 9091

CMD ["./mvnw", "spring-boot:run"]