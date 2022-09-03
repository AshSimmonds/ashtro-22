import { createMachine, interpret } from 'xstate';

const coinFlipModel = {
    heads: 1,
    tails: 2,
}

const coinFlipMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BLAdgMQDboAcA6dCXMAYmwBkBJABUVANVnQBd1VMmQAPRAEYALAGYiAVgAMEgGwB2QfKmzRigJwAaEAE8h82UQAcR0ROFThg9VNGz1AXwfa0WPISIAzfAQJYoFBDcYCSYAG6oANYhAIawEJ68LGyc3LwCCCLi0nKKyqoa2noIRupE6rJG8hLqRkryitZOziCYqBBwvK44PiRkYEmsHFw8SPyIwgBMRUKCgkSCtpOiUkrqIvaOLd3uxN6EfphQgykj6YgrwpIignVS6vJ1iqIzCBVEstai35PqooISUTqYROFwYHqEE7DNJjDK3V63IhSZGWKRGFRqdQSQSyZoOIA */
    createMachine({
        context: {
            flips: 0,
            heads: 0,
            tails: 0,
        },
        tsTypes: {} as import("./coinFlip.typegen").Typegen0,
        predictableActionArguments: true,
        id: "coinFlip",
        initial: "idle",
        states: {
            idle: {
                on: {
                    FLIP: {
                        target: "flipping",
                    },
                },
            },
            flipping: {
                invoke: {
                    src: "flipCoin",
                    id: "asdf",
                    onDone: [
                        {
                            actions: "logResult",
                            target: "idle",
                        },
                    ],
                },
            },
        },
    }, {
        services: {
            flipCoin: () => {
                console.log('flipCoin');
                Math.random() > 0.5 ? coinFlipModel.heads : coinFlipModel.tails
            }
        },
        actions: {
            logResult: (context: any, event: any) => {
                console.log('logResult...');
            }
        }
    });


const machineService = interpret(coinFlipMachine).start()

const getInstance = () => {
    return machineService;
}

export { getInstance }
