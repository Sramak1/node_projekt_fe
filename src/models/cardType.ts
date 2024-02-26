import {userType} from "./userType.ts";
import {categoryType} from "./categoryType.ts";

export type cardType = {
id: number
    title: string
    content:string
    created_at: Date
    updated_at: Date
    karma: number
    user : userType
    category:categoryType
}