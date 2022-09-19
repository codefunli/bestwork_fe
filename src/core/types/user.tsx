
export enum RoleUser {
	SYS_ADMIN = 'SYS_ADMIN',
	ORG_ADMIN = 'ADMIN',
	ORG_USER = 'USER',
}

export type UserInfoRes = {
	id: number;
	userId: string;
	current_org_id: number;
	user_nm: string;
	role: RoleUser;
	email: string;
	first_nm: string;
	last_nm: string;
	is_deleted: boolean;
	created_dt: string;
	created_prg_id: string;
	updated_dt: string;
	updated_prg_id: string;
};