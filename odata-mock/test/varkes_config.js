module.exports = {
    name: "Varkes OData-Mock",
    apis: [
        {
            name: "courses",
            metadata: "/courses/metadata",
            specification_file: "test/courses.xml"
        }
    ],
    storage_file_path: "test/data.json",

}