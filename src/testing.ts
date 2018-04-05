import e621 from "./e621-api";

let wrapper = new e621('testing-agent')

wrapper.createPost().then(results => console.log(results))

/* wrapper.getDeletedPostIndex(2, 263793).then((results) => {
    console.log(results)
})

wrapper.getPostIndexPaginate(null, 0, 2, 1)
    .then((postData) => {
        console.log(postData)
    })
 */
wrapper.voteForPost().then(voteResponse => {
    console.log(voteResponse)
})