<div v-if="results?.length">
    <h2>Triples about {{ uri }}</h2>
    <table>
    <thead>
        <tr><td>Subj</td><td>Pred</td><td>Obj</td><td>Graph</td></tr>
    </thead>
    <tr v-for="row in results">
    <td v-for="(col, name) in row">
        <a :href="col">{{ col }}</a>
    </td>
    </tr>
    </table>
</div>

<script setup>
import {QueryEngine} from "@comunica/query-sparql"; 
import {useData} from "vitepress";
import {onMounted, ref} from "vue"; 
import {getDescribeResults} from "./services/sparql";

const sparql = new QueryEngine();
const { params } = useData();
const results = ref([]);

const basePrefix = 'https://ionov.me/aspect-db/';
const uri = `${basePrefix}${params.value?.subj}`;
const endpoint = ref("");
console.log(uri);
onMounted(() => {
    endpoint.value = location.href.replace(/\/[^/]+$/, "/aspect.ttl"); 
    console.log(endpoint.value);

    getDescribeResults(sparql, uri, endpoint.value)
        .then((result) => { 
            results.value = result;
        })
});

</script>