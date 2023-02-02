import { Link, useParams } from 'react-router-dom';
import { useAuthStore, useKonstituenStore, usePartnerStore } from '@/store';
import {
	BannerFeature,
	BarChartPenerimaKonstituenPerTahun,
	PieChartPenerimaKonstituenByGender,
	TablePenerimaKonstituenDetail
} from '@/components/molecules';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button, ButtonAction, InputTextInfo } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';

const KonstituenDetail = () => {
	const { isAdmin, isSystem } = useAuthStore();
	const params = useParams();
	const { konstituenDetail, fetchingKonstituenDetail, getKonstituenDetail } = useKonstituenStore();
	const { getPenerimaList } = usePartnerStore();

	useEffect(() => {
		getKonstituenDetail(params.konstituenID);
		getPenerimaList({ konstituen_id: params.konstituenID, is_receiver: true });
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={konstituenDetail ? `${konstituenDetail.konstituen_name}` : 'Institusi'}
				loading={fetchingKonstituenDetail}
			/>
			<section className="py-12 bg-gray-100 md:py-12">
				<div className="container">
					{fetchingKonstituenDetail && <KonstituenDetailSkeleton />}
					{!fetchingKonstituenDetail && konstituenDetail && (
						<div className="space-y-6">
							<div className="col-span-12 p-5 bg-gray-100">
								<div className="bg-white rounded-md shadow-lg">
									<div className="grid items-center justify-between grid-cols-1 sm:grid-cols-2">
										<div className="p-4">
											<div className="text-xl font-light">Details</div>
										</div>
										{(isAdmin || isSystem) && (
											<div className="flex justify-start h-full gap-4 p-4 sm:justify-end">
												<Button
													className="px-6 text-xs rounded-sm"
													variant={'primary'}
													linkTo={`/institusi/${konstituenDetail?.konstituen_id}/report`}
												>
													Preview Report
												</Button>
												<ButtonAction
													action={ACTION_TYPES.UPDATE}
													linkTo={`/institusi/update/${konstituenDetail?.konstituen_id}`}
													className={'px-7 py-3'}
												/>
											</div>
										)}
									</div>
									<hr />
									<div className="p-5 my-2 rounded-md">
										<div className="grid grid-cols-12 text-sm gap-y-1">
											<InputTextInfo
												tag={`Nama ${konstituenDetail?.konstituen_type || 'institusi'}`}
												value={konstituenDetail?.konstituen_name || 'Belum Tercantum'}
											/>
											<InputTextInfo
												tag={`Domisili ${konstituenDetail?.konstituen_type || 'institusi'}`}
												value={konstituenDetail?.city.name || 'Belum Ada Alamat'}
											/>
											<InputTextInfo
												tag={`Alamat Lengkap ${konstituenDetail?.konstituen_type || 'institusi'}`}
												value={konstituenDetail?.alamat_konstituen || 'Belum Ada Alamat'}
											/>
											<InputTextInfo
												tag={`PIC ${konstituenDetail?.konstituen_type || 'institusi'}`}
												value={konstituenDetail?.konstituen_pic || 'Belum Ada Nama PIC Institusi'}
												extraValue={konstituenDetail?.konstituen_pic_mobile || '(Belum Ada No. Kontak)'}
											/>
											<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2">
												PIC Tim Internal
											</div>
											<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
												<Link
													to={`/staff/${konstituenDetail?.pic_staff.id}`}
													className="underline text-primary hover:text-primary-400"
												>
													{konstituenDetail?.pic_staff.name || 'Belum Ada Nama PIC Tim Internal'}{' '}
													{konstituenDetail?.pic_staff.mobile
														? `(${konstituenDetail?.pic_staff.mobile})`
														: '(Belum Ada No. Kontak)'}
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-center justify-center">
									<div className="flex items-center justify-center gap-4">
										<div className="px-8 py-6 mb-2 bg-white rounded-md shadow-lg cursor-pointer md:px-10">
											<Link to={`/institusi/penerima/${konstituenDetail?.konstituen_id}`}>
												<div className="flex flex-col items-center justify-center space-y-1 text-center">
													<span className="text-2xl md:text-4xl font-extralight">
														{konstituenDetail?.total_penerima_program_konstituen_per_orang || 0}
													</span>
													<div className="font-light text-gray-400">Total Penerima Program </div>
												</div>
											</Link>
										</div>
										<div className="px-8 py-6 mb-2 bg-white rounded-md shadow-lg md:px-10">
											<div>
												<div className="flex flex-col items-center justify-center space-y-1 text-center">
													<span className="text-2xl md:text-4xl font-extralight">
														{konstituenDetail?.total_konstituen_activity_detail || 0}
													</span>
													<div className="font-light text-gray-400">Total Kegiatan </div>
												</div>
											</div>
										</div>
									</div>
									<div className="grid w-full grid-cols-12 gap-4">
										<div className="col-span-12 bg-white rounded-md shadow-lg md:col-span-6">
											<BarChartPenerimaKonstituenPerTahun
												totalPenerima={konstituenDetail?.total_penerima_program_konstituen_by_periode_per_orang || 0}
											/>
										</div>
										<div className="col-span-12 bg-white rounded-md shadow-lg md:col-span-6">
											<PieChartPenerimaKonstituenByGender
												totalPria={konstituenDetail?.total_pria || 0}
												totalWanita={konstituenDetail?.total_wanita || 0}
											/>
										</div>
										<div className="col-span-12 bg-white rounded-md shadow-lg">
											<TablePenerimaKonstituenDetail konstituenID={konstituenDetail?.konstituen_id} isInDetail />
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const KonstituenDetailSkeleton = () => {
	return (
		<div className="p-5 space-y-6 bg-white rounded-md">
			<div className="col-span-12">
				<Skeleton height={250} />
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-6">
					<Skeleton height={300} />
				</div>
				<div className="col-span-12 md:col-span-6">
					<Skeleton height={300} />
				</div>
				<div className="col-span-12">
					<Skeleton height={250} />
				</div>
			</div>
		</div>
	);
};

export default KonstituenDetail;
