import { BaseDTO } from "./base-dto";

export interface CompanyResDTO extends BaseDTO {
	id: number;
	version: number;
	name: string;
	address1: string | null;
	address2: string | null;
	city: string;
	state: string;
	zip_code: string;
	country: string;
	created: string;
	updated: string;
	startDate: string;
	expiredDate: string;
}