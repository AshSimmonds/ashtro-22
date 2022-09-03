import { createMachine, interpret } from 'xstate';

const coinFlipMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBUDuB7AqgBwHQEFUBDASwBcSA7KABQBsiBPMAJwGJ6nWBlMOsAMZlIiUNnSxyJdJVEgAHogC0AFgAcAJlwBGNboDsABgCsxgJxnD+jQBoQjZQDZtj3BrUBmMyuMf9Ksw1HfQBfELs0LDxCUgpqZAlYNgTYeCQQcUkKGTlFBCVjbWNcfUc1AK9tQ0CNMzsHfJVa3EKrRxVSjrNjRzCIjBxcTmYWAGEAC3QSATA2UZk4gFcwYaooOUypHPS8pSC1XEcjs01HDSqzx3rlAK1-R0MrD20fQz0+kEjB4dYJqZm2AAlMAUFhgDYSLayHbKbT+XCGHxmfRGcpmdpmDzXfJGO5lQwaDTmZzVFRhcIgSjoCBwORfaLEKTUH4sCFZaTQ0C7cwHDx+TToxweFRvbFKRyWQ7adwqEUC7QuD70giMuJQFJpMSQ7KchQ3TS4NRlDxHDT6BVqI1i3yGKV6TwaLruYxKgZ4Fl-abg9KbHW5ZSO-S4FRlQnGQlqUoeYxijyRhEPNTVCw+FEaV1RNlQ-35M5aPn6AVHYWi+zKFEqEom0oSlHRlQeckhIA */
    createMachine({
        context: {
            tosses: 0,
            odds: 0,
            heads: 0,
            tails: 0,
        },
        tsTypes: {} as import("./coin-flip.typegen").Typegen0,
        id: "coinFlip",
        initial: "AwaitingPlayer",
        states: {
            AwaitingPlayer: {
                on: {
                    PlayerSelected: {
                        target: "AwaitingToss",
                    },
                },
            },
            AwaitingToss: {
                on: {
                    Toss: [
                        {
                            actions: ["incrementOdds", "incrementTosses"],
                            description: "Stalemate",
                            cond: "Odds",
                            target: "AwaitingToss",
                        },
                        {
                            actions: ["incrementWins", "incrementTosses"],
                            description: "Win",
                            cond: "TwoHeads",
                            target: "PlayerChoice",
                        },
                        {
                            actions: ["incrementLosses", "incrementTosses"],
                            description: "Lose",
                            cond: "TwoTails",
                            target: "AwaitingPlayer",
                        },
                    ],
                },
            },
            PlayerChoice: {
                on: {
                    ContinuePlaying: {
                        target: "AwaitingToss",
                    },
                    Retire: {
                        target: "AwaitingPlayer",
                    },
                },
            },
        },
    }, {
        actions: {
            incrementTosses: (context, event) => {
                context.tosses++;
            },
            incrementOdds: (context, event) => {
                context.odds++;
            },
            incrementWins: (context, event) => {
                context.heads++;
            },
            incrementLosses: (context, event) => {
                context.tails++;
            }
        },
        guards: {
            Odds: (context) => {
                return context.tosses % 2 === 0;
            },
            TwoHeads: (context) => {
                return context.heads === 2;
            },
            TwoTails: (context) => {
                return context.tails === 2;
            }
        }
    });


const machineService = interpret(coinFlipMachine).start()

const getInstance = () => {
    return machineService;
}

export { getInstance }
