import { Indent } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { EntityCrudStatus, ModifiedFieldItemState } from "@stenajs-webui/redux";
import * as React from "react";
import { StandardTableCellRenderer } from "../../../config/StandardTableColumnConfig";
import { ModifiedField } from "../../../../table-ui/components/ModifiedField";

export const createEditableTextCellWithStatus =
  <TItemValue, TItem>(
    warningOnEmpty?: string | ((item: TItem) => string),
    crudStatusProvider?: (item: TItem) => EntityCrudStatus | undefined,
    modifiedFieldProvider?: (item: TItem) => ModifiedFieldItemState | undefined,
  ): StandardTableCellRenderer<TItemValue, TItem> =>
  ({
    label,
    item,
    gridCell: {
      editorValue,
      isEditing,
      setEditorValue,
      stopEditingAndRevert,
      lastKeyEvent,
      stopEditing,
      stopEditingAndMove,
    },
    isEditable,
  }) => {
    const warnOnEmpty =
      typeof warningOnEmpty === "function"
        ? warningOnEmpty(item)
        : warningOnEmpty;

    const crudStatus = crudStatusProvider
      ? crudStatusProvider(item)
      : undefined;

    const modifiedField = modifiedFieldProvider
      ? modifiedFieldProvider(item)
      : undefined;

    return isEditable && isEditing ? (
      <TextInput
        onValueChange={setEditorValue}
        value={editorValue}
        onDone={stopEditing}
        onEsc={stopEditingAndRevert}
        autoFocus
        selectAllOnMount={!lastKeyEvent}
        onMove={stopEditingAndMove}
      />
    ) : (
      <Indent row alignItems={"center"}>
        <ModifiedField
          value={label}
          modifiedField={modifiedField}
          crudStatus={crudStatus}
          isEditable={isEditable}
          warningOnEmpty={warnOnEmpty}
        />
      </Indent>
    );
  };
