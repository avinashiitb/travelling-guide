import React, { memo, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, List, Title } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import { Appbar } from 'react-native-paper';
import PurchaseCard from '../components/PurchaseCard';
import { FAB } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  const refRBSheet = useRef();
  const _OnClick = () => (
    refRBSheet.current.open()
  )
  return (
    <>
      <Appbar.Header style={{ marginTop: 30 }} >
        {/* <Appbar.BackAction /> */}
        <Appbar.Action icon="gauge" />
        <Appbar.Content title="Dashboard" subtitle="Billing history for 1 month" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <Background styleProps={styles} >
        <ScrollView style={styles.background}>

        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
          height={600}
        >
          <Title style={{ alignSelf: 'center', color: theme.colors.primary }}>RB Dashboard</Title>
          <View style={{ flexDirection: 'row', height: 50 }}>
            <View style={{ flex: 1 }}>
              <List.Item
                title="Date:"
                description="Jan 09, 2022"
                descriptionStyle={{ fontWeight: '700', fontSize: 12, }}
              />
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", }}>
              <List.Item
                style={{ alignSelf: 'flex-end', alignItems: "flex-end" }}
                title="Invoice No:"
                description="HDF34453T"
                titleStyle={{ alignSelf: 'flex-end', paddingEnd: 10 }}
                descriptionStyle={{ fontWeight: '700', fontSize: 12, alignSelf: 'flex-end', paddingEnd: 10 }}
              />
            </View>
          </View>
          
          <List.Item
            title="First data"
            left={props => <List.Icon style={{ marginRight: 0, }} {...props} icon="account" />}
            titleStyle={{ fontSize: 15, fontWeight: '700', color: theme.colors.black }}
          />

    
        </RBSheet>
        <FAB
          style={styles.fab}
          icon="plus"
          label="Add"
          onPress={() => _OnClick()}
        />
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    bottom: 0,
    backgroundColor: theme.colors.primary,

  },
  itemStyle: {
    alignSelf: 'flex-start',
    color: theme.colors.primary,
    backgroundColor: 'green',
    padding: 0,
    height: 10,
    justifyContent: 'center',
  }
});

export default memo(Dashboard);
