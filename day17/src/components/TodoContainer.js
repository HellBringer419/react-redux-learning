import { Alert, AlertIcon } from "@chakra-ui/alert";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Container } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Todo from "./Todo";

const TodoContainer = () => {
	const [todos, setTodos] = useState([]);
    const [visibleTodos, setVisibleTodos] = useState([]);
    const [searchText, setSearchText] = useState("");

	useEffect(() => {
		const todos = [
			{ id: 1, text: "Implement search", isCompleted: false },
			{ id: 2, text: "Feature: Add todos", isCompleted: false },
			{ id: 3, text: "Display all todos", isCompleted: true },
		];
		setTodos(todos);
		return () => {
            setTodos([]);
            setSearchText("")
		};
	}, []);

	useEffect(() => {
		setVisibleTodos(todos);
		return () => {
			setVisibleTodos([]);
		};
    }, [todos]);
    
    const handleSearch = (event) => {
        setSearchText(event.target.value);

        // TODO: do the actual search
        setVisibleTodos(todos.filter((todo) => todo.text.includes(event.target.value)));
    }

	const handleComplete = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isCompleted: true } : todo
			)
		);
	};

	return (
		<Container py={4}>
			<InputGroup mb="4">
				<Input
					type="text"
					placeholder="Type here to search"
					value={searchText}
					onChange={handleSearch}
				/>
				<InputRightAddon
					children={<SearchIcon />}
					onClick={handleSearch}
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
						<Alert status="error">
							<AlertIcon />
							There was an error processing your request
						</Alert>
					)}
				</ul>
			</Box>
		</Container>
	);
};

export default TodoContainer;
