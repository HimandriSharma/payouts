import "./App.css";
import Payouts from "./pages/Payouts";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
	return (
		<ChakraProvider>
			<Payouts />
		</ChakraProvider>
	);
}

export default App;
