function getValue(value: unknown): string {
    if (value instanceof Date) { // 这里由于把value的类型缩小为Date实例的范围内,所以`value.toISOString()`
        return value.toISOString();
    }

    return String(value);
}
