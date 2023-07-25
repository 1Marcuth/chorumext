class Logger {
    public constructor(public name: string) {}

    public log(...data: any[]) {
        console.log(`> [${this.name}]`, ...data)
    }

    public error(message: string) {
        console.error(`> [${this.name}]`,message)
    }

    public info(message: string) {
        console.info(`> [${this.name}]`,message)
    }

    public warning(message: string) {
        console.warn(`> [${this.name}] `,message)
    }
}

export default Logger