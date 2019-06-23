#include <eosio/eosio.hpp>


	using namespace eosio;
	using namespace std;

	class [[eosio::contract]] booty : public contract {

		public:
			//Constructor
			booty(name receiver, name code, datastream<const char*> ds):contract(receiver, code, ds) {}

			// Udate and insert new node to use for bootstrapping
		
			[[eosio::action]]
			void upsert(	name eosName, 	// EOS Name
							string ip, 		// IP address
							string longi, 	// longitude 
							string lati){ 	// latitude
				// init the object
				nodes_index nodes(	get_self(),
				 					get_first_receiver().value);
				// iterator until the EOS name is found
				auto iterator = nodes.find(eosName.value);
				// if not found iterator is at the end
				if( iterator == nodes.end() ){
					nodes.emplace(eosName, [&](auto& w)
					{
						w.IP 		= ip;
						w.EOSName 	= eosName;
						w.longitude	= longi;
						w.latitude	= lati;
					});
				// if iterator finds something
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
		
			// Node struct definition
			struct [[eosio::table]] node {
				name EOSName;		// unique EOS name
				string IP;			// Last known IP
				string longitude;	// Last known longitude
				string latitude;	// last known latitude
				// define the unique name as primary key
				uint64_t primary_key() const { return EOSName.value; }
			};
			// new typedefinition to use node_index lateron
			typedef eosio::multi_index<"nodes"_n, node> nodes_index;
	};