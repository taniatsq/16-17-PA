// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 1A
////////////////////////////////////////////////////////////

function is_nucleobase(s) {

    // WRITE HERE.
    return is_string(s)
            ? s === "G" || s === "C" || s === "A" || s=== "T"
            : false;
}
is_nucleobase("B");


////////////////////////////////////////////////////////////
// Question 1B
////////////////////////////////////////////////////////////


function is_dna_strand(xs) {

    // WRITE HERE.
    function helper (xs) {
        return is_null(xs)
            ? null
            : !is_nucleobase(head(xs))
            ? pair(head(xs), helper(tail(xs)))
            : helper(tail(xs));
    }
    return is_null(helper(xs));

}
is_dna_strand(list("A", "G", "A")); // true 
//is_dna_strand(list("A", "B", "B", "A")); // false 
//is_dna_strand(list("T", "G", "C")); // true 
//is_dna_strand(list("T", "G", "Otto")); // false



// ////////////////////////////////////////////////////////////
// // Question 1C
// ////////////////////////////////////////////////////////////

function combine(xss) {

    // WRITE HERE.
    return is_null(xss)
            ? null 
            : append(head(xss), combine (tail(xss)));
}

combine(list(list("A", "G", "A"),
             list("G", "C", "T", "A"), list("C")));

// ////////////////////////////////////////////////////////////
// // Question 1D
// ////////////////////////////////////////////////////////////

function oxoguanine_repair(xs) {

    // WRITE HERE.
    return is_null(xs)
            ? null 
            : head(xs) === "8"
            ? pair("G", oxoguanine_repair(tail(xs)))
            : pair(head(xs), oxoguanine_repair(tail(xs)));

}

oxoguanine_repair(
           list("C", "8", "A", "8", "C", "T", "A", "C"));

// ////////////////////////////////////////////////////////////
// // Question 1E
// ////////////////////////////////////////////////////////////

function find_gene_start(xs) {

    // WRITE HERE.
    return is_null(xs) 
            ? null  
            : head(xs) === "A" && head(tail(xs)) === "T" && head(tail(tail(xs))) === "G"
            ? list(tail(tail(tail(xs))))
            : find_gene_start(tail(xs));

}

find_gene_start(list("A", "C", "A", "T", "G", "T", "A", "C")); // returns list(list("T", "A", "C"))
find_gene_start(list("A", "T", "A", "G", "T", "A", "T", "G")); // returns list(null)
find_gene_start(list("A", "T", "A", "G", "T", "A", "C", "G"));
// returns null

// ////////////////////////////////////////////////////////////
// // Question 1F
// ////////////////////////////////////////////////////////////

function find_gene_end(xs) {

    // WRITE HERE.
    //const x = xs;
    function h (xs) {
        return is_null(tail(tail(xs)))
            ? null  
            : head(xs) === "T" && head(tail(xs)) === "A" && head(tail(tail(xs))) === "G"
            || head(xs) === "T" && head(tail(xs)) === "A" && head(tail(tail(xs))) === "A"
            || head(xs) === "T" && head(tail(xs)) === "G" && head(tail(tail(xs))) === "A"
            ? null
            : pair(head(xs), find_gene_end(tail(xs)));
    }
    
}
//display(list(list("A", "T", "A", "C")));

find_gene_end(list("A", "T", "A", "C", "T", "A", "G", "A", "T", "A", "A"));
// returns 
//find_gene_end(list("T", "G", "A", "A", "T", "A", "C")); 
// returns list(null)
//find_gene_end(list("A", "T", "A", "C", "C", "A", "G", "A", "T"));


// ////////////////////////////////////////////////////////////
// // Question 1G
// ////////////////////////////////////////////////////////////

// function all_genes(xs) {

//     // WRITE HERE.
    

// }


// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 2A
////////////////////////////////////////////////////////////

function all_different(nums) {

    //WRITE HERE.
    //display(member(head(nums), tail(nums)));
    return is_null(tail(nums))
            ? true
            : is_null(member(head(nums), tail(nums)))
            ? all_different(tail(nums))
            : false;
 

}
all_different(list(23));
// returns true
//all_different(list(2, 5, 1, 6, 7, 4, 3));
// returns true
//all_different(list(2, 6, 1, 7, 6, 4, 3));
// returns false


////////////////////////////////////////////////////////////
// Question 2B
////////////////////////////////////////////////////////////
function in_minmax_range (nums, min, max) {
        return is_null(nums)
                ? true
                : min <= head(nums) && head(nums) <= max
                ? in_minmax_range(tail(nums), min, max)
                : false;
    }


function is_valid_toto_set(nums, n, min, max) {

    // WRITE HERE.
    return length(nums) === n && all_different(nums) && in_minmax_range(nums, min, max);

}

const nums = list(5, 1, 8, 49);
const n = 6;
const min = 1;
const max = 49; is_valid_toto_set(nums, n, min, max); // returns false

// ////////////////////////////////////////////////////////////
// // Question 2C
// ////////////////////////////////////////////////////////////



function num_of_matches(numsA, numsB) {

    // WRITE HERE.
    function helper (numsA, numsB) {
        return is_null(numsA) || is_null(numsB)
            ? null 
            : is_null(member(head(numsA), numsB))
            ? helper(tail(numsA), numsB)
            : pair(head(numsA), helper(tail(numsA), numsB));
    }
    return length(helper(numsA, numsB));
}
const numsA = list(23, 4, 7, 5); 
const numsB = list(5, 4, 7); 
num_of_matches(numsA, numsB);
//helper(numsA, numsB);



// ////////////////////////////////////////////////////////////
// // Question 2D
// ////////////////////////////////////////////////////////////

function check_winning_group(bet_nums, draw_nums, extra_num) {

    // WRITE HERE.
    const n = length(draw_nums);
    //display(num_of_matches(bet_nums, draw_nums));
    return num_of_matches(bet_nums, draw_nums) === n
            ? 1
            : num_of_matches(bet_nums, draw_nums) === n-1 && !is_null(member(extra_num, bet_nums))
            ? 2
            : num_of_matches(bet_nums, draw_nums) === n-1
            ? 3
            : num_of_matches(bet_nums, draw_nums) === n-2 && !is_null(member(extra_num, bet_nums))
            ? 4
            : num_of_matches(bet_nums, draw_nums) === n-2
            ? 5
            : 0;

}

const bet_nums = list(40, 30, 1, 49, 3, 15);
const draw_nums = list(5, 2, 3, 15, 40, 49);
const extra_num = 27;
check_winning_group(bet_nums, draw_nums, extra_num); // returns 2


// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 3A
////////////////////////////////////////////////////////////

function evaluate_BAE_tree(bae_tree) {

    // WRITE HERE.
    return is_number(bae_tree)
            ? bae_tree
            : 

}

const bae_tree = list(2, "+", 5); 
evaluate_BAE_tree(bae_tree);

////////////////////////////////////////////////////////////
// Question 3B
////////////////////////////////////////////////////////////

// function build_BAE_tree(bae_list) {

//     // WRITE HERE.

// }



// ////////////////////////////////////////////////////////////
// // Question 3C
// ////////////////////////////////////////////////////////////

// function evaluate_BAE(bae_list) {

//     // WRITE HERE.

// }



// ////////////////////////////////////////////////////////////
// // Question 3D
// ////////////////////////////////////////////////////////////

// function check_parentheses(paren_list) {

//     // WRITE HERE.

// }

