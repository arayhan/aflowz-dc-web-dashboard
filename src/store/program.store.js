import { SERVICE_PROGRAM } from '@/services';
import { MOCK_SERVICE_PROGRAM } from '@/services/mock';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingProgramCategoryList: false,
	fetchingProgramList: false,
	fetchingProgramDetail: false,
	programCategoryList: null,
	programList: null,
	programDetail: null,

	getProgramCategoryList: async () => {
		set({ fetchingProgramCategoryList: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategoryList();

		set({ programCategoryList: success ? payload : null });
		set({ fetchingProgramCategoryList: false });
	},
	getProgramList: async (params) => {
		set({ fetchingProgramList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_PROGRAM.getProgramList(requestParams);

		set({ programList: success ? payload : null });
		set({ fetchingProgramList: false });
	},
	getProgramDetail: (programID) => {
		set({ fetchingProgramDetail: true });

		const { success, payload } = MOCK_SERVICE_PROGRAM.getProgramDetail(programID);
		// const { success, payload } = await SERVICE_PROGRAM.getProgramDetail(programID);

		set({ programDetail: success ? payload : null });
		set({ fetchingProgramDetail: false });
	}
});

export const useProgramStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
