import React, { ChangeEventHandler, useEffect, useState } from "react";
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
import axios from "axios";
type ResponseType = {
	dateAndTime: Date;
	status: string;
	value: string;
	username: string;
};
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
		if (e.target.value) {
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
		} else {
			getAllData();
		}
	};
	return (
		<TableContainer>
			<div style={{ width: "40%", margin: " 2rem 0" }}>
				Search by Username:{" "}
				<Input placeholder="JohnDoe4" onChange={handleChange} />
			</div>
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
					<>loading...</>
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
	);
}

export default PayoutsTable;
