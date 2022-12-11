import { createSignal } from 'solid-js'
import { createMachine, interpret } from 'xstate'

// Robotum capere notitia ex basibus

const autofetchDelay = 3333

const initialContext = {
    data: {} as any,
    error: {} as any,
    updates: 0,
    updated: new Date(),
    idleCount: 0,
    maxFetches: 69,
    totalFetchCount: 0,
    fetchCount: 0,
    state: 'off',
    autofetch: true,
}

const fetcherMachine =

    /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrMBbVA7AdKgGZEDEYuAhgEYA2YA2gAwC6iKqsAlgC5d7sQAD0QA2UfgAsAJgCMAVgDMTSQHZlkyQA5ZAGhABPRAFoF+OaNXTRyptK2jZWrQF8X+tJhwEuEeqSIwHgBjAAtmNiQQNG4+ASiRBGNFVXxZR2cVOUkmLWl5fSMEWQBOJnwmEukVEtUmeSVpGTcPDGw8fF9-ACc4IIAxILCAYVQAV1weCMEY3n5cQUTjasUpRWk66qZVEq1VUUlCk0UtNJKS0RLJeUstddUFFui2706-MFIeVCgoegBBMZfQIhcKsGacObxUCJDYSaSKURMRSyeqSUTSEqyVRHJInM4XMonWSyTRXJ6edo+d6kISwHiUHhgfCUIiM7oACkUXMUAEpSBTXl1GGCorM4gsEogSqsmLJpPkFHItJJlNjDIhSrJ8PJaqoZBjnJJia53M8vB1gWEuLgoKQIHgmdaAG5tfCW0IAEQZlGmooh4sWJlK8nwqgaJPU9VUDhx6xDD1lYdq8ssWPJLwtQ1C1ttYG63VQ3XwyFoDKIhawbqzXvpvo4sXmgYQ9mkod2N0ktXkKLKolj+VDKNK2wRJXkqgn6fNBCIY2CmAg5CodGFkXrkIl0MQ8jk+DH2nH2mqahxw4qVSYBzUdnlZKeuFQEDg4On4IbUOEJgVaw2diY212fZDnVJI5HKa4FFTPUVD2UQp0pQgSDfDcm0Rcx7GRHY8j2E5pBxUx5T3dFpQ2dREUxeDBXeZCA0lZsSikPJ5C0JRFBuZU5Rxcc9y0WVlHlY8jSaSjMxBHMaMbOiCLbPi2JVRQjRkPsQPsVJLmcBFRDuFEVREmc5wXCSP0SNRJD3HUI0vOwuT0EDbHwS4dWw6wnGuNw3CAA */
    createMachine({
        id: 'fetcher',
        initial: 'off',
        predictableActionArguments: true,
        tsTypes: {} as import("./exBasibusMachina.typegen").Typegen0,
        context: initialContext,
        states: {
            off: {
                on: {
                    enable: 'idle',
                },
            },
            idle: {
                entry: 'idleEntry',
                on: {
                    fetch: {
                        target: 'fetching',
                    },
                    resetFetchCount: {
                        actions: 'resetFetchCount',
                    },
                    toggleAutofetch: {
                        actions: 'toggleAutofetch',
                    },
                    disable: {
                        target: 'off',
                    },
                },
                after: {
                    [autofetchDelay]: {
                        target: 'fetching',
                        cond: (context) => context.autofetch,
                    },
                },
            },
            fetching: {
                entry: 'fetchingEntry',

                invoke: {
                    id: 'fetchData',
                    src: 'fetchData',
                    onDone: {
                        target: 'idle',
                    },
                    onError: {
                        target: 'off',
                    },
                },
            },
        },
    }, {
        actions: {
            idleEntry: (context, event) => {
                console.log(`fetcherMachine.ts idleEntry: ${event.type}`)
                context.idleCount++
                context.state = 'idle'
            },
            fetchingEntry: (context, event) => {
                context.fetchCount++
                context.totalFetchCount++
                context.state = 'fetching'
                console.log(`fetcherMachine.ts fetchingEntry: ${event.type}`)
            },
            resetFetchCount: (context) => {
                context.fetchCount = 0
            },
            toggleAutofetch: (context) => {
                context.autofetch = !context.autofetch
                console.log(`fetcherMachine.ts toggleAutofetch: ${context.autofetch}`)
            },
        },
        services: {
            fetchData: (context, event) => {
                console.log(`fetcherMachine.ts fetchData: ${event.type}`)
                // const randomNumber = Math.round(Math.random() * 260) + 1
                const theUrl = `https://api.wheretheiss.at/v1/satellites/25544`


                if (context.fetchCount > context.maxFetches) {
                    return Promise.reject(`fetcherMachine.ts fetchCount > maxFetches: ${context.fetchCount} > ${context.maxFetches}`)
                }

                return fetch(theUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        context.data = data
                        context.updated = new Date()
                        context.updates++
                        // return data
                    })
            },
        },
    })

export const fetcherMachineService = interpret(fetcherMachine).start()






export const [fetcherState, setFetcherState] = createSignal(fetcherMachineService.getSnapshot())

fetcherMachineService.onTransition((newState) => {
    console.log(`fetcherMachine.ts onTransition newState.value: ${newState.value}`)

    setFetcherState(newState)
})

fetcherMachineService.onChange((theContext) => {
    console.log(`fetcherMachine.ts onChange theContext.state: ${theContext.state}`)
})


fetcherMachineService.onEvent((theEvent) => {
    console.log(`fetcherMachine.ts onEvent theEvent: ${theEvent.type}`)
})


fetcherMachineService.onSend((theSend) => {
    console.log(`fetcherMachine.ts onSend theSend: ${theSend}`)
})


fetcherMachineService.onStop(() => {
    console.log(`fetcherMachine.ts onStop no context`)
})


fetcherMachineService.onDone((theDone) => {
    console.log(`fetcherMachine.ts onDone theDone: ${JSON.stringify(theDone, null, 4)}`)
})

