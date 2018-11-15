import Article from '../model/ArticleModel'

class ArticleController {
    async getArticles(ctx){
        console.log(1)
        ctx.body = await Article.getAllArticle()
        // ctx.body = data
    }
}
export default new ArticleController()