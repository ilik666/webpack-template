<template>
	<h1> {{ message }}</h1>
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