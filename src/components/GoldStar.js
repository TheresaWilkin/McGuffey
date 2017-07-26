import React, { Component } from 'react';
import {
 Image,
 Animated,
 Easing
} from 'react-native';

class GoldStar extends Component {
  constructor (props) {
    super(props)
    this.springValue = new Animated.Value(0.3)
  }
  componentDidMount () {
    this.spring()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.points != this.props.points) {
      this.spring();
    }
  }

  spring () {
  this.springValue.setValue(0.3)
  Animated.spring(
    this.springValue,
    {
      toValue: 1,
      friction: 1
    }
  ).start()
}

  render() {
    const spring = this.springValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <Animated.Image
        source={require('../images/GoldStar.png')}
        style={{
          height: 50,
          width: 50,
          transform: [{scale: this.springValue}]
        }}
      />
    );
  }
}

export default GoldStar;
