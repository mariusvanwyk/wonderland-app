import {ResultPage} from "./model/ResultPage";
import {ListPage} from "./model/ListPage";
import {BaseItem} from "./model/BaseItem";

export interface Converter<E, T extends BaseItem> {
    convert(resultPage: ResultPage<E>): ListPage<T>;

    newItem(): T;

    from(original: T): T;

    validate(item: T): string[];

    getListColumn(item: T): string;
    getListExtraColumn(item: T): string;
}