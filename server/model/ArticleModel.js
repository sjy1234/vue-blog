import query from '../utils/query'

class ArticleModel {
    async getAllArticle() {
        return await query ("SELECT * FROM ARTICLE ORDER BY createtime DESC")
    }
}

export default new ArticleModel()