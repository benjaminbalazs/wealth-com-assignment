<script lang="ts" setup>
	//import { type StructuredCategory } from "./../server/api/structured";

	const { data, status, error, refresh } = await useFetch("/api/structured");
</script>

<template>
	<main class="hero flex-vertical">
		<h1>Index</h1>
		<p>{{ data }}</p>
	</main>
</template>

<style scoped lang="scss">
	main {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
