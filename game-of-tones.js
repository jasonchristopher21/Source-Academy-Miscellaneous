import {letter_name_to_midi_note, consecutively, silence_sound, noise_sound, play, cello, piano, simultaneously} from "sounds";

function generate_list_of_note(letter_name, list_of_interval) {
    function new_interval_list(xs, previous_head) {
        if (is_null(xs)) {
            return null;
        } else {
            const current_head_sum = head(xs) + previous_head;
            return pair(current_head_sum, 
                        new_interval_list(tail(xs), current_head_sum));
        }
    }
    const midi_name = letter_name_to_midi_note(letter_name);
    return map(x => midi_name + x, 
               new_interval_list(list_of_interval, 0));
}

function pairmaker(list_sound, list_duration, instrument) {
    return is_null(list_sound) || is_null(list_duration)
           ? null
           : pair(instrument(head(list_sound), head(list_duration)), 
                  pairmaker(tail(list_sound), tail(list_duration), instrument));
}

/*
const beat_ref = list(60 / 400, 60 / 200, 60 / 100, 180 / 200, 60 / 50, 90 / 200);
// const vocal_song = list(5,-1,-2,2,-4,2,-2,7,2,-4,2,-3,1,-3,2,-4,0,9,-1,-8,8,-1,-7,7,-1,-2,-1,-7,5,0,2,-2,-2,-1,-4,5,0,2,3,-1,-4,7,0,-7,0,7,0,-7,4,0,5,0,2,1,-1,-2,-5,0,5,0,2,1,-1,-2,-2,2);
//             const vocal_time = list(1, 1, 1,2, 1,1, 1,1,0, 5,0, 5,0, 5,0, 2,0,2, 5, 0,2, 5, 0,2, 5, 5, 1, 1,1,1,1, 2, 1, 1, 1,1,1, 0, 0,0,0, 0,0,0,0, 0,0,0,0,0,0,0, 0, 0, 0,0,0,0,0,0, 0, 0, 0,0, 0,0);
// const new_duration = map(x => list_ref(beat_ref, x), vocal_time);
// const new_interval = generate_list_of_note("D4", vocal_song);


const cicak_di_dinding = list(7, -3, 3, -3, 0, 1, 2, -2, -3, 3, 4, -2, -2, -1);
const beats =            list(1, 1, 1, 1, 1, 1, 2,    1,  1, 1, 1,  1,  1,  2);
const new_duration = map(x => list_ref(beat_ref, x), beats);
const new_interval = generate_list_of_note("A3", cicak_di_dinding);

play(simultaneously(list(consecutively(pairmaker(new_interval, new_duration, cello)))));
*/

const beat = 60/130;
const beat_ref = list(beat/2, beat, 2*beat, 3*beat, 4*beat, 3*beat/4, beat/4, 7*beat/4, 3*beat/2);

const vocal_song = list(12,-1,-4,0,2,-5,-2,-2,2,7,-2,2,-5,-2,-2,  0,7,-2,-1,-2,-2,-1,1,2,3,-1,-2,2,5,-2,  -3,3,2,-4,-1,-2,9,-2,-2,1,1,2,1, -8,-2,-2,  -3,3,5,-1,-4,-3,3,  -5,0,2,3,7,-2,-1,-2,-2,-5,5,-1,1,  4,3,2,-2,-3,-2,-2,-3,3,9,-2,-3,-7,3);
const vocal_time = list( 0, 0, 0,5,5, 0, 0, 0,0,0, 0,6, 0, 0, 1,  0,0, 0, 0, 0, 0, 0,0,0,0, 0, 6,5,0, 1,   0,0,5, 5, 0, 0,0, 0, 0,0,0,0,1,  0, 0, 1,   0,0,0, 0, 0, 0,7,   0,0,0,0,0, 0, 0, 0, 0, 0,0, 0,8,  0,0,0, 0, 0, 0, 0, 6,5,0, 0, 0, 0,1);


const baby_list = list(noise_sound(60/400), silence_sound(3*60/400), noise_sound(60/400), silence_sound(3*60/400));
// const drum_beat = append(baby_list, append(baby_list, append(baby_list, baby_list)));
const drum_beat = list(silence_sound(0));

 play(simultaneously(list(consecutively(pairmaker(
                                            generate_list_of_note("E4", vocal_song), 
                                            map(x => list_ref(beat_ref, x), vocal_time), cello)),
                     consecutively(drum_beat))));


// const sound_list = map(x => cello(x, 0.15), generate_list_of_note("D#4", ikura));
// play(consecutively(sound_list));


// display(pairmaker(new_interval, new_duration));
// display(head(pairmaker(new_interval, new_duration)));
// display_list(pairmaker(new_interval, new_duration));

/* function two_lists_to_sound(list_sound, list_duration, instrument) {
   
    function combine_sound(sound1, sound2) {
        return consecutively(list(sound1, sound2));
    }
    return accumulate(combine_sound, silence_sound(0),
                      map(y => map(x => instrument(x, y), list_sound), list_duration));
    // return accumulate(combine_sound, silence_sound(0),
    //                  map((x, y) => instrument(x, y), pairmaker(list_sound, list_duration)));
}
*/
//play(two_lists_to_sound(new_interval, new_duration, cello));



//playsound("D4", cry_baby_interval, 0.2, cello);

