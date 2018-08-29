import { Class } from "./class";

/**
 * DIDecorator
 */
type DIDecorator<T extends Function> = (Target: Class<T>) => T | void;

/**
 * @DI()
 * decorator
 *
 * Used to decorate class available to Dependency Injection framework
 */
export const DI = (): DIDecorator<any> => {
    return Target => {};
};