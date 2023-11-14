#pragma once

#include "model/requests.hpp"
#include <drogon/HttpController.h>

using namespace drogon;

namespace faraway
{
class UsersController : public drogon::HttpController<UsersController>
{
    public:
        METHOD_LIST_BEGIN
            ADD_METHOD_TO(UsersController::login, "/login", Post);
            ADD_METHOD_TO(UsersController::reqister, "/reqister", Post);
            ADD_METHOD_TO(UsersController::refresh, "/refresh", Post);
        METHOD_LIST_END

        void login(faraway::LoginRequest&& loginRequest,
                   std::function<void (const HttpResponsePtr&)>&& callback) const;

        void reqister(faraway::RegisterRequest&& registerRequest,
                      std::function<void (const HttpResponsePtr&)>&& callback) const;

        void refresh(faraway::RefreshRequest&& refreshRequest,
                     std::function<void (const HttpResponsePtr&)>&& callback) const;
};
}
