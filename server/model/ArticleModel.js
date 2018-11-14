import query from '../utils/query'

class ArticleModel {
    async getAllArticles() {
        return await query ("SELECT * FROM ARTICLE ORDER BY createtime DESC")
    }
}

export default new ArticleModel()