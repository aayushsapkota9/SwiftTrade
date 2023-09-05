import React, { useState, useEffect, useRef } from 'react';
import { Table, Tabs, Steps, Tag, Space, AutoComplete } from 'antd';
import BillForm from './BillForm';

const BillingTab = () => {
    const initialItems = [
        {
            label: 'Tab 1',
            children: <BillForm tabKey={'newTab0'}></BillForm>,
            key: 'newTab0',
            closable: false,
        },
    ]
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(1);
    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };
    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        console.log(newActiveKey)
        const newPanes = [...items];
        newPanes.push({
            label: 'Tab' + newTabIndex.current,
            children: <BillForm tabKey={newActiveKey}></BillForm>,
            key: newActiveKey,
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    return (
        <Tabs
            size={'large'}
            animated={true}
            className='w-full '
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
        />
    )
}

export default BillingTab