<div v-if="results?.length">
    <h2>Triples about {{ uri }}</h2>
    <table>
    <thead>
        <tr><td>Subj</td><td>Pred</td><td>Obj</td><td>Graph</td></tr>
    </thead>
    <tr v-for="row in results">
    <td v-for="(col, name) in row">
        <a :href="col.val" v-if="col.type !== 'Literal'">{{ col.val }}</a>
        <span v-else>{{ col.val }}</span>
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
const { basePrefix, endpoints, params } = useData().page.value;
const results = ref([]);

const uri = `${basePrefix}${params.lang}-${params.subj}`;
getDescribeResults(sparql, uri, endpoints).then((result) => { results.value = result; });

</script>