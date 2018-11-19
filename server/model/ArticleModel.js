import query from '../utils/query'
import escape from '../utils/escape'
class ArticleModel {
    async getAllArticle() {
        return await query ("SELECT * FROM ARTICLE ORDER BY createtime DESC")
    }
    async addArticle() {
        return await query(`INSERT INTO ARTICLE SET title='新文章',tags='',createTime=NOW(),publishTime=NOW(),content=''`)
    }
    async getOneArticle(id) {
        return await query(`SELECT * FROM ARTICLE WHERE id='${id}'`)
    }
    async updatedArticle(id,{title,tags,content,isPublished}){
        return await query(escape`UPDATE ARTICLE SET title=${title},tags=${tags},content=${content} WHERE id=${id}`)
        // return await query(escape`DELETE FROM ARTICLE WHERE id=${id}`)
    }
}

export default new ArticleModel()