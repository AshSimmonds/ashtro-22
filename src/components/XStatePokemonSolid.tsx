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
    fetchCount: 0,
    state: 'off',
}

const pokemonMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrMBbVA7AdKgGZEDEYuAhgEYA2YA2gAwC6iKqsAlgC5d7sQAD0QA2UfgAsAJgCMAVgDMTSQHZlkyQA5ZAGhABPRAFoF+OaNXTRyptK2jZWrQF8X+tJhwEuEeqSIwHgBjAAtmNiQQNG4+ASiRBCt8O3k5J3lZRXlJRVF9IwRZZIBOLXkS8S01VS11Nw8MbDx8QJDQrlwoUgg8MHxOgDcm1qCwgBFKHkoIwRjeflxBRMVVKQVq6RLJUTL5eS0CxElZaRTHbZPKhQrFBuim71H2zu6wACd31Hf8ZFopojfLDPCZTGasOacBbxUCJexMFI6JiqU72SpMPSGRDwqSqJglRSKaz7eT41T3TzNAhEACuwUwEHIVDojAhUXmcSWCWOWkU+B0jlkTEUakkTEOWIQJwR+1E0lUohyVkc8jc7hAuFQEDgkK8MIesUWyxMogRqhKGOk2hKslk2wORwQphRKRK0gqVkkBPldQpjxaxCIkMN+sSpvM9iJeNJJRKpOkjuMvPwpsUccq1hsmmkfr1Pj8YGD0K5sOxJSkWnd5UJ8lE1VOjvkazKGOU0nbKhOVtzVJBHS6Rc5xqdp3w5st1tt9olhStZ0kFQqTFTzlU2h7T1p9Mgg6N3IQ1lkUmkhIJTbqB0kjsU5X5KmqdVqJ7KapcQA */
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
                context.state = 'fetching'
                console.log(`XStatePokemonSolid.tsx fetchingEntry: ${event.type}`)
            },
            resetFetchCount: (context, event) => {
                context.fetchCount = 0
                console.log(`XStatePokemonSolid.tsx resetFetchCount: ${event.type}`)
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




const [autofetch, setAutofetch] = createSignal(true)



export default function PokemonSolid() {


    const intervalCownt = setInterval(() => {

        console.log(`XStatePokemonSolid.tsx PokemonSolid() intervalCownt: ${intervalCownt}`)
        // console.log(`intervalCownt: ${}`)

        if (autofetch()) {
            pokemonMachineService.send('fetch')
        }

        if (pokemonState().context.fetchCount >= maxFetches) {
            clearInterval(intervalCownt)
            setAutofetch(false)
        }

    }, autofetchDelay)




    // setTimeout(() => {
    //     pokemonMachineService.send('fetch')
    // }, autofetchDelay)

    // artificialDelay(autofetchDelay).then(() => {
    //     pokemonMachineService.send('fetch')
    // })

    return (

        <div>
            <Show when={pokemonState().value === 'off'}>
                <button onclick={() => pokemonMachineService.send("enable")} class="btn btn-accent">Start</button>
            </Show>
            <Show when={pokemonState().value === 'idle'}>
                <button onclick={() => pokemonMachineService.send("fetch")} class="btn btn-success">Fetch</button>
            </Show>
            <Show when={pokemonState().value === 'fetching' || pokemonState().value === 'autoFetching'}>
                <button onclick={() => pokemonMachineService.send("cancel")} class="btn btn-warning">cancel</button>
            </Show>
            <Show when={pokemonState().value === 'fucked'}>
                <button onclick={() => pokemonMachineService.send("enable")} class="btn btn-error">Fix</button>
            </Show>

            <input type="checkbox" checked={autofetch()} onclick={() => setAutofetch(!autofetch())} /> autofetch

            <ul>
                <li>
                    State: <span class="badge text-xl">{pokemonState().value.toString()}</span>
                </li>

                <li>
                    idleCount: <span class="badge text-xl">{pokemonState().context.idleCount}</span>
                </li>

                <li>
                    fetchCount: <span class="badge text-xl">{pokemonState().context.fetchCount} / {maxFetches}</span> <button onclick={() => pokemonMachineService.send("resetFetchCount")} disabled={!pokemonState().can("resetFetchCount")} class="btn btn-accent btn-outline" >(reset)</button>
                </li>

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
