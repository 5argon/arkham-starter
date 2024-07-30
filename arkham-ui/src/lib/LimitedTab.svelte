<!-- @component
Supports up to 6 tabs. Use slot named `tab1` to render on the tab,
and `content1` for its content when active. Use `hide1` prop to
conditionally not render the tab.
-->
<script lang='ts'>
  /**
   * Controls active tabs from the outside.
   * 0~5 since it supports up to 6 tabs.
   * If not specified, state is kept inside and starts from 0.
   */
  export let active: number = 0
  export let hide1 = false
  export let hide2 = false
  export let hide3 = false
  export let hide4 = false
  export let hide5 = false
  export let hide6 = false
  export let onChangeActive: (i: number) => void = () => {
    // do nothing
  }

  function handler(index: number) {
    active = index
    onChangeActive(index)
  }
</script>

<div>
  {#if $$slots.tab1 && $$slots.content1 && !hide1}
    <button type='button'
            class:inactive={active !== 0}
            on:click={() => {
				handler(0)
			}}
    >
      <slot name='tab1' />
    </button>
  {/if}
  {#if $$slots.tab2 && $$slots.content2 && !hide2}
    <button type='button'
            class:inactive={active !== 1}
            on:click={() => {
				handler(1)
			}}
    >
      <slot name='tab2' />
    </button>
  {/if}
  {#if $$slots.tab3 && $$slots.content3 && !hide3}
    <button type='button'
            class:inactive={active !== 2}
            on:click={() => {
				handler(2)
			}}
    >
      <slot name='tab3' />
    </button>
  {/if}
  {#if $$slots.tab4 && $$slots.content4 && !hide4}
    <button type='button'
            class:inactive={active !== 3}
            on:click={() => {
				handler(3)
			}}
    >
      <slot name='tab4' />
    </button>
  {/if}
  {#if $$slots.tab5 && $$slots.content5 && !hide5}
    <button type='button'
            class:inactive={active !== 4}
            on:click={() => {
				handler(4)
			}}
    >
      <slot name='tab5' />
    </button>
  {/if}
  {#if $$slots.tab6 && $$slots.content6 && !hide6}
    <button type='button'
            class:inactive={active !== 5}
            on:click={() => {
				handler(5)
			}}
    >
      <slot name='tab6' />
    </button>
  {/if}
</div>

<div class='content'>
  {#if active === 0 && $$slots.content1}
    <slot name='content1' />
  {/if}
  {#if active === 1 && $$slots.content2}
    <slot name='content2' />
  {/if}
  {#if active === 2 && $$slots.content3}
    <slot name='content3' />
  {/if}
  {#if active === 3 && $$slots.content4}
    <slot name='content4' />
  {/if}
  {#if active === 4 && $$slots.content5}
    <slot name='content5' />
  {/if}
  {#if active === 5 && $$slots.content6}
    <slot name='content6' />
  {/if}
</div>

<style>
    button {
        margin: 0 1px;
        display: inline-block;
        list-style: none;
        cursor: pointer;
        user-select: none;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-bottom: none;
        background-color: transparent;
        border-radius: 4px 4px 0px 0px;
        padding: 4px 12px;
    }

    .inactive {
        background-color: rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid black;
    }

    .inactive:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }

    .content {
        padding: 8px 0px;
    }
</style>
