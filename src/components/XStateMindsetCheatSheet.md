# XState Mindset Cheat Sheet

TODO: turn this into an XState machine

## adapted from top comment on <https://www.youtube.com/watch?v=erfWjBNDdOE>

States should be adjectives aka describing something (On/Off/Running/Closed/Open)

Events should be at past tense eg (UserRegistered, ListHasLoaded, ButtonWasClicked)

Actions should be at imperative, aka giving orders/telling eg (StartOrder, CloseApplication, DisposeWaste)

So in the pokemon case it would be like this:  
Hence State must describe something, lets consider our something to be the "Page" itself. Aka "State of the page":  
  
State 1: "Empty Page"  

- Invokes action (getPokemonList)
  - Raises one of the events (Done - ListFetched / Error - FetchingFailed)
    - If ListFetched
      - Transition To State 2:  "Page with Data"
    - If FetchingFailed
      - Transition To State 3:  "Page with Error"

Thus we have:

- States:    EmptyPage | PageWithData | PageWithError
- Actions: getPokemonList
- Events:   ListFetched | FetchingFailed
