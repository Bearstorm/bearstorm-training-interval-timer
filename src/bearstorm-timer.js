class BearstormTimer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
          padding: 1em;
          background: #111;
          color: white;
          font-family: sans-serif;
        }
        input, button {
          margin: 0.3em 0;
          padding: 0.4em;
          width: 100%;
          font-size: 1em;
        }
        .status {
          margin-top: 1em;
          background: #222;
          padding: 0.5em;
          border-radius: 5px;
        }
      </style>
      <div>
        <label>Work Time (s or mm:ss)</label>
        <input id="work" />
        <label>Rest Time (s or mm:ss)</label>
        <input id="rest" />
        <label>Rounds</label>
        <input id="rounds" type="number" min="1" max="99" />
        <button id="send">Send Settings</button>
        <button id="start">Start</button>
        <button id="stop">Stop</button>
        <div class="status" id="status">Waiting for status...</div>
      </div>
    \`;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._subscribed) {
      this._subscribe();
      this._subscribed = true;
    }
  }

  _subscribe() {
    this._hass.connection.subscribeMessage(
      msg => {
        this.shadowRoot.getElementById("status").textContent =
          JSON.stringify(msg.payload);
      },
      {
        type: "mqtt/subscribe",
        topic: "bearstorm/timer/status"
      }
    );

    const sendBtn = this.shadowRoot.getElementById("send");
    const startBtn = this.shadowRoot.getElementById("start");
    const stopBtn = this.shadowRoot.getElementById("stop");

    sendBtn.onclick = () => {
      const w = this._parseTime(this.shadowRoot.getElementById("work").value);
      const r = this._parseTime(this.shadowRoot.getElementById("rest").value);
      const rounds = parseInt(this.shadowRoot.getElementById("rounds").value);
      const payload = { work: w, rest: r, rounds: rounds };
      this._publish("bearstorm/timer/settings", payload);
    };

    startBtn.onclick = () => this._publish("bearstorm/timer/command", "start");
    stopBtn.onclick = () => this._publish("bearstorm/timer/command", "stop");
  }

  _publish(topic, payload) {
    this._hass.callService("mqtt", "publish", {
      topic: topic,
      payload: typeof payload === "string" ? payload : JSON.stringify(payload)
    });
  }

  _parseTime(val) {
    if (val.includes(":")) {
      const [m, s] = val.split(":").map(Number);
      return m * 60 + s;
    }
    return parseInt(val);
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("bearstorm-timer", BearstormTimer);
