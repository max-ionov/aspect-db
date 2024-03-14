export const getUserConfig = () => {
    const rdfPrefix = 'https://raw.githubusercontent.com/max-ionov/aspect-db/main/rdf/'

    return {
        basePrefix: 'https://ionov.me/aspect-db/',
        endpoints: [
            `${rdfPrefix}aspect_bs.ttl`,
            `${rdfPrefix}aspect_hr.ttl`,
            `${rdfPrefix}aspect_sr.ttl`
        ]
    }
}