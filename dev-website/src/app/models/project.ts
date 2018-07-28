import { IItem } from "../interfaces/item";

export class Project implements IItem {
    Id: string;
    Title: string;
    Description: string;
    TimeStamp: string;
}
