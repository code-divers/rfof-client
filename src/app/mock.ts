import { 
	Cage, 
	CageGroup, 
	CageModule, 
	GroupRedundency, 
	GroupStatus, 
	ModuleType,
	ModuleStatus,
	ModuleStatusLED,
	LNAStatus,
	BiasTState,
	MonPlan  
} from './cage';

export const CAGE_GROUPS: CageGroup[] = [
	{
		OID: '.1.3.6.1.4.1.40570.1.5.1.1',
		name: 'MondialStdr',
		type: 'standard',
		mdCount: 2,
		redundencySwitch: GroupRedundency.auto,
		status: GroupStatus.ok
	},
	{
		OID: '.1.3.6.1.4.1.40570.1.5.1.2',
		name: 'MondialHD',
		type: 'HD',
		mdCount: 4,
		redundencySwitch: GroupRedundency.manualbackup,
		status: GroupStatus.ok
	},
	{
		OID: '.1.3.6.1.4.1.40570.1.5.1.3',
		name: 'Mondial4k',
		type: '4k',
		mdCount: 6,
		redundencySwitch: GroupRedundency.manualprimary,
		status: GroupStatus.ok
	},
	{
		OID: '.1.3.6.1.4.1.40570.1.5.1.4',
		name: 'MondialLow',
		type: 'low',
		mdCount: 1,
		redundencySwitch: GroupRedundency.none,
		status: GroupStatus.ok
	},
];

export const CAGE_MODULES: CageModule[] = [
	{
		OID: '.1.3.6.1.4.1.40570.1.6.1',
		name: '660300',
		group: CAGE_GROUPS[0],
		slot: 1,
		type: ModuleType.receiver,
		status: ModuleStatus.ok,
		statusLED: ModuleStatusLED.green,
		partNumber: '100',
		serial: '100-100-100',
		fwVer: '1',
		rfLevel: '10',
		temp: '13',
		optPower: '120',
		monTimer: null,
		rfTestTimer: null;
		atten: '20',
		lna: LNAStatus.none,
		biasT: BiasTState.alwayson,
		laser: LNAStatus.off,
		rfLinkTestTime: null,
		dfbBias: null,
		optAlarmLevel: null,
		monPlan: MonPlan.sleep,
		monInterval: null
	},
	{
		OID: '.1.3.6.1.4.1.40570.1.6.2',
		name: '850359',
		group: CAGE_GROUPS[0],
		slot: 1,
		type: ModuleType.transmitter,
		status: ModuleStatus.ok,
		statusLED: ModuleStatusLED.green,
		partNumber: '100',
		serial: '100-100-100',
		fwVer: '1',
		rfLevel: '10',
		temp: '13',
		optPower: '120',
		monTimer: null,
		rfTestTimer: null;
		atten: '20',
		lna: LNAStatus.none,
		biasT: BiasTState.alwayson,
		laser: LNAStatus.off,
		rfLinkTestTime: null,
		dfbBias: null,
		optAlarmLevel: null,
		monPlan: MonPlan.sleep,
		monInterval: null
	}

]