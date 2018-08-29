import { Class } from "./class";

export class ClassNotRegisteredError extends Error {
    constructor(element: Class<any>) {
        super();
        let message = `ClassNotRegisteredError: ${element.name} is not registered in Dependency Injection Container`;
        this.message = message;
    }
}