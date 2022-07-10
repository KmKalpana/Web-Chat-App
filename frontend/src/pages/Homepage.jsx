import React from 'react';
import {Container, Box, Text, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
const Homepage = () => {
    return (
         <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        w="100%">
        <Text fontSize="4xl">
          Web Chat App
        </Text>
      </Box>
      <Box p={4}  bg="white" w="100%"  borderRadius="lg" borderWidth="1px">
      <Tabs variant="soft-rounded">
      <TabList mb="1em">
      <Tab width="50%">Login</Tab>
      <Tab width="50%">Signup</Tab>
      </TabList>
      <TabPanels>
      <TabPanel><Login /></TabPanel>
      <TabPanel><Signup /></TabPanel>
      </TabPanels>
      </Tabs>
      </Box>
        </Container>
    );
}

export default Homepage;
