<script context="module" lang="ts" xmlns="http://www.w3.org/1999/html">
    export const prerender = true;
</script>

<script lang="ts">
    import {
        type Row,
        Alignment,
        ColumnSpecial,
        type AllColumns
    } from '$lib/doc-tools/upgrade/interface';
    import UpgradeTable from '$lib/doc-tools/upgrade/upgrade-table/table.svelte';

    let columns: AllColumns = {
        mark: {
            title: '',
            alignment: Alignment.Left,
            prefix: '',
            suffix: '',
            special: ColumnSpecial.Mark
        },
        left: {
            title: '',
            alignment: Alignment.Left,
            prefix: '',
            suffix: '',
            special: ColumnSpecial.LeftSide
        },
        arrow: {
            title: '',
            alignment: Alignment.Center,
            prefix: '　→　',
            suffix: '',
            special: ColumnSpecial.Arrow
        },
        right: {
            title: '',
            alignment: Alignment.Left,
            prefix: '',
            suffix: '',
            special: ColumnSpecial.RightSide
        },
        xp: {
            title: '',
            alignment: Alignment.Right,
            prefix: '',
            suffix: 'XP',
            special: ColumnSpecial.Xp
        },
        xpCumulative: {
            title: 'Total',
            alignment: Alignment.Right,
            prefix: '',
            suffix: 'XP',
            special: ColumnSpecial.XpCumulative
        }
    };
    let rows: Row[] = [
        {
            mark: '',
            left: 'Hello',
            right: 'World',
            xp: 1,
            xpCumulative: 0,
            divider: false,
            carryoverXp: 1,
            xpUnlock: false
        },
        {
            mark: '',
            left: 'Hello1',
            right: 'World',
            xp: 2,
            xpCumulative: 0,
            divider: true,
            carryoverXp: 1,
            xpUnlock: false
        },
        {
            mark: '',
            left: 'Hello2',
            right: 'World',
            xp: 3,
            xpCumulative: 0,
            divider: false,
            carryoverXp: 1,
            xpUnlock: false
        },
        {
            mark: '',
            left: 'Hello3',
            right: 'World',
            xp: 4,
            xpCumulative: 0,
            divider: false,
            carryoverXp: 1,
            xpUnlock: true
        },
        {
            mark: '',
            left: 'Hello4',
            right: 'World',
            xp: 5,
            xpCumulative: 0,
            divider: false,
            carryoverXp: 1,
            xpUnlock: false
        }
    ];
</script>

<svelte:head>
    <title>Upgrade</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<section id="section-import">
    <h1>Import</h1>
    <textarea name="import-textarea"></textarea>
    <input type="button" value="Import"/>
</section>
<section id="section-table">
    <h1>Table</h1>
    <UpgradeTable {rows} {columns}/>
    <input type="button" value="Export"/>
</section>
<section id="section-export">
    <h1>Export</h1>
    <textarea name="export-textarea"></textarea>
</section>
