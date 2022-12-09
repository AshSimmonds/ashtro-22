<script>
    import { getInstance } from "../deus-ex/coinFlip"

    const service = getInstance()
    let state
    service.onTransition((newState) => {
        state = newState
    })
</script>

<h2>State: {state.value}</h2>

<button on:click={() => service.send("Flip")} class="btn"
    disabled={state.value !== "AwaitingCoinFlip"} >flip coin</button
>

    <p>Flips: <span class="badge text-xl">{state.context.flips}</span></p>
    <p>Heads: <span class="badge text-xl">{state.context.heads}</span></p>
    <p>Tails: <span class="badge text-xl">{state.context.tails}</span></p>

<hr />

<h3>debug state</h3>
<pre>{JSON.stringify(state, null, "    ")}</pre>
