#pragma once

#include <drogon/drogon.h>

namespace faraway 
{
struct LoginRequest
{
    std::string userLogin;
    std::string userPassword;
};

struct RegisterRequest
{
    std::string userLogin;
    std::string userPassword;
    std::string userFirstName;
    std::string userLastName;
    std::string userCountry;
    std::string userCity;
    
};

struct RefreshRequest
{
    std::string userId;
    std::string refreshToken;
};
}
