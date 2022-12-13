import { ButtonAction, Card } from '@/components/atoms';
import {
	BannerFeature,
	CardDetailTotal,
	ChartPenerimaProgram,
	ChartPeriodeProgram,
	TablePenerima
} from '@/components/molecules';
import { useDistrictStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const DistrictDetail = () => {
	const { districtID } = useParams();

	const { districtDetail, fetchingDistrictDetail, getDistrictDetail } = useDistrictStore();

	const [tableParams] = useState({ district_id: districtID });

	useEffect(() => {
		if (districtID) getDistrictDetail(districtID);
	}, [districtID]);

	return (
		<div>
			<BannerFeature
				title={districtDetail ? `${districtDetail.district_name}` : 'Kecamatan'}
				loading={fetchingDistrictDetail}
			/>

			<section className="bg-gray-100 py-12 md:py-20">
				<div className="container">
					{fetchingDistrictDetail && <DistrictDetailSkeleton />}
					{!fetchingDistrictDetail && districtDetail && (
						<div className="space-y-4">
							<div className="flex flex-col sm:flex-row items-center justify-end gap-4">
								<ButtonAction
									action={ACTION_TYPES.UPDATE}
									linkTo={`/district/update/${districtID}`}
									className={'w-full sm:w-auto text-base px-5 py-3 rounded-md'}
									text={`Update ${districtDetail.district_name}`}
								/>
							</div>
							<div className="col-span-12 bg-white rounded-md">
								<div className="p-4 space-y-2">
									<div className="font-light text-xl">Details</div>
									<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
								</div>
								<hr />
								<div className="p-5">
									<div className="grid grid-cols-12 gap-y-1 text-sm">
										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Nama Kecamatan</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{districtDetail?.district_name || '-'}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Kecamatan</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{districtDetail?.district?.name || '-'}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Kecamatan</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{!districtDetail?.district_pic && '-'}
											{districtDetail?.district_pic && (
												<div>
													{districtDetail?.district_pic}{' '}
													{districtDetail?.district_pic_mobile && `(${districtDetail?.district_pic_mobile})`}
												</div>
											)}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Staff</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{!districtDetail?.pic_staff.id && '-'}
											{districtDetail?.pic_staff.id && (
												<Link
													to={`/staff/${districtDetail?.pic_staff.id}`}
													className="text-primary underline hover:text-primary-400"
												>
													{districtDetail?.pic_staff.name}{' '}
													{districtDetail?.pic_staff.mobile && `(${districtDetail?.pic_staff.mobile})`}
												</Link>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center gap-4">
								<CardDetailTotal
									title={'Total Penerima'}
									value={districtDetail?.total_penerima_program_district_per_program || 0}
									linkTo={`/penerima?district_id=${districtID}`}
								/>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 sm:col-span-6 bg-white rounded-md">
									<Card
										title={'Jumlah Penerima Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPenerimaProgram data={districtDetail?.penerima_program} />
									</Card>
								</div>
								<div className="col-span-12 sm:col-span-6 bg-white rounded-md">
									<Card
										title={'Jumlah Periode Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram
											data={districtDetail?.total_penerima_program_district_by_periode_per_program}
										/>
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<TablePenerima
										title={`Penerima Program ${districtDetail.district_name}`}
										displayedColumns={['#', 'Nama Penerima', 'NIK', 'Alamat']}
										isShowButtonSeeAll
										isShowFooter={false}
										isShowFilter={false}
										isReadonly
										params={tableParams}
										enableClickRow
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const DistrictDetailSkeleton = () => (
	<div className="grid grid-cols-12 gap-6">
		{[1, 2, 3].map((item) => (
			<div key={item} className="col-span-12 md:col-span-4 bg-white p-4 rounded-md">
				<div className="space-y-3 flex flex-col">
					<Skeleton width={200} height={20} />
					<hr />
					<div className="flex items-center justify-center">
						<Skeleton className="w-48 h-48 md:w-52 md:h-52 rounded-full" />
					</div>
				</div>
			</div>
		))}
		<div className="col-span-12 bg-white p-5 md:p-8 rounded-md">
			<div className="grid grid-cols-12 gap-x-4 gap-y-2">
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
			</div>
		</div>
	</div>
);

export default DistrictDetail;
