# firebase-functions-firestore

This repository is a code for Firebase Functions + Firestore part of `arkham-starter.com`.

## Where?

Most of `arkham-starter.com` is designed to be **static** by exporting as static site from SvelteKit, and hosted all that on Firebase Hosting. (Without "active" server running the site.)

But a section of site is requires user registration and data storage :

1. Profile : Player is able to input information about completed campaigns / standalone scenario runs one at a time. After the player had accumulated more experience about this game, the interface can summarize "AHLCG profile" of that player to keep track and encourage going for new heights, or try out new things. 

   Each input is planned to be one Firestore document. By nature of a campaign "result", it should be READ dominant as players take like 2 weeks to multiple months to finish a campaign. And I think Cloud Firestore is good at this kind of thing.
   
   I will also intentionally design such that you cannot edit archived campaign, only delete and create a new one is possible. It should simplify the code and lower Firebase cost.
   
   The problem is how to design Firestore document fields such that they can give back fun information with the least hosting cost. (And with good indexing strategy.)

   Documentation continues [inside the documentations folder](./documentation/profile/readme.md).

2. Campaign Manager : A tool similar to ArkhamCards app's campaign system but is much more conscious about physical cards. Basically a collection owner (that share the cards to everyone) is able to create multiple campaigns and specify decks that are in it. Then the tool would help you solve problem of moving cards between different on-going campaigns. These campaign information are stored in Firestore.