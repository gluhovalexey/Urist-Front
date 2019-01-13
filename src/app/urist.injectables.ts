import {
	UristService,
	API_URL,
	STATIC_URL,
	DOCUMENT_WEB_PATH,
	CERTIFICATE_WEB_PATH
} from './urist.service'

export const uristInjectables: Array<any> = [
	{ provide: UristService, useClass: UristService },
	{ provide: API_URL, useValue: API_URL},
	{ provide: STATIC_URL, useValue: STATIC_URL},
	{ provide: DOCUMENT_WEB_PATH, useValue: DOCUMENT_WEB_PATH},
	{ provide: CERTIFICATE_WEB_PATH, useValue: CERTIFICATE_WEB_PATH}
]
