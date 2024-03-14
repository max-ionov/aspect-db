/// <reference path="node_modules/vitepress/types/index.d.ts" />

// rewrite the PageData type from 'vitepress' to add the field `updatedCommitHash`
declare module 'vitepress' {
    export interface PageData {
        endpoints?: string[],
        basePrefix?: string
    }
}