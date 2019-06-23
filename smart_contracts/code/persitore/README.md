# Persitore the persistent storage

This contract holds the information about the drivers, users and rides. It has all non-time critical information which also needs to be trusted and therefore, accessible and verifiable by everyone. The reputation system is currently done very easy by giving stars. The implementation already has commented out a more complicated rating structure.

The most important information is the data structure which currently is (modifications can be done easily if more or other fields are required):

```
### user 

*	name EOSName;
*	string Name;
*	string avatarurl;
*	uint64_t RepuID;	// ID for the reputation table

### driver

*	name EOSName;
*	string Name;
*	string Car; 
*	string License; 		// licence plate
*	uint64_t RepuID;		// ID for the reputation table
*	uint64_t BasePrice; 	// per km
*	string currency;		// accepted currency
*	bool ban;				// driver is supspended (needs to be added later)
*	string avatarurl;

### ride

*	uint64_t rideID;
*	name driver;
*	name passanger;
*	uint64_t begintime; 	// beginning timestamp
*	uint64_t endtime; 		// end timestamp 
*	uint64_t startlongi; 	// start position of the ride
*	uint64_t startlati; 	// start position of the ride
*	uint64_t endlati; 		// end position of the ride
*	uint64_t endlongi; 		// end position of the ride
*	uint64_t RepuIDDr; 		// ID for the reputation table Driver
*	uint64_t RepuIDUSR; 	// ID for the reputation table Passanger
*	uint64_t BasePrice; 	// baseprice
*	uint64_t SumPrice; 		// payed price
*	uint64_t tip; 			// payed tip
*	string Currency;			// payed currency
*	uint8_t Status; // 0 = fullfilled, 1 = accepted, 2 = rejected 
```

## Usage

To add an entry (assuming the contract is persitore) use: `cleos push action persitore <riderupsert,drivrupsert,userupsert> '["bernadette","req. arugments","..."]' -p ACCOUNT@active`.

E.g.: 
```
cleos push action persitore drivrupsert '["bernadette","Bernadette","Red Chevrolet Malibu","ZH 3237","5","4","CHF","https://i.imgur.com/E61aLr3.png"]' -p bernadette@active
```