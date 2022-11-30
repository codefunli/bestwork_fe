interface RoleData {
    companyId: string,
    userList: [
        {
            userId: number,
            canView: boolean,
            canEdit: boolean
        }
    ]
}

export interface CreateProjectDTO {
    project: {
        projectName: string,
        description: string,
        notificationFlag: string,
        isPaid: string,
        status: string,
        projectType: string,
        createDate: string
    },
    roleData?: RoleData[]
}

export interface User {
    userId: number;
    userName: string;
    canView: boolean;
    canEdit: boolean;
}

export interface Company {
    id: number;
    companyName: string;
    userList?: User[]
}
