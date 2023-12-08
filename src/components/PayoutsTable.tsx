import React from "react";
import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Tbody,
	Td,
	Th,
	Tag,
} from "@chakra-ui/react";
function PayoutsTable() {
	return (
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
				<Tbody>
					<Tr>
						<Td>inches</Td>
						<Td>inches</Td>
						<Td>
							<Tag
								size={"lg"}
								borderRadius="full"
								variant="solid"
								colorScheme="gray"
							>
								Paid
							</Tag>
						</Td>
						<Td>25.4</Td>
					</Tr>
					<Tr>
						<Td>inches</Td>
						<Td>feet</Td>
						<Td>centimetres (cm)</Td>
						<Td>30.48</Td>
					</Tr>
					<Tr>
						<Td>inches</Td>
						<Td>yards</Td>
						<Td>metres (m)</Td>
						<Td>0.91444</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
}

export default PayoutsTable;
