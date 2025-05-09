<script lang="ts" setup>
	const props = defineProps<{
		type: StructuredType;
	}>();

	const open = ref(false);
	const toggle = () => {
		open.value = !open.value;

		init();
	};

	const init = () => {
		if (content.value) {
			if (open.value) {
				content.value.style.maxHeight = content.value.scrollHeight + "px";
				//content.value.style.maxHeight = "none";
			} else {
				content.value.style.maxHeight = "0px";
			}
		}
	};

	const content = ref<HTMLElement | null>(null);

	const total = computed(() => {
		return Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumSignificantDigits: 3,
		}).format(Math.round(props.type.total));
	});

	onMounted(() => {
		init();
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
		<div class="content" ref="content">
			<Line :line="line" v-for="line in type.lines" :key="line.name"></Line>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.type {
		width: 100%;
		display: flex;
		flex-direction: column;
		//background: white;
		overflow: hidden;

		.header {
			box-sizing: border-box;
			padding-left: 30px;
			padding-right: 20px;
			width: 100%;
			height: 55px;
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
				font-size: 20px;
				font-family: "Reckless", "Helvetica Neue";
				user-select: none;
			}
		}

		.content {
			max-height: 0px;
			transition: all 0.3s ease-in-out;
			//
			.type + .type {
				border-top: 1px solid #e5e7eb;
			}
		}
	}
</style>
