<template>
	<div class="my-component">
		{{ salutation }}, world.
		You clicked me 
		<a @click="incrementCounter">{{ count }}</a>
		times.
	</div>
</template>

<script>
module.exports = {
	props: {
		salutation: {
			default: 'Hello',
		}
	},
	data: function () {
		return {
			count: 0,
		}
	},
	methods: {
		incrementCounter () {
			this.count++
		},
	}
}
</script>
<style scoped>
.my-component {
	font-size: 20px;
}
.my-component a {
	display:inline-block;
	padding:5px;
	border:2px solid var(--color-link);
	border-radius:20%;
}
</style>