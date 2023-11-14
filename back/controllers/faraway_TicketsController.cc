#include "faraway_TicketsController.h"

using namespace faraway;

void TicketsController::getUserTickets(const HttpRequestPtr& req,
                                       std::function<void (const HttpResponsePtr&)>&& callback,
                                       std::string userId) const 
{
    LOG_DEBUG << "Get Tickets for User " << userId;

    // TODO:
    // Или пишем логику получения билетов прямо тут
    // Или пишем плагин и обращаемся к нему

    Json::Value ret;
    // TODO: Записываем данные в Json

    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->setStatusCode(k200OK);
    callback(resp);
}

void TicketsController::getTickets(const HttpRequestPtr& req,
                                   std::function<void (const HttpResponsePtr&)>&& callback,
                                   std::string from,
                                   std::string to) const
{
    LOG_DEBUG << "Get Tickets from " << from << " to " << to;

    // TODO:
    // Или пишем логику получения билетов прямо тут
    // Или пишем плагин и обращаемся к нему

    Json::Value ret;
    // TODO: Записываем данные в Json

    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->setStatusCode(k200OK);
    callback(resp);
}

void TicketsController::getTicketsOnDate(const HttpRequestPtr& req,
                                         std::function<void (const HttpResponsePtr&)>&& callback,
                                         std::string from,
                                         std::string to,
                                         std::string date) const
{
    LOG_DEBUG << "Get Tickets from " << from << " to " << to << " on date " << date;

    // TODO:
    // Или пишем логику получения билетов прямо тут
    // Или пишем плагин и обращаемся к нему

    Json::Value ret;
    // TODO: Записываем данные в Json

    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->setStatusCode(k200OK);
    callback(resp);
}
