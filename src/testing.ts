import e621 from "./e621-api";
import { e621PopularityStrings, e621TagTypes } from "./enums";


// wrapper.createPost().then(results => console.log(results))


// wrapper.tags.updateTag('fox', e621TagTypes.species)
//     .then((results) => {
//         console.log(results)
//     })

wrapper.posts.vote()
    .then((results) => {
        console.log(results)
    })

