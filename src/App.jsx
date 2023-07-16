import { useState } from "react";
import Form from "./Form";
import Items from "./Items";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";

//long solution for local storage
const getLocalStorage = () => {
	let list = localStorage.getItem("list");
	if (list) {
		list = JSON.parse(localStorage.getItem("list"));
	} else {
		list = [];
	}
	return list;
};

//short solution
const defaultList = JSON.parse(localStorage.getItem("list") || "[]");

const setLocalStorage = (items) => {
	localStorage.setItem("list", JSON.stringify(items));
};

const App = () => {
	const [items, setItems] = useState(defaultList);

	const addItem = (itemName) => {
		const newItem = {
			name: itemName,
			completed: false,
			id: nanoid(),
		};

		const newItems = [...items, newItem];
		setItems(newItems);
		setLocalStorage(newItems);
		toast.success("Item successfully added");
	};

	const removeItem = (itemId) => {
		const newItems = items.filter((item) => item.id !== itemId);
		setItems(newItems);
		setLocalStorage(newItems);
		toast.success("Item successfully deleted");
	};

	const editItem = (itemId) => {
		const newItems = items.map((item) => {
			if (item.id == itemId) {
				const newItem = { ...item, completed: !item.completed };
				return newItem;
			}
			return item;
		});
		setItems(newItems);
		setLocalStorage(newItems);
	};

	return (
		<section className="section-center">
			<Form addItem={addItem} />
			<Items items={items} removeItem={removeItem} editItem={editItem} />
			<ToastContainer position="top-center" />
		</section>
	);
};

export default App;
