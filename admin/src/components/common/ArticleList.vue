<template>
    <ul class="list">
        <!-- :class 动态绑定class类 它支持对象方法，当对象改变时类名也随之改变 -->
        <li class="article" :class="{active: activeIndex === index, published: isPublished === 1}" v-for="{title, createTime, isPublished, isChosen},index in articleList" @click="select(index)" v-if="isChosen">

            <header>{{ title }}</header>
            <p>{{ createTime }}</p>
        </li>
    </ul>
</template>

<script>
import request from "@/utils/request";
import moment from 'moment'
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
      method: "get"
    })
      .then(res => {
        for (let article of res) {
          article.createTime = moment(article.createTime).format('YYYY年-MM月-DD日 HH-mm-ss')
          article.isChosen = true
        }
        this.articleList.push(...res);
        console.log(this.articleList)
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/style/_variable.scss';
.article {
    @include flex($flow: column wrap, $align: flex-start);
    padding: 0.2em 0.5em;
    margin-bottom: 1.5em;
    height: 5em;
    max-width: 100%;
    background: $white;
    border: 0.1em solid $special;
    cursor: pointer;
    header {
        max-width: 100%;
        font-size: 1.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.2em;
    }
    p {
        margin: 0;
        color: $special;
    }
    &:last-child {
        margin-bottom: 0;
    }
}

.active {
    border: 1px solid $base;
}

.published {
    border-right: 4px solid $base;
}
</style>