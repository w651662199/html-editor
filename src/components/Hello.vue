<template>
  <div>
    <m-editor v-model="text"></m-editor>
    <m-editor v-model="text"></m-editor>
  </div>
</template>

<script>
import Vue from 'vue';
import List from '../utils/data.js';
import Editor from './Editor/index.vue';
import VueHtml5Editor  from './htmlEditor/index.js';
// Vue.use(VueHtml5Editor);
// const HtmlEditor = new VueHtml5Editor();
export default {
  name: 'hello',
  data () {
    return {
      text: 'hello,world',
      list: List,
      scheduleList: []
    }
  },
  components: {
    'm-editor': Editor
    // 'vue-html': HtmlEditor
  },
  created() {
  },
  methods: {
    clickHandler(e) {
      console.log(e.target);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.element-width(@n, @i: 10) when (@i =< @n) {
  .w@{i} {
    width: unit(@i, px);
  }
  .element-width(@n, (@i + 10));
}

.element-width(300);
.hello{
  width: 100%;
  margin: 0 auto;
  overflow: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #f0f3f6;
  table-layout: fixed;
  border-spacing: 0;
  vertical-align: middle;
}
.table tr th, .table tr td {
  padding: 0;
  margin: 0;
  border-collapse: collapse;
  border: 1px solid #e1e3e6;
  color: #23272c;
  vertical-align: middle;
}
.table tr th {
  background: #f0f3f6;
  color: #596069;
  font-weight: normal;
}
.table tr th span, .table tr td span {
  display: block;
  text-align: center;
  line-height: 20px;
  padding: 6px 0px;
  margin: 0px 4px;
  font-size: 14px;
}
table i {
  font-style: normal;
}
ul, li {
  list-style: none;
}

li {
  float: left;
}
</style>
