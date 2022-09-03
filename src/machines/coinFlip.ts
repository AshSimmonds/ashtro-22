import { createMachine, interpret } from 'xstate';

const coinFlipMachine = createMachine({
    id: 'coinFlip',
    initial: 'idle',
    states: {
        idle: {
            on: {
                FLIP: 'flipping'
            }
        },
        flipping: {
            invoke: {
                src: 'flipCoin',
                onDone: {
                    target: 'idle',
                    actions: 'logResult'
                }

            }
        }
    }
}, {
    services: {
        flipCoin: () => new Promise(resolve => {
            setTimeout(() => {
                resolve(Math.random() > 0.5 ? 'heads' : 'tails');
            }, 1000);
        })
    },
    actions: {
        logResult: (context, event) => {
            console.log(event.data);
        }
    }
});


const machineService = interpret(coinFlipMachine).start()

const getInstance = () => {
    return machineService;
}

export { getInstance }
