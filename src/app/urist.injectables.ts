import {
	UristService,
	API_URL,
	WEB_PATH
} from './urist.service'

export const uristInjectables: Array<any> = [
	{ provide: UristService, useClass: UristService },
	{ provide: API_URL, useValue: API_URL},
	{ provide: WEB_PATH, useValue: WEB_PATH}
]
