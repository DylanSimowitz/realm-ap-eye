export function Time(name: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const fn = descriptor.value;
    descriptor.value = function (...args: any) {
      console.time(name);
      const v = fn.apply(this, arguments);
      console.timeEnd(name);
      return v;
    };
  };
}
