#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

namespace faraway
{
class TicketsController : public drogon::HttpController<TicketsController>
{
    public:
        METHOD_LIST_BEGIN
            ADD_METHOD_TO(TicketsController::getUserTickets, "/tickets/{1}", Get);
            ADD_METHOD_TO(TicketsController::getTickets, "/search?from={1}&to={2}", Get);
            ADD_METHOD_TO(TicketsController::getTicketsOnDate, "/search?from={1}&to={2}&date={3}", Get);
        METHOD_LIST_END

        void getUserTickets(const HttpRequestPtr& req,
                            std::function<void (const HttpResponsePtr&)>&& callback,
                            std::string userId) const;

        void getTickets(const HttpRequestPtr& req,
                        std::function<void (const HttpResponsePtr&)>&& callback,
                        std::string from,
                        std::string to) const;

        void getTicketsOnDate(const HttpRequestPtr& req,
                              std::function<void (const HttpResponsePtr&)>&& callback,
                              std::string from,
                              std::string to,
                              std::string date) const;
};
}
