#include <pqxx/pqxx>
#include <iostream>

using namespace std;
int main()
{

    pqxx::connection c("dbname=dbESM user=postgres");


    cout << "Hello world!" << endl;

    return 0;
}
