/**
 * @author
 * @file briefs的model
 */

import query from '../utils/query'
import escape from '../utils/escape'

class Briefs {
    async getBrief() {
        return await query(`SELECT * FROM ABOUT`)
    }

    async updateAbout(content) {
        return await query(escape`UPDATE ABOUT SET content=${content}`)
    }
}

export default new Briefs()
