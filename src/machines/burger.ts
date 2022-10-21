import { createMachine, interpret } from 'xstate';

   

export const burgerMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QCMCuAnG6B0BLCANmAMQD26EY6kA2gAwC6ioADqbLgC66kB2zIAB6IAtAEY6ANjHYAnAGYALHQUB2aQA5FAGhABPUQCZ587Eq2HVhumMmzDigL6PdaTFWxpcBTsVhUAN1pGATYObj4BYQRxOgBWVWwNe3s4uMVkxQVdAwR5STkNOhUNJTE46yznFxBeUkp4JBA3LDxCMFD2Lh5+JujYuNMNIpVJK0q4nNF5Q0NsaSkVRXlVRQlDZ1cMVq8fTvCeqNEJWTi5BdUxeWLZOgcpmLFlJLXVUtvJZWWNmpaPSgIuCC1Ag+26kT6xykBQqhjEbwUn2Kk30iCusmwNlm8ieyzUGU2zW2VDBEV6oH6YieplkFyuNzuOlRMTWMjit1UdA06TeJjE1UcQA */
    createMachine({
  tsTypes: {} as import("./burger.typegen").Typegen0,
  schema: {
    context: {} as {
      bun: string;
      patty: number;
      cheese: number;
      bacon: boolean;
      veggies: string[];
      condiments: string[];
    },
  },
  predictableActionArguments: true,
  id: "burger",
  initial: "idle",
  states: {
    idle: {
      on: {
        ordered: {
          target: "built",
        },
      },
    },
    built: {
      entry: "assemble",
      exit: "serve",
      on: {
        served: {
          target: "delivered",
        },
      },
    },
    delivered: {},
  },
}, {
        actions: {
            assemble: (ctx, e) => {
                console.log(`Assembling burger ${JSON.stringify(ctx, null, 4)} | ${e}`);
            },
            serve: (ctx, e) => {
                console.log(`Serving burger ${JSON.stringify(ctx, null, 4)} | ${e}`);
            },
        }
    },
    )


export const burgerMachineService = interpret(burgerMachine).start()
