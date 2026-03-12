export interface User {
    id : string;
    agentCode : string;
    fullName : string;
    role : 'admin' | 'agent'
}

export interface loginType {
    user : User ;
    token : string     
}