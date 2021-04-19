import { Alert, AlertIcon } from "@chakra-ui/alert";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Container, HStack, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Todo from "./Todo";

const TodoContainer = () => {
	const [todos, setTodos] = useState([]);
	const [visibleTodos, setVisibleTodos] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [addText, setAddText] = useState("");

	useEffect(() => {
		// const todos = [
		// 	{ id: 1, text: "Implement search", isCompleted: false },
		// 	{ id: 2, text: "Feature: Add todos", isCompleted: false },
		// 	{ id: 3, text: "Display all todos", isCompleted: true },
		// ];
		const todos = [];
		setTodos(todos);
		return () => {
			setTodos([]);
			setSearchText("");
		};
	}, []);

	useEffect(() => {
		setVisibleTodos(todos);
		return () => {
			setVisibleTodos([]);
		};
	}, [todos]);

	const handleSearch = (event) => {
		if (event.target.value) {
			setSearchText(event.target.value);
			setVisibleTodos(
				todos.filter((todo) =>
					todo.text
						.toLowerCase()
						.includes(event.target.value.toLowerCase())
				)
			);
		} else {
			setSearchText("");
		}
	};

	const handleComplete = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isCompleted: true } : todo
			)
		);
	};

	const handleAdd = () => {
		let textToAdd = addText === "" ? searchText : addText;

		// todos are 1-indexed, hence the +1 in `id: todos.length + 1,`
		const newTodo = {
			id: todos.length + 1,
			text: textToAdd,
			isCompleted: false,
		};
		setTodos([...todos, newTodo]);
	};

	return (
		<Container py={4}>
			<InputGroup mb="4" variant="filled">
				<Input
					type="text"
					placeholder="Type here to search"
					value={searchText}
					onChange={handleSearch}
				/>
				<InputRightAddon
					children={<SearchIcon />}
					onClick={handleSearch}
					cursor="pointer"
				/>
			</InputGroup>

			<hr />

			<Box
				borderStyle="dotted"
				borderWidth="thin"
				borderRadius="lg"
				borderColor="gray.200"
				borderBottom="0"
				p="0.5"
				mt="4"
			>
				<ul>
					{todos.length !== 0 ? (
						visibleTodos.map((todo) => (
							<Todo
								id={todo.id}
								text={todo.text}
								isCompleted={todo.isCompleted}
								handleComplete={handleComplete}
								key={todo.id}
							/>
						))
					) : (
						<Alert status="warning">
							<AlertIcon />
							Please add your todos below. (Type then click add icon)
						</Alert>
					)}
				</ul>
			</Box>

			<HStack boxShadow={"md"} rounded={"lg"} padding="2" spacing="2">
				<AddIcon as="button" cursor="pointer" onClick={handleAdd} />
				{searchText === "" ? (
					<Input
						type="text"
						variant="unstyled"
						placeholder="Type your todo here and click add"
						value={addText}
						onChange={(event) => setAddText(event.target.value)}
					/>
				) : (
					<Text> {searchText} </Text>
				)}
			</HStack>
		</Container>
	);
};

export default TodoContainer;
