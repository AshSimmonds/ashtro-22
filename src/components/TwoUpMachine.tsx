import { useActor } from "@xstate/react";
import { getInstance } from "../machines/twoUpMachine";

function TwoUpMachine() {
    const [ state, send ] = useActor(getInstance());
    const { heads, tails } = state.context;

    return (
        <div>
            <button onClick={() => send("TOSS")}>Toss</button>
            <div>
                <div>Heads: {heads}</div>
                <div>Tails: {tails}</div>
            </div>
        </div>
    );
};

export default TwoUpMachine;
