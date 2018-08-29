import 'reflect-metadata';
import { Class } from './class';
import { ClassNotRegisteredError } from './error';

/**
 * DIContainer
 */
export class DIContainer {
    /**
     * Map with registered elements available to resolve
     */
    private _elements: Map<Class<any>, Class<any>> = new Map();
    /**
     * Map with created instances
     */
    private _instances: Map<Class<any>, any> = new Map();
    /**
     * Singleton instance of dependency injection container
     */
    private static _containers: Map<string, DIContainer> = new Map();
    /**
     * Private constructor (for Singleton pattern)
     */
    private constructor() {}
    /**
     * Get Instance
     *
     * Static method used to get DIContainer singleton instance
     * @returns {DIContainer}
     */
    public static create(name: string): DIContainer {
        if (!this._containers.has(name)) {
            this._containers.set(name, new this());
            return this._containers.get(name);
        } else {
            throw new ReferenceError('Container already created!');
        }
    }

    public static get(name: string): DIContainer {
        if (this._containers.has(name)) {
            return this._containers.get(name);
        } else {
            throw new ReferenceError('Container is undefined!');
        }
    }
    /**
     * Register
     *
     * Register elements available for resolving
     * @param {Class<any>][]} elements
     */
    public register(elements: Class<any>[]): void {
        for (let el of elements) {
            this._elements.set(el, el);
        }
    }
    /**
     * Resolve
     *
     * Get requested class with all dependencies
     * @param {Class<T>} element
     * @returns {T}
     */
    public resolve<T>(element: Class<T>):  T {
        // Check if element is registered
        if (this._elements.has(element)) {
            // Check if element istance is already created
            if (this._instances.has(element)) {
                return this._instances.get(element) as T;
            } else {
                return this._resolveElement(element);
            }
        } else {
            throw new ClassNotRegisteredError(element);
        }
    }
    /**
     * Resolve Element
     * private
     *
     * Resolve element with or without dependencies
     * @param {Class<T>} element
     * @return {T}
     */
    private _resolveElement<T>(element: Class<T>): T {
        let args = Reflect.getMetadata('design:paramtypes', element);
        if (args && args.length) {
            let resolvedDeps: Class<T>[] = [];
            for (let arg of args) {
                resolvedDeps.push(this.resolve(arg));
            }
            this._instances.set(element, new element(...resolvedDeps));
        } else {
            this._instances.set(element, new element());
        }
        return this._instances.get(element) as T;
    }
}