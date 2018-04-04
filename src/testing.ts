import e621 from "./e621-api";

let wrapper = new e621('testing-agent')

wrapper.createPost().then(results => console.log(results))