import { square, blank, stack_frac, beside_frac, show, random_color, red, green } from "rune";

function selection_sort(xs) {
    
    function find_max(lst, max) {
        return is_null(lst)
               ? max
               : head(lst) > max
               ? find_max(tail(lst), head(lst))
               : find_max(tail(lst), max);
    }
    
    display_chart(xs, x => x);
    const lst_final = selection_sort_helper(xs, list(), 0, find_max(xs, -999), 0);
    display_chart(lst_final, green);
    return lst_final;
}

function selection_sort_helper(xs, new_list, iter_count, max, min) {
    
    function find_min_pos(lst, min, count, res) {
        return is_null(lst)
               ? res
               : head(lst) < min
               ? find_min_pos(tail(lst), head(lst), count + 1, count)
               : find_min_pos(tail(lst), min, count + 1, res);
    }
    
    function find_max(lst, max) {
        return is_null(lst)
               ? max
               : head(lst) > max
               ? find_max(tail(lst), head(lst))
               : find_max(tail(lst), max);
    }
    
    
    function find_min(lst, min) {
        return is_null(lst)
               ? min
               : head(lst) < min
               ? find_min(tail(lst), head(lst))
               : find_min(tail(lst), min);
    }
    
    function display_minimum_chart(lst, target_pos, iter_count, count) {
        if (target_pos === count - iter_count) {
            if (is_null(tail(lst))) {
                return get_stack(head(lst), max, min, red);
            } else {
                return beside_frac(1 / length(lst),
                    get_stack(head(lst), max, min, red),
                    display_minimum_chart(tail(lst), target_pos, iter_count, count + 1));
            }
        } else if (is_null(tail(lst))) {
            return get_stack(head(lst), max, min, x => x);
        } else if (iter_count > count) {
            return beside_frac(1 / length(lst),
                get_stack(head(lst), max, min, green),
                display_minimum_chart(tail(lst), target_pos, iter_count, count + 1));
        } else {
            return beside_frac(1 / length(lst),
                get_stack(head(lst), max, min, x => x),
                display_minimum_chart(tail(lst), target_pos, iter_count, count + 1));
        }
    }
    
    function get_stack(val, max, min, color_func) {
        const frac = 1 - (val + min) / (max + min);
        return stack_frac(frac, blank, color_func(square));
    }
    
    if (is_null(xs)) {
        return new_list;
    } else {
        const count = find_min_pos(xs, 999, 0, -1);
        const x = find_min(xs, 999);
        const lst_new = append(new_list, xs);
        show(display_minimum_chart(lst_new, count, iter_count, 0));
        return selection_sort_helper(remove(x, xs), append(new_list, list(x)), iter_count + 1, max, min);
    }
    
}

function display_chart(lst, color_func) {
    
    // Finds the maximum element of the list
    function find_max(lst, max) {
        return is_null(lst)
               ? max
               : head(lst) > max
               ? find_max(tail(lst), head(lst))
               : find_max(tail(lst), max);
    }
    
    // Finds the minimum element of the list, for negative value
    // readjustment
    function find_min(lst, min) {
        return is_null(lst)
               ? min
               : head(lst) < min
               ? find_min(tail(lst), head(lst))
               : find_min(tail(lst), min);
    }
    
    const max = find_max(lst, -999);
    const min = find_min(lst, 999);
    
    // Generates a display chart based on the proportion of each
    // element against the maximum
    function chartify(lst, count, min_to_add) {
        const rune = color_func(square);
        const frac_for_stack  = 1 - (head(lst) + min_to_add) / (max + min_to_add);
        if (is_null(tail(lst))) {
            return stack_frac(frac_for_stack, blank, rune);
        } else {
            return beside_frac(
                1 / count,
                stack_frac(frac_for_stack, blank, rune),
                chartify(tail(lst), count - 1, min_to_add));
        }
    }
    
    if (min < 0) {
        show(chartify(lst, length(lst), -1 * min));
    } else {
        show(chartify(lst, length(lst), 0));
    }
}

// TEST
const lst = list(1, 5, 4, 3, 7, 8, 9, 10, 2, 4);
const lst2 = list(7, 9, 17, 2, 4, 1, 6, 4, 15, 12, 14, 13, 7, 8, 9);
selection_sort(lst2);