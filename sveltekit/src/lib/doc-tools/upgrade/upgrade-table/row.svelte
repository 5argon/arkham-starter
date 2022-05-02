<script lang="ts" context="module">
    export interface RowActionEvents {
        onAddAbove: () => void;
        onAddBelow: () => void;
        onDelete: () => void;
        onMoveUp: () => void;
        onMoveDown: () => void;
        onMoveUpLeft: () => void;
        onMoveDownLeft: () => void;
        onMoveUpRight: () => void;
        onMoveDownRight: () => void;
    }

    export interface RowEditEvents {
        onMarkChanged: (n: string) => void;
        onLeftChanged: (n: string) => void;
        onRightChanged: (n: string) => void;
        onXpChanged: (n: number) => void;
        onCarryoverXpChanged: (n: number) => void;
        onXpLockChanged: (n: boolean) => void;
        onLoseFocus: () => void;
    }
</script>

<script lang="ts">
    import {
        ColumnSpecial,
        type AllColumns,
        type Column,
        type Row
    } from '$lib/doc-tools/upgrade/interface';
    import EditableCell from './editable-cell.svelte';
    import Divider from './divider.svelte';
    import RowActionUpDown from './row-action-up-down.svelte';
    import RowActionFront from './row-action-front.svelte';
    import RowActionBack from './row-action-back.svelte';

    export let row: Row;
    export let cols: AllColumns;
    export let divider: boolean;

    function shouldDisableEditing(c: Column): boolean {
        switch (c.special) {
            case ColumnSpecial.Arrow:
            case ColumnSpecial.XpCumulative:
                return true;
            default:
                return false;
        }
    }

    function shouldHaveSmallBox(c: Column): boolean {
        switch (c.special) {
            case ColumnSpecial.Mark:
            case ColumnSpecial.Xp:
            case ColumnSpecial.XpCumulative:
                return true;
            default:
                return false;
        }
    }
</script>

<tr>
    <RowActionFront divider={false}/>
    {#if divider}
        <td colspan={8}>
            <Divider/>
        </td>
    {:else}
        <td>
            <EditableCell
                    currentText={row.mark}
                    prefixText={cols.mark.prefix}
                    suffixText={cols.mark.suffix}
                    disableEditing={shouldDisableEditing(cols.mark)}
                    smallBox={shouldHaveSmallBox(cols.mark)}
                    greyOutEditing={false}
            />
        </td>
        <td>
            <EditableCell
                    currentText={row.left}
                    prefixText={cols.left.prefix}
                    suffixText={cols.left.suffix}
                    disableEditing={shouldDisableEditing(cols.left)}
                    smallBox={shouldHaveSmallBox(cols.left)}
                    greyOutEditing={false}
            />
        </td>
        <RowActionUpDown/>
        <td>
            <EditableCell
                    currentText={''}
                    prefixText={cols.arrow.prefix}
                    suffixText={cols.arrow.suffix}
                    disableEditing={shouldDisableEditing(cols.arrow)}
                    smallBox={shouldHaveSmallBox(cols.arrow)}
                    greyOutEditing={false}
            />
        </td>
        <td>
            <EditableCell
                    currentText={row.right}
                    prefixText={cols.right.prefix}
                    suffixText={cols.right.suffix}
                    disableEditing={shouldDisableEditing(cols.right)}
                    smallBox={shouldHaveSmallBox(cols.right)}
                    greyOutEditing={false}
            />
        </td>
        <RowActionUpDown/>
        <td>
            <EditableCell
                    currentText={row.xp.toString()}
                    prefixText={cols.xp.prefix}
                    suffixText={cols.xp.suffix}
                    disableEditing={shouldDisableEditing(cols.xp)}
                    smallBox={shouldHaveSmallBox(cols.xp)}
                    greyOutEditing={!row.xpUnlock}
            />
        </td>
        <td>
            <EditableCell
                    currentText={row.xpCumulative.toString()}
                    prefixText={cols.xpCumulative.prefix}
                    suffixText={cols.xpCumulative.suffix}
                    disableEditing={shouldDisableEditing(cols.xpCumulative)}
                    smallBox={shouldHaveSmallBox(cols.xpCumulative)}
                    greyOutEditing={false}
            />
        </td>
        <RowActionBack xpLock={row.xpUnlock}/>
    {/if}
</tr>
