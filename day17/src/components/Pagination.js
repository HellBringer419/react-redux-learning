import { Tab } from "@chakra-ui/tabs";
import { TabList } from "@chakra-ui/tabs";
import { Tabs } from "@chakra-ui/tabs";

const Pagination = ({ itemsPerPage, totalItems, handlePaginate }) => {
	const pageNumbers = [];

	for (
		let number = 1;
		number <= Math.ceil(totalItems / itemsPerPage);
		number++
	) {
		pageNumbers.push(number);
	}

	return (
		<div>
			<Tabs isFitted variant="soft-rounded">
				<TabList>
					{pageNumbers.map((number) => (
						<Tab
							key={number}
							onClick={() => handlePaginate(number)}
							onFocus={() => handlePaginate(number)}
						>
							{number}
						</Tab>
					))}
				</TabList>
			</Tabs>
		</div>
	);
};

export default Pagination;

// COMPLEX but short Implementaions of pageNumbers[]
// // fill out pg numbers as [1, 2, ..., totalNofPages]
// // then, totalNofPages = Math.ceil(totalItems / itemsPerPage)
// const pageNumbers = Array.from(
// 	Array(Math.ceil(totalItems / itemsPerPage)).keys()
// ).map((number) => number + 1);
