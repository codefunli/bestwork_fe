export interface Permission {
    canAccess: boolean;
    canAdd: boolean;
    canDelete: boolean;
    canEdit: boolean;
    id: number;
    monitorId: number;
    monitorName: string;
    roleId: number;
    status: number;
}
