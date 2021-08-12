import {useContext} from 'react';
import {RootContext} from '../../App';

export const useBottomTabBar = () => {
  const {tabIndex, toggleTab, tabDatas} = useContext(RootContext);
  return {tabIndex, toggleTab, tabDatas};
};
