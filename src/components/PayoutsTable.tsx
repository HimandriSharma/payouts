import React, { useEffect, useState } from "react";
import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Tbody,
	Td,
	Th,
	useToast,
	Input,
} from "@chakra-ui/react";
import { Grid } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
import Tag from "./Tag";
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
const TableHeader = styled.div`
	text-transform: capitalize;
	font-size: 0.8rem;
	font-weight: 500;
	color: #6f767e;
`;
const DateText = styled.div`
	text-transform: capitalize;
	font-size: 1rem;
	font-weight: 500;
	color: #6f767e;
`;
const SearchText = styled.h2`
	display: flex;
	margin: 0 1rem;
`;
const ValueText = styled.h2`
	font-weight: 600;
	color: #1a1d1f;
	font-size: 1rem;
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
	function convertIsoToCustomFormat(isoDateString: Date) {
		const options: Intl.DateTimeFormatOptions = {
			weekday: "short",
			day: "numeric",
			month: "short",
			hour: "numeric",
			minute: "numeric",
			hour12: false,
		};

		const date = new Date(isoDateString);
		const formattedDate = date.toLocaleString("en-US", options);

		return formattedDate;
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
							<Th>
								<TableHeader>Username</TableHeader>
							</Th>
							<Th>
								<TableHeader>Date & Time</TableHeader>
							</Th>
							<Th>
								<TableHeader>Status</TableHeader>
							</Th>
							<Th>
								<TableHeader>Value</TableHeader>
							</Th>
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
										<Td>
											<DateText>
												{convertIsoToCustomFormat(entry.dateAndTime)}
											</DateText>
										</Td>
										<Td>
											<Tag status={entry.status} />
										</Td>
										<Td>
											<ValueText>{entry.value}</ValueText>
										</Td>
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
