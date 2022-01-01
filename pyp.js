function identity(n) {
    let M = [];
    for (let a = 0; a < n; a = a + 1) {
        M[a] = [];
        for (let b = 0; b < n; b = b + 1) {
            M[a][b] = 0;
        }
    }
    for (let c = 0; c < n; c = c + 1) {
        M[c][c] = 1;
    }
    return M;
}

function zip_array(arr1, arr2) {
    const M = [];
    let pos = 0;
    let counter = 0;
    const max = 2 * array_length(arr1);
    while (counter < max) {
        M[counter] = arr1[pos];
        M[counter + 1] = arr2[pos];
        pos = pos + 1;
        counter = counter + 2;
    }
    return M;
}

function last_pair(xs) {
    return is_null(tail(xs))
            ? xs
            : last_pair(tail(xs));
}


function copy(xs) {
    return map(x => x, xs);
}

function hoopify(xs) {
    let new_list = copy(xs);
    set_tail(last_pair(new_list), new_list);
    return new_list;
}

hoopify(list(1, 2, 3, 4));

function partially_hoopify(xs, m) {
    function tailer(xs, m) {
        return m === 0
               ? xs
               : tail(tailer(xs, m - 1));
    }
    let new_list = copy(xs);
    set_tail(last_pair(new_list), tailer(new_list, m));
    return new_list;
}

const test = partially_hoopify(list(1, 2, 3, 4, 5), 2);
list_ref(test, 8);

// 

const hh1 = pair(undefined, undefined);
const hh2 = pair(undefined, undefined);
const hh3 = pair(undefined, undefined);

set_head(hh1, hh1);
set_tail(hh1, hh1);

set_head(hh2, pair(null, null));
set_head(head(hh2), head(hh2));
set_tail(head(hh2), hh2);
set_tail(hh2, hh2);

set_head(hh3, pair(null, null));
set_head(head(hh3), hh3);
set_tail(head(hh3), hh3);
set_tail(hh3, head(hh3));

draw_data(hh1);
draw_data(hh2);
draw_data(hh3);

function is_hula_hoop(x) {
    if (is_pair(x)) {
        return equal(head(x), x)
               ? true
               : equal(tail(x), x)
               ? true
               : equal(head(x), head(x))
               ? true
               : equal(tail(x), tail(x))
               ? true
               : false;
    } else {
        return false;
    }
}

function hula_sol(x) {
    let pairs = null;
    function check(y) {
        if (is_pair(y)) {
            if (!is_null(member(y, pairs))) {
                return true;
            } else {
                pairs = pair(y, pairs);
                return check(head(y)) && check(tail(y));
            }
        } else {
            return false;
        }
    }
    return check(x);
}

display(hula_sol(hh3));

// SCREAMS
function scream_ref(s, n) {
    function helper(s, i, k) {
        return k === 0
               ? head(s)
               : helper(tail(s)(s, i + 1), i + 1, k - 1);
    }
    return helper(s, 0, n);
}

const factorials =
    pair(1, (s, i) => pair(head(s) * i, tail(factorials)));
    
scream_ref(factorials, 5);

const pi_square_series = 
    pair(0, (s, i) => pair(head(s) + 6 / math_pow(i, 2),
                           tail(pi_square_series)));

const fibonacci =
    pair(0,
        (s1, ignore) =>
            pair(1,
                (s2, ignore) =>
                    pair(head(s1) + head(s2),
                        (s3, ignore) =>
                            tail(tail(s1)(s2, 0))(s3, 0))));

scream_ref(fibonacci, 7);

// Question 1

// 1A   T
// 1B   F
// 1C   T
// 1D   T

// Question 2

// 2A   F
// 2B   T
// 2C   F
// 2D   T

// Question 3

// 3A   F
// 3B   T
// 3C   T
// 3D   T

// Question 4

function mystery(x) {
    if (x === 0) {
        return null;
    } else {
        const ys = mystery(x - 1);
        return pair(ys, ys);
    }
}

display(mystery(4) === mystery(4));
display(equal(mystery(5), mystery(5)));
display(equal(head(mystery(3)), head(mystery(3))));
display(head(mystery(7)) === head(mystery(7)));
display(head(mystery(6)) === tail(mystery(6)));

// Question 6
// Definition: Arraytree is array whose elements are numbers / arraytrees

function tree_to_arraytree(xs) {
    let counter = 0;
    const M = [];
    while (!is_null(xs)) {
        is_list(head(xs))
        ? M[counter] = tree_to_arraytree(head(xs))
        : M[counter] = head(xs);
        counter = counter + 1;
        xs = tail(xs);
    }
    return M;
}

display(tree_to_arraytree(list(list(1, 2), 3, list(4))));

function arraytree_to_tree(a) {
    const len = array_length(a);
    let curr = null;
    let counter = 0;
    while (counter < len) {
        if (is_array(a[counter])) {
            curr = append(curr, list(arraytree_to_tree(a[counter])));
        } else {
            curr = append(curr, list(a[counter]));
        }
        counter = counter + 1;
    }
    return curr;
}

display_list(arraytree_to_tree([[1, 2], 3, [4]]));

// List permutations:

function permutations(s) {
    return is_null(s)
        ? list(null)
        : accumulate(append, null,
            map(x => map(p => pair(x, p),
                        permutations(remove(x, s))), s));
}

// Binary permutations

function perms01(n, m) {
    const zeroes_list = build_list(x => 0, n);
    const ones_list = build_list(x => 1, m);
    const mixed_list = append(zeroes_list, ones_list);
    let new_list = permutations(mixed_list);
    let filtered = null;
    while (!is_null(new_list)) {
        filtered = append(filtered, list(head(new_list)));
        new_list = remove_all(head(new_list), new_list);
    }
    return filtered;
}

display_list(perms01(1, 2));

function perms(n, m) {
    if (n === 0 && m === 0) {
        return list(null);
    } else {
        const p0 = n > 0
                   ? map(p => pair(0, p), perms(n - 1, m))
                   : null;
        const p1 = m > 0
                   ? map(p => pair(1, p), perms(n, m - 1))
                   : null;
        return append(p0, p1);
    }
}

function two_d_memoize(f) {
    const mem = [];
    function read(x, y) {
        return mem[x] === undefined
               ? undefined
               : mem[x][y];
    }
    function write(x, y, value) {
        if (mem[x] === undefined) {
            mem[x] = [];
        } else {
        }
        mem[x][y] = value;
    }
    function mf(x, y) {
        const mem_xy = read(x, y);
        if (mem_xy !== undefined) {
            return mem_xy;
        } else {
            const result = f(x, y);
            write(x, y, result);
            return result;
        }
    }
    return mf;
}

const perms_memo = two_d_memoize(perms);
perms_memo(1, 2);

