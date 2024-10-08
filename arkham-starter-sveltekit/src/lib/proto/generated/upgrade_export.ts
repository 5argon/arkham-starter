// @generated by protobuf-ts 2.9.3
// @generated from protobuf file "upgrade_export.proto" (syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { ExportOptions } from "./export_options";
/**
 * @generated from protobuf message UpgradeExportProto
 */
export interface UpgradeExportProto {
    /**
     * @generated from protobuf field: repeated UpgradeExportRow upgrade_rows = 1;
     */
    upgradeRows: UpgradeExportRow[];
    /**
     * @generated from protobuf field: UpgradeExportOptions upgrade_export_options = 2;
     */
    upgradeExportOptions?: UpgradeExportOptions;
    /**
     * @generated from protobuf field: ExportOptions export_options = 3;
     */
    exportOptions?: ExportOptions;
    /**
     * @generated from protobuf field: string import_deck_url = 4;
     */
    importDeckUrl: string;
}
/**
 * @generated from protobuf message UpgradeExportRow
 */
export interface UpgradeExportRow {
    /**
     * @generated from protobuf field: string mark = 1;
     */
    mark: string;
    /**
     * Turns into just a string.
     *
     * @generated from protobuf field: string card_left = 2;
     */
    cardLeft: string;
    /**
     * Turns into just a string.
     *
     * @generated from protobuf field: string card_right = 3;
     */
    cardRight: string;
    /**
     * @generated from protobuf field: bool xp_unlocked = 4;
     */
    xpUnlocked: boolean;
    /**
     * @generated from protobuf field: bool cumulative_xp_unlocked = 5;
     */
    cumulativeXpUnlocked: boolean;
    /**
     * @generated from protobuf field: int32 xp = 6;
     */
    xp: number;
    /**
     * @generated from protobuf field: int32 cumulative_xp = 7;
     */
    cumulativeXp: number;
    /**
     * @generated from protobuf field: string divider_text = 8;
     */
    dividerText: string;
    /**
     * @generated from protobuf field: bool divider = 9;
     */
    divider: boolean;
    /**
     * @generated from protobuf field: bool right_custom = 10;
     */
    rightCustom: boolean;
    /**
     * @generated from protobuf field: string right_custom_text = 11;
     */
    rightCustomText: string;
    /**
     * @generated from protobuf field: int32 right_custom_choice = 12;
     */
    rightCustomChoice: number;
}
/**
 * @generated from protobuf message UpgradeExportOptions
 */
export interface UpgradeExportOptions {
    /**
     * @generated from protobuf field: bool simple_list = 1;
     */
    simpleList: boolean;
    /**
     * @generated from protobuf field: bool split_divider = 2;
     */
    splitDivider: boolean;
    /**
     * @generated from protobuf field: string xp_suffix = 3;
     */
    xpSuffix: string;
    /**
     * @generated from protobuf field: bool ignore_small = 4;
     */
    ignoreSmall: boolean;
    /**
     * @generated from protobuf field: UpgradeExportOptions.Arrow arrow = 5;
     */
    arrow?: UpgradeExportOptions_Arrow;
    /**
     * @generated from protobuf field: UpgradeExportOptions.Headers headers = 6;
     */
    headers?: UpgradeExportOptions_Headers;
    /**
     * @generated from protobuf field: UpgradeExportOptions.Columns columns = 7;
     */
    columns?: UpgradeExportOptions_Columns;
    /**
     * @generated from protobuf field: UpgradeExportOptions.SimpleListOptions simple_list_options = 8;
     */
    simpleListOptions?: UpgradeExportOptions_SimpleListOptions;
    /**
     * @generated from protobuf field: bool upgradeUrl = 9;
     */
    upgradeUrl: boolean;
    /**
     * @generated from protobuf field: bool show_link = 10;
     */
    showLink: boolean;
    /**
     * @generated from protobuf field: string show_link_text = 11;
     */
    showLinkText: string;
    /**
     * @generated from protobuf field: UpgradeExportOptions.UpgradeExportStyle upgrade_export_style = 12;
     */
    upgradeExportStyle: UpgradeExportOptions_UpgradeExportStyle;
}
/**
 * @generated from protobuf message UpgradeExportOptions.Arrow
 */
export interface UpgradeExportOptions_Arrow {
    /**
     * @generated from protobuf field: string character = 1;
     */
    character: string;
    /**
     * @generated from protobuf field: bool highlight_upgrade = 2;
     */
    highlightUpgrade: boolean;
}
/**
 * @generated from protobuf message UpgradeExportOptions.Headers
 */
