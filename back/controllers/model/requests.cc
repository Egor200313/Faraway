#include <drogon/drogon.h>

#include "requests.h"

namespace drogon
{
template <>
inline faraway::LoginRequest fromRequest(const HttpRequest& req)
{
    auto json = req.getJsonObject();
    faraway::LoginRequest loginRequest;

    if (json)
    {
        loginRequest.userLogin = (*json)["login"].asString();
        loginRequest.userPassword = (*json)["password"].asString();
    }

    return loginRequest;
}

template <>
inline faraway::RegisterRequest fromRequest(const HttpRequest& req)
{
    auto json = req.getJsonObject();
    faraway::RegisterRequest registerRequest;

    if (json)
    {
        registerRequest.userLogin = (*json)["login"].asString();
        registerRequest.userPassword = (*json)["password"].asString();
        registerRequest.userFirstName = (*json)["firstName"].asString();
        registerRequest.userLastName = (*json)["lastName"].asString();
        registerRequest.userCountry = (*json)["country"].asString();
        registerRequest.userCity = (*json)["city"].asString();
    }

    return registerRequest;
}

template <>
inline faraway::RefreshRequest fromRequest(const HttpRequest& req)
{
    auto json = req.getJsonObject();
    faraway::RefreshRequest refreshRequest;

    if (json)
    {
        refreshRequest.userId = (*json)["userId"].asString();
        refreshRequest.refreshToken = (*json)["refresh"].asString();
    }

    return refreshRequest;
}
}