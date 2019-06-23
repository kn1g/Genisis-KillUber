#include <eosio/eosio.hpp>

using namespace eosio;
using namespace std;

class [[eosio::contract]] persitore : public contract {

	public:

		//Constructor
		persitore(name receiver, name code, datastream<const char*> ds):contract(receiver, code, ds) {}

		// Updates and inserts a user
		[[eosio::action]]
		void userupsert(name eosName, 
						string name, 
						string avatarurl, 
						uint64_t RepuID){
			user_index user(get_self(), get_first_receiver().value);
			auto iterator = user.find(eosName.value);
			if( iterator == user.end() ){
				user.emplace(eosName, [&](auto& w)
				{
					w.EOSName 	= eosName;
					w.Name		= name;
					w.avatarurl	= avatarurl;
					w.RepuID	= RepuID;
				});
			} else {
				auto r = user.find(eosName.value);
				user.modify(r, eosName, [&](auto& w)
				{
					w.EOSName 	= eosName;
					w.Name		= name;
					w.avatarurl	= avatarurl;
					w.RepuID	= RepuID;
				});
			}
		};

		// Updates and inserts a driver
		[[eosio::action]]
		void drivrupsert(name eosName,
						string name,
						string Car,
						string License, 		// licence plate
						// Last10Locations - might be useful later
						uint64_t RepuID,		// ID for the reputation table
						uint64_t BasePrice, 	// per km
						string currency,		// accepted currency
						// uint64_t RadiusKm; might be useful
						string avatarurl){
			driver_index driver(get_self(), get_first_receiver().value);
			auto iterator = driver.find(eosName.value);
			if( iterator == driver.end() ){
				driver.emplace(eosName, [&](auto& w)
				{
					w.EOSName 	= eosName;
					w.Name		= name;
					w.avatarurl	= avatarurl;
					w.RepuID	= RepuID;
					w.BasePrice	= BasePrice;
					w.currency	= currency;
					w.Car		= Car;
				});
			} else {
				auto r = driver.find(eosName.value);
				driver.modify(r, eosName, [&](auto& w)
				{
					w.EOSName 	= eosName;
					w.Name		= name;
					w.avatarurl	= avatarurl;
					w.RepuID	= RepuID;
					w.BasePrice	= BasePrice;
					w.currency	= currency;
					w.Car		= Car;

				});
			}
		};


		// Updates and inserts a ride
		[[eosio::action]]
		void riderupsert(uint64_t rideID,
						name driver,
						name passanger,
						uint64_t begintime, 	// beginning timestamp
						uint64_t endtime, 		// end timestamp 
						uint64_t startlongi, 	// start position of the ride
						uint64_t startlati, 	// start position of the ride
						uint64_t endlati, 		// end position of the ride
						uint64_t endlongi, 		// end position of the ride
						uint64_t RepuIDDr, 		// ID for the reputation table Driver
						uint64_t RepuIDUSR, 	// ID for the reputation table Passanger
						uint64_t BasePrice, 	// baseprice
						uint64_t SumPrice, 		// payed price
						uint64_t tip, 			// payed tip
						string Currency,			// payed currency
						uint8_t Status){ // 0 = fullfilled, 1 = accepted, 2 = rejected
			ride_index ride(get_self(), get_first_receiver().value);
			auto iterator = ride.find(driver.value);
			if( iterator == ride.end() ){
				ride.emplace(driver, [&](auto& w)
				{	w.rideID	= rideID;
					w.driver 	= driver;
					w.passanger	= passanger;
					w.endtime	= endtime;
					w.begintime	= begintime;
					w.startlongi= startlongi;
					w.startlati	= startlati;
					w.endlati	= endlati;
					w.endlongi	= endlongi;
					w.RepuIDDr	= RepuIDDr;
					w.RepuIDUSR	= RepuIDUSR;
					w.BasePrice	= BasePrice;
					w.SumPrice	= SumPrice;
					w.tip 		= tip;
					w.Currency	= Currency;
					w.Status	= Status;
				});
			} else {
				auto r = ride.find(driver.value);
				ride.modify(r, driver, [&](auto& w)
				{	w.rideID	= rideID;
					w.driver 	= driver;
					w.passanger	= passanger;
					w.endtime	= endtime;
					w.begintime	= begintime;
					w.startlongi= startlongi;
					w.startlati	= startlati;
					w.endlati	= endlati;
					w.endlongi	= endlongi;
					w.RepuIDDr	= RepuIDDr;
					w.RepuIDUSR	= RepuIDUSR;
					w.BasePrice	= BasePrice;
					w.SumPrice	= SumPrice;
					w.tip 		= tip;
					w.Currency	= Currency;
					w.Status	= Status;
				});
			}
		};

	
		struct [[eosio::table]] user {
			name EOSName;
			string Name;
			string avatarurl;
			uint64_t RepuID;	// ID for the reputation table

			uint64_t primary_key() const { return EOSName.value; }
		};
		typedef eosio::multi_index<"users"_n, user> user_index;

		struct [[eosio::table]] driver {
			name EOSName;
			string Name;
			string Car; 
			string License; 		// licence plate
			// Last10Locations - might be useful later
			uint64_t RepuID;		// ID for the reputation table
			uint64_t BasePrice; 	// per km
			string currency;		// accepted currency
			bool ban;				// driver is supspended (needs to be added later)
			// uint64_t RadiusKm; might be useful
			string avatarurl;

			uint64_t primary_key() const { return EOSName.value; }
		};
		typedef eosio::multi_index<"drivers"_n, driver> driver_index;

		struct [[eosio::table]] ride {
			uint64_t rideID;
			name driver;
			name passanger;
			uint64_t begintime; 	// beginning timestamp
			uint64_t endtime; 		// end timestamp 
			uint64_t startlongi; 	// start position of the ride
			uint64_t startlati; 	// start position of the ride
			uint64_t endlati; 		// end position of the ride
			uint64_t endlongi; 		// end position of the ride
			uint64_t RepuIDDr; 		// ID for the reputation table Driver
			uint64_t RepuIDUSR; 	// ID for the reputation table Passanger
			uint64_t BasePrice; 	// baseprice
			uint64_t SumPrice; 		// payed price
			uint64_t tip; 			// payed tip
			string Currency;			// payed currency
			uint8_t Status; // 0 = fullfilled, 1 = accepted, 2 = rejected 

			uint64_t primary_key() const { return driver.value; }
		};
		typedef eosio::multi_index<"rides"_n, ride> ride_index;

		// struct Reputation {
		// 	uint64_t id;

		// 	name user1;
		// 	bool user1approved;
		// 	uint8_t user1stars;
		// 	std::string user1comment;

		// 	name user2;
		// 	bool user2approved;
		// 	uint8_t user2stars;
		// 	std::string user2comment;
			
		// 	name primary_key() const { return id; }
		// };
		// typedef eosio::multi_index<"Reputations"_n, Reputation> reputation_index;

};