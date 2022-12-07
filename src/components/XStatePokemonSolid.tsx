import { createSignal } from "solid-js"
import { createMachine, interpret } from 'xstate'


const pokemonMachine = createMachine({
    id: 'pokemon',
    initial: 'idle',
    predictableActionArguments: true,
    context: {
        data: null,
        error: null,
        updates: 0,
        updated: new Date(),
        idleCount: 0,
        fetchCount: 0,
        state: 'dunno',
    },
    states: {
        idle: {
            entry: 'idleEntry',
        },
        fetching: {
            entry: 'fetchingEntry',
        },
    },
}, {
    actions: {
        idleEntry: (context, event) => {
            context.idleCount++
            context.state = 'idle'
        },
        fetchingEntry: (context, event) => {
            context.fetchCount++
            context.state = 'fetching'
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
            <p>
                Pokemon: <span class="badge text-xl">{pokemonState().context.state}</span>
            </p>
            <button onclick={() => pokemonMachineService.send("fetch")} class="btn btn-success">Fetch</button>

            <div class="hidden">
                <pre>{JSON.stringify(pokemonState, null, 4)}</pre>
            </div>
        </div>
    )
}
