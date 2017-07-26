import { NavigationActions } from 'react-navigation'

const resetAction = (routeName, params) => {
  let config;
  if (!params) {
    config = { routeName };
  } else {
    config = { routeName, params}
  }
  return NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate(config)
    ]
  });
}

export { resetAction };
