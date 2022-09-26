export class Card {
    title: string;
    description: string;
    holdable: boolean;

    constructor(title: string, description: string, holdable: boolean) {
        this.title = title;
        this.description = description;
        this.holdable = holdable;
    }
}