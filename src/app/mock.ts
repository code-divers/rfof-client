import { 
	Cage, 
	CageGroup, 
	CageModule,
	PowerSupply,
	PowerStatus,
	TrapReciver,
	TrapLevelFilter,
	EventLogItem,
	GroupType,
	GroupRedundency, 
	GroupStatus, 
	ModuleType,
	ModuleStatus,
	ModuleStatusLED,
	LNAStatus,
	BiasTState,
	MonPlan,
	EventLevel
} from './cage';

export const CAGE: Cage = 
	{
		OID: '.1.3.6.1.4.1.40570.1',
  		description: 'Demo RFoF cage',
		serial: '111111111',
		version: '1.000',
		versionDate: '02/03/2018',
		grCount: 2,
		psCount: 1,
		slotsCount: 4
	}


export const CAGE_GROUPS: CageGroup[] = [
	{
		name: 'Luzhniki Stadium',
		type: GroupType.simple,
		mdCount: 2,
		redundencySwitch: GroupRedundency.auto,
		status: GroupStatus.ok
	},
	{
		name: 'Saint Petersburg Stadium',
		type: GroupType.bidir,
		mdCount: 2,
		redundencySwitch: GroupRedundency.manualprimary,
		status: GroupStatus.ok
	}
];

export const CAGE_MODULES: CageModule[] = [
	{
		name: '80322043',
		group: CAGE_GROUPS[0],
		slot: 4,
		type: ModuleType.transmitter,
		status: ModuleStatus.ok,
		statusLED: ModuleStatusLED.green,
		partNumber: 'RFoF3T5FR-PA-11',
		serial: '80322043',
		fwVer: '1.017',
		rfLevel: '-----',
		temp: '36.1',
		optPower: '1.6',
		monTimer: '--:--:--',
		rfTestTimer: '--:--:--',
		atten: '0.0',
		lna: LNAStatus.off,
		biasT: BiasTState.none,
		laser: LNAStatus.off,
		rfLinkTestTime: '00:01:00',
		dfbBias: '31.9',
		optAlarmLevel: '0.98',
		monPlan: MonPlan.sleep,
		monInterval: '00:00:05'
	},
	{
		name: '80322045',
		group: CAGE_GROUPS[0],
		slot: 5,
		type: ModuleType.transmitter,
		status: ModuleStatus.ok,
		statusLED: ModuleStatusLED.green,
		partNumber: 'RFoF3T5FR-PA-11',
		serial: '80322045',
		fwVer: '1.017',
		rfLevel: '-----',
		temp: '39.4',
		optPower: '2.7',
		monTimer: '--:--:--',
		rfTestTimer: '--:--:--',
		atten: '0.0',
		lna: LNAStatus.off,
		biasT: BiasTState.none,
		laser: LNAStatus.off,
		rfLinkTestTime: '00:01:00',
		dfbBias: '32.0',
		optAlarmLevel: '1.05',
		monPlan: MonPlan.sleep,
		monInterval: '00:00:05'
	},
	{
		name: '80321986',
		group: CAGE_GROUPS[1],
		slot: 7,
		type: ModuleType.transmitter,
		status: ModuleStatus.ok,
		statusLED: ModuleStatusLED.green,
		partNumber: 'RFoF3T5FR-PA-11',
		serial: '80321986',
		fwVer: '1.017',
		rfLevel: '-----',
		temp: '36.7',
		optPower: '2.3',
		monTimer: '--:--:--',
		rfTestTimer: '--:--:--',
		atten: '0.0',
		lna: LNAStatus.off,
		biasT: BiasTState.none,
		laser: LNAStatus.off,
		rfLinkTestTime: '00:01:00',
		dfbBias: '32.0',
		optAlarmLevel: '0.97',
		monPlan: MonPlan.sleep,
		monInterval: '00:00:05'
	},
	{
		name: '70322405',
		group: CAGE_GROUPS[1],
		slot: 6,
		type: ModuleType.transmitter,
		status: ModuleStatus.fault,
		statusLED: ModuleStatusLED.red,
		partNumber: 'RFoF3T5FR-PA-11',
		serial: '70322405',
		fwVer: '1.017',
		rfLevel: '-----',
		temp: '36.7',
		optPower: '3.5',
		monTimer: '--:--:--',
		rfTestTimer: '--:--:--',
		atten: '0.0',
		lna: LNAStatus.none,
		biasT: BiasTState.none,
		laser: LNAStatus.none,
		rfLinkTestTime: '00:00:05',
		dfbBias: 'n.a',
		optAlarmLevel: '0.03',
		monPlan: MonPlan.sleep,
		monInterval: '00:00:05'
	}
]

export const CAGE_POWERSUPPLY: PowerSupply[] = [
	{
		status: PowerStatus.ok
	},
	{
		status: PowerStatus.ok
	}
]

export const CAGE_TRAPRECIVERS: TrapReciver[] = [
	{
		ipAddress: '127.0.0.1',
		levelFilter: TrapLevelFilter.notify,
		community: '* * * * * * *'
	}
]

export const CAGE_EVENTS: EventLogItem[] = [
	{
		time: new Date('2018-06-28 15:22:12'),
		level: EventLevel.critical,
		detail: 'Recovery: Group 2, Slot 6, Optical signal restored'
	},
	{
		time: new Date('2018-06-28 15:22:11'),
		level: EventLevel.critical,
		detail: 'Recovery: Group 2, Slot 7, Optical signal restored'
	},
	{
		time: new Date('2018-06-28 15:22:11'),
		level: EventLevel.warning,
		detail: 'Power supply 1 is Not Installed, Power supply 2 is Not Installed'
	},
	{
		time: new Date('2018-06-28 15:22:11'),
		level: EventLevel.warning,
		detail: 'CageManager deamon started'
	},
	{
		time: new Date('2018-06-28 15:21:11'),
		level: EventLevel.change,
		detail: 'A change event'
	},
	{
		time: new Date('2018-06-28 15:20:11'),
		level: EventLevel.system,
		detail: 'A system event'
	},
	{
		time: new Date('2018-06-28 15:19:11'),
		level: EventLevel.critical,
		detail: 'Recovery: Group 1, Slot 4, Optical signal restored'
	}
]