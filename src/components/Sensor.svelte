<script lang="ts">
  import { onMount } from 'svelte'

  let maxRow: number = 50
  let captureDataItems: any[] = []

  onMount(() => {
    window.onSoliEvent = event => {
      // inject new data to frontm of array, then slice it
      captureDataItems = [
        event,
        ...captureDataItems
      ].slice(0, maxRow)
    }

    // reset event on unmount
    return () => {
      window.onSoliEvent = () => {}
    }
  })
</script>

<section class="space-y-4">
  {#each captureDataItems as item}
    <div class="px-4 py-3 border shadow-md">
      {JSON.stringify(item)}
    </div>
  {/each}
</section>
