import { InputError, InputLabel, InputSelectAsync } from '@/components/atoms';
import { usePartnerStore } from '@/store';
import React, { useState, forwardRef, useEffect } from 'react';

export const InputSelectStaffAsync = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, label, ...props }, ref) => {
		const { staffList, fetchingStaffList, getStaffList } = usePartnerStore();

		const [options, setOptions] = useState([]);

		const handleLoadOptions = async (search, prevOptions) => {
			const { success, payload } = await getStaffList({
				limit: 10,
				offset: prevOptions.length,
				...(search && { keyword: search }),
				...params
			});

			const mapStaff = success
				? payload.items.map((staff) => ({
						label: `${staff.nik_number} - ${staff.name}`,
						value: staff.id,
						data: staff
				  }))
				: [];

			return {
				options: mapStaff,
				hasMore: prevOptions.length + mapStaff.length < payload.total
			};
		};

		useEffect(() => {
			if (staffList?.total > 0) {
				const mapStaff = staffList.items.map((staff) => ({
					label: `${staff.nik_number} - ${staff.name}`,
					value: staff.id,
					data: staff
				}));
				const newOptions = options.filter((option) => !mapStaff.find((staff) => staff.value === option.value));
				setOptions([...mapStaff, ...newOptions]);
			}
		}, [staffList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text={label || 'Pilih PJ Internal DC'} name={props.name} />}
				<InputSelectAsync
					innerRef={ref}
					options={options}
					loadOptions={handleLoadOptions}
					onChange={onChange}
					loading={fetchingStaffList}
					disabled={fetchingStaffList}
					placeholder={placeholder || 'Pilih PJ Internal DC'}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectStaffAsync.displayName = 'InputSelectStaffAsync';
InputSelectStaffAsync.defaultProps = {
	name: 'institusi',
	containerClassName: '',
	showLabel: true
};
