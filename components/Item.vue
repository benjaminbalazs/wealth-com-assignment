<script lang="ts" setup>
	const props = defineProps<{
		item: StructuredItem;
	}>();

	const total = computed(() => {
		return "$" + props.item.total.toFixed(2);
	});
</script>

<template>
	<div class="item">
		<div class="header">
			<div class="left">
				<h3>{{ item.name }}</h3>
			</div>

			<h3>{{ total }}</h3>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.item {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: white;

		.header {
			box-sizing: border-box;
			padding-left: 30px;
			padding-right: 15px;
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;
				gap: 4px;
			}

			h3 {
				font-size: 18px;
			}
		}
	}
</style>
