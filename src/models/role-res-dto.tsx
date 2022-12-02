import { PermissionResDTO } from './permission-res-dto';

export interface RoleResDto {
    id: number;
    roleName: string;
    description: string;
}

export interface RoleHasPermissionResDto {
    id: number;
    roleName: string;
    description: string;
    permissions: PermissionResDTO[];
}
