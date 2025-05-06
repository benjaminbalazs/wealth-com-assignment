<script lang="ts" setup>
	const props = defineProps<{
		flip: boolean;
	}>();
</script>

<template>
	<svg v-if="!flip" class="arrow" width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 13L7 7L1 1" stroke="black" stroke-width="1.5" />
	</svg>

	<svg v-if="flip" width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 1L7 7L13 1" stroke="black" stroke-width="1.5" />
	</svg>
</template>
