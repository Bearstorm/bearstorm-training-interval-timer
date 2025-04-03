# 🕒 Bearstorm Training Interval Timer

**Bearstorm Training Interval Timer** is a Lovelace frontend plugin for Home Assistant, designed to provide a fully customizable interval workout timer.  
It integrates seamlessly with ESPHome devices over MQTT and provides a simple yet powerful web interface for setting work/rest intervals, rounds, and live session status.

---

## 💡 Features

- 🎛️ Input for work time, rest time, and number of rounds
- 🚀 Start/stop controls
- 📡 MQTT communication with ESPHome devices
- 🔄 Real-time feedback via MQTT subscribe (status)
- 🧩 Easy to embed in Lovelace dashboards
- ⚙️ Works offline without backend or Docker
- 🧑‍🤝‍🧑 Ready for community contributions

---

## 📦 Installation (via HACS)

1. Go to Home Assistant → HACS → **Frontend**
2. Click the top-right menu (⋮) → **Custom repositories**
3. Add this repository:
   ```
   https://github.com/Bearstorm/bearstorm-training-interval-timer
   ```
4. Choose **Plugin** as category
5. After install, go to: **Settings → Dashboards → Resources**
   ```yaml
   - url: /hacsfiles/bearstorm-training-interval-timer/bearstorm-timer.js
     type: module
   ```

---

## 🔌 How to Use

In your Lovelace dashboard YAML or UI editor, add:

```yaml
type: custom:bearstorm-timer
```

You can then enter:
- **Work Time** in seconds or `mm:ss`
- **Rest Time** in seconds or `mm:ss`
- **Rounds** as a number

It will publish to MQTT:

| Topic                         | Payload example                           |
|------------------------------|--------------------------------------------|
| `bearstorm/timer/settings`   | `{ "work": 30, "rest": 15, "rounds": 10 }` |
| `bearstorm/timer/command`    | `"start"` / `"stop"`                       |
| `bearstorm/timer/status`     | `{ "mode": "WORK", "round": 3, "time_left": 27 }` |

---

## 🧑‍💻 Contributing

We welcome pull requests, bug reports and new feature ideas!

- Open an [Issue](https://github.com/Bearstorm/bearstorm-training-interval-timer/issues)
- Submit [Pull Requests](https://github.com/Bearstorm/bearstorm-training-interval-timer/pulls)
- See [CONTRIBUTING.md](CONTRIBUTING.md) for guidance

---

## ⚖️ License

This project is licensed under the [Apache License 2.0](LICENSE).  
If you modify or redistribute this plugin, **you must credit the original author (Bearstorm)** in your documentation or interface.

---

## 👤 Author

Created with ❤️ by **Bearstorm**  
GitHub: [github.com/Bearstorm](https://github.com/Bearstorm)
