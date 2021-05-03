import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Products, { PRODUCTS_PER_PAGE } from "../components/Products";

// beforeEach( () => {});

test(`should contain ${PRODUCTS_PER_PAGE} product(s) on initial page`, async () => {
	render(
		<Router>
			<Products />
		</Router>
	);
	const productCardElements = await screen.findAllByRole("gridcell");

	expect(productCardElements).toHaveLength(PRODUCTS_PER_PAGE);
});