export interface UpgradeExportOptions_Headers {
    /**
     * @generated from protobuf field: string cost_header = 1;
     */
    costHeader: string;
    /**
     * @generated from protobuf field: string total_header = 2;
     */
    totalHeader: string;
}
/**
 * @generated from protobuf message UpgradeExportOptions.Columns
 */
export interface UpgradeExportOptions_Columns {
    /**
     * @generated from protobuf field: bool mark_column = 1;
     */
    markColumn: boolean;
    /**
     * @generated from protobuf field: bool xp_column = 2;
     */
    xpColumn: boolean;
    /**
     * @generated from protobuf field: bool cumulative_column = 3;
     */
    cumulativeColumn: boolean;
}
/**
 * @generated from protobuf message UpgradeExportOptions.SimpleListOptions
 */
export interface UpgradeExportOptions_SimpleListOptions {
    /**
     * @generated from protobuf field: UpgradeExportOptions.SimpleListOptions.BlockStyle block_style = 1;
     */
    blockStyle: UpgradeExportOptions_SimpleListOptions_BlockStyle;
}
/**
 * @generated from protobuf enum UpgradeExportOptions.SimpleListOptions.BlockStyle
 */
export enum UpgradeExportOptions_SimpleListOptions_BlockStyle {
    /**
     * @generated from protobuf enum value: Unknown = 0;
     */
    Unknown = 0,
    /**
     * @generated from protobuf enum value: A = 1;
     */
    A = 1,
    /**
     * @generated from protobuf enum value: B = 2;
     */
    B = 2,
    /**
     * @generated from protobuf enum value: C = 3;
     */
    C = 3,
    /**
     * @generated from protobuf enum value: D = 4;
     */
    D = 4,
    /**
     * @generated from protobuf enum value: E = 5;
     */
    E = 5,
    /**
     * @generated from protobuf enum value: F = 6;
     */
    F = 6,
    /**
     * @generated from protobuf enum value: G = 7;
     */
    G = 7
}
/**
 * @generated from protobuf enum UpgradeExportOptions.UpgradeExportStyle
 */
export enum UpgradeExportOptions_UpgradeExportStyle {
    /**
     * @generated from protobuf enum value: Unknown = 0;
     */
    Unknown = 0,
    /**
     * @generated from protobuf enum value: MarkdownArkhamDb = 1;
     */
    MarkdownArkhamDb = 1,
    /**
     * @generated from protobuf enum value: MarkdownArkhamCards = 2;
     */
    MarkdownArkhamCards = 2,
    /**
     * @generated from protobuf enum value: Markdown = 4;
     */
    Markdown = 4,
    /**
     * @generated from protobuf enum value: Forum = 3;
     */
    Forum = 3
}
// @generated message type with reflection information, may provide speed optimized methods
class UpgradeExportProto$Type extends MessageType<UpgradeExportProto> {
    constructor() {
        super("UpgradeExportProto", [
            { no: 1, name: "upgrade_rows", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => UpgradeExportRow },
            { no: 2, name: "upgrade_export_options", kind: "message", T: () => UpgradeExportOptions },
            { no: 3, name: "export_options", kind: "message", T: () => ExportOptions },
            { no: 4, name: "import_deck_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<UpgradeExportProto>): UpgradeExportProto {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.upgradeRows = [];
        message.importDeckUrl = "";
        if (value !== undefined)
            reflectionMergePartial<UpgradeExportProto>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpgradeExportProto): UpgradeExportProto {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated UpgradeExportRow upgrade_rows */ 1:
                    message.upgradeRows.push(UpgradeExportRow.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* UpgradeExportOptions upgrade_export_options */ 2:
                    message.upgradeExportOptions = UpgradeExportOptions.internalBinaryRead(reader, reader.uint32(), options, message.upgradeExportOptions);
                    break;
                case /* ExportOptions export_options */ 3:
                    message.exportOptions = ExportOptions.internalBinaryRead(reader, reader.uint32(), options, message.exportOptions);
                    break;
                case /* string import_deck_url */ 4:
                    message.importDeckUrl = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpgradeExportProto, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated UpgradeExportRow upgrade_rows = 1; */
        for (let i = 0; i < message.upgradeRows.length; i++)
            UpgradeExportRow.internalBinaryWrite(message.upgradeRows[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* UpgradeExportOptions upgrade_export_options = 2; */
        if (message.upgradeExportOptions)
            UpgradeExportOptions.internalBinaryWrite(message.upgradeExportOptions, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* ExportOptions export_options = 3; */
        if (message.exportOptions)
            ExportOptions.internalBinaryWrite(message.exportOptions, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* string import_deck_url = 4; */
        if (message.importDeckUrl !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.importDeckUrl);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message UpgradeExportProto
 */
export const UpgradeExportProto = new UpgradeExportProto$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpgradeExportRow$Type extends MessageType<UpgradeExportRow> {
    constructor() {
        super("UpgradeExportRow", [
            { no: 1, name: "mark", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "card_left", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "card_right", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "xp_unlocked", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "cumulative_xp_unlocked", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "xp", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "cumulative_xp", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "divider_text", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "divider", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "right_custom", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 11, name: "right_custom_text", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "right_custom_choice", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<UpgradeExportRow>): UpgradeExportRow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.mark = "";
        message.cardLeft = "";
        message.cardRight = "";
        message.xpUnlocked = false;
        message.cumulativeXpUnlocked = false;
        message.xp = 0;
        message.cumulativeXp = 0;
        message.dividerText = "";
        message.divider = false;
        message.rightCustom = false;
        message.rightCustomText = "";
        message.rightCustomChoice = 0;
        if (value !== undefined)
            reflectionMergePartial<UpgradeExportRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpgradeExportRow): UpgradeExportRow {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string mark */ 1:
                    message.mark = reader.string();
                    break;
                case /* string card_left */ 2:
                    message.cardLeft = reader.string();
                    break;
                case /* string card_right */ 3:
                    message.cardRight = reader.string();
                    break;
                case /* bool xp_unlocked */ 4:
                    message.xpUnlocked = reader.bool();
                    break;
                case /* bool cumulative_xp_unlocked */ 5:
                    message.cumulativeXpUnlocked = reader.bool();
                    break;
                case /* int32 xp */ 6:
                    message.xp = reader.int32();
                    break;
                case /* int32 cumulative_xp */ 7:
                    message.cumulativeXp = reader.int32();
                    break;
                case /* string divider_text */ 8:
                    message.dividerText = reader.string();
                    break;
                case /* bool divider */ 9:
                    message.divider = reader.bool();
                    break;
                case /* bool right_custom */ 10:
                    message.rightCustom = reader.bool();
                    break;
                case /* string right_custom_text */ 11:
                    message.rightCustomText = reader.string();
                    break;
                case /* int32 right_custom_choice */ 12:
                    message.rightCustomChoice = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpgradeExportRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string mark = 1; */
        if (message.mark !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.mark);
        /* string card_left = 2; */
        if (message.cardLeft !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.cardLeft);
        /* string card_right = 3; */
        if (message.cardRight !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.cardRight);
        /* bool xp_unlocked = 4; */
        if (message.xpUnlocked !== false)
            writer.tag(4, WireType.Varint).bool(message.xpUnlocked);
        /* bool cumulative_xp_unlocked = 5; */
        if (message.cumulativeXpUnlocked !== false)
            writer.tag(5, WireType.Varint).bool(message.cumulativeXpUnlocked);
        /* int32 xp = 6; */
        if (message.xp !== 0)
            writer.tag(6, WireType.Varint).int32(message.xp);
        /* int32 cumulative_xp = 7; */
        if (message.cumulativeXp !== 0)
            writer.tag(7, WireType.Varint).int32(message.cumulativeXp);
        /* string divider_text = 8; */
        if (message.dividerText !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.dividerText);
        /* bool divider = 9; */
        if (message.divider !== false)
            writer.tag(9, WireType.Varint).bool(message.divider);
        /* bool right_custom = 10; */
        if (message.rightCustom !== false)
            writer.tag(10, WireType.Varint).bool(message.rightCustom);
        /* string right_custom_text = 11; */
        if (message.rightCustomText !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.rightCustomText);
        /* int32 right_custom_choice = 12; */
        if (message.rightCustomChoice !== 0)
            writer.tag(12, WireType.Varint).int32(message.rightCustomChoice);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message UpgradeExportRow
 */
export const UpgradeExportRow = new UpgradeExportRow$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpgradeExportOptions$Type extends MessageType<UpgradeExportOptions> {
    constructor() {
        super("UpgradeExportOptions", [
            { no: 1, name: "simple_list", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "split_divider", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "xp_suffix", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "ignore_small", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "arrow", kind: "message", T: () => UpgradeExportOptions_Arrow },
            { no: 6, name: "headers", kind: "message", T: () => UpgradeExportOptions_Headers },
            { no: 7, name: "columns", kind: "message", T: () => UpgradeExportOptions_Columns },
            { no: 8, name: "simple_list_options", kind: "message", T: () => UpgradeExportOptions_SimpleListOptions },
            { no: 9, name: "upgradeUrl", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "show_link", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 11, name: "show_link_text", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "upgrade_export_style", kind: "enum", T: () => ["UpgradeExportOptions.UpgradeExportStyle", UpgradeExportOptions_UpgradeExportStyle] }
        ]);
    }
    create(value?: PartialMessage<UpgradeExportOptions>): UpgradeExportOptions {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.simpleList = false;
        message.splitDivider = false;
        message.xpSuffix = "";
        message.ignoreSmall = false;
        message.upgradeUrl = false;
        message.showLink = false;
        message.showLinkText = "";
        message.upgradeExportStyle = 0;
        if (value !== undefined)
            reflectionMergePartial<UpgradeExportOptions>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpgradeExportOptions): UpgradeExportOptions {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool simple_list */ 1:
                    message.simpleList = reader.bool();
                    break;
                case /* bool split_divider */ 2:
                    message.splitDivider = reader.bool();
                    break;
                case /* string xp_suffix */ 3:
                    message.xpSuffix = reader.string();
                    break;
                case /* bool ignore_small */ 4:
                    message.ignoreSmall = reader.bool();
                    break;
                case /* UpgradeExportOptions.Arrow arrow */ 5:
                    message.arrow = UpgradeExportOptions_Arrow.internalBinaryRead(reader, reader.uint32(), options, message.arrow);
                    break;
                case /* UpgradeExportOptions.Headers headers */ 6:
                    message.headers = UpgradeExportOptions_Headers.internalBinaryRead(reader, reader.uint32(), options, message.headers);
                    break;
                case /* UpgradeExportOptions.Columns columns */ 7:
                    message.columns = UpgradeExportOptions_Columns.internalBinaryRead(reader, reader.uint32(), options, message.columns);
                    break;
                case /* UpgradeExportOptions.SimpleListOptions simple_list_options */ 8:
                    message.simpleListOptions = UpgradeExportOptions_SimpleListOptions.internalBinaryRead(reader, reader.uint32(), options, message.simpleListOptions);
                    break;
                case /* bool upgradeUrl */ 9:
                    message.upgradeUrl = reader.bool();
                    break;
                case /* bool show_link */ 10:
                    message.showLink = reader.bool();
                    break;
                case /* string show_link_text */ 11:
                    message.showLinkText = reader.string();
                    break;
                case /* UpgradeExportOptions.UpgradeExportStyle upgrade_export_style */ 12:
                    message.upgradeExportStyle = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpgradeExportOptions, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool simple_list = 1; */
        if (message.simpleList !== false)
            writer.tag(1, WireType.Varint).bool(message.simpleList);
        /* bool split_divider = 2; */
        if (message.splitDivider !== false)
            writer.tag(2, WireType.Varint).bool(message.splitDivider);
        /* string xp_suffix = 3; */
        if (message.xpSuffix !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.xpSuffix);
        /* bool ignore_small = 4; */
        if (message.ignoreSmall !== false)
            writer.tag(4, WireType.Varint).bool(message.ignoreSmall);
        /* UpgradeExportOptions.Arrow arrow = 5; */
        if (message.arrow)
            UpgradeExportOptions_Arrow.internalBinaryWrite(message.arrow, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* UpgradeExportOptions.Headers headers = 6; */
        if (message.headers)
            UpgradeExportOptions_Headers.internalBinaryWrite(message.headers, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* UpgradeExportOptions.Columns columns = 7; */
        if (message.columns)
            UpgradeExportOptions_Columns.internalBinaryWrite(message.columns, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* UpgradeExportOptions.SimpleListOptions simple_list_options = 8; */
        if (message.simpleListOptions)
            UpgradeExportOptions_SimpleListOptions.internalBinaryWrite(message.simpleListOptions, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        /* bool upgradeUrl = 9; */
        if (message.upgradeUrl !== false)
            writer.tag(9, WireType.Varint).bool(message.upgradeUrl);
        /* bool show_link = 10; */
        if (message.showLink !== false)
            writer.tag(10, WireType.Varint).bool(message.showLink);
        /* string show_link_text = 11; */
        if (message.showLinkText !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.showLinkText);
        /* UpgradeExportOptions.UpgradeExportStyle upgrade_export_style = 12; */
        if (message.upgradeExportStyle !== 0)
            writer.tag(12, WireType.Varint).int32(message.upgradeExportStyle);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message UpgradeExportOptions
 */
export const UpgradeExportOptions = new UpgradeExportOptions$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpgradeExportOptions_Arrow$Type extends MessageType<UpgradeExportOptions_Arrow> {
    constructor() {
        super("UpgradeExportOptions.Arrow", [
            { no: 1, name: "character", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "highlight_upgrade", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<UpgradeExportOptions_Arrow>): UpgradeExportOptions_Arrow {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.character = "";
        message.highlightUpgrade = false;
        if (value !== undefined)
            reflectionMergePartial<UpgradeExportOptions_Arrow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpgradeExportOptions_Arrow): UpgradeExportOptions_Arrow {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string character */ 1:
                    message.character = reader.string();
                    break;
                case /* bool highlight_upgrade */ 2:
                    message.highlightUpgrade = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpgradeExportOptions_Arrow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string character = 1; */
        if (message.character !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.character);
        /* bool highlight_upgrade = 2; */
        if (message.highlightUpgrade !== false)
            writer.tag(2, WireType.Varint).bool(message.highlightUpgrade);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message UpgradeExportOptions.Arrow
 */
export const UpgradeExportOptions_Arrow = new UpgradeExportOptions_Arrow$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpgradeExportOptions_Headers$Type extends MessageType<UpgradeExportOptions_Headers> {
    constructor() {
        super("UpgradeExportOptions.Headers", [
            { no: 1, name: "cost_header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "total_header", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<UpgradeExportOptions_Headers>): UpgradeExportOptions_Headers {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.costHeader = "";
        message.totalHeader = "";
        if (value !== undefined)
            reflectionMergePartial<UpgradeExportOptions_Headers>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpgradeExportOptions_Headers): UpgradeExportOptions_Headers {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string cost_header */ 1:
                    message.costHeader = reader.string();
                    break;
                case /* string total_header */ 2:
                    message.totalHeader = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpgradeExportOptions_Headers, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string cost_header = 1; */
        if (message.costHeader !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.costHeader);
        /* string total_header = 2; */
        if (message.totalHeader !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.totalHeader);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message UpgradeExportOptions.Headers
 */
export const UpgradeExportOptions_Headers = new UpgradeExportOptions_Headers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpgradeExportOptions_Columns$Type extends MessageType<UpgradeExportOptions_Columns> {
    constructor() {
        super("UpgradeExportOptions.Columns", [
            { no: 1, name: "mark_column", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "xp_column", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "cumulative_column", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<UpgradeExportOptions_Columns>): UpgradeExportOptions_Columns {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.markColumn = false;
        message.xpColumn = false;
        message.cumulativeColumn = false;
        if (value !== undefined)
            reflectionMergePartial<UpgradeExportOptions_Columns>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpgradeExportOptions_Columns): UpgradeExportOptions_Columns {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool mark_column */ 1:
                    message.markColumn = reader.bool();
                    break;
                case /* bool xp_column */ 2:
                    message.xpColumn = reader.bool();
                    break;
                case /* bool cumulative_column */ 3:
                    message.cumulativeColumn = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpgradeExportOptions_Columns, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool mark_column = 1; */
        if (message.markColumn !== false)
            writer.tag(1, WireType.Varint).bool(message.markColumn);
        /* bool xp_column = 2; */
        if (message.xpColumn !== false)
            writer.tag(2, WireType.Varint).bool(message.xpColumn);
        /* bool cumulative_column = 3; */
        if (message.cumulativeColumn !== false)
            writer.tag(3, WireType.Varint).bool(message.cumulativeColumn);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message UpgradeExportOptions.Columns
 */
export const UpgradeExportOptions_Columns = new UpgradeExportOptions_Columns$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpgradeExportOptions_SimpleListOptions$Type extends MessageType<UpgradeExportOptions_SimpleListOptions> {
    constructor() {
        super("UpgradeExportOptions.SimpleListOptions", [
            { no: 1, name: "block_style", kind: "enum", T: () => ["UpgradeExportOptions.SimpleListOptions.BlockStyle", UpgradeExportOptions_SimpleListOptions_BlockStyle] }
        ]);
    }
    create(value?: PartialMessage<UpgradeExportOptions_SimpleListOptions>): UpgradeExportOptions_SimpleListOptions {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.blockStyle = 0;
        if (value !== undefined)
            reflectionMergePartial<UpgradeExportOptions_SimpleListOptions>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpgradeExportOptions_SimpleListOptions): UpgradeExportOptions_SimpleListOptions {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* UpgradeExportOptions.SimpleListOptions.BlockStyle block_style */ 1:
                    message.blockStyle = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpgradeExportOptions_SimpleListOptions, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* UpgradeExportOptions.SimpleListOptions.BlockStyle block_style = 1; */
        if (message.blockStyle !== 0)
            writer.tag(1, WireType.Varint).int32(message.blockStyle);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message UpgradeExportOptions.SimpleListOptions
 */
export const UpgradeExportOptions_SimpleListOptions = new UpgradeExportOptions_SimpleListOptions$Type();
