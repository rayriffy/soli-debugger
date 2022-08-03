<script lang="ts">
  import { onMount } from 'svelte'

  let eventCount: number = 0
  let maxRow: number = 50
  let captureDataItems: {
    id: number
    duration: number
    data: any
  }[] = []

  let lastTimestamp = Number(new Date())

  onMount(() => {
    window.onSoliEvent = event => {
      // inject new data to frontm of array, then slice it
      let newTimestamp = Number(new Date())
      captureDataItems = [
        {
          id: eventCount,
          duration: newTimestamp,
          data: event
        },
        ...captureDataItems
      ].slice(0, maxRow)

      lastTimestamp = newTimestamp
      eventCount++
    }

    // reset event on unmount
    return () => {
      window.onSoliEvent = () => {}
    }
  })
</script>

<section class="space-y-4">
  {#if captureDataItems.length === 0}
    <div class="font-mono">
      Waiting for events...
    </div>
  {:else}
    {#each captureDataItems as item}
      <div class="px-6 pb-4 pt-7 border rounded-xl shadow-lg relative font-mono text-xs overflow-hidden">
        <span class="absolute top-0 bg-black py-0.5 px-3 left-4 rounded-b-md text-white select-none">{item.data.type}</span>
        <span class="absolute top-1.5 py-0.5 px-3 right-4 rounded-b-md text-gray-500 select-none">{item.duration} ms</span>
        <span class="z-[-1] text-4xl text-gray-300 absolute -bottom-2.5 right-2.5">#{item.id}</span>
        <p class="break-all z-20">{JSON.stringify(item.data)}</p>
      </div>
    {/each}
  {/if}
</section>
