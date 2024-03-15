# Search

## Aspect pairs

This allows you to see how the aspectual pair is formed for a given verb
<form onsubmit="return false">
    <input placeholder="verb: pisati" id="verb" v-model="queryVerb"/>
    <button @click="getAspectPairs" :style="btnAspectPairsStyle" :disabled="btnAspectPairsDisabled">Get verbs</button>
</form>

<div v-if="aspectPairs?.length">
    Results:
    <table>
    <thead>
        <tr><td>Verb</td><td>Language</td></tr>
    </thead>
    <tr v-for="{s2, lemma2, lang} in aspectPairs">
    <td><a target="_blank" :href="s2.val">{{ lemma2.val }}</a></td><td>{{ langCodes[lang.val] }}</td>
    </tr>
    </table>
</div>


## Prefixes
This allows you to see how the aspectual pair is formed for a given verb
<form onsubmit="return false">
<input placeholder="prefix: ot" id="prefix" v-model="queryPrefix"/>
<button @click="getVerbsWithPrefixes" :style="btnPrefixesStyle" :disabled="btnPrefixesDisabled">Get verbs</button>
</form>

<div v-if="prefixedVerbs?.length">
    Results:
    <table>
    <thead>
        <tr><td>Verb</td><td>Language</td></tr>
    </thead>
    <tr v-for="{s, lemma, lang} in prefixedVerbs">
    <td><a target="_blank" :href="s.val">{{ lemma.val }}</a></td><td>{{ langCodes[lang.val] }}</td>
    </tr>
    </table>
</div>

<script setup>
import {computed, reactive, ref} from "vue"; 
import {QueryEngine} from "@comunica/query-sparql";
import {getQueryResults, buildVerbPairQuery, buildPrefixQuery} from "./services/sparql"; 
import {useData} from 'vitepress';

const langCodes = {
 bs: "Bosnian",
 sr: "Serbian",
 hr: "Croatian"
};

const { endpoints } = useData().page.value;

const sparql = new QueryEngine();

const queryVerb = ref("");
const queryPrefix = ref("");

const aspectPairs = ref([]);
const prefixedVerbs = ref([]);

const btnPrefixesDisabled = ref(false);
const btnAspectPairsDisabled = ref(false);

const btnPrefixesStyle = reactive({
    cursor: computed(() => btnPrefixesDisabled.value ? 'wait' : 'pointer')
});

const btnAspectPairsStyle = reactive({
    cursor: computed(() => btnAspectPairsDisabled.value ? 'wait' : 'pointer')
});


const getAspectPairs = () => {
    btnAspectPairsDisabled.value = true;
    getQueryResults(sparql, buildVerbPairQuery(queryVerb.value), ["s2", "lemma2", "lang"], endpoints).then((result) => {
        btnAspectPairsDisabled.value = false;
        aspectPairs.value = result
    });
};

const getVerbsWithPrefixes = () => {
btnPrefixesDisabled.value = true;    
getQueryResults(sparql, buildPrefixQuery(queryPrefix.value), ["s", "lemma", "lang"], endpoints).then((result) => {
        btnPrefixesDisabled.value = false;
        prefixedVerbs.value = result 
    });
}
</script>

<style>

form {
    padding: 22px 24px;
    border-radius: 8px;
    box-shadow: var(--vp-shadow-4);
    margin-bottom: 1.2em;
    transition: background-color .5s ease;
}

form button {
    background-color: var(--vp-button-alt-bg);
    transition: background-color .5s;
    padding: .2em .6em;
    margin-left: .4em;
    border: 1px solid var(--vp-button-alt-border);
    color: var(--vp-button-alt-active-text);
    border-radius: 8px;
    font-size: .9em;
    font-weight: 600;
}

form input {
    border: 1px solid var(--vp-c-border);
    border-radius: 4px;
    padding: 0.2em 0.6em;
    margin-top: .6em;
    background: transparent;
    transition: background-color .5s;
}

</style>