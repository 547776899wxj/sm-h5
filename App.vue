<script>
	export default {
		onLaunch: function() {
			this.$tui.webView.postMessage({
				data: {
					status: true
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
