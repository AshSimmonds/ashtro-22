import { counterMachineService } from "../deus-ex/counter"
import { createSignal } from "solid-js"

const [counterState, setCounterState] = createSignal(counterMachineService.getSnapshot())

counterMachineService.onTransition((newState) => {
    setCounterState(newState)
})


export default function SolidCounter() {

    return (

        <div>
            <p>
                Counter: <span class="badge text-xl">{counterState().context.count}</span>
            </p>
            <button onclick={() => counterMachineService.send("decrement")} class="btn btn-circle text-xl">-</button>
            <button onclick={() => counterMachineService.send("increment")} class="btn btn-circle text-xl">+</button>

            <p>
                State.value: <span class="badge text-xl ">{counterState().value.toString()}</span>
            </p>

            <button onclick={() => counterMachineService.send("disable")} class="btn btn-warning" >Disable</button>
            <button onclick={() => counterMachineService.send("enable")} class="btn btn-success">Enable</button>

            <div class="hidden">
                <pre>{JSON.stringify(counterState, null, 4)}</pre>
            </div>

        </div>

    )
}
