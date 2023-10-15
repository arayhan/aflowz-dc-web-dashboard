import { Button, InputText } from '@/components/atoms';
import { useTPSStore } from '@/store';
import { formTPSSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { InputSelectVillage } from '../../InputSelect/InputSelectVillage/InputSelectVillage';
import { InputSelectPeriode } from '../../InputSelect/InputSelectPeriode/InputSelectPeriode';

export const FormTPS = () => {
	const { TPSID } = useParams();
	const navigate = useNavigate();

	const { TPS, fetchingTPS, processingCreateTPS, TPSErrors } = useTPSStore();
	const { getTPSItem, createTPS, updateTPS, clearStateTPS } = useTPSStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formTPSSchema),
		defaultValues: {
			name: '',
			periode: undefined,
			contact: '',
			total_target_voters: undefined,
			total_dc_voters: undefined,
			total_legitimate_vote: undefined,
			total_invalid_vote: undefined,
			village_id: undefined,
			witness_staff_ids: [],
			volunteer_staff_ids: []
		}
	});

	const onSubmitTPS = (values) => {
		if (TPSID) {
			updateTPS(TPSID, values, ({ success }) => {
				if (success) navigate('/tps', { replace: true });
			});
		} else {
			createTPS(values, ({ success }) => {
				if (success) navigate('/tps', { replace: true });
			});
		}
	};

	useEffect(() => {
		if (TPSID) getTPSItem(TPSID);
	}, [TPSID]);

	useEffect(() => {
		if (TPSID && TPS) {
			setValue('name', TPS.name || '');
			setValue('periode', TPS.periode ? Number(TPS.periode) : null);
			setValue('contact', TPS?.contact || '');
			setValue('total_target_voters', TPS?.total_target_voters ? Number(TPS?.total_target_voters) : undefined);
			setValue('total_dc_voters', TPS?.total_dc_voters ? Number(TPS?.total_dc_voters) : undefined);
			setValue('total_legitimate_vote', TPS?.total_legitimate_vote ? Number(TPS?.total_legitimate_vote) : undefined);
			setValue('total_invalid_vote', TPS?.total_invalid_vote ? Number(TPS?.total_invalid_vote) : undefined);
			setValue('village_id', TPS?.village?.id || null);
			setValue(
				'witness_staff_ids',
				TPS?.witness_staff_ids
					? TPS?.witness_staff_ids.map((witness) => ({ value: witness.id, label: witness.name }))
					: []
			);
			setValue(
				'volunteer_staff_ids',
				TPS?.volunteer_staff_ids
					? TPS?.volunteer_staff_ids.map((volunteerStaff) => ({ value: volunteerStaff.id, label: volunteerStaff.name }))
					: []
			);
		}
	}, [TPSID, TPS]);

	useEffect(() => () => clearStateTPS(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{TPSID ? 'Edit' : 'Tambah'} TPS</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama TPS"
							placeholder="Nama TPS"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'periode'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectPeriode
							{...field}
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							onChange={({ value }) => {
								setValue('periode', value);
								setError('periode', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'contact'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Kontak"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'total_target_voters'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							type="number"
							label="Total Target Pemilih"
							placeholder="Total Target Pemilih"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'total_dc_voters'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							type="number"
							label="Total Pemilih DC"
							placeholder="Total Pemilih DC"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'total_legitimate_vote'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							type="number"
							label="Total Pemilih Yang Sah"
							placeholder="Total Pemilih Yang Sah"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'total_invalid_vote'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							type="number"
							label="Total Pemilih Yang Tidak Valid"
							placeholder="Total Pemilih Yang Tidak Valid"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'village_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectVillage
							{...field}
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							onChange={({ value }) => {
								setValue('village_id', value);
								setError('village_id', null);
							}}
							error={error}
						/>
					)}
				/>
			</div>
			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm mx-2'}
					variant="warning"
					disabled={processingCreateTPS || fetchingTPS || TPSErrors}
					onClick={() => navigate(-1, { replace: true })}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateTPS || fetchingTPS || TPSErrors}
					onClick={handleSubmit(onSubmitTPS)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
