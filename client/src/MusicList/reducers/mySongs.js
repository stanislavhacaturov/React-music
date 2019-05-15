const mySongs = (state = [], { id, text, type }) => {
    switch (type) {
        case 'ADD_MY_LIST':
            return [
                ...state, {
                    id,
                    text,
                }
            ]

        case 'REMOVE_SONG':
            return [...state].filter(song => song.id !== id);

        case 'RELOAD':
            // return [...state].filter(song => song.id === id);
            return [];

        default:
            return state;
    }
}

export default mySongs;