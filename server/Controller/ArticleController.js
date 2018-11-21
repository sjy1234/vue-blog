import Article from '../model/ArticleModel'
// import Brief from '../model/Briefs'
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
    async deleteArticle(ctx) {
        const id = ctx.params.id
        const res = await Article.deleteArticle(id)
        ctx.body = res
    }
    async publishArticle(ctx) {
        const id = ctx.params.id
        const res = await Article.publishArticle(id)
        ctx.body = res
    }
    async getBookList(ctx) {
        ctx.body = await Article.getBookList()
    }
    async deleteBook(ctx) {
        const id = ctx.params.id
        ctx.body = await Article.deleteBook(id)
    }
    async addBook(ctx) {
        const book = ctx.request.body
        ctx.body = await Article.addBook(book)
    }
    async editBook(ctx) {
        const id = ctx.params.id
        const book = ctx.request.body
        ctx.body = await Article.editBook(id,book)
    }

}

export default new ArticleController()