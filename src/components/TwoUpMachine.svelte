<script>
    import { getInstance } from "../machines/twoUpMachine"

    const service = getInstance()
    let state
    service.onTransition((newState) => {
        state = newState
    })
</script>

<h2>State: {state.value}</h2>

<button on:click={() => service.send("PlayerSelected")} class="btn"
    disabled={state.value !== "AwaitingPlayer"} >select player</button
>

<div>
    <p>Tosses: <span class="badge text-xl">{state.context.tosses}</span></p>
    <p>Odds: <span class="badge text-xl">{state.context.odds}</span></p>
    <p>Heads (win): <span class="badge text-xl">{state.context.heads}</span></p>
    <p>Tails (lose): <span class="badge text-xl">{state.context.tails}</span></p>

    <button
        on:click={() => service.send("Toss")}
        class="btn btn-circle"
        disabled={state.value !== "AwaitingToss"}>Toss</button
    >
</div>

<hr />

<h3>debug state</h3>
<pre>{JSON.stringify(state, null, "    ")}</pre>
