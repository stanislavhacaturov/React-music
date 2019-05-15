const songs = (state = [], { id, text, type }) => {
    switch (type) {
        case 'ADD_LIST':
            return [
                ...state, {
                    id,
                    text,
                }
            ]
        default:
            return state;
    }
}

export default songs;