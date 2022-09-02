import { createMachine, interpret } from 'xstate';

const twoUpMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBUDuB7AqgBwHQEFUBDASwBcSA7KABQBsiBPMAJwGJ6nWBlMOsAMZlIiUNnSxyJdJVEgAHogC0AFgAcAJlwBGNboDsABgCsxgJxnD+jQBoQjZQDZtj3BrUBmMyuMf9Ksw1HfQBfELs0LDxCUgpqZAlYNgTYeCQQcUkKGTlFBCVjbWNcfUc1AK9tQ0CNMzsHfJVa3EKrRxVSjrNjRzCIjBxcTmYWAGEAC3QSATA2UZk4gFcwYaooOUypHPS8pSC1XEcjs01HDSqzx3rlAK1-R0MrD20fQz0+kEjB4dYJqZm2AAlMAUFhgDYSLayHbKbT+XCGHxmfRGcpmdpmDzXfJGO5lQwaDTmZzVFRhcIgSjoCBwORfaLEKTUH4sCFZaTQ0C7cwHDx+TToxweFRvbFKRyWQ7adwqEUC7QuD70giMuJQFJpMSQ7KchQ3TS4NRlDxHDT6BVqI1i3yGKV6TwaLruYxKgZ4Fl-abg9KbHW5ZSO-S4FRlQnGQlqUoeYxijyRhEPNTVCw+FEaV1RNlQ-35M5aPn6AVHYWi+zKFEqEomlGaDznfnkkJAA */
    createMachine({
        context: {
            tosses: 0,
            heads: 0,
            tails: 0,
        },
        tsTypes: {} as import("./TwoUpMachine.typegen").Typegen0,
        id: "TwoUp",
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
                            description: "Stalemate, toss again",
                            cond: "Odds",
                        },
                        {
                            description: "Win",
                            cond: "TwoHeads",
                            target: "PlayerChoice",
                        },
                        {
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
    });

const machineService = interpret(twoUpMachine).start()

const getInstance = () => {
    return machineService;
}

export { getInstance }
