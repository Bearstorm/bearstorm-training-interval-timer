# Bearstorm Training Interval Timer

A Lovelace plugin for Home Assistant that provides an interval training timer UI and communicates with ESPHome via MQTT.

## Installation (HACS)

1. In HACS, go to Frontend → ⋮ → Custom repositories
2. Add this repo URL as a plugin:
   ```
   https://github.com/Bearstorm/bearstorm-training-interval-timer
   ```
3. Add the resource to your Lovelace configuration:
   ```yaml
   - url: /hacsfiles/bearstorm-training-interval-timer/bearstorm-timer.js
     type: module
   ```
4. Use the `<bearstorm-timer>` card in your dashboard.

## License

Apache 2.0 – See LICENSE.
