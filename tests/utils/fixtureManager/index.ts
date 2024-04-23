type Fixture<T = unknown> = {
  setup: () => Promise<T>;
  teardown: (instance: T) => Promise<void> | void;
};

type FixtureInstances<T extends {}> = {
  [P in keyof T]: T[P];
};

export function createTestSuite<T extends {}>(fixtures: {
  [P in keyof T]: Fixture<T[P]>;
}) {
  async function withFixtures(
    fn: (fixtures: FixtureInstances<T>) => Promise<void>,
    runTeardown = true,
  ) {
    const functionAsString = fn.toString();
    const matches = functionAsString.match(/(?<=\{)\s*[^}]+/);
    const usedFixtureNames = new Set(matches ? matches[0].split(/[\s,]+/) : []);

    const instances: Partial<FixtureInstances<T>> = {};
    const teardowns: Array<() => Promise<void> | void> = [];

    for (const key in fixtures) {
      if (usedFixtureNames.has(key)) {
        const fixture = fixtures[key];
        const instance = await fixture.setup();
        instances[key as keyof FixtureInstances<T>] = instance;
        if (fixture.teardown && runTeardown) {
          teardowns.push(() => fixture.teardown(instance));
        }
      }
    }

    try {
      await fn(instances as FixtureInstances<T>);
    } finally {
      if (runTeardown) {
        for (const teardown of teardowns) {
          await teardown();
        }
      }
    }
  }

  const wrappedBefore = (
    fn: (fixtures: FixtureInstances<T>) => Promise<void>,
  ) => {
    before(() => withFixtures(fn, false));
  };

  const wrappedIt = (
    title: string,
    testFn: (fixtures: FixtureInstances<T>) => Promise<void>,
  ) => {
    it(title, () => withFixtures(testFn));
  };

  wrappedIt.only = (
    title: string,
    testFn: (fixtures: FixtureInstances<T>) => Promise<void>,
  ) => {
    it.only(title, () => withFixtures(testFn));
  };

  wrappedIt.skip = (
    title: string,
    testFn: (fixtures: FixtureInstances<T>) => Promise<void>,
  ) => {
    it.skip(title, () => withFixtures(testFn));
  };

  wrappedIt.before = wrappedBefore;

  return wrappedIt;
}
