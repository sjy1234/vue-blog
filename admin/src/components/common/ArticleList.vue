<template>
    <ul class="list">
        <!-- :class 动态绑定class类 它支持对象方法，当对象改变时类名也随之改变 -->
        <li class="article" :class="{ active: activeIndex === index, published: isPublished === 1}" v-for="({title, createTime, isPublished, isChosen},index) in articleList" :key="index" @click="select(index)" v-if="isChosen">
            <header>{{ title }}</header>
            <p>{{ createTime }}</p>
        </li>
    </ul>
</template>

<script>
import request from "@/utils/request";
import moment from "moment";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [],
      activeIndex: -1
    };
  },

  // 把全局的vuex里面的state和mutations放到计算属性中...
  computed: {
    ...mapState(["id", "title", "tags", "content", "isPublished"])
  },
  // 当组件创建的时候自动执行里面的请求
  created() {
    request({
      url: "/articles",
      method: "get"
    })
      .then(res => {
        for (let article of res) {
          article.createTime = moment(article.createTime).format(
            "YYYY年-MM月-DD日 HH-mm-ss"
          );
          article.isChosen = true;
        }
        this.articleList.push(...res);
        // 如果查询出文章，则将第一篇文章作为正在编辑的文章
        if (this.articleList.length !== 0) {
          this.SET_CURRENT_ARTICLE(this.articleList[0]);
          this.activeIndex = 0;
        }
        // console.log(this.articleList)
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    updateList(updateId) {
      request({
        method: "get",
        url: `/articles/${updateId}`
      })
        .then(res => {
          console.log(res);
          const article = res[0];
          article.createTime = moment(article.createTime).format(
            "YYYY年-MM月-DD日 HH-mm-ss"
          );
          article.isChosen = true;
          this.articleList.unshift(article);
          console.log(this.articleList);
          // 如果发布新文章的话，当前被选中的文章
          this.activeIndex++;
        })
        .catch(err => {
          console.log(err);
        });
    },
    select(index) {
      this.activeIndex = index;
      // 当你选择文章的时候，当前被选中的文章扔到全局状态管理里面
      this.SET_CURRENT_ARTICLE(this.articleList[index]);
    },
    ...mapMutations(["SET_CURRENT_ARTICLE"])
  },
  watch: {
    title(val) {
      if (this.articleList.length !== 0) {
        this.articleList[this.activeIndex].title = val;
      }
    },
    tags(val) {
      if (this.articleList.length !== 0) {
        this.articleList[this.activeIndex].tags = val;
      }
    },
    content(val) {
      if (this.articleList.length !== 0) {
        this.articleList[this.activeIndex].content = val;
      }
    },
    isPublished(val) {
      if (this.articleList.length !== 0) {
        this.articleList[this.activeIndex].isPublished = val;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/_variable.scss";
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