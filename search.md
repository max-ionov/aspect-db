# Search

## Aspect pairs
This allows you to see how the aspectual pair is formed for a given verb

<div>
    <input placeholder="verb" id="verb" v-model="queryVerb"/>
    <button @click="getAspectPairs()">Get verbs</button>
</div>

<div v-if="aspectPairs?.length">
    Results:
    <table>
    <thead>
        <tr><td>Verb</td></tr>
    </thead>
    <tr v-for="verb in aspectPairs">
    <td>{{ verb }}</td>
    </tr>
    </table>
</div>


## Prefixes
This allows you to see how the aspectual pair is formed for a given verb

<input placeholder="prefix" id="prefix" v-model="queryPrefix"/>
<button @click="getVerbsWithPrefixes()">Get verbs</button>

<div v-if="prefixedVerbs?.length">
    Results:
    <table>
    <tr v-for="verb in prefixedVerbs">
    <td>{{ verb }}</td>
    </tr>
    </table>
</div>

<script setup>
import {onMounted, ref} from "vue"; 
import {QueryEngine} from "@comunica/query-sparql";
import {getQueryResults, buildVerbPairQuery, buildPrefixQuery} from "./services/sparql"; 

const url = ref("");
onMounted(() => { url.value = `${location.origin}/aspect.ttl`; console.log(url.value) });

const sparql = new QueryEngine();

const queryVerb = ref("");
const queryPrefix = ref("");

const aspectPairs = ref([]);
const prefixedVerbs = ref([]);

const getAspectPairs = () => {
    getQueryResults(sparql, buildVerbPairQuery(queryVerb.value), "lemma2", url.value).then((result) => { aspectPairs.value = result });
};

const getVerbsWithPrefixes = () => {
    getQueryResults(sparql, buildPrefixQuery(queryPrefix.value), "lemma", url.value).then((result) => { prefixedVerbs.value = result });
}
</script>