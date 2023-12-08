import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
	display: flex;
	align-items: center;
	color: #1a1d1f;

	width: fit-content;
	font-weight: 500;
`;
const GreenBg = styled.div`
	background-color: #60ca57;
	padding: 0.4rem;
	border-radius: 5px;
`;
const GrayBg = styled.div`
	background-color: #6f767e66;
	padding: 0.4rem;
	border-radius: 5px;
`;
type PropType = {
	status: string;
};
function PendingTag() {
	return (
		<Wrapper>
			<GrayBg>Pending</GrayBg>
		</Wrapper>
	);
}
function PaidTag() {
	return (
		<Wrapper>
			<GreenBg>Paid</GreenBg>
		</Wrapper>
	);
}
function Tag({ status }: PropType) {
	return status === "Pending" ? <PendingTag /> : <PaidTag />;
}

export default Tag;
