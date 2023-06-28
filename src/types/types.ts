export type CompanionType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string | null
    sender?: string
}

export type PostType = {
    id: number
    post: string
    date: Date | ''
    likes: number
}

type ContactType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactType
    photos: PhotosType
}

export type UserType = {
    id: number
    name: string
    status: string | null
    photos: PhotosType
    followed: boolean,
    uniqueUrlName?: string | null
}