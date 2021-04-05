const UserCard = ({ userName, profilePic, email, firstName, lastName }) => {
    return (
        <div>
            <p>{userName}</p>
            <img
                src={
                    process.env.REACT_APP_BACKEND_API +
                    "/" +
                    (profilePic ? profilePic : "images/default.jpg")
                }
                alt={userName}
                width="100px"
                height="100px"
            />
            <p>{email}</p>
            <p>{firstName}</p>
            <p>{lastName}</p>
        </div>
    );
};

export default UserCard;
