## Decentralized Ticketing Platform 

tl;dr 
A completely decentralized event ticketing platform designed to reduce the cost of hosting, attending and reducing platform dependency. There will also be a secondary market for tickets enabling creators to get a % of future sales (in the event of ticket arbitrage)

Live demo: https://bafybeigxenewq2sabmcy46fuvbko5dwk2aqwbdpsez5dkdwv2dplsdscby.ipfs.infura-ipfs.io/

# Project Description
Most people in our group have been scammed one way or another when buying tickets for events. There are some centralized solutions to this problem, but they charge a high fee to both the buyer and the seller. We came up with a decentralized ticketing system that allows any user to create an event for which the participants can buy ticket NFTs. The event organizer can broadcast messages to the ticketholders through the XMTP protocol.

# How it's Made
Anyone can create an event by calling the createEvent function on the factory smart contract, which will create a new NFT contract for a specific event. To be efficient in data storage the metadata of each event is stored on NFT.storage instead of on the blockchain directly. The event creator can broadcast messages to all ticketholders through the XMTP. The application is deployed on the Spheron network.

# Built on
React front end
Ethereum blockchain back end
NFT.storage for metadata
XMPTP for messaging between event owner / attendee's
