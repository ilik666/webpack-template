<template>
	<div class="container" style="text-align: center">
		<h1> {{ message }}</h1>
		<img src="/assets/images/general/logo.png" :alt="message">
	</div>
</template>

<script>
export default {
	data: () => ({
		message: ''
	}),
	mounted() {
		this.message = this.$store.getters.getMessage
	}
}
</script>

<style lang="scss" scoped>
</style>