"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
const decorator_1 = require("./decorator");
let ClassWithoutDep = class ClassWithoutDep {
    constructor() {
        this.text = '';
    }
};
ClassWithoutDep = __decorate([
    decorator_1.DI(),
    __metadata("design:paramtypes", [])
], ClassWithoutDep);
let ClassWithOneDep = class ClassWithOneDep {
    constructor(wDep) {
        this.wDep = wDep;
    }
};
ClassWithOneDep = __decorate([
    decorator_1.DI(),
    __metadata("design:paramtypes", [ClassWithoutDep])
], ClassWithOneDep);
let ClassWithTwoDeps = class ClassWithTwoDeps {
    constructor(wDep, oDep) {
        this.wDep = wDep;
        this.oDep = oDep;
    }
};
ClassWithTwoDeps = __decorate([
    decorator_1.DI(),
    __metadata("design:paramtypes", [ClassWithoutDep, ClassWithOneDep])
], ClassWithTwoDeps);
const container = container_1.DIContainer.create('main');
container.register([ClassWithoutDep, ClassWithOneDep, ClassWithTwoDeps]);
try {
    let testClass = container.resolve(ClassWithTwoDeps);
    console.log(testClass);
}
catch (e) {
    console.log(e.message);
}
//# sourceMappingURL=index.js.map