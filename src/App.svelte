<script lang="ts">
  import { onMount } from 'svelte'

  import Unavailable from './components/Unavailable.svelte'
  import Sensor from './components/Sensor.svelte'

  let isSoliSensorAvailable: boolean | null = null

  onMount(() => {
    isSoliSensorAvailable = navigator.userAgent.includes("Soli Sandbox")
  })
</script>

<main class="max-w-lg mx-auto pb-8 pt-20 px-6 space-y-4">
  <section class="space-y-2">
    <h1 class="font-bold text-4xl">Soli debugger</h1>
    <p class="text-sm">This tool will emit raw <code class="px-2 bg-gray-200 rounded-md">onSoliEvent</code> everytime when function is called</p>
  </section>
  {#if isSoliSensorAvailable}
    <Sensor />
  {:else}
    <Unavailable />
  {/if}
</main>
