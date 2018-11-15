import Article from '../model/ArticleModel'

class ArticleController {
    async getArticles(ctx){
        ctx.body = await Article.getAllArticle()
        // ctx.body = data
    }
    async addArticle(ctx) {
        // 这里写添加文章的方法
        const res = await Article.addArticle()
        ctx.body = res
    }
    async getOneArticle(ctx) {
        const res = await Article.getOneArticle(ctx.params.id)
    }
}
export default new ArticleController()