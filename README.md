# gameOfThree
A game with two independent units, players communicating using Restful API

# Description
When a player starts, a random number gets generated and sent to the second player.

The receiving player select on of{ 1, 0, 1} to get a number that is divisible by 3 and then sends it back to the first player.

The same rules are applied until one player reaches the number 1 and become the winner.

# Conditions applied
● Each player runs on its own (independent programs, two browsers, web‐workers,...).

● Communication via an API (REST).

● A player may not be available when the other one starts.

