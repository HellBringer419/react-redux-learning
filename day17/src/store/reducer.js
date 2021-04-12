export const ACTIONS = {
	LOGIN: "login",
	LOGOUT: "logout",
};

const initialState = {
	currentUser: {
		id: 0,
		token: "DUMMY",
	},
};

const reducer = (state = initialState, actions) => {
	switch (actions.type) {
		case ACTIONS.LOGIN:
			return {
				...state,
				currentUser: actions.payload,
			};

		case ACTIONS.LOGOUT:
			return {
				...state,
				currentUser: initialState.currentUser,
			};

		default:
			break;
	}
	return state;
};

export default reducer;
