export const currentDateTime = new Date().toISOString().substring(0, 11).concat(new Date().toLocaleTimeString());
export const formatTimeOrg = "YYYY-MM-DDTHH:mm:ss:SSSZ";