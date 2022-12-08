import { createSignal, Show } from "solid-js"
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
    /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrMBbVA7AdKgGZEDEYuAhgEYA2YA2gAwC6iKqsAlgC5d7sQAD0QA2UfgAsAJgCMAVgDMTSQHZlkyQA5ZAGhABPRAFoF+OaNXTRyptK2jZWrQF8X+tJhwEuEeqSIwHgBjAAtmNiQQNG4+ASiRBGNFVXxZR2cVOUkmLWl5fSMEWQBOJnwmEukVEtUmeSVpGTcPDGw8fF9-ACc4IIAxILCAYVQAV1weCMEY3n5cQUTteXNVdMUUzSYNgsMTRS00kpLREsl5Sy1FaTX5Fui2706-MFIeVCgoegBBMffAkLhVgzThzeKgRI3CTSRSiXJOBx2OyFEyyWSSCqqNaiaz2eRaJiyVT3TztHwvUhCWA8Sg8MD4ShEOndAAUGw2AEpSKSnl1GMCorM4gsEogSooKrJpPkFHItJJlKoUcUSrJ8PJaqoZNISs5JGjXO4Hl4OgCwlxcFBSBA8PSLQA3Nr4M2hAAitMo00FoOFi1RJRWqga6PU9VUDmV10DskJQdq0ssRJJj1NQ1CFqtYG63VQ3XwyFotKIuawzrT7ppXo4sXmfoQ9mk+FUuouklq8hjZVEkfyTZjpSY6lO8ixxKNPNNY2CmAg5CodH5kWrYJFEMQ8jk+ADyy1eRUSr2KvKlWqok0dWlOskbiNuFQEDgIJNq4eNfBwhMTQlQY7amUI4jQ9jGqNULhHM4mEqeRIPRZNn0IEgQTfF9Ejhcx7GuOpoOOaDpGVYwrnwOFFADE5rBsTRpDgslnnoJCVzrHUpDyfElEUC55SlZURy3AlZGUS8VH1JpqKeF0M3o31RSSKUmzKfj2IVRR9RkbtD3sVJTmcWFRCuGMFVEydp0gSTa2ktQMVIkMmDhGFFD0Q9bCI0i8jyDJzhvFwgA */
    
/** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrMBbVA7AdKgGZEDEYuAhgEYA2YA2gAwC6iKqsAlgC5d7sQAD0QA2UfgAsAJgCMAVgDMTSQHZlkyQA5ZAGhABPRAFoF+OaNXTRyptK2jZWrQF8X+tJhwEuEeqSIwHgBjAAtmNiQQNG4+ASiRBGNFVXxZR2cVOUkmLWl5fSMEWQBOJnwmEukVEtUmeSVpGTcPDGw8fF9-ACc4IIAxILCAYVQAV1weCMEY3n5cQUTjasUpRWk66qZVEq1VUUlCk0UtNJKS0RLJeUstddUFFui2706-MFIeVCgoegBBMZfQIhcKsGacObxUCJDYSaSKUS5JwOOx2I5JE5nC46EqyeF3SxPTztHzvUhCWA8Sg8MD4ShEGndAAUilZigAlKRia8uowwVFZnEFglECVVkw8fkFHItJJlKp0aVZPh5LVVDJpLtZbInESXh1gWEuLgoKQIHhacaAG5tfCG0IAEWplGmAohQsWJlK8nwqgasjUynkqgc6PWPoeEr9tWk1geqj1XgNQ1CxtNYG63VQ3XwyFo1KI2awdpTTqpro4sXmnoQ9mkvt2N0ktXkskqTFEYfyvrbpW2CJKwdUCfczyTBCIY2CmAg5CodD5kUrkOF0MQ8jk+EH2mD2mqakVZQqVQ7mk2saublHuFQEDg4PH4KrUOEJilaw2qO2u32h0MXoeY98lxJhtgaTRExJQgSCfFca0Rcx7HuepKkHNF-ySO58ERRRBwuawbE0aRIJ5d5YI9EVaxKKQ8nkLQlEUG5tWkdFgy3LQJWUWN90kPFJBI5MQTTcjq0o0x6x2TjGLlRReJkTsMPsVJLmcBFRDuNs5QEicpxnESX0SNRJC3VUAzqRF4UUPQMNsbC8LyPIMmuK8XCAA */
createMachine({
        id: 'pokemon',
        initial: 'off',
        predictableActionArguments: true,
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
                        target: 'fucked',
                    },
                },
            },
            fucked: {
                entry: 'fuckedEntry',
                on: {
                    enable: 'idle',
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
            fuckedEntry: (context, event) => {
                context.state = 'fucked'
                console.log(`XStatePokemonSolid.tsx fuckedEntry: ${JSON.stringify(event, null, 4)}`)
            },
        },
        services: {
            fetchData: (context, event) => {
                console.log(`XStatePokemonSolid.tsx fetchData: ${event.type}`)
                const randomNumber = Math.round(Math.random() * 260) + 1
                const theUrl = `https://pokeapi.co/api/v2/ability/${randomNumber}`


                if (context.fetchCount > maxFetches) {
                    return Promise.reject(`XStatePokemonSolid.tsx fetchCount > maxFetches: ${context.fetchCount} > ${maxFetches}`)
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

pokemonMachineService.onChange((theContext) => {
    console.log(`XStatePokemonSolid.tsx onChange theContext.state: ${theContext.state}`)
})


pokemonMachineService.onEvent((theEvent) => {
    console.log(`XStatePokemonSolid.tsx onEvent theEvent: ${theEvent.type}`)
})


pokemonMachineService.onSend((theSend) => {
    console.log(`XStatePokemonSolid.tsx onSend theSend: ${theSend}`)
})


pokemonMachineService.onStop(() => {
    console.log(`XStatePokemonSolid.tsx onStop no context`)
})


pokemonMachineService.onDone((theDone) => {
    console.log(`XStatePokemonSolid.tsx onDone theDone: ${JSON.stringify(theDone, null, 4)}`)
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
            <button onclick={() => pokemonMachineService.send("enable")} disabled={!pokemonState().can('enable')} class="btn btn-accent">Enable</button>
            <button onclick={() => pokemonMachineService.send("fetch")} disabled={!pokemonState().can('fetch')} class="btn btn-success">Fetch</button>
            <button onclick={() => pokemonMachineService.send("cancel")} disabled={!pokemonState().can('cancel')} class="btn btn-warning">Cancel</button>


            <ul>
                <li>
                    State: <span class="badge text-xl">{pokemonState().value.toString()}</span>
                </li>

                <li>
                    Auto-fetch: <span class="badge text-xl">{pokemonState().context.autofetch.toString()}</span>
                    <button onclick={() => pokemonMachineService.send("toggleAutofetch")} disabled={!pokemonState().can("toggleAutofetch")} class="btn btn-accent btn-outline" >toggle</button>
                </li>

                <li>
                    idleCount: <span class="badge text-xl">{pokemonState().context.idleCount}</span>
                </li>

                <li>
                    current fetchCount: <span class="badge text-xl">{pokemonState().context.fetchCount} / {maxFetches}</span>
                    <button onclick={() => pokemonMachineService.send("resetFetchCount")} disabled={!pokemonState().can("resetFetchCount")} class="btn btn-accent btn-outline" >reset</button>
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

            {/* <ErrorBoundary fallback={err => err}> */}
            <pre class="max-w-2xl" >{JSON.stringify(pokemonState(), null, 4)}</pre>
            {/* </ErrorBoundary> */}
        </div >
    )
}
