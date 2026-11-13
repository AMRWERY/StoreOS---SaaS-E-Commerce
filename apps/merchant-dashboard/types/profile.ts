export interface UserProfile {
    name: string
    email: string
    phone: string
    jobTitle: string
}

export interface UserSession {
    device: string
    meta: string
    status: string
    current: boolean
    icon: string
}