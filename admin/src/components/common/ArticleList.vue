<template>
  <div>
    
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "ArticleList",
  data() {
    return {
      articleList: []
    };
  },
  methods:{
    
  },
  // 当组件创建的时候自动执行里面的请求
  created() {
    request({
      url: "/articles",
      method: "post"
    })
      .then(res => {
        this.articleList.push(...res);
        console.log(this.articleList)
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang='' scoped>
</style>