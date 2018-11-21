/**
 * @author
 * @file 关于个人简介的controller
 */

import Brief from '../model/Briefs'

class BriefControllers {
    async getBrief(ctx) {
        ctx.body = await Brief.getBrief()
    }

    async updateAbout(ctx) {
        // const id = ctx.params.id
        const content = await Brief.updateAbout(ctx.request.body.content)
        ctx.body = content;
        // console.log(content)
    }
}

export default new BriefControllers()
