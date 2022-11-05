// SOLUTIONS - EXTRA MOCK PRACTICAL ASSESSMENT

// TASK 1 - String It Like You Mean It

// UTILITIES

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

function string_length(s) {
    function helper(pos) {
        return char_at(s, pos) === undefined
               ? pos
               : helper(pos + 1);
    }
    return helper(0);
}

// TASK 1A: Reflecting a String

function self_reflect(s) {
    let result = s;
    const len = string_length(s);
    for (let i = 0; i < len; i = i + 1) {
        result = result + char_at(s, len - 1 - i);
    }
    return result;
}

function self_reflect_alt(s) {
    const original = string_to_list(s);
    const flipped = reverse(original);
    return list_to_string(append(original, flipped));
}

// TASK 1B: Check For Palindromes

function is_palindrome(s) {
    const len = string_length(s);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        if (char_at(s, i) !== char_at(s, len - i - 1)) {
            return false;
        } else { }
    }
    return true;
}

function is_palindrome_alt(s) {
    const original = string_to_list(s);
    const flipped = reverse(original);
    return equal(original, flipped);
}

// TASK 1C: Generate Palindrome

function generate_palindrome(s) {
    
    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }
    
    function remove_duplicates(xs) {
        return is_null(xs) 
              ? null
              : pair(head(xs), 
                      remove_duplicates(filter(p => !equal(p, head(xs)), 
                                        tail(xs))));
    }
    
    const xs = string_to_list(s);
    const words = permutations(xs);
    return map(list_to_string, remove_duplicates(filter(is_palindrome, words)));
    
}

// TASK 2 - A Multiverse of Sequences

// TASK 2A: Arithmetic Sequence
function arithmetic_sequence(a, d) {
    return pair(a, () => arithmetic_sequence(a + d, d));
}

// TASK 2B: Geometric Sequence
function geometric_sequence(a, r) {
    return pair(a, () => geometric_sequence(a * r, r));
}

// TASK 2C: Recurrence Relation
function recurrence(t1, t2, f) {
    return pair(t1, () => recurrence(t2, f(t1, t2), f));
}

// TASK 2D: Zip Sequences
function zip_sequence(xs) {
    const seq = head(xs);
    return pair(head(seq), () => zip_sequence(append(tail(xs), list(stream_tail(seq)))));
}

// TASK 2E: Sum Sequences
function sum_sequence(xs) {
    function add_stream(s1, s2) {
        return is_null(s1)
               ? s2
               : is_null(s2)
               ? s1
               : pair(head(s1) + head(s2), () => add_stream(stream_tail(s1), stream_tail(s2)));
    }
    return accumulate(add_stream, null, xs);
}

const seq_a = arithmetic_sequence(100, 1); // returns 100, 101, 102, 103, ...
const seq_b = geometric_sequence(2, 2); // returns 2, 4, 8, 16, 32, ...
const seq_c = recurrence(1, 1, (a, b) => a + b); // returns 1, 1, 2, 3, 5, 8, ...

const seq_d = zip_sequence(list(seq_a, seq_b, seq_c));
const seq_e = sum_sequence(list(seq_a, seq_b, seq_c));

stream_ref(seq_e, 0);

// TASK 3: Traverse Matrix Diagonally

function traverse_diagonally(M) {
    
    const len = array_length(M);
    const times = len * 2 - 1;
    
    function transpose_even(M) {
        function swap(r1, c1, r2, c2) {
            let temp = M[r1][c1];
            M[r1][c1] = M[r2][c2];
            M[r2][c2] = temp;
        }
        for (let i = 0; i < len; i = i + 1) {
            for (let j = i + 1; j < len; j = j + 1) {
                if ((i + j) % 2 === 1) {
                    swap(i, j, j, i);
                }
            }
        }
    }
    
    let lst = list();
    
    transpose_even(M);
    
    function travel(i, j) {
        if (i >= 0 && j < len) {
            if (M[i] === undefined || M[i][j] === undefined) {
                travel(i - 1, j + 1);
            } else {
                lst = append(lst, list(M[i][j]));
                travel(i - 1, j + 1);
            }
        }
    }
    
    for (let t = 0; t < times; t = t + 1) {
        travel(t, 0);
    }
    
    return lst;
}

const matrix = [[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]];

traverse_diagonally(matrix);

// TASK 4: Manipulating Matrices

function find_shortest_path(M) {
    const rows = array_length(M);
    const cols = array_length(M[0]);
    for (let i = rows - 1; i >= 0; i = i - 1) {
        for (let j = cols - 1; j >= 0; j = j - 1) {
            let down = null;
            let right = null;
            if (M[i + 1] !== undefined) {
                down = M[i + 1][j];
            } 
            if (M[i][j + 1] !== undefined) {
                right = M[i][j + 1];
            }
            M[i][j] = is_null(down)
                      ? (is_null(right)) ? M[i][j] : M[i][j] + right
                      : (is_null(right)) ? M[i][j] + down : M[i][j] + math_min(down, right);
        }
    }
    return M[0][0];
}

const rooms = [[1, 2, 3, 4], 
		       [5, 0, 7, 7], 
		       [9, 0, 1, 0], 
		       [5, 1, 7, 0], 
			   [6, 1, 1, 1]];
							 
find_shortest_path(rooms);
