import { createMachine, interpret } from 'xstate';



export const burgerMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QCMCuAnG6B0BLCANmAMQD26EY6kA2gAwC6ioADqbLgC66kB2zIAB6IAtAEYATADYA7NgAsMmWLEBmCWIAcqqXQCsAGhABPURJ3ZVeulNX6JE+XQCcqgL5ujaTFWxpcBJzEsFQAbrSMAmwc3HwCwgji0qoKVs7y1vryUs7ORqYIqinOSprO1hJ0mnQ6Hp4gvKSU8Egg3lh4hGBR7Fw8-K0JSXrOCuYqUmIymnpSs-mi6nrYkxKakjJ66xIyNh5eGB3+gT0x-fGianRi2NZOznSbMvLmC4li8iman86aMg7KDQSfZtQ6+SgEXDhagQU59OKDS47CTYGx6MS-VTOCTYsRvNRSVFiOh0NaSdSVKQg9pUOGxAagIZqeSjO4uR56Z6vEyieQfW7Y9KVEmPOjyOpuIA */
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
