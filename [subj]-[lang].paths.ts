import {QueryEngine} from "@comunica/query-sparql";
import {getQueryResults} from "./services/sparql";

export default {
    paths: async function () {
        // TODO: create a config and put it there
        const basePrefix = 'https://ionov.me/aspect-db/';
        const sparql = new QueryEngine();

        const query: string = `
        SELECT ?subj ?lang
        WHERE {
        ?subj ?p ?o .
        FILTER(STRSTARTS(STR(?subj), "${basePrefix}")) 
        BIND(SUBSTR(STRAFTER(STR(?subj), "${basePrefix}"), 1, 2) AS ?lang)
        }`

        console.log(query)


        const endpoints = [
            'https://raw.githubusercontent.com/max-ionov/aspect-db/main/rdf/aspect_bs.ttl',
            'https://raw.githubusercontent.com/max-ionov/aspect-db/main/rdf/aspect_hr.ttl',
            'https://raw.githubusercontent.com/max-ionov/aspect-db/main/rdf/aspect_sr.ttl'
            ]

        let results = []

        const res = getQueryResults(sparql, query, ['subj'], endpoints).then((result) => {

             for (let s in result)
                 results.push( { params: { subj: s['subj']?.val, lang: s['lang']?.val } })
            console.log(results)
        })

        return results
    }
}