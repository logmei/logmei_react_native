import {CommonActions} from '@react-navigation/native';
let _navigator: {dispatch: (arg0: CommonActions.Action) => void};

function setNavigatorRef(navigatorRef: {
  dispatch: (arg0: CommonActions.Action) => void;
}) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params?: object) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

export default {
  navigate,
  setNavigatorRef,
  goBack,
};
