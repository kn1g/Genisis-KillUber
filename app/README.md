# a2b client app

This repository contains the code of the a2b client app. It uses the EOS blockchain to process Uber like rides.

- Finding the next available driver
- Establish a Peer-To-Peer communication between driver and client
- Pay directly the driver
- Rate driver and client

## How to launch the app

1. Adjust the EOS node address in the Config.ts (if necessary)
2. iOS: run `pod install` (first time) in the `ios` directory
2. Open the `.xcworkspace` file (on iOS) and run it on the desired target
   or execute `react-native run-android` for android