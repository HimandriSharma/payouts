import React, { useEffect, useState } from "react";
import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Tbody,
	Td,
	Th,
	Tag,
	useToast,
	Input,
} from "@chakra-ui/react";
import { Grid } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
type ResponseType = {
	dateAndTime: Date;
	status: string;
	value: string;
	username: string;
};
const Wrapper = styled.div`
	width: 100%;
	margin: 2rem 0;
	display: flex;
	align-items: center;
`;
const SearchText = styled.h2`
	display: flex;
	margin: 0 1rem;
`;
function PayoutsTable() {
	const [isLoading, setIsLoading] = useState(true);
	const [tableData, setTableData] = useState<ResponseType[] | null>(null);
	
	const toast = useToast();
	const getAllData = () => {
		axios
			.get(
				"https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts"
			)
			.then((data) => {
				setTableData(data.data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				toast({
					title: err.name,
					description: err.message,
					status: "error",
					duration: 2000,
					isClosable: true,
					position: "top-right",
				});
			});
	};
	useEffect(() => {
		getAllData();
	}, []);
	const handleChange = (e: any) => {
		setIsLoading(true);
		if (e.target.value.trim()) {
			setTimeout(() => {
				axios
					.get(
						`https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/search?query=${e.target.value}`
					)
					.then((data) => {
						setTableData(data.data);
						setIsLoading(false);
					})
					.catch((err) => {
						toast({
							title: err.name,
							description: err.message,
							status: "error",
							duration: 2000,
							isClosable: true,
							position: "top-right",
						});
					});
			}, 1000);
		} else {
			getAllData();
		}
	};
	return (
		<>
			<Wrapper>
				<SearchText>Search by Username: </SearchText>
				<Input placeholder="JohnDoe4" onChange={handleChange} width={"60%"} />
			</Wrapper>
			<TableContainer>
				<Table variant="striped" colorScheme="gray">
					<Thead>
						<Tr>
							<Th>Username</Th>
							<Th>Date & Time</Th>
							<Th>Status</Th>
							<Th>Value</Th>
						</Tr>
					</Thead>
					{isLoading ? (
						<Wrapper>
							<Grid
								height="80"
								width="80"
								color="#999dff"
								ariaLabel="grid-loading"
								radius="12.5"
								wrapperStyle={{}}
								wrapperClass=""
								visible={true}
							/>
						</Wrapper>
					) : (
						<Tbody>
							{tableData?.length === 0 ? (
								<>No Results Found</>
							) : (
								tableData?.map((entry, idx) => (
									<Tr key={idx}>
										<Td>{entry.username}</Td>
										<Td>{new Date(entry.dateAndTime).toDateString()}</Td>
										<Td>
											<Tag
												size={"lg"}
												borderRadius="full"
												variant="solid"
												colorScheme={
													entry.status === "Pending" ? "gray" : "green"
												}
											>
												{entry.status === "Pending" ? "Pending" : "Paid"}
											</Tag>
										</Td>
										<Td>{entry.value}</Td>
									</Tr>
								))
							)}
						</Tbody>
					)}
				</Table>
			</TableContainer>
			
		</>
	);
}

export default PayoutsTable;
