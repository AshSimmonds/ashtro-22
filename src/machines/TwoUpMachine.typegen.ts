// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    incrementLosses: "Toss";
    incrementOdds: "Toss";
    incrementTosses: "Toss";
    incrementWins: "Toss";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    Odds: "Toss";
    TwoHeads: "Toss";
    TwoTails: "Toss";
  };
  eventsCausingDelays: {};
  matchesStates: "AwaitingPlayer" | "AwaitingToss" | "PlayerChoice";
  tags: never;
}
