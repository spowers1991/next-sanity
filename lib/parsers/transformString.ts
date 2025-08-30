import type { StringCase } from './types/stringStyle';

export function transformString(input: string, style: StringCase): string {
    const toCamel = (str: string) =>
        str
            .toLowerCase()
            .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

    const toSnake = (str: string) =>
        str
            .replace(/[\s\-]+/g, '_')
            .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
            .toLowerCase();

    const toKebab = (str: string) =>
        str
            .replace(/[\s_]+/g, '-')
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();

    const toPascal = (str: string) => {
        const camel = toCamel(str);
        return camel.charAt(0).toUpperCase() + camel.slice(1);
    };

    switch (style) {
        case 'camel':
            return toCamel(input);
        case 'snake':
            return toSnake(input);
        case 'kebab':
            return toKebab(input);
        case 'pascal':
            return toPascal(input);
    }
}
