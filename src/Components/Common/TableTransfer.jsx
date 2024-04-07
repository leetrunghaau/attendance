import React, { useState } from 'react';
import difference from 'lodash/difference';
import { Space, Switch, Table, Tag, Transfer } from 'antd';
// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
        console.log("treeSelectedKeys===>",treeSelectedKeys);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({key}, selected) {
            console.log("ID SELECT===>",key);
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);
export default TableTransfer;