<script>
    let tabs = ["Tab 1", "Tab 2", "Tab 3"]

    let activeTabIndex = 0
</script>

<div class="tabs tab-wrapper w-80 mx-auto">
    {#each tabs as tab, index}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
            class="tab-control tab tab-lifted"
            class:tab-active={activeTabIndex === index}
            on:click={() => (activeTabIndex = index)}
        >
            {tab}
        </label>
    {/each}
</div>

{#if activeTabIndex == 0}
    <div>Looks like this sort of works decent</div>
{/if}

{#if activeTabIndex == 1}
    <div>dunno if you can link directly to the content of a tab though</div>
{/if}

{#if activeTabIndex == 2}
    <div>content 3</div>
{/if}
