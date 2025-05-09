<script lang="ts" setup>
	import { useElementSize } from "@vueuse/core";
	import { useTemplateRef } from "vue";

	const props = defineProps<{
		category: StructuredCategory;
	}>();

	const open = ref(false);
	const toggle = () => {
		open.value = !open.value;
	};

	const total = computed(() => {
		return Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumSignificantDigits: 3,
		}).format(Math.round(props.category.total));
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
			<Type class="animation" v-for="type in sortedTypes" :key="type.name" :type="type"></Type>
			<Item class="animation" v-for="item in category.items" :key="item.name" :item="item"></Item>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.category {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid #e5e7eb;
		overflow: hidden;

		.header {
			box-sizing: border-box;
			padding-left: 20px;
			padding-right: 20px;
			width: 100%;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			cursor: pointer;

			.left {
				display: flex;
				align-items: center;
				gap: 4px;
			}

			h3 {
				font-size: 22px;
				font-family: "Reckless", "Helvetica Neue";
				user-select: none;
			}
		}

		.content {
			box-sizing: border-box;
			box-shadow: 0px 1px 0px #e5e7eb inset;

			.type + .type,
			.item + .type {
				border-top: 1px solid #e5e7eb;
			}

			.animation {
			}
		}
	}
</style>
