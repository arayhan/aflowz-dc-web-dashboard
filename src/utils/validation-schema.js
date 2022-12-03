import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	username: yup.string().required('Username wajib diisi'),
	password: yup.string().required('Password wajib diisi')
});

export const formProgramSchema = yup.object().shape(
	{
		program_category_id: yup.number().required('Mitra wajib diisi'),
		name: yup.string().required('Nama program wajib diisi'),
		periode: yup.number('Periode harus berupa angka').required('Periode wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formMitraSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formCitySchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		province_id: yup.string().required('Provinsi wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formVillageSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		district_id: yup.string().required('District wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formKonstituenSchema = yup.object().shape(
	{
		name: yup.string().required('Nama Institusi wajib diisi'),
		konstituen_type: yup.string().required('Tipe institusi wajib dipilih'),
		address: yup.string().required('Belum mengisi alamat institusi'),
		city: yup.number().required('Belum memilih kota asal institusi'),
		pic: yup.string().required('Belum mengisi PIC institusi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC institusi wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka'),
		pic_staff_id: yup.number().required('Belum memilih PIC tim internal')
	},
	['pic_mobile', 'pic_mobile']
);

export const formStaffSchema = yup.object().shape({
	nik_number: yup
		.string()
		.matches(/^[0-9]*$/, 'NIK tidak valid (Harus berupa angka)')
		.min(16, 'NIK tidak valid (Harus 16 angka)')
		.max(16, 'NIK tidak valid (Harus 16 angka)')
		.required('NIK wajib diisi'),
	name: yup.string().required('Nama wajib diisi'),
	birth_place: yup.string().required('Belum memiliih kota kelahiran'),
	birth_date: yup.date().nullable().required('Belum mengisi tanggal lahir'),
	gender: yup.string().required('Belum memilih jenis kelamin'),
	address: yup.string().required('Belum mengisi alamat domisili'),
	province: yup.number().required('Belum memiliih provinsi'),
	city: yup.number().nullable().required('Belum memiliih kota/kabupate domisili'),
	district: yup.number().nullable().required('Belum memiliih kecamatan domisili'),
	village: yup.number().nullable().required('Belum memiliih kelurahan/desa domisili'),
	mobile: yup
		.string()
		.required('Nomor wajib diisi')
		.matches(/^[0-9]*$/, 'Nomor tidak valid (Harus berupa angka)')
		.min(8, 'Minimal 8 angka'),
	email: yup.string().email().required('Belum mengisi email'),
	religion: yup.string().required('Belum memilih agama'),
	staff_title: yup.string().required('Belum memiliih role')
});
