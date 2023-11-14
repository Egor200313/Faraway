#include "faraway_UsersController.h"

using namespace faraway;

void UsersController::login(faraway::LoginRequest&& loginRequest,
                            std::function<void (const HttpResponsePtr&)>&& callback) const
{
    LOG_DEBUG << "User " << loginRequest.userLogin << " login";

    // TODO:
    // Или пишем логику авторизации прямо тут
    // Или пишем плагин и обращаемся к нему

    Json::Value ret;
    // TODO: Записываем данные в Json

    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->setStatusCode(k200OK);
    callback(resp);
}

void UsersController::reqister(faraway::RegisterRequest&& registerRequest,
                               std::function<void (const HttpResponsePtr&)>&& callback) const
{
    LOG_DEBUG << "User " << registerRequest.userLogin << " register";

    // TODO:
    // Или пишем логику регистрации прямо тут
    // Или пишем плагин и обращаемся к нему

    Json::Value ret;
    // TODO: Записываем данные в Json

    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->setStatusCode(k200OK);
    callback(resp);
}

void UsersController::refresh(faraway::RefreshRequest&& refreshRequest,
                              std::function<void (const HttpResponsePtr&)>&& callback) const
{
    LOG_DEBUG << "User " << refreshRequest.userId << " refresh tokens";

    // TODO:
    // Или пишем логику обновления токена прямо тут
    // Или пишем плагин и обращаемся к нему

    Json::Value ret;
    // TODO: Записываем данные в Json

    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->setStatusCode(k200OK);
    callback(resp);
}
