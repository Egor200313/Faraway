#include "faraway_OffersController.h"

using namespace faraway;

void OffersController::getOffers(const HttpRequestPtr& req,
                                 std::function<void (const HttpResponsePtr&)>&& callback,
                                 std::string depCity) const
{
    LOG_DEBUG << "Get Offers from " << depCity;

    // TODO:
    // Или пишем логику получения предложений прямо тут
    // Или пишем плагин и обращаемся к нему

    Json::Value ret;
    // TODO: Записываем данные в Json

    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->setStatusCode(k200OK);
    callback(resp);
}
