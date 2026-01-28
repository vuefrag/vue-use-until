import { WatchOptions, MaybeRefOrGetter, WatchSource } from 'vue';

interface UntilToMatchOptions extends ConfigurableFlushSync {
    /**
     * Milliseconds timeout for promise to resolve/reject if the when condition does not meet.
     * 0 for never timed out
     *
     * @default 0
     */
    timeout?: number;
    /**
     * Reject the promise when timeout
     *
     * @default false
     */
    throwOnTimeout?: boolean;
    /**
     * `deep` option for internal watch
     *
     * @default 'false'
     */
    deep?: WatchOptions['deep'];
}
interface UntilBaseInstance<T, Not extends boolean = false> {
    toMatch: (<U extends T = T>(condition: (v: T) => v is U, options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, U>> : Promise<U>) & ((condition: (v: T) => boolean, options?: UntilToMatchOptions) => Promise<T>);
    changed: (options?: UntilToMatchOptions) => Promise<T>;
    changedTimes: (n?: number, options?: UntilToMatchOptions) => Promise<T>;
}
type Falsy = false | void | null | undefined | 0 | 0n | '';
interface UntilValueInstance<T, Not extends boolean = false> extends UntilBaseInstance<T, Not> {
    readonly not: UntilValueInstance<T, Not extends true ? false : true>;
    toBe: <P = T>(value: MaybeRefOrGetter<P>, options?: UntilToMatchOptions) => Not extends true ? Promise<T> : Promise<P>;
    toBeTruthy: (options?: UntilToMatchOptions) => Not extends true ? Promise<T & Falsy> : Promise<Exclude<T, Falsy>>;
    toBeNull: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, null>> : Promise<null>;
    toBeUndefined: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, undefined>> : Promise<undefined>;
    toBeNaN: (options?: UntilToMatchOptions) => Promise<T>;
}
interface UntilArrayInstance<T> extends UntilBaseInstance<T> {
    readonly not: UntilArrayInstance<T>;
    toContains: (value: MaybeRefOrGetter<ElementOf<ShallowUnwrapRef<T>>>, options?: UntilToMatchOptions) => Promise<T>;
}
/**
 * Promised one-time watch for changes
 *
 * @see https://vueuse.org/until
 * @example
 * ```
 * const { count } = useCounter()
 *
 * await until(count).toMatch(v => v > 7)
 *
 * alert('Counter is now larger than 7!')
 * ```
 */
declare function until<T extends unknown[]>(r: WatchSource<T> | MaybeRefOrGetter<T>): UntilArrayInstance<T>;
declare function until<T>(r: WatchSource<T> | MaybeRefOrGetter<T>): UntilValueInstance<T>;

export { until };
export type { UntilArrayInstance, UntilBaseInstance, UntilToMatchOptions, UntilValueInstance };
