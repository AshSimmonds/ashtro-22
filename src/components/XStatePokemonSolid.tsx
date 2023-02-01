import { createSignal, ErrorBoundary, Show } from "solid-js"
import { createMachine, interpret } from 'xstate'
// import { ErrorBoundary } from "solid-js"

const artificialDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const artificialDelayTime = 666

const autofetchDelay = 3333

const maxFetches = 3

const initialContext = {
    data: {} as any,
    error: {} as any,
    updates: 0,
    updated: new Date(),
    idleCount: 0,
    totalFetchCount: 0,
    fetchCount: 0,
    state: 'off',
    autofetch: false,
}

const pokemonMachine =

    /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrMBbVA7AdKgGZEDEYuAhgEYA2YA2gAwC6iKqsAlgC5d7sQAD0QA2UfgAsAJgCMAVgDMTSQHZlkyQA5ZAGhABPRAFoF+OaNXTRyptK2jZWrQF8X+tJhwEuEeqSIwHgBjAAtmNiQQNG4+ASiRBGNFVXxZR2cVOUkmLWl5fSMEWQBOJnwmEukVEtUmeSVpGTcPDGw8fF9-ACc4IIAxILCAYVQAV1weCMEY3n5cQUTjasUpRWk66qZVEq1VUUlCk0UtNJKS0RLJeUstddUFFui2706-MFIeVCgoegBBMZfQIhcKsGacObxUCJDYSaSKURMRSyeqSUTSEqyVRHJInM4XMonWSyTRXJ6edo+d6kCBcWA0ejTKKzOILBKIZSraqSLGKNQqSS1AqGEwOfGXJE6EmCxTkl4dLofISwHiUHhgfCUIjq7oACkUBsUAEpSBTXoqmRxYvNFogSqsmLJpPkFHItJJlNiRcVMfh5LVVDIMc4eU45V4OsCwlxcFAaXgNTGAG5tfBR0IAETVlEtz2tUOEJlK8nwqgaJPU9VUDhx6xLD0dZdqzssWPDlLTQ1CMbjYG63VQ3XwyFoaqIg6wnZBWdVuZZNvZCHs0lLuxugrLKLKolr+VLKNK2wRJXkqjPbncIFwqAgcHBEbZVshj8LSRdaw2diY212+0O3uWFEpHkBQHhRU9q3UdtXmIIhwXzF9EkRcx7GRHY8j2E5pBxUxnXwC4MXudREUxaCFXeeDn1tJcSikPJ5C0JRFBud0nRxU98K0R1lGdbkeSaMiCHTHtKNZajcNXbjmI9PkSWsHF7FSS5nARUQ7hRD0LxcIA */
    createMachine({
        id: 'pokemon',
        initial: 'off',
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
                        guard: (context) => context.autofetch,
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
                        actions(context, event, meta) {
                            context.error = event.data
                            console.error(`XStatePokemonSolid.tsx fetching onError: ${event.type} ${event.data} ${meta.state}`)
                        },
                        target: 'off',
                    },
                },
            },
        },
    }, {
        actions: {
            idleEntry: (context, event) => {
                console.log(`XStatePokemonSolid.tsx idleEntry: ${event.type}`)

                artificialDelay(artificialDelayTime).then(() => {
                    context.idleCount++
                    context.state = 'idle'
                    console.log(`XStatePokemonSolid.tsx idleEntry waited artificialDelayTime: ${artificialDelayTime}ms`)
                })
            },
            fetchingEntry: (context, event) => {
                context.fetchCount++
                context.totalFetchCount++
                context.state = 'fetching'
                console.log(`XStatePokemonSolid.tsx fetchingEntry: ${event.type}`)
            },
            resetFetchCount: (context, event) => {
                context.fetchCount = 0
                console.log(`XStatePokemonSolid.tsx resetFetchCount: ${event.type}`)
            },
            toggleAutofetch: (context, event) => {
                console.log(`XStatePokemonSolid.tsx toggleAutofetch BEFORE: ${context.autofetch}`)
                context.autofetch = !context.autofetch
                console.log(`XStatePokemonSolid.tsx toggleAutofetch AFTER: ${context.autofetch}`)
                console.log(`XStatePokemonSolid.tsx toggleAutofetch: ${JSON.stringify(event, null, 4)}`)
            },
        },

        actors: {
            fetchData: (context, event) => {
                console.log(`XStatePokemonSolid.tsx fetchData: ${event.type}`)
                const randomNumber = Math.round(Math.random() * 260) + 1
                const theUrl = `https://pokeapi.co/api/v2/ability/${randomNumber}`


                if (context.fetchCount > maxFetches) {
                    return Promise.reject(`XStatePokemonSolid.tsx fetchCount > maxFetches: ${context.fetchCount} > ${maxFetches}`)
                }

                const theFetchResponse = fetch(theUrl)

                console.log(`XStatePokemonSolid.tsx fetchData theFetchResponse: ${theFetchResponse}`)

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





const pokemonMachineService = interpret(pokemonMachine).start()

const [pokemonState, setPokemonState] = createSignal(pokemonMachineService.getSnapshot())

pokemonMachineService.onTransition((newState) => {
    console.log(`XStatePokemonSolid.tsx onTransition newState.value: ${newState.value}`)

    if (newState.value !== 'asdf') {
        setPokemonState(newState)
    } else {
        artificialDelay(artificialDelayTime).then(() => {
            setPokemonState(newState)
            console.log(`XStatePokemonSolid.tsx onTransition waited artificialDelayTime: ${artificialDelayTime}ms`)
        })
    }
})






pokemonMachineService.onDone((theDone) => {
    console.log(`XStatePokemonSolid.tsx onDone theDone: ${JSON.stringify(theDone, null, 4)}`)
})

pokemonMachineService.onTransition((theTransition) => {
    console.log(`XStatePokemonSolid.tsx onTransition theTransition: ${JSON.stringify(theTransition, null, 4)}`)
})


export default function PokemonSolid() {



    // setTimeout(() => {
    //     pokemonMachineService.send('fetch')
    // }, autofetchDelay)

    // artificialDelay(autofetchDelay).then(() => {
    //     pokemonMachineService.send('fetch')
    // })

    return (

        <div>
            <button onclick={() => pokemonMachineService.send({ type: 'enable' })} disabled={!pokemonState().can({ type: 'enable' })} class="btn btn-accent">Enable</button>
            <button onclick={() => pokemonMachineService.send({ type: 'fetch' })} disabled={!pokemonState().can({ type: 'fetch' })} class="btn btn-success">Fetch</button>
            <button onclick={() => pokemonMachineService.send({ type: 'cancel' })} disabled={!pokemonState().can({ type: 'cancel' })} class="btn btn-warning">Cancel</button>


            <ul>
                <li>
                    State: <span class="badge text-xl">{pokemonState().value.toString()}</span>
                </li>

                <li>
                    Auto-fetch: <span class="badge text-xl">{pokemonState().context.autofetch.toString()}</span>
                    <button onclick={() => pokemonMachineService.send({ type: "toggleAutofetch" })} disabled={!pokemonState().can({ type: "toggleAutofetch" })} class="btn btn-accent btn-outline" >toggle</button>
                </li>

                <li>
                    idleCount: <span class="badge text-xl">{pokemonState().context.idleCount}</span>
                </li>

                <li>
                    current fetchCount: <span class="badge text-xl">{pokemonState().context.fetchCount} / {maxFetches}</span>
                    <button onclick={() => pokemonMachineService.send({ type: "resetFetchCount" })} disabled={!pokemonState().can({ type: "resetFetchCount" })} class="btn btn-accent btn-outline" >reset</button>
                </li>

                <li>total fetches: <span class="badge text-xl">{pokemonState().context.totalFetchCount}</span></li>

                <li>
                    updated: <span class="badge text-xl">{pokemonState().context.updated.toLocaleDateString('en-AU', {
                        day: '2-digit',
                        month: 'short',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    })}</span>
                </li>

                <li>data:
                    <Show when={pokemonState().context.data.effect_entries?.length > 0}>
                        <span class="badge text-xl">{JSON.stringify(pokemonState().context.data.effect_entries[0].effect, null, 4)}</span>
                    </Show>
                </li>
            </ul>

            <ErrorBoundary fallback={err => err}>
                <pre class="max-w-2xl" >{JSON.stringify(pokemonState(), null, 4)}</pre>
            </ErrorBoundary>
        </div >
    )
}
