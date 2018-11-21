<template>
<div style="height:100%">
      <header-nav></header-nav>
      <Aside></Aside>
  <div class="about-container main" >
    <h2>关于我 /
        <span>ABOUT ME</span>
    </h2>
    <hr>
    <main>
        <textarea></textarea>
        <section class="btn-container">
            <button class="not-del" @click="updateAbout">提交修改</button>
        </section>
    </main>
  </div>
  </div>
</template>

<script>
// 引入SimpleMDE编辑器
import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";
// 引入第三方字体库和css框架
import "font-awesome/css/font-awesome.min.css";
// 引入HeaderNav 是头部登出  SideNav 是侧边导航栏
import Aside from "@/components/common/Aside";
import HeaderNav from "@/components/common/HeaderNav";
// 引入request
import request from "@/utils/request";
import { updateLocale } from "moment";
export default {
  name: "About",
  data() {
    return {
      id: "",
      simplemde: ""
    };
  },
  components:{
    HeaderNav,
    Aside
  },
  mounted() {
    this.simplemde = new SimpleMDE({
      // 这是上面字体库的代码
      autoDownloadFontAwesome: false,
      spellChecker: false
    });
    request({
      url: "/briefs",
      method: "post",
      data:{}
    })
      .then(res => {
        // console.log(1);
        // this.id = res.data[0].id;
        this.simplemde.value(res[0].content);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //   当点击修改时
    updateAbout() {
      request({
        url: "/about",
        method: "post",
        data:{ 
          content:this.simplemde.value()
          }
      }).then(res => {
          console.log(res)
        })
        .catch(err => {
          alert(err);
        });
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/_variable.scss";

main {
  height: calc(100% - 48px);
  padding: 0.5em 0;
  overflow: auto;
  font-size: 1.6rem;
}

.btn-container {
  @include flex($justify: flex-end);
}
</style>