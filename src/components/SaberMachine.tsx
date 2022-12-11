import { createSignal } from "solid-js"
import { fetcherMachineService, fetcherState } from "../deus-ex/exBasibusMachina"


export default function SaberMachine() {

    return (

        <div>
            <canvas id="cobe" class="mt-8 mx-auto h-96 border-cyan-800 border-0"
            ></canvas>

            <button onclick={() => fetcherMachineService.send("enable")} disabled={!fetcherState().can('enable')} class="btn btn-accent">Enable</button>
            <button onclick={() => fetcherMachineService.send("fetch")} disabled={!fetcherState().can('fetch')} class="btn btn-success">Fetch</button>
            <button onclick={() => fetcherMachineService.send("cancel")} disabled={!fetcherState().can('cancel')} class="btn btn-warning">Cancel</button>


            <ul>
                <li>
                    State: <span class="badge text-xl">{fetcherState().value.toString()}</span>
                </li>

                <li>
                    Auto-fetch: <span class="badge text-xl">{fetcherState().context.autofetch.toString()}</span>
                    <button onclick={() => fetcherMachineService.send("toggleAutofetch")} disabled={!fetcherState().can("toggleAutofetch")} class="btn btn-accent btn-outline" >toggle</button>
                </li>

                <li>
                    idleCount: <span class="badge text-xl">{fetcherState().context.idleCount}</span>
                </li>

                <li>
                    current fetchCount: <span class="badge text-xl">{fetcherState().context.fetchCount} / {fetcherState().context.maxFetches}</span>
                    <button onclick={() => fetcherMachineService.send("resetFetchCount")} disabled={!fetcherState().can("resetFetchCount")} class="btn btn-accent btn-outline" >reset</button>
                </li>

                <li>total fetches: <span class="badge text-xl">{fetcherState().context.totalFetchCount}</span></li>

                <li>
                    updated: <span class="badge text-xl">{fetcherState().context.updated.toLocaleDateString('en-AU', {
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
                    <span id="issData" class="badge text-xl">{JSON.stringify(fetcherState().context.data, null, 4)}</span>
                </li>
            </ul>

            {/* <ErrorBoundary fallback={err => err}> */}
            <pre class="max-w-2xl" >{JSON.stringify(fetcherState(), null, 4)}</pre>
            {/* </ErrorBoundary> */}







        </div >
    )
}



