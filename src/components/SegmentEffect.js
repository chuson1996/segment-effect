import React, { Component, PropTypes } from 'react';
import {Motion, spring} from 'react-motion';
import update from 'react-addons-update';

const animate = (val) => spring(val, { stiffness: 32, damping: 26 })

export default class SegmentEffect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perspectiveOrigin: {
        x: 50,
        y: 50
      },
      effect: {
        shadowOpacity: 0,
        z: 0
      },
      segmentsOffset: [
        // Unit: %
        {
          left: 10,
          top: 80,
          width: 30,
          height: 20
        },
        {
          left: 2,
          top: 2,
          width: 40,
          height: 40
        },
        {
          left: 60,
          top: 30,
          width: 30,
          height: 60
        },
        {
          left: 20,
          top: 10,
          width: 50,
          height: 60
        }
      ]
    };
  }

  componentDidMount() {
    this.startAnimation();
    window.addEventListener('mousemove', (e) => {
      // console.log(e.screenX, e.screenY);
      const perspectiveOrignX = 100 - Math.floor(e.screenX / window.innerWidth * 100);
      const perspectiveOrignY = 100 - Math.floor(e.screenY / window.innerHeight * 100);
      this.setState(update(this.state, {
        perspectiveOrigin: {
          $merge: {
            x: spring(perspectiveOrignX),
            y: spring(perspectiveOrignY)
          }
        }
      }))
    });
  }

  startAnimation() {
    this.setState(update(this.state, {
      effect: {
        $merge: {
          shadowOpacity: animate(1),
          z: animate(20)
        }
      }
    }));
  }

  render() {
    return (
      <div className="segmenter">
        <div className="segmenter__background">
        </div>
        <Motion
          style={this.state.effect}>
            {(style) =>
              <Motion style={this.state.perspectiveOrigin}>
                {({x, y}) =>
                  <div className="segmenter__pieces"
                    style={{
                      perspectiveOrigin: `${x}% ${y}%`
                    }}>
                    { this.state.segmentsOffset.map(({ top, left, width, height }, key) =>
                      <div key={key} className="segmenter__piece-wrap" style={{
                        transform: `translateZ(${style.z}px)`
                      }}>
                        <div className="segmenter__shadow"
                          style={{
                            top: `${top}%`,
                            left: `${left}%`,
                            width: `${width}%`,
                            height: `${height}%`,
                            opacity: style.shadowOpacity
                          }}></div>
                        <div className="segmenter__piece"
                          style={{
                            WebkitClipPath: `polygon(${left}% ${top}%, ${left + width}% ${top}%, ${left + width}% ${top + height}%, ${left}% ${top + height}%)`,
                            clipPath: `polygon(${left}% ${top}%, ${left + width}% ${top}%, ${left + width}% ${top + height}%, ${left}% ${top + height}%)`
                          }}></div>
                      </div>
                    )}
                  </div>
                }
              </Motion>
            }
          </Motion>
          <div className="segmenter__body">
            <Motion style={this.state.effect}>
              {(style) =>
                <h1 style={{
                  opacity: style.shadowOpacity,
                  // transform: `translateY(${20 - style.z}px)`
                }}>
                  {'SEGMENT EFFECT'.split('').map((letter, key) =>
                    <span
                      style={{ marginLeft: 40 - style.z }}
                      key={key}>{letter}</span>
                  )}
                </h1>
              }
            </Motion>
          </div>
      </div>
    );
  }
}
