import {ResultPage} from "./model/ResultPage";
import {ListPage} from "./model/ListPage";

export interface Converter<E, T> {
    convert(resultPage: ResultPage<E>): ListPage<T>;

    newItem(): T;

    from(original: T): T;
}