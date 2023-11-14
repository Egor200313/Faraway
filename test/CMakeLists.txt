cmake_minimum_required(VERSION 3.18)

set(CMAKE_CXX_STANDARD 20)
project(test)
add_executable(test main.cpp)

add_subdirectory(../deps/libpqxx build)
target_link_libraries(test PRIVATE pqxx)
