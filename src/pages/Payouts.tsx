import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Widget from "../components/Widget";
import PayoutsTable from "../components/PayoutsTable";
const Wrapper = styled.section`
	padding: 0rem 3rem;
`;
function Payouts() {
	return (
		<Wrapper>
			<Header />
			<Widget />
			<PayoutsTable />
		</Wrapper>
	);
}

export default Payouts;
