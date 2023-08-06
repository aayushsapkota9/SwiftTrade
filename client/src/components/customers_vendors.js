import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
function Customers_Vendors() {
    return <div>
        <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Add Customers</Tab>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Add Vendors</Tab>
            </TabList>
            <TabPanels>
                <TabPanel >
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
}

export default Customers_Vendors