import e621 from "./e621-api";
import { e621PopularityStrings } from "./enums";

let wrapper = new e621('testing-agent')

// wrapper.createPost().then(results => console.log(results))


wrapper.tags.getAliases('bear', null, null, true)
    .then((results) => {
        console.log(results)
    })

