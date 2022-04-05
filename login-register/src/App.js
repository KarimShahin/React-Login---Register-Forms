import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useState } from "react";

function App() {
	const [toggleFlag, setToggleFlag] = useState(true);
	const toggle = () => {
		setToggleFlag(!toggleFlag);
	};
	return (
		<>
			<button className="btn btn-success my-3 toogle" onClick={toggle}>
				toggle
			</button>
			{toggleFlag ? <Login></Login> : <Register></Register>}
		</>
	);
}

export default App;
