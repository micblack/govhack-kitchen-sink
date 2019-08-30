<template>
	<section class="section">
		<div class="container">
			<div class="columns">
				<div class="column is-8-desktop is-offset-2-desktop">
					<div class="content">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
module.exports = {
	data: function () {
		return {}
	}
}