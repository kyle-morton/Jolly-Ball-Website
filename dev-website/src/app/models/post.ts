import { IItem } from "../interfaces/item";

export class Post implements IItem {
    Id: string;
    Title: string;
    Body: string;
    TimeStamp: string;
}
