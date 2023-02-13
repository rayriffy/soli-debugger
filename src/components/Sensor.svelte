<script lang="ts">
  import { onMount } from 'svelte'

	import { soliEvents } from '../constants/soliEvents'
  import { filteredSoliEvents } from '../services/filteredSoliEvents'

	import type { EventItem } from '../@types/EventItem'
  import type { SoliEvent } from '../@types/SoliEvent'

	let eventCount: number = 0
	let captureDataItems: EventItem[] = []

	let selectedEvents: SoliEvent[] = ['swipe', 'tap', 'reach', 'presence']

	let lastTimestamp = Number(new Date())

	onMount(() => {
		window.onSoliEvent = event => {
			// inject new data to frontm of array, then slice it
			let newTimestamp = Number(new Date())
			captureDataItems = [
				{
					id: eventCount,
					duration: newTimestamp,
					data: event,
				},
				...captureDataItems,
			]

			lastTimestamp = newTimestamp
			eventCount++
		}

		// reset event on unmount
		return () => {
			window.onSoliEvent = () => {}
		}
	})
</script>

<section class="my-4 flex space-x-2">
	{#each soliEvents as soliEvent}
		{@const isActive = selectedEvents.includes(soliEvent)}
		<button
			type="button"
      on:click={() => {
        if (isActive)
          selectedEvents = selectedEvents.filter(o => o !== soliEvent)
        else
          selectedEvents = [...selectedEvents, soliEvent]
      }}
			class={`inline-flex items-center rounded-md border border-transparentpx-3 py-2 px-4 text-sm font-medium leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isActive ? 'text-white bg-indigo-600' : 'bg-indigo-100 text-indigo-700'}`}
		>
			{soliEvent}
		</button>
	{/each}
</section>

<section class="space-y-4">
	{#if captureDataItems.length === 0}
		<div class="font-mono">Waiting for events...</div>
	{:else}
		{#each filteredSoliEvents(captureDataItems, selectedEvents) as item (item.id)}
			<div
				class="px-6 pb-4 pt-7 border rounded-xl shadow-lg relative font-mono text-xs overflow-hidden"
			>
				<span
					class="absolute top-0 bg-black py-0.5 px-3 left-4 rounded-b-md text-white select-none"
					>{item.data.type}</span
				>
				<span
					class="absolute top-1.5 py-0.5 px-3 right-4 rounded-b-md text-gray-500 select-none"
					>{item.duration} ms</span
				>
				<span
					class="z-[-1] text-4xl text-gray-300 absolute -bottom-2.5 right-2.5"
					>#{item.id}</span
				>
				<p class="break-all z-20">{JSON.stringify(item.data)}</p>
			</div>
		{/each}
	{/if}
</section>
