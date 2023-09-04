import React, { useState, useEffect, useRef } from 'react';
import { Table, Tabs, Steps, Tag, Space, AutoComplete } from 'antd';
import BillForm from './BillForm';

const BillingTab = () => {
    const initialTabItems = [
        {
            label: 'Tab 1',
            children: <BillForm></BillForm>,
            key: '1',
            closable: false,
        },
    ]
    const [activeTabKey, setactiveTabKey] = useState(initialTabItems[0].key);
    const [items, setItems] = useState(initialTabItems);
    const newTabIndex = useRef(0);
    const onChange = (newactiveTabKey) => {
        setactiveTabKey(newactiveTabKey);
    };
    const onTabEdit = (targetKey, action) => {
        const remove = (targetKey) => {
            let newactiveTabKey = activeTabKey;
            let lastIndex = -1;
            items.forEach((item, i) => {
                if (item.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            const newPanes = items.filter((item) => item.key !== targetKey);
            if (newPanes.length && newactiveTabKey === targetKey) {
                if (lastIndex >= 0) {
                    newactiveTabKey = newPanes[lastIndex].key;
                } else {
                    newactiveTabKey = newPanes[0].key;
                }
            }
            setItems(newPanes);
            setactiveTabKey(newactiveTabKey);
        };
        const add = () => {
            const newactiveTabKey = `newTab${newTabIndex.current++}`;
            console.log(newactiveTabKey)
            const newPanes = [...items];
            newPanes.push({
                label: 'New Tab',
                children: <BillForm></BillForm>,
                key: newactiveTabKey,
            });
            setItems(newPanes);
            setactiveTabKey(newactiveTabKey);
        };

        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    return (
        <Tabs
            className='w-full'
            type="editable-card"
            onChange={onChange}
            activeTabKey={activeTabKey}
            onEdit={onTabEdit}
            items={items}
        />
    )
}

export default BillingTab