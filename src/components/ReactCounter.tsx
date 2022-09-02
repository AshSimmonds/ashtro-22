import { useActor } from '@xstate/react';
import { getInstance } from '../machines/counter';

function ReactCounter() {
    const [state, send] = useActor(getInstance());
    return (
            <p>React counter: {state.context.count}</p>
            // <p>state: {state.value}</p>
            // <button onClick={() => send('decrement')}>-</button>
            // <button onClick={() => send('increment')}>+</button>
            // <button onClick={() => send('disable')}>Disable</button>
            // <button onClick={() => send('enable')}>Enable</button>
    );
}

export default ReactCounter;