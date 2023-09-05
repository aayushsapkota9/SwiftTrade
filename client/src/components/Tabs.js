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
    const [activeTabKey, setActiveTabKey] = useState(initialTabItems[0].key);
    const [items, setItems] = useState(initialTabItems);
    const newTabIndex = useRef(0);
    const onChange = (newActiveTabKey) => {
        console.log(newActiveTabKey)
        setActiveTabKey(newActiveTabKey);
    };
    const onTabEdit = (targetKey, action) => {
        const remove = (targetKey) => {
            let newActiveTabKey = activeTabKey;
            let lastIndex = -1;
            items.forEach((item, i) => {
                if (item.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            const newPanes = items.filter((item) => item.key !== targetKey);
            if (newPanes.length && newActiveTabKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveTabKey = newPanes[lastIndex].key;
                } else {
                    newActiveTabKey = newPanes[0].key;
                }
            }
            setItems(newPanes);
            setActiveTabKey(newActiveTabKey);
        };
        const add = () => {
            const newActiveTabKey = `newTab${newTabIndex.current++}`;
            console.log(newActiveTabKey)
            const newPanes = [...items];
            newPanes.push({
                label: 'New Tab',
                children: <BillForm></BillForm>,
                key: newActiveTabKey,
            });
            setItems(newPanes);
            setActiveTabKey(newActiveTabKey);
        };

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
            activeKey={activeTabKey}
            onEdit={onTabEdit}
            items={items}
        />
    )
}

export default BillingTab