import { SERVICE_PARTNER } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingStaffList: false,
	fetchingPartnerList: false,
	staffList: null,
	partnerList: null,

	getStaffList: async (params) => {
		set({ fetchingStaffList: true });

		const { success, payload } = await SERVICE_PARTNER.getStaffList(params);

		set({ staffList: success ? payload : null });
		set({ fetchingStaffList: false });
	},

	getPartnerList: async (params) => {
		set({ fetchingPartnerList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_PARTNER.getPartnerList(requestParams);

		set({ partnerList: success ? payload : null });
		set({ fetchingPartnerList: false });
	}
});

export const usePartnerStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
