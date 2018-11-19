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
        console.log(res)
        ctx.body = res
    }
    async updatedArticle(ctx) {
        const id = ctx.params.id
        const res = await Article.updatedArticle(id,ctx.request.body)
        ctx.body = res
    }
}
export default new ArticleController()