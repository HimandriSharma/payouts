import React from "react";
import styled from "styled-components";
const Marker = styled.div`
	background-color: #999dff;
	height: 2.5rem;
	width: 1.3rem;
	border-radius: 4px;
`;
const Wrapper = styled.div`
	display: flex;
    align-items: center;
`;
const Text = styled.h2`
	display: flex;
    margin: 1rem;
`;
function Widget() {
	return (
		<Wrapper>
			<Marker />
			<Text>Payout History</Text>
		</Wrapper>
	);
}

export default Widget;
