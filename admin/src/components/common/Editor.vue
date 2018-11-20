<template>
  <div class="editor">
    <input type="text" class="title" id="title" v-model="title" @input="autosave">
    <div class="operate-bar">
      <section class="tag-container">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tag"></use>
        </svg>
        <ul class="tags">
          <li class="tag" v-for="(tag,index) in getTags" :key="index">
            {{tag}}
            <sup @click="deleteTag(index)">x</sup>
          </li>
        </ul>
        <input type="text" class="tag-input" id="tag-input" v-if="showTags"  @keydown.enter="addTag">
        <span class="tag-add" v-else @click="addTag">+</span>
      </section>
      <section class="btn-container">
        <button id="delete" @click="deleteArticle" class="delete">删除文章</button>
        <button id="submit" @click="publishArticle" class="not-del">发布文章</button>
      </section>
    </div>
    <p class="tips">标签查询页面只能批量更改标签，修改的文章内容会自动保存</p>
    <div class="content">
      <textarea></textarea>
    </div>
  </div>

</template>
``
<script>
/**
 * @author
 * @file SimpleMDE组件
 * */

import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";
import { mapState, mapGetters } from "vuex";
// 引入debounce方法
import debounce from "lodash.debounce";
// 发请求 
import request from '@/utils/request'

export default {
  name: "Editor",
  data() {
    return {
      simplemde: "", //编辑器
      showTags: false
    };
  },
  computed: {
    ...mapState(["id", "tags", "content", "isPublished",]),
    ...mapGetters(["getTags"]),
    //因为这个title是数据双向绑定的，因此，他可能会被改变，如果我们直接从mapstate中国读取它的话，
    //那么如果直接改变title的话，又因为他没有setter方法，就会导致无法直接改变state中的title
    title: {
      //获取title
      get() {
        return this.$store.state.title;
      },
      //设置title
      set(value) {
        this.$store.commit("SET_TITLE", value);
      }
    }
  },
  //生命周期，组件挂载完毕之后会执行一次，数据变化的时候不会执行，所以我们要监听（watch）某个值的变化
  mounted() {
    // 实例化一个对象赋值给this.simplemde
    this.simplemde = new SimpleMDE({
      placeholder: "Talk to me , what are you say……",
      spellchecker: false,
      toolbarTips: false
    });
    //将vue里面正在编辑的文章的相关信息输出到编译器里面
    this.simplemde.value(this.content);
    //  绑定编辑器的按键事件以及复制粘贴的时间的发生
    this.simplemde.codemirror.on("keyHandler", () => this.autosave());
    this.simplemde.codemirror.on("inputRead", () => this.autosave());
  },
  //监控ID值的变化，如果一旦发生变化，就直接将内容变化
  watch: {
    id(newVal, oldVal) {
      this.simplemde.value(this.content);
    }
  },
  methods: {
    autosave: debounce(function() {
      if (this.id) {
        // savearticle要发请求，是异步的，mutations只能放同步，但是actions可以,所以saveArticle方法要写在actions里面
        this.$store.dispatch("saveArticle", {
          id: this.id,
          tags: this.getTags.join(","),
          title: this.title,

          //输入的新内容
          content: this.simplemde.value(),
          isPublished: this.isPublished
        });
      }
    }, 1000),
    //  删除标签deleTag
    deleteTag(index) {
      this.getTags.splice(index, 1);
      this.autosave();
    },
    // 添加标签
    addTag() {
      // input 显示的时候，会执行下面代码
      if (this.showTags) {
        const newTag = document.querySelector("#tag-input").value;
          this.getTags.push(newTag);
          // 每次按下enter键
          this.autosave();
        // if (newTag && this.tags.indexOf(newTag) !== -1) {
        // }
      }
      // 这只是一个单纯的切换功能，第一次点击加的时候显示input表单，第二次在input表单中输入内容隐藏
      this.showTags = !this.showTags;
    },
    // 删除文章
    deleteArticle() {
      request({
        url:`/articles/${this.id}`,
        method:"delete",
        data:{}
      }).then(res=>{
        console.log(res)
        // 删除之后，要跟新视图，让视图中的文章也跟着一起删除
        this.$store.commit('SET_DELETE_ARTICLE')
      }).catch(err=>{
        console.log(err)
      })
    },
    // 发布文章
    publishArticle() {
      if (!this.isPublished) {
        request({
          url:`/articles/publish/${this.id}`,
          method:"put",
          data:{}
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped type="text/scss">
/*<!--记得引入全局变量的样式-->*/
@import "../../assets/style/_variable.scss";
.title {
  margin-bottom: 0.3em;
  width: 100%;
  height: 2em;
  border: none;
  font-size: 2.4rem;
  color: $title;
  outline: none;
  border-bottom: 1px solid $special;
  background: none;
  text-align: center;
}
.operate-bar {
  @include flex($justify: space-between);
  height: 4em;
  font-size: 1.3rem;
  margin-bottom: 1em;
  .tag-container {
    @include flex($justify: flex-start);
    .icon {
      width: 1.5em;
      height: 1.5em;
      margin-right: 10px;
    }
    .tags {
      @include flex;
      list-style: none;
      margin-right: 10px;
      padding: 0;
      .tag {
        margin-right: 10px;
        color: $base;
        position: relative;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .tag-add {
      font: {
        weight: 600;
        size: 1.6rem;
      }
      color: $special;
      /*text-decoration: underline;*/
      cursor: pointer;
    }
  }
}
.tips {
  color: $quote;
  text-align: center;
}
.content {
  font-size: 2rem;
  font-weight: bolder;
}
/deep/ .CodeMirror .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word){
  background-color: #ffffff;
}
</style>