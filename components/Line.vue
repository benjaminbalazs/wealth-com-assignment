<script lang="ts" setup>
	const props = defineProps<{
		line: StructuredLine;
	}>();

	const total = computed(() => {
		return "$" + props.line.total.toFixed(2);
	});
</script>

<template>
	<div class="line">
		<h3>{{ line.name }}</h3>
		<h3>{{ total }}</h3>
	</div>
</template>

<style scoped lang="scss">
	.line {
		width: 100%;
		display: flex;
		flex-direction: row;
		background: white;
		box-sizing: border-box;
		padding-left: 50px;
		padding-right: 15px;
		height: 40px;
		align-items: center;
		justify-content: space-between;

		h3 {
			font-size: 18px;
		}
	}
</style>
