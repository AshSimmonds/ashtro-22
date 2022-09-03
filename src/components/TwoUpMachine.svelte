<script>
    import { getInstance } from "../machines/twoUpMachine"

    const service = getInstance()
    let state
    service.onTransition((newState) => {
        state = newState
    })
    // const { heads, tails } = state.context;
</script>

<h2>State: {state.value}</h2>

<button on:click={() => service.send("PlayerSelected")} class="btn"
    >select player</button>

<div>
    <p>Tosses: <span class="badge text-xl">{state.context.tosses}</span></p>
    <p>Heads: <span class="badge text-xl">{state.context.heads}</span></p>
    <p>Tails: <span class="badge text-xl">{state.context.tails}</span></p>

    <button on:click={() => service.send("Toss")} class="btn btn-circle text-xl"
        >+</button
    >
</div>

<hr />

<h3>debug state</h3>
<pre>{JSON.stringify(state, null, '    ')}</pre>
