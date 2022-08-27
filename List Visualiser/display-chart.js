import { square, blank, stack_frac, beside_frac, show, random_color } from "rune";

/**
 * Displays a proportional chart based on the inputs of the list.
 * Takes in a list of integers and displays the chart without 
 * axes or numbers.
 * 
 * @param lst List of integers
 */
function display_chart(lst) {
    
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
        const rune = random_color(square);
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

const lst = list(1, 5, 4, 3, 7, 8, 9, 10, -1, 4);
display_chart(lst);