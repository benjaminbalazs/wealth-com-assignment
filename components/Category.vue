<script lang="ts" setup>
	const props = defineProps<{
		category: StructuredCategory;
	}>();

	const open = ref(true);
	const toggle = () => {
		open.value = !open.value;
	};

	const total = computed(() => {
		return "$" + props.category.total.toFixed(2);
	});

	const sortedTypes = computed(() => {
		return props.category.types.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
	});
</script>

<template>
	<div class="category">
		<div class="header" @click="toggle">
			<div class="left">
				<arrow :flip="open" />
				<h3>{{ category.name }}</h3>
			</div>

			<h3>{{ total }}</h3>
		</div>
		<div class="content" v-if="open">
			<Type v-for="type in sortedTypes" :key="type.name" :type="type"></Type>
			<Item v-for="item in category.items" :key="item.name" :item="item"></Item>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.category {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid #e5e7eb;

		.header {
			box-sizing: border-box;
			padding-left: 15px;
			padding-right: 15px;
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			background-color: #f3f4f6;
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

		.content {
			.type + .type {
				border-top: 1px solid #e5e7eb;
			}
		}
	}
</style>
