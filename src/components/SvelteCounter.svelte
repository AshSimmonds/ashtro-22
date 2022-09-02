<script>
    import { getInstance } from "../machines/counter"

    const service = getInstance()
    let state
    service.onTransition((newState) => {
        state = newState
    })
</script>

<div >
    <p>
        Counter: <span class="badge text-xl">{state.context.count}</span>
    </p>
    <button on:click={() => service.send("decrement")} class="btn btn-circle text-xl">-</button>
    <button on:click={() => service.send("increment")} class="btn btn-circle text-xl">+</button>
    <p>
        State: <span class="badge text-xl ">{state.value}</span>
    </p>
    <button on:click={() => service.send("disable")} class="btn btn-warning" >Disable</button>
    <button on:click={() => service.send("enable")} class="btn btn-success" >Enable</button>
</div>
