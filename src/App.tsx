import "./App.css";
import Payouts from "./pages/Payouts";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function App() {
	const customTheme = extendTheme({
		components: {
			Table: {
				variants: {
					mytable: {
						tr: {
							_odd: {
								background: "#F4F4F480",
							},
						},
					},
				},
			},
		},
	});
	return (
		<ChakraProvider theme={customTheme}>
			<Payouts />
		</ChakraProvider>
	);
}

export default App;
