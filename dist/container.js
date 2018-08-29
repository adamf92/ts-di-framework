"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const error_1 = require("./error");
class DIContainer {
    constructor() {
        this._elements = new Map();
        this._instances = new Map();
    }
    static create(name) {
        if (!this._containers.has(name)) {
            this._containers.set(name, new this());
            return this._containers.get(name);
        }
        else {
            throw new ReferenceError('Container already created!');
        }
    }
    static get(name) {
        if (this._containers.has(name)) {
            return this._containers.get(name);
        }
        else {
            throw new ReferenceError('Container is undefined!');
        }
    }
    register(elements) {
        for (let el of elements) {
            this._elements.set(el, el);
        }
    }
    resolve(element) {
        if (this._elements.has(element)) {
            if (this._instances.has(element)) {
                return this._instances.get(element);
            }
            else {
                return this._resolveElement(element);
            }
        }
        else {
            throw new error_1.ClassNotRegisteredError(element);
        }
    }
    _resolveElement(element) {
        let args = Reflect.getMetadata('design:paramtypes', element);
        if (args && args.length) {
            let resolvedDeps = [];
            for (let arg of args) {
                resolvedDeps.push(this.resolve(arg));
            }
            this._instances.set(element, new element(...resolvedDeps));
        }
        else {
            this._instances.set(element, new element());
        }
        return this._instances.get(element);
    }
}
DIContainer._containers = new Map();
exports.DIContainer = DIContainer;
//# sourceMappingURL=container.js.map