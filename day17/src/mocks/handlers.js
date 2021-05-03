import { rest } from "msw";

export const handlers = [
	rest.get(
		`${process.env.REACT_APP_BACKEND_API}/products/`,
		(req, res, ctx) => {
			return res(
				ctx.json([
					{
						_id: "8057",
						title: "Penguins",
						imageUrl:
							"images/71601501-8b85-4c9a-9452-dd177bf58efcpenguins.jpg",
						description: "Precious, smart and adorable penguins",
						price: 87000,
					},
					{
						_id: "8542",
						title: "Kriss Vector",
						imageUrl:
							"images/65015de1-1338-42cb-b64b-6706b6670dbavector2_landscape.jpg",
						description:
							"Sub Machine Gun with a very high rate of fire. Available in .45acp and .9mm variants",
						price: 23000,
						expiryDate: null,
					},
				])
			);
		}
	),
];
