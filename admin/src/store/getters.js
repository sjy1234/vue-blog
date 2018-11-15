const getters = {
    geTages:state=>{
        if (state.tags.length !== 0) {
            return state.tags.split(',')
        }
    }
}

export default getters