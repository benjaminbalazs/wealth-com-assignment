<script lang="ts" setup>
	const props = defineProps<{
		type: StructuredType;
	}>();

	const open = ref(true);
	const toggle = () => {
		open.value = !open.value;
	};

	const total = computed(() => {
		return "$" + props.type.total.toFixed(2);
	});
</script>

<template>
	<div class="type">
		<div class="header" @click="toggle">
			<div class="left">
				<arrow :flip="open" />
				<h3>{{ type.name }}</h3>
			</div>

			<h3>{{ total }}</h3>
		</div>
		<div class="content" v-if="open">
			<Line :line="line" v-for="line in type.lines" :key="line.name"></Line>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.type {
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
