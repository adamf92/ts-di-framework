"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassNotRegisteredError extends Error {
    constructor(element) {
        super();
        let message = `ClassNotRegisteredError: ${element.name} is not registered in Dependency Injection Container`;
        this.message = message;
    }
}
exports.ClassNotRegisteredError = ClassNotRegisteredError;
//# sourceMappingURL=error.js.map