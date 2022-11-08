# Compiled Practical Assessment Reference Sheet

Contains contents from several lecture materials and most (if not all) studio sheet materials

- [List Operations](#list-operations)
    + [Length](#length)
    + [Append](#append)
    + [Reverse (Runtime Friendly)](#reverse--runtime-friendly-)
    + [Map](#map)
    + [Accumulate](#accumulate)
    + [Filter](#filter)
    + [Permutations](#permutations)
    + [Subsets](#subsets)
    + [Remove Duplicates](#remove-duplicates)
- [Tree Processing](#tree-processing)
    + [Scale Tree](#scale-tree)
    + [Map Tree](#map-tree)
    + [Count Data Items](#count-data-items)
- [Binary Search and Sorting](#binary-search-and-sorting)
- [Recursion and Memoization](#recursion-and-memoization)
    + [Coin Change Problem](#coin-change-problem)
    + [Memoised Fibonacci (a.k.a. template for 1D memoisation)](#memoised-fibonacci--aka-template-for-1d-memoisation-)
    + [Memoisation (2D)](#memoisation--2d-)
- [Arrays](#arrays)
    + [Swap](#swap)
    + [Reverse Array (1D)](#reverse-array--1d-)
    + [Transpose Matrix](#transpose-matrix)
    + [Flip Matrix Horizontally](#flip-matrix-horizontally)
- [Stream Operations](#stream-operations)
    + [Scale Stream](#scale-stream)
    + [Add Streams](#add-streams)
    + [Multiply Streams](#multiply-streams)
    + [Stream Pairs](#stream-pairs)
    + [Integers (One-Liner)](#integers--one-liner-)
- [Utilities (String, List, Array)](#utilities--string--list--array-)
    + [String Length](#string-length)
    + [String To List](#string-to-list)
    + [List To String](#list-to-string)
    + [Array To List](#array-to-list)
    + [List to Array](#list-to-array)
    + [Array to String](#array-to-string)
    + [String to Array](#string-to-array)
- [Predeclared in Source Academy](#predeclared-in-source-academy)
    + [Pair and List Functions](#pair-and-list-functions)
    + [Stream Functions](#stream-functions)
    + [Type Checking](#type-checking)
    + [Math Functions](#math-functions)
    + [Others](#others)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


# List Operations

### Length

```jsx
function length ( xs ) {
    return is_null ( xs )
           ? 0
           : 1 + length ( tail ( xs ));
}

function length_iter(xs) {
    function len(xs, counted_so_far) {
        return is_null(xs)
               ? counted_so_far
               : len(tail(xs), 
                     counted_so_far + 1);
    }
    return len(xs, 0);
}
```

### Append

```jsx
function append ( xs , ys ) {
    return is_null ( xs )
           ? ys
           : pair ( head ( xs ) ,
                    append ( tail ( xs ) , ys ));
}
```

### Reverse (Runtime Friendly)

```jsx
function reverse(xs) {
    function rev(original, reversed) {
        return is_null(original)
            ? reversed
            : rev(tail(original), 
                pair(head(original), 
                    reversed));
    }
    return rev(xs, null);
}
```

### Map

```jsx
function map(fun, xs) {
    return is_null(xs) 
        ? null
        : pair(fun(head(xs)),
               map(fun, tail(xs)));
}
```

### Accumulate

```jsx
function accumulate(f, initial, xs) {
  return is_null(xs)
    ? initial
    : f(head(xs), accumulate(f,initial,tail(xs)));
}
```

### Filter

```jsx
function filter ( pred , xs ) {
    return is_null ( xs )
           ? xs
           : pred ( head ( xs ))
           ? pair ( head ( xs ) , filter ( pred , tail ( xs )))
           : filter ( pred , tail ( xs ));
}
```

### Permutations

```jsx
function permutations(ys) {
    return is_null(ys)
        ? list(null)
        : accumulate(append, null,
            map(x => map(p => pair(x, p),
                         permutations(remove(x, ys))),
                ys));
}
```

### Subsets

```jsx
function subsets(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        const subsets_rest = subsets(tail(xs));
        const x = head(xs);
        const has_x = map(s =>pair(x, s), subsets_rest);
        return append(subsets_rest, has_x);
		}
}
```

### Remove Duplicates

```jsx
function remove_duplicates(xs) {
    return is_null(xs) 
          ? null
          : pair(head(xs), 
                  remove_duplicates(filter(p => !equal(p, head(xs)), 
                                    tail(xs))));
}
```

# Tree Processing

### Scale Tree

```jsx
function scale_tree(tree, factor) {
    return map(sub_tree =>
                 ! is_list(sub_tree)
                 ? factor * sub_tree
                 : scale_tree(sub_tree, factor),
               tree);
}
```

### Map Tree

```jsx
function map_tree(f, tree) {
    return map(sub_tree =>
        ! is_list(sub_tree)
        ? f(sub_tree)
        : map_tree(f, sub_tree),
        tree);
}
```

### Count Data Items

```jsx
function count_data_items(tree) {
  return is_null(tree)
      ? 0
      : (is_list(head(tree))
          ? count_data_items(head(tree))
          : 1) 
        + 
        count_data_items(tail(tree));
}
```

# Binary Search and Sorting

Check Lecture 6 ([Luminus Link](https://luminus.nus.edu.sg/modules/9f641e15-9e65-4bd4-a5e8-2ca7cf6e4864/files/b7be6641-4d14-493b-a3e2-14c9e73bdc32))

# Recursion and Memoization

### Coin Change Problem

```jsx
function cc ( amount , kinds_of_coins ) {
    return amount === 0
           ? 1
           : amount < 0 || kinds_of_coins === 0
           ? 0
           : cc ( amount - first_denomination ( kinds_of_coins ) ,
              kinds_of_coins )
              +
             cc ( amount , kinds_of_coins - 1);
}

function first_denomination ( kinds_of_coins ) {
    return kinds_of_coins === 1 ? 5 :
           kinds_of_coins === 2 ? 10 :
           kinds_of_coins === 3 ? 20 :
           kinds_of_coins === 4 ? 50 :
           kinds_of_coins === 5 ? 100 : 0;
}
```

### Memoised Fibonacci (a.k.a. template for 1D memoisation)

```jsx
// array mem serves as memory for
// already computed results of mfib
const mem = [];

function mfib(n) {
    // test if mfib(k) has been computed already
    if (mem[n] !== undefined) {
        return mem[n]; // just access memory
    } else { // compute fib and add result to mem
        const result = n <= 1 ? n : mfib(n - 1) + mfib(n - 2);
        mem[n] = result;
        return result;
    }
}
```

### Memoisation (2D)

Take note the location of `mem`, whether it should be in a global variable or local variable (inside the function)

```jsx
const mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}
```

# Arrays

### Swap

```jsx
function swap(A, i, j) {
    let temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
```

### Reverse Array (1D)

```jsx
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    let i = 0;
    while (i < half_len) {
        const j = len - 1 - i;
        swap(A, i, j);
        i = i + 1;
    }
}
```

### Transpose Matrix

```jsx
function transpose_matrix(M) {
    const n = array_length(M);  // M is assumed n x n.
    for (let r = 0; r < n; r = r + 1) {
        for (let c = r + 1; c < n; c = c + 1) {
            swap(r, c, c, r);
        }
    }
}
```

### Flip Matrix Horizontally

```jsx
function flip_matrix(M) {
    const n = array_length(M);
    const half_n = math_floor(n / 2);
    for (let r = 0; r < n; r = r + 1) {
        for (let c = 0; c < half_n; c = c + 1) {
            swap(r, c, r, n - c - 1);
        }
    }
}
```

# Stream Operations

### Scale Stream

`stream_map` is predeclared in Source 4, if implementation is needed, please refer to lecture L10

```jsx
function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}
```

### Add Streams

```jsx
function add_streams(s1, s2) {
    return is_null(s1)
           ? s2
           : is_null(s2)
           ? s1
           : pair(head(s1) + head(s2),
                  () => add_streams(stream_tail(s1), stream_tail(s2)));
}
```

### Multiply Streams

```jsx
function mul_streams(a,b) {
    return pair(head(a) * head(b),
                () => mul_streams(stream_tail(a), stream_tail(b)));
}
```

### Stream Pairs

```jsx
function stream_pairs(s) {
    return is_null(s)
           ? null
           : stream_append(
                 stream_map(sn => pair(head(s), sn), stream_tail(s)),
                 stream_pairs(stream_tail(s)));
}
```

### Integers (One-Liner)

```jsx
const ones = pair(1, () => ones);
const integers = pair(1, () => add_streams(ones, integers));
```

# Utilities (String, List, Array)

### String Length

```jsx
// Retrieves the length of the string
// Time: O(n), Space: O(1)
function string_length(s) {
    function helper(pos) {
        return char_at(s, pos) === undefined
               ? pos
               : helper(pos + 1);
    }
    return helper(0);
}
```

### String To List

```jsx
// Converts a string to list of characters
// Time: O(n), Space: O(n)
function string_to_list(s) {
    function helper(pos) {
        return char_at(s, pos) === undefined
               ? null
               : pair(char_at(s, pos), helper(pos + 1));
    }
    return helper(0);
}
```

### List To String

```jsx
// Converts a list of characters to a string
// Time: O(n), Space: O(1)
function list_to_string(xs) {
    function helper(xs, result) {
        return is_null(xs)    
               ? result
               : helper(tail(xs), result + head(xs));
    }
    return helper(xs, "");
}
```

### Array To List

```jsx
function array_to_list(M) {
    const len = array_length(M);
    function helper(n) {
        return n === len
               ? null
               : pair(M[n], helper(n + 1));
    }
    return helper(0);
}
```

### List to Array

```jsx
function list_to_array(xs) {
    const mem = [];
    function helper(xs, i) {
        if (is_null(xs)) {
            return mem;
        } else {
            mem[i] = head(xs);
            return helper(tail(xs), i + 1);
        }
    }
    return helper(xs, 0);
}
```

### Array to String

```jsx
function array_to_string(M) {
    const len = array_length(M);
    let result = "";
    for (let i = 0; i < len; i = i + 1) {
        result = result + M[i];
    }
    return result;
}
```

### String to Array

```jsx
function string_to_array(s) {
    const mem = [];
    let i = 0;
    while (char_at(s, i) !== undefined) {
        mem[i] = char_at(s, i);
        i = i + 1;
    }
    return mem;
}
```

# Predeclared in Source Academy

### Pair and List Functions

- [accumulate](https://docs.sourceacademy.org/source_4/global.html#accumulate)
- [append](https://docs.sourceacademy.org/source_4/global.html#append)
- [build_list](https://docs.sourceacademy.org/source_4/global.html#build_list)
- [display_list](https://docs.sourceacademy.org/source_4/global.html#display_list)
- [draw_data](https://docs.sourceacademy.org/source_4/global.html#draw_data)
- [enum_list](https://docs.sourceacademy.org/source_4/global.html#enum_list)
- [equal](https://docs.sourceacademy.org/source_4/global.html#equal)
- [filter](https://docs.sourceacademy.org/source_4/global.html#filter)
- [for_each](https://docs.sourceacademy.org/source_4/global.html#for_each)
- [head](https://docs.sourceacademy.org/source_4/global.html#head)
- [length](https://docs.sourceacademy.org/source_4/global.html#length)
- [list](https://docs.sourceacademy.org/source_4/global.html#list)
- [list_ref](https://docs.sourceacademy.org/source_4/global.html#list_ref)
- [list_to_stream](https://docs.sourceacademy.org/source_4/global.html#list_to_stream)
- [list_to_string](https://docs.sourceacademy.org/source_4/global.html#list_to_string)
- [map](https://docs.sourceacademy.org/source_4/global.html#map)
- [member](https://docs.sourceacademy.org/source_4/global.html#member)
- [pair](https://docs.sourceacademy.org/source_4/global.html#pair)
- [remove](https://docs.sourceacademy.org/source_4/global.html#remove)
- [remove_all](https://docs.sourceacademy.org/source_4/global.html#remove_all)
- [reverse](https://docs.sourceacademy.org/source_4/global.html#reverse)
- [set_head](https://docs.sourceacademy.org/source_4/global.html#set_head)
- [set_tail](https://docs.sourceacademy.org/source_4/global.html#set_tail)

### Stream Functions

- [build_stream](https://docs.sourceacademy.org/source_4/global.html#build_stream)
- [enum_stream](https://docs.sourceacademy.org/source_4/global.html#enum_stream)
- [eval_stream](https://docs.sourceacademy.org/source_4/global.html#eval_stream)
- [integers_from](https://docs.sourceacademy.org/source_4/global.html#integers_from)
- [stream](https://docs.sourceacademy.org/source_4/global.html#stream)
- [stream_append](https://docs.sourceacademy.org/source_4/global.html#stream_append)
- [stream_filter](https://docs.sourceacademy.org/source_4/global.html#stream_filter)
- [stream_for_each](https://docs.sourceacademy.org/source_4/global.html#stream_for_each)
- [stream_length](https://docs.sourceacademy.org/source_4/global.html#stream_length)
- [stream_map](https://docs.sourceacademy.org/source_4/global.html#stream_map)
- [stream_member](https://docs.sourceacademy.org/source_4/global.html#stream_member)
- [stream_ref](https://docs.sourceacademy.org/source_4/global.html#stream_ref)
- [stream_remove](https://docs.sourceacademy.org/source_4/global.html#stream_remove)
- [stream_remove_all](https://docs.sourceacademy.org/source_4/global.html#stream_remove_all)
- [stream_reverse](https://docs.sourceacademy.org/source_4/global.html#stream_reverse)
- [stream_tail](https://docs.sourceacademy.org/source_4/global.html#stream_tail)
- [stream_to_list](https://docs.sourceacademy.org/source_4/global.html#stream_to_list)
- [stringify](https://docs.sourceacademy.org/source_4/global.html#stringify)
- [tail](https://docs.sourceacademy.org/source_4/global.html#tail)
- [tokenize](https://docs.sourceacademy.org/source_4/global.html#tokenize)
- [undefined](https://docs.sourceacademy.org/source_4/global.html#undefined)

### Type Checking

- [is_array](https://docs.sourceacademy.org/source_4/global.html#is_array)
- [is_boolean](https://docs.sourceacademy.org/source_4/global.html#is_boolean)
- [is_function](https://docs.sourceacademy.org/source_4/global.html#is_function)
- [is_list](https://docs.sourceacademy.org/source_4/global.html#is_list)
- [is_null](https://docs.sourceacademy.org/source_4/global.html#is_null)
- [is_number](https://docs.sourceacademy.org/source_4/global.html#is_number)
- [is_pair](https://docs.sourceacademy.org/source_4/global.html#is_pair)
- [is_stream](https://docs.sourceacademy.org/source_4/global.html#is_stream)
- [is_string](https://docs.sourceacademy.org/source_4/global.html#is_string)
- [is_undefined](https://docs.sourceacademy.org/source_4/global.html#is_undefined)

### Math Functions

- [math_abs](https://docs.sourceacademy.org/source_4/global.html#math_abs)
- [math_acos](https://docs.sourceacademy.org/source_4/global.html#math_acos)
- [math_acosh](https://docs.sourceacademy.org/source_4/global.html#math_acosh)
- [math_asin](https://docs.sourceacademy.org/source_4/global.html#math_asin)
- [math_asinh](https://docs.sourceacademy.org/source_4/global.html#math_asinh)
- [math_atan](https://docs.sourceacademy.org/source_4/global.html#math_atan)
- [math_atan2](https://docs.sourceacademy.org/source_4/global.html#math_atan2)
- [math_atanh](https://docs.sourceacademy.org/source_4/global.html#math_atanh)
- [math_cbrt](https://docs.sourceacademy.org/source_4/global.html#math_cbrt)
- [math_ceil](https://docs.sourceacademy.org/source_4/global.html#math_ceil)
- [math_clz32](https://docs.sourceacademy.org/source_4/global.html#math_clz32)
- [math_cos](https://docs.sourceacademy.org/source_4/global.html#math_cos)
- [math_cosh](https://docs.sourceacademy.org/source_4/global.html#math_cosh)
- [math_E](https://docs.sourceacademy.org/source_4/global.html#math_E)
- [math_exp](https://docs.sourceacademy.org/source_4/global.html#math_exp)
- [math_expm1](https://docs.sourceacademy.org/source_4/global.html#math_expm1)
- [math_floor](https://docs.sourceacademy.org/source_4/global.html#math_floor)
- [math_fround](https://docs.sourceacademy.org/source_4/global.html#math_fround)
- [math_hypot](https://docs.sourceacademy.org/source_4/global.html#math_hypot)
- [math_imul](https://docs.sourceacademy.org/source_4/global.html#math_imul)
- [math_LN2](https://docs.sourceacademy.org/source_4/global.html#math_LN2)
- [math_LN10](https://docs.sourceacademy.org/source_4/global.html#math_LN10)
- [math_log](https://docs.sourceacademy.org/source_4/global.html#math_log)
- [math_log1p](https://docs.sourceacademy.org/source_4/global.html#math_log1p)
- [math_log2](https://docs.sourceacademy.org/source_4/global.html#math_log2)
- [math_LOG2E](https://docs.sourceacademy.org/source_4/global.html#math_LOG2E)
- [math_log10](https://docs.sourceacademy.org/source_4/global.html#math_log10)
- [math_LOG10E](https://docs.sourceacademy.org/source_4/global.html#math_LOG10E)
- [math_max](https://docs.sourceacademy.org/source_4/global.html#math_max)
- [math_min](https://docs.sourceacademy.org/source_4/global.html#math_min)
- [math_PI](https://docs.sourceacademy.org/source_4/global.html#math_PI)
- [math_pow](https://docs.sourceacademy.org/source_4/global.html#math_pow)
- [math_random](https://docs.sourceacademy.org/source_4/global.html#math_random)
- [math_round](https://docs.sourceacademy.org/source_4/global.html#math_round)
- [math_sign](https://docs.sourceacademy.org/source_4/global.html#math_sign)
- [math_sin](https://docs.sourceacademy.org/source_4/global.html#math_sin)
- [math_sinh](https://docs.sourceacademy.org/source_4/global.html#math_sinh)
- [math_sqrt](https://docs.sourceacademy.org/source_4/global.html#math_sqrt)
- [math_SQRT1_2](https://docs.sourceacademy.org/source_4/global.html#math_SQRT1_2)
- [math_SQRT2](https://docs.sourceacademy.org/source_4/global.html#math_SQRT2)
- [math_tan](https://docs.sourceacademy.org/source_4/global.html#math_tan)
- [math_tanh](https://docs.sourceacademy.org/source_4/global.html#math_tanh)
- [math_trunc](https://docs.sourceacademy.org/source_4/global.html#math_trunc)

### Others

- [apply_in_underlying_javascript](https://docs.sourceacademy.org/source_4/global.html#apply_in_underlying_javascript)
- [arity](https://docs.sourceacademy.org/source_4/global.html#arity)
- [array_length](https://docs.sourceacademy.org/source_4/global.html#array_length)
- [char_at](https://docs.sourceacademy.org/source_4/global.html#char_at)
- [display](https://docs.sourceacademy.org/source_4/global.html#display)
- [error](https://docs.sourceacademy.org/source_4/global.html#error)
- [Infinity](https://docs.sourceacademy.org/source_4/global.html#Infinity)
- [get_time](https://docs.sourceacademy.org/source_4/global.html#get_time)
- [NaN](https://docs.sourceacademy.org/source_4/global.html#NaN)
- [parse](https://docs.sourceacademy.org/source_4/global.html#parse)
- [parse_int](https://docs.sourceacademy.org/source_4/global.html#parse_int)
- [prompt](https://docs.sourceacademy.org/source_4/global.html#prompt)
