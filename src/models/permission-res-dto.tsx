export interface PermissionResDTO {
    id: number;
    canAccess: boolean;
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
    status: number;
    monitorId: number;
    monitorName: string;
    roleId: number;
}
