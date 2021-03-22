import { users } from "./users";

export const USER_ACTIONS = {
    UPDATE_USER: "update-user",
    DELETE_USER: "delete-user",
};

export const userReducer = (state, action) => {
    const id = action.payload.id;
    const index = users.findIndex((user) => user.id == id);
    switch (action.type) {
        case USER_ACTIONS.UPDATE_USER:
            
            let newUserData = users[index];
            newUserData.email = action.payload.email;
            newUserData.password = action.payload.password;
            newUserData.profilePic = action.payload.profilePic;

            if (index > -1) users[index] = newUserData;
            else console.error("No Such User Found");
            break;

        case USER_ACTIONS.DELETE_USER:
            if (index > -1) users.splice(index, 1);
            else console.error("No Such User Found");
            break;

        default:
            break;
    }
};
