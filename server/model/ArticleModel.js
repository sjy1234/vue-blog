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
    }
    async deleteArticle(id) {
        return await query(escape`DELETE FROM ARTICLE WHERE id=${id}`)
    }
    async publishArticle(id) {
        return await query(escape`UPDATE ARTICLE SET publishTime=NOW(),isPublished=1 WHERE id=${id}`)
    }
    async getBookList() {
        return await query(`SELECT *FROM RD_LIST`)
    }
    async deleteBook(id) {
        return await query(escape`DELETE FROM RD_LIST WHERE id=${id}`)
    }
    async addBook({name,author,score}) {
        return await query(escape`INSERT INTO RD_LIST SET name=${name},author=${author},score=${score}`)
    }
    async editBook(id,{name,author,score}) {
        return await query(escape`UPDATE RD_LIST SET name=${name},author=${author},score=${score} WHERE id=${id}`)
    }
    
}


export default new ArticleModel()