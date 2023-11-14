#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

namespace faraway
{
class OffersController : public drogon::HttpController<OffersController>
{
    public:
        METHOD_LIST_BEGIN
            ADD_METHOD_TO(OffersController::getOffers, "/offers/{1}", Get);
        METHOD_LIST_END
    
        void getOffers(const HttpRequestPtr& req,
                       std::function<void (const HttpResponsePtr&)>&& callback,
                       std::string depCity) const;
};
}
