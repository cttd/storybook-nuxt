/**
 * to pascal case
 * @example
 * toPascalCase('hello world') // 'HelloWorld'
 * toPascalCase('hello-world') // 'HelloWorld'
 * toPascalCase('hello_world') // 'HelloWorld'
 * toPascalCase('helloWorld') // 'HelloWorld'
 */
export function toPascalCase(str: string): string {
  return str.replace(/(^\w|-\w|_\w)/g, (m) =>
    m.replace(/-|_/g, "").toUpperCase(),
  );
}
