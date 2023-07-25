export interface IServerSettings {
    host: string
    port: number
    environment: "dev" | "production"
}

export interface ISettings {
    server: IServerSettings
}