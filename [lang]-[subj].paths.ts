import { QueryEngine } from "@comunica/query-sparql";
import { getQueryResults } from "./services/sparql";
import { getUserConfig } from "./config/config";

export default {
    paths: async function () {
        const { basePrefix, endpoints } = getUserConfig()
        const sparql = new QueryEngine()
        const query: string = `
        SELECT DISTINCT ?uri
        WHERE {
        { ?uri ?p ?o . }
        UNION {
        ?s ?p ?uri .
        }
        FILTER(STRSTARTS(STR(?uri), "${basePrefix}"))
        }`

        let results = []

        const res = await getQueryResults(sparql, query, ['uri'], endpoints)
            for (let s of res) {
                let parts = s['uri'].val.replace(basePrefix, '').split('-', 2)
                results.push({
                    params: {
                        subj: parts[1],
                        lang: parts[0]
                    }
                })
            }

        return results
    }
}