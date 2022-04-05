import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useState } from "react";

function App() {
	const [toogleFlag, setToogleFlag] = useState(true);
	const toogle = () => {
		setToogleFlag(!toogleFlag);
	};
	return (
		<>
			<button className="btn btn-success my-3 toogle" onClick={toogle}>
				toogle
			</button>
			{toogleFlag ? <Login></Login> : <Register></Register>}
		</>
	);
}

export default App;
