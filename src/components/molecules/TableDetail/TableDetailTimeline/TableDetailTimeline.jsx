import { Button, Table } from '@/components/atoms';
import moment from 'moment';
import { useMemo } from 'react';

export const TableDetailTimeline = ({ timelineData }) => {
	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Nama Program',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.program_name}</div>;
				}
			},
			{
				Header: 'Tanggal Program',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<div className="text-gray-400">
							{data?.start_date_plan ? moment(data?.start_date_plan).format('DD MMMM YYYY') : '-'}
							{' - '}
							{data?.end_date_plan ? moment(data?.end_date_plan).format('DD MMMM YYYY') : '-'}
						</div>
					);
				}
			},
			{
				Header: 'Deskripsi',
				minWidth: 150,
				accessor: 'description'
			}
		],
		[]
	);

	return <Table columns={columns} data={timelineData} />;
};

TableDetailTimeline.defaultProps = {
	timelineData: []
};
