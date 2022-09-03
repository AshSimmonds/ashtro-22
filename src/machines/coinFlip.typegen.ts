// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.asdf": {
      type: "done.invoke.asdf";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.asdf": { type: "error.platform.asdf"; data: unknown };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    flipCoin: "done.invoke.asdf";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    logResult: "done.invoke.asdf";
  };
  eventsCausingServices: {
    flipCoin: "FLIP";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "flipping" | "idle";
  tags: never;
}
