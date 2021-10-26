const tokenReducer = (state = null, action: any) => {
    switch (action.type) {
        case 'token':
            return action.value
            break;

        default:
            return state
            break;
    }
}

export default tokenReducer