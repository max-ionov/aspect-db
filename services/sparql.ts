import {QueryEngine} from "@comunica/query-sparql";

export const buildVerbPairQuery = (param: string) => {
    return `
        PREFIX ontolex: <http://www.w3.org/ns/lemon/ontolex#>
        PREFIX vartrans: <http://www.w3.org/ns/lemon/vartrans#>
        PREFIX decomp: <http://www.w3.org/ns/lemon/decomp#>
        
        
        SELECT ?s2 ?lemma2
        WHERE {
            ?s a ontolex:LexicalEntry .
            ?s ontolex:canonicalForm ?form  .
            ?form ontolex:writtenRep "${param}" .
            {
                ?rel vartrans:source ?s .
                ?rel vartrans:target ?s2 .
                ?s2 ontolex:canonicalForm/ontolex:writtenRep ?lemma2 .
            }
            UNION
            {
                ?rel vartrans:source ?s2 .
                ?rel vartrans:target ?s .
                ?s2 ontolex:canonicalForm/ontolex:writtenRep ?lemma2 .
            }
        }`
}

export const buildPrefixQuery = (param: string) => {
    return `
        PREFIX ontolex: <http://www.w3.org/ns/lemon/ontolex#>
        PREFIX lexinfo: <http://www.lexinfo.net/ontology/2.0/lexinfo#>
        PREFIX decomp: <http://www.w3.org/ns/lemon/decomp#>
        SELECT ?s ?lemma
        WHERE {
            ?s a ontolex:LexicalEntry ;
               ontolex:canonicalForm/ontolex:writtenRep ?lemma ;
               decomp:subTerm ?prefix .
            ?prefix a lexinfo:Prefix .
            ?prefix ontolex:lexicalForm/ontolex:writtenRep "${param}-" .
        } LIMIT 100`
}

export const getQueryResults = async (sparql: QueryEngine,
                                      query: string,
                                      keys: Array<string>,
                                      endpoint: string) => {
    let result = []

    const bindingsStream = await sparql.queryBindings(query, {sources: [endpoint]})
    const bindings = await bindingsStream?.toArray()

    for(let row of bindings) {
        result.push(Object.fromEntries(keys.map((key) => [key, row.get(key).value])))
    }

    return result
}

export const getDescribeResults = async (sparql: QueryEngine,
                                         uri: string,
                                         endpoint: string) => {
    let result = [];

    const quadStream = await sparql.queryQuads(`DESCRIBE <${uri}>`,
        { sources: [endpoint] });
    const quads = await quadStream.toArray()

    for(let row of quads) {
        result
            .push(Object.fromEntries(['subject', 'predicate', 'object', 'graph']
                .map((key) => [key, row[key].value])))
    }

    return result
}