import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import {BaseItem} from "../model/base/BaseItem";

export type SortProperty = {
    type: "number" | "string",
    property: string,
    label?: string,
}

export type EditableProperty = {
    label: string,
    property: string,
    required: boolean,
    hidden?: boolean,
    type: "number" | "string" | "text" | "date" | "boolean" | "color",
}

export abstract class ItemManager<E, T extends BaseItem> {
    abstract convert(resultPage: ResultPage<E>): ListPage<T>;

    abstract newItem(): T;

    abstract from(original: T): T;

    validate(item: T): string[] {
        let errors: string[] = [];
        this.getEditableProperties().map((editable) => {
            if (editable.required) {
                switch (editable.type) {
                    case "number": {
                        // @ts-ignore
                        const value: number | null | undefined = item[editable.property]
                        if (!value || value < 0) {
                            errors = [...errors, (editable.label + " must be greater than 0")];
                        }
                        break;
                    }
                    case "string": {
                        // @ts-ignore
                        const value: string | null | undefined = item[editable.property]
                        if (!value || value.trim() === "") {
                            errors = [...errors, (editable.label + " is required")];
                        }
                        break;
                    }
                    case "date": {
                        // @ts-ignore
                        const value: Date | null | undefined = item[editable.property]
                        if (!value) {
                            errors = [...errors, (editable.label + " must be a date")];
                        }
                        break;
                    }
                }
            }
            return true;
        })
        return errors;
    }

    abstract getListColumn(item: T): string;

    abstract getHeading(item: T): string;

    abstract getSortProperties(): SortProperty[];

    getEditableProperties(): EditableProperty[] {
        return [];
    };
}
