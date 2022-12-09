<script>
    import { counterMachineService } from "../deus-ex/counter"

    let counterState

    counterMachineService.onTransition((newState) => {
        counterState = newState
    })
</script>

<div >
    <p>
        Counter: <span class="badge text-xl">{counterState.context.count}</span>
    </p>
    <button on:click={() => counterMachineService.send("decrement")} class="btn btn-circle text-xl">-</button>
    <button on:click={() => counterMachineService.send("increment")} class="btn btn-circle text-xl">+</button>

    <p>
        State.value: <span class="badge text-xl ">{counterState.value}</span>
    </p>

    <button on:click={() => counterMachineService.send("disable")} class="btn btn-warning" >Disable</button>
    <button on:click={() => counterMachineService.send("enable")} class="btn btn-success">Enable</button>

    <div class="hidden">
        <pre>{JSON.stringify(counterState, null, 4)}</pre>
    </div>

</div>
