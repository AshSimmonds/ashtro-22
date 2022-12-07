import { createSignal, Show } from "solid-js"
import { createMachine, interpret } from 'xstate'
// import { ErrorBoundary } from "solid-js"

const pokemonMachine = createMachine({
    id: 'pokemon',
    initial: 'idle',
    predictableActionArguments: true,
    context: {
        data: {} as any,
        error: {} as any,
        updates: 0,
        updated: new Date(),
        idleCount: 0,
        fetchCount: 0,
        state: 'dunno',
    },
    states: {
        idle: {
            entry: 'idleEntry',
            on: {
                fetch: {
                    target: 'fetching',
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
            type: 'final',
        },

    },
}, {
    actions: {
        idleEntry: (context, event) => {
            context.idleCount++
            context.state = 'idle'
            console.log(`idleEntry: ${event.type}`)
        },
        fetchingEntry: (context, event) => {
            context.fetchCount++
            context.state = 'fetching'
            console.log(`fetchingEntry: ${event.type}`)
        },
        fuckedEntry: (context, event) => {
            context.state = 'fucked'
            console.log(`fuckedEntry: ${JSON.stringify(event, null, 4)}`)
        },
    },
    services: {
        fetchData: (context, event) => {
            console.log(`fetchData: ${event.type}`)
            const randomNumber = Math.round(Math.random() * 260) + 1
            const theUrl = `https://pokeapi.co/api/v2/ability/${randomNumber}`

            try {
                return fetch(theUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        context.data = data
                        context.updated = new Date()
                        context.updates++
                        return data
                    })
            } catch (error) {
                context.error = error
                console.error(`Error: ${error}`)
                return error as any
            }
        },
    },
})


const pokemonMachineService = interpret(pokemonMachine).start()



const [pokemonState, setPokemonState] = createSignal(pokemonMachineService.getSnapshot())

pokemonMachineService.onTransition((newState) => {
    setPokemonState(newState)
})

export default function PokemonSolid() {

    return (

        <div>
            <button onclick={() => pokemonMachineService.send("fetch")} class="btn btn-success">Fetch</button>

            <ul>
                <li>
                    State: <span class="badge text-xl">{pokemonState().context.state}</span>
                </li>

                <li>
                    idleCount: <span class="badge text-xl">{pokemonState().context.idleCount}</span>
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

                <li>
                    <Show when={pokemonState().context.data.name}>
                        data: <span class="badge text-xl">{JSON.stringify(pokemonState().context.data.effect_entries[0].effect, null, 4)}</span>
                    </Show>
                </li>
            </ul>

            {/* <ErrorBoundary fallback={err => err}> */}
            <pre class="max-w-2xl" >{JSON.stringify(pokemonState(), null, 4)}</pre>
            {/* </ErrorBoundary> */}
        </div >
    )
}
