export interface Customer {
    name: string;
    addresses: Address[];
}

export interface Address {
    trigger: string[];
    days: number;
    subject: string;
}