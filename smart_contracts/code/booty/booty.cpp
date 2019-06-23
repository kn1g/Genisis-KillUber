#include <eosio/eosio.hpp>

using namespace eosio;
using namespace std;

class [[eosio::contract]] booty : public contract {

	public:

		//Constructor
		booty(name receiver, name code, datastream<const char*> ds):contract(receiver, code, ds) {}

		[[eosio::action]]
		void upsert(name eosName, string ip, string longi, string lati){
			nodes_index nodes(get_self(), get_first_receiver().value);
			auto iterator = nodes.find(eosName.value);
			if( iterator == nodes.end() ){
				nodes.emplace(eosName, [&](auto& w)
				{
					w.IP 		= ip;
					w.EOSName 	= eosName;
					w.longitude	= longi;
					w.latitude	= lati;
				});
			} else {
				auto r = nodes.find(eosName.value);
				nodes.modify(r, eosName, [&](auto& w)
				{
					w.IP 		= ip;
					w.EOSName 	= eosName;
					w.longitude	= longi;
					w.latitude	= lati;
				});
			}
		};
		
		struct [[eosio::table]] node {
			name EOSName;
			string IP;
			string longitude;
			string latitude;

			uint64_t primary_key() const { return EOSName.value; }
		};

		typedef eosio::multi_index<"nodes"_n, node> nodes_index;

};