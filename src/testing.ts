import e621 from "./e621-api";

let wrapper = new e621('testing-agent')

wrapper.createPost().then(results => console.log(results))

wrapper.getDeletedPostIndex(2, 263793).then((results) => {
    console.log(results)
})