<template>
	<div class="page">
		<section class="navigation">
			<b-navbar>
				<template slot="brand">
					<b-navbar-item href="/">
						<slot name="logo"></slot>
					</b-navbar-item>
				</template>
				<template slot="start">
					<slot name="menu-links"></slot>
				</template>
				<template slot="end">
					<b-navbar-item tag="div">
						<div class="buttons">
							<slot name="menu-buttons"></slot>
						</div>
					</b-navbar-item>
				</template>
			</b-navbar>
		</section>
		<section class="hero is-medium is-primary">
			<div class="hero-body">
				<div class="container">
					<div class="columns">
						<div class="column is-8-desktop is-offset-2-desktop">
							<h1 class="title is-2 is-spaced animated fadeIn">
								<slot name="heading"></slot>
							</h1>
							<h2 class="subtitle is-4 animated fadeInLeft">
								<slot name="subheading"></slot>
							</h2>
						</div>
					</div>
				</div>
			</div>
		</section>
		<slot name="content"></slot>
		<footer class="footer has-text-centered">
			<div class="container">
				<div class="columns">
					<div class="column is-8-desktop is-offset-2-desktop">
						<p>
							<slot name="footer"></slot>
						</p>
						<p>
							<small>
								Source code licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
							</small>
						</p>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
module.exports = {
	data: function () {
		return {}
	}
}