<script lang="ts" setup>
	const props = defineProps<{
		line: StructuredLine;
	}>();

	const total = computed(() => {
		return Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumSignificantDigits: 3,
		}).format(Math.round(props.line.total));
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
		padding-right: 20px;
		height: 50px;
		align-items: center;
		justify-content: space-between;

		h3 {
			font-size: 18px;
			font-family: "Reckless", "Helvetica Neue";
			user-select: none;
		}
	}
</style>
