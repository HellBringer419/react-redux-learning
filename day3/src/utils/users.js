// users:
// fetch('https://randomuser.me/api').then(res => res.json()).then(data => { let user = data.results[0]; console.log({ name: user.name.first, email: user.email, gender: user.gender,  password: user.login.password})});

const users = [
    {
        id: 1,
        profilePic: "link",
        name: "Amna",
        email: "amna.gjerstad@example.com",
        gender: "female",
        password: "luther",
    },
    {
        id: 2,
        profilePic: "link",
        name: "Donato",
        email: "donato.gautier@example.com",
        gender: "male",
        password: "stang",
    },
    {
        id: 3,
        profilePic: "link",
        name: "Tibério",
        email: "tiberio.ribeiro@example.com",
        gender: "male",
        password: "alpha",
    },
    {
        id: 4,
        profilePic: "link",
        name: "Nelson",
        email: "nelson.price@example.com",
        gender: "male",
        password: "sheriff",
    },
];

export { users };