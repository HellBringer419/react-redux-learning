import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Products, { PRODUCTS_PER_PAGE } from "../components/Products";

beforeEach(() => {
	render(
		<Router>
			<Products />
		</Router>
	);
});

test(`should contain ${PRODUCTS_PER_PAGE} product(s) on initial page`, async () => {
	const productCardElements = await screen.findAllByRole("gridcell");
	expect(productCardElements).toHaveLength(PRODUCTS_PER_PAGE);
});

test("should have pagination on the document", async () => {
	const paginationContainer = await screen.findByRole("tablist");
	expect(paginationContainer).toBeInTheDocument();
});

test(`should have ${2 / PRODUCTS_PER_PAGE} pages to paginate`, async () => {
	const paginationButtons = await screen.findAllByRole("tab");
	expect(paginationButtons).toHaveLength(2 / PRODUCTS_PER_PAGE);
});
