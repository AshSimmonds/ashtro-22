<template>
    <div id="vue" class="counter">
        <p>
            Counter:
            <span class="badge text-xl">{{ state.context.count }}</span>
        </p>

        <button @click="send('decrement')" class="btn btn-circle text-xl">
            -
        </button>
        <button @click="send('increment')" class="btn btn-circle text-xl">
            +
        </button>

        <p>
            State.value: <span class="badge text-xl">{{ state.value }}</span>
        </p>

        <button @click="send('disable')" class="btn btn-warning" >Disable
        </button>
        <button @click="send('enable')" class="btn btn-success">Enable
        </button>

    </div>
</template>

<script lang="ts">
import { useActor } from "@xstate/vue"
import { counterMachineService } from "../machines/counter"

export default {
    setup() {
        const { state, send } = useActor(counterMachineService)
        return { state, send }
    },
}
</script>
