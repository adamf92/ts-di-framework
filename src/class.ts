/**
 * Class<T>
 * interface
 */
export interface Class<T> extends Function {
    new (...args: any[]): T;
}
