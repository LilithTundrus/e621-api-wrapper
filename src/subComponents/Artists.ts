// The methods for artists go here

export default class artist {
    private userAgent: string;
    private pageLimit: number;
    public constructor(userAgent: string, pageLimit: number) {
        this.userAgent = userAgent;
        this.pageLimit = pageLimit;
    }
    public test(): string {
        return 'aaaa'
    }
}