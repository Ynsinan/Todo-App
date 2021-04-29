
export type Item = {
    id: any;
    name: string | undefined;
    date: string;
    hour: string;
}

export type stateType = {
    todo: {
        title: string;
        items: Item[];
    }
}