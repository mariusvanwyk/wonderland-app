import {ResultPage} from "../model/ResultPage";
import {ListPage} from "../model/ListPage";
import {BaseItem} from "../model/BaseItem";

export type SortProperty = {
    type: "number" | "string",
    name: string,
    label?: string,
}

export type RequiredProperty = {
    label: string,
    property: string,
    type: "number" | "string" | "date",
}

export abstract class ItemManager<E, T extends BaseItem> {
    abstract convert(resultPage: ResultPage<E>): ListPage<T>;

    abstract newItem(): T;

    abstract from(original: T): T;

    validate(item: T): string[] {
        let errors: string[] = [];
        this.getRequiredProperties().map((required) => {
            switch (required.type) {
                case "number": {
                    // @ts-ignore
                    const value: number | null | undefined = item[required.property]
                    if (!value || value < 0) {
                        errors = [...errors, (required.label + " must be greater than 0")];
                    }
                    break;
                }
                case "string": {
                    // @ts-ignore
                    const value: string | null | undefined = item[required.property]
                    if (!value || value.trim() === "") {
                        errors = [...errors, (required.label + " is required")];
                    }
                    break;
                }
                case "date": {
                    // @ts-ignore
                    const value: Date | null | undefined = item[required.property]
                    if (!value) {
                        errors = [...errors, (required.label + " must be a date")];
                    }
                    break;
                }
            }
        })
        return errors;
    }

    abstract getListColumn(item: T): string;

    abstract getListExtraColumn(item: T): string;

    abstract getHeading(item: T): string;

    abstract getSortProperties(): SortProperty[];

    abstract getRequiredProperties(): RequiredProperty[];
}
