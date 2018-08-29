import { DIContainer } from './container';
import { DI } from './decorator';
import { ClassNotRegisteredError } from './error';

@DI()
class ClassWithoutDep {
    constructor() {}

    public text: string = '';
}

@DI()
class ClassWithOneDep {
    constructor(public wDep: ClassWithoutDep) {}
}

@DI()
class ClassWithTwoDeps {
    constructor(public wDep: ClassWithoutDep, public oDep: ClassWithOneDep) {}
}

const container = DIContainer.create('main');

container.register([ClassWithoutDep, ClassWithOneDep, ClassWithTwoDeps]);
try {
    let testClass = container.resolve(ClassWithTwoDeps);
    console.log(testClass);
} catch(e) {
    console.log(e.message);
}
