<template>
	<div class="link-container">
		<input class="url-input" type="text" placeholder="请输入url" v-model="url">
		<button class="button" @click="addLink">添加链接</button>
		<span class="message-error" v-show="isError">{{errorMsg}}</span>
	</div>
</template>
<script>
export default {
	name: 'module-link',
	data() {
		return {
			url: '',
			isError: true,
			errorMsg: '请输入url'
		};
	},
	methods: {
		addLink() {
			if (this.url.length === 0) {

			} else {

			}
		}
	}
};
</script>
<style lang="less" scoped>
.link-container {
	.url-input {
		padding: 6px 12px;
		border: 1px solid #ddd;
		border-radius: 5px;
		line-height: 18px;
		margin-left: 5px;
	}
	.button {
		color: inherit;
		background-color: inherit;
		padding: 6px 12px;
		white-space: nowrap;
		vertical-align: middle;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border: 1px solid #ddd;
		border-radius: 5px;
		margin-right: 4px;
	}
	.message-error {
		color: #ff0000;
	}
}
</style>