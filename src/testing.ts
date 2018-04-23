import e621 from "./e621-api";
import { e621PopularityStrings } from "./enums";

let wrapper = new e621('testing-agent', 'foxxo_test', '206a5ce32d909ab96ccb15cd4e9c3b82')

// wrapper.createPost().then(results => console.log(results))


wrapper.tags.getByName('fox')
    .then((results) => {
        console.log(results)
    })

