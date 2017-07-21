<template>
	<div class="html-editor" ref='editor'>
		<div class="editor-toolbar">
			<tool-bar></tool-bar>
			<transition name="zoom-in-top">
				<div class="editor-dashboard" :class="{'isLink': currentDashBoard === 'link'}" ref="dashboard" v-show="isShowDashboard">
					<font-size v-show="currentDashBoard === 'size'"></font-size>
					<font-color v-show="currentDashBoard === 'color'"></font-color>
					<editor-link v-show="currentDashBoard === 'link'"></editor-link>
				</div>
			</transition>
		</div>
		<div class="editor-content" ref="content" contenteditable="true"></div>
	</div>
</template>
<script>
import RangeHandler from './range/handler';
import {addEvent} from './utils/common.js';
import ToolBar from './modules/toolBar/index.vue';
import FontSize from './modules/fontSize/index.vue';
import FontColor from './modules/fontColor/index.vue';
import EditorLink from './modules/link/index.vue';
export default {
	name: 'html-editor',
	props: {
		value: {
			type: String,
			required: true,
			default: ''
		},
		options: {
			type: Object,
			default: null
		}
	},
	components: {
		ToolBar,
		FontSize,
		FontColor,
		EditorLink
	},
	data() {
		return {
			content: '',
			isShowDashboard: false,
			currentDashBoard: '',
			dashboardStyle: ''
		};
	},
	mounted(){
		const content = this.$refs.content
		content.innerHTML = this.content
		content.addEventListener('mouseup', this.saveCurrentRange, false)
		content.addEventListener('keyup', () => {
			this.$emit('change', content.innerHTML)
			this.saveCurrentRange()
		}, false)
		content.addEventListener('mouseout', (e) => {
			if (e.target === content) {
				this.saveCurrentRange()
			}
		}, false)
		this.touchHandler = (e) => {
			if (content.contains(e.target)) {
				this.saveCurrentRange()
			}
		}
		let listItems = this.$refs.editor.getElementsByClassName('editor-dashboard');
		addEvent(listItems, 'mouseenter', (event) => {
			this.isShowDashboard = true;
		});
		addEvent(listItems, 'mouseleave', (event) => {
			this.isShowDashboard = false;
		});
	},
	methods: {
		showDashboard(type, centerX) {
			this.isShowDashboard = true;
			this.currentDashBoard = type;
			if (centerX) {
				setTimeout(() => {
					if (type === 'link') {
						let dashWidth = this.$refs.editor.offsetWidth;
						this.$refs.dashboard.style.width = dashWidth - 3 + 'px';
					} else {
						this.$refs.dashboard.style.width = 'auto';
						let dashWidth = this.$refs.dashboard.offsetWidth;
						this.$refs.dashboard.style.left = centerX - dashWidth * 0.5 + 'px';
					}
				}, 1);
			}
		},
		hideDashboard(type) {
			this.isShowDashboard = false;
		},
		saveCurrentRange(){
			const selection = window.getSelection ? window.getSelection() : document.getSelection()
			if (!selection.rangeCount) {
				return
			}
			const content = this.$refs.content
			for (let i = 0; i < selection.rangeCount; i++) {
				const range = selection.getRangeAt(0)
				let start = range.startContainer
				let end = range.endContainer
				// for IE11 : node.contains(textNode) always return false
				start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start
				end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end
				if (content.contains(start) && content.contains(end)) {
					this.range = range
					break
				}
			}
		},
		restoreSelection(){
			const selection = window.getSelection ? window.getSelection() : document.getSelection();
			selection.removeAllRanges();
			if (this.range) {
				selection.addRange(this.range);
			} else {
				const content = this.$refs.content;
				const div = document.createElement('div');
				const range = document.createRange();
				content.appendChild(div);
				range.setStart(div, 0);
				range.setEnd(div, 0);
				selection.addRange(range);
				this.range = range;
			}
		},
		execCommand(command, arg){
            this.restoreSelection()
            if (this.range) {
                new RangeHandler(this.range).execCommand(command, arg)
            }
            // this.toggleDashboard()
            // this.$emit('change', this.$refs.content.innerHTML)
        },
		activeHandler(type) {
			if (type === 'size') {
				this.execCommand('fontSize', '30px');
				this.isShowDashboard = false;
			} else if (type === 'color') {
				this.execCommand('foreColor', '#003399');
			}
		}
	}
};
</script>
<style lang="less">
	div, p, ul, li {
		padding: 0;
		margin: 0;
	}
	ul, li {
		list-style: none;
	}
	.html-editor {
		width: 400px;
		height: 400px;
		border: 1px #ddd solid;
		border-radius: 10px;
		.editor-toolbar {
			position: relative;
			width: 100%;
			height: 50px;
			border-bottom: 1px #ddd solid;
			box-sizing: border-box;
			line-height: 50px;
			text-align: left;
		}
		.editor-dashboard {
			position: absolute;
			top: 100%;
			left: 0;
			font-size: 14px;
			background: #fff;
			.select-list {
				border: 1px solid #d1dbe5;
				padding: 5px 0;
				margin-left: 0 !important;
				background-color: #fff;
				z-index: 100;
				min-width: 100%;
				box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
				.list-item {
					cursor: pointer;
				}
			}
			&.isLink {
				border-top: 1px #ddd solid;
				border-bottom: 1px #ddd solid;
				left: 1px;
			}
		}
		.editor-content {
			width: 100%;
			height: 350px;
			padding: 20px;
			box-sizing: border-box;
			text-align: left;
		}
	}
	.icon {
		margin: 0 15px;
		cursor: pointer;
	}
</style>