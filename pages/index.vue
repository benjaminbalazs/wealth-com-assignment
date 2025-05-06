<script lang="ts" setup>
	//import { type StructuredCategory } from "./../server/api/structured";

	const { data, status, error, refresh } = await useFetch("/api/structured");
</script>

<template>
	<main class="hero flex-vertical">
		<div class="holder">
			<Category :category="item" v-for="item in data" :id="item.name" :key="item.name"></Category>
		</div>
		<!-- <h1>Index</h1>
		<p>{{ data }}</p> -->
	</main>
</template>

<style scoped lang="scss">
	main {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.holder {
			width: 540px;
			flex-direction: column;
			border: 1px solid #dee0e3;
			border-bottom: none;
		}
	}
</style>
