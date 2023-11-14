FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y \
        libpq-dev \
        cmake \
        clang

ADD ./test /app/test
ADD ../deps /app/deps

WORKDIR /app/test/build

RUN cmake .. && make

ENTRYPOINT ["./test"]
