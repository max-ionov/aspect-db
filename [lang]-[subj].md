<div v-if="results?.length">
    <h2>Triples about <code><{{ uri }}></code></h2>
    <table>
    <thead>
        <tr><td>Subj</td><td>Pred</td><td>Obj</td><td>Graph</td></tr>
    </thead>
    <tr v-for="row in results">
    <td v-for="(col, name) in row">
        <a target="_blank" :href="col.val" v-if="col.type !== 'Literal'">{{ col.val }}</a>
        <span v-else>{{ col.val }}</span>
    </td>
    </tr>
    </table>
</div>

<script setup>
import {useData} from "vitepress";

const { params } = useData().page.value;
const results = params.triples;
const uri = params.uri;

</script>