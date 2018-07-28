import { IResult } from "../interfaces/iresult";

export class OperationResult implements IResult {
    public Status : boolean;
    public Message : string;
    public Id: string;
}
