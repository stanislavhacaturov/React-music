const users = (state = [], { id, name, lastname, email, password, type }) => {
    switch (type) {
        case 'USER':
            return [
                ...state, {
                    id,
                    name,
                    lastname,
                    email,
                    password
                }
            ]
        default:
            return state;
    }
}

export default users;