<script lang="ts" setup>
	const props = defineProps<{
		flip: boolean;
	}>();

	const rotate = computed(() => {
		return props.flip ? "rotate(90deg)" : "rotate(0deg)";
	});
	const transform = computed(() => {
		return `transform: ${rotate.value}`;
	});
	const arrowStyle = computed(() => {
		return {
			transform: rotate.value,
			transition: "transform 0.2s ease-in-out",
		};
	});
</script>

<template>
	<svg :style="arrowStyle" class="arrow" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4.5 1.5L11.5 8.5L4.5 15.5" stroke="black" stroke-width="1.5" />
	</svg>
</template>
