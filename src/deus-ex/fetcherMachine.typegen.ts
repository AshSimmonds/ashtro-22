
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.fetchData": { type: "done.invoke.fetchData"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.fetchData": { type: "error.platform.fetchData"; data: unknown };
"xstate.after(3333)#fetcher.idle": { type: "xstate.after(3333)#fetcher.idle" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "fetchData": "done.invoke.fetchData";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "fetchingEntry": "fetch" | "xstate.after(3333)#fetcher.idle";
"idleEntry": "done.invoke.fetchData" | "enable";
"resetFetchCount": "resetFetchCount";
"toggleAutofetch": "toggleAutofetch";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "fetchData": "fetch" | "xstate.after(3333)#fetcher.idle";
        };
        matchesStates: "fetching" | "idle" | "off";
        tags: never;
      }
  