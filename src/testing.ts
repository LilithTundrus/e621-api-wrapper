import e621 from "./e621-api";

let wrapper = new e621('testing-agent')

wrapper.createPost().then(results => console.log(results))

wrapper.checkPostMD5('e9fbd2f2d0703a9775f245d55b9a0f9f').then(data => console.log(data.exists))