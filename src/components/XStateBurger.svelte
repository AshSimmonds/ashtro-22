<script>
    import { burgerMachineService } from "../deus-ex/burger"

    let burgerState

    burgerMachineService.onTransition((newState) => {
        burgerState = newState
    })
</script>

<div>
    <div>asdf</div>

    <pre>
        {JSON.stringify(burgerState, null, 4)}
    </pre>

    <div>qwer</div>
</div>
