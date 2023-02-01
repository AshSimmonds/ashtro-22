import { counterMachineService, counterMachine } from '../deus-ex/counter'
import { useState, useEffect } from 'preact/hooks'
import type { StateFrom } from 'xstate'

export default function PreactCounter() {
    const [counterState, setState] = useState<StateFrom<typeof counterMachine>>(counterMachineService.state)

    useEffect(() => {
        const subscription = counterMachineService.subscribe((counterState) => {
            setState(counterState)
        })
        return subscription.unsubscribe
    }, [])


    return (
        <div id='preact' className='counter'>

            <p>
                Counter: <span className="badge text-xl">{counterState?.context.count}</span>
            </p>

            <button onClick={() => counterMachineService.send('decrement')} className="btn btn-circle text-xl">-</button>
            <button onClick={() => counterMachineService.send('increment')} className="btn btn-circle text-xl">+</button>

            <p>
                State.value: <span className="badge text-xl"  >{counterState?.value ? counterState.value.toString() : ''}</span>
            </p>

            <button onClick={() => counterMachineService.send("disable")} className="btn btn-warning" >Disable</button>
            <button onClick={() => counterMachineService.send("enable")} className="btn btn-success">Enable</button>

            <div className="hidden">
                <pre>{JSON.stringify(counterState, null, 4)}</pre>
            </div>

        </div>
    )
}
