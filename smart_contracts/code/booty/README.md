# Booty the boot node

This contract acts as boot node for the peer-to-peer network between the app clients. Additionally, it has the last location stored to find the closest nodes more quickly and efficient. This can be done even more efficient by using binary tree search on the positioning variables.

## Interaction

After deployment to `booty`, nodes can be added by e.g. `cleos push action booty upsert '["ACCOUNT","123.39.52.2","8.5269596","47.376752"]' -p ACCOUNT@active`.