/* ── PROJECT DETAIL MODAL ── */
const PROJECTS = {
  'proj-iot-industrial': {
    icon: '🏭', title: 'IoT-Based Industrial Monitoring System',
    subtitle: 'ESP32 · Cloud Dashboard · Real-Time Alerts',
    tags: ['ESP32','DHT22','MQ-2','Wi-Fi','Cloud','Embedded C'],
    desc: 'A real-time industrial monitoring system using ESP32 that reads multiple industrial sensors, transmits data to a cloud dashboard, and triggers alerts when unsafe thresholds are exceeded.',
    features: [
      ['📡','Real-time sensor data transmitted via Wi-Fi to cloud'],
      ['📊','Live cloud dashboard with graphs and historical logs'],
      ['🔔','Automated email/SMS alerts on threshold breach'],
      ['🔁','Continuous loop monitoring with 5-second intervals'],
    ],
    diagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="#a0aec0">
      <defs><marker id="a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4da8ff"/></marker></defs>
      <rect x="10" y="80" width="110" height="60" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1.5"/>
      <text x="65" y="106" text-anchor="middle" fill="#edf2ff" font-weight="bold">Sensors</text>
      <text x="65" y="122" text-anchor="middle" font-size="10">DHT22 · MQ-2</text>
      <rect x="185" y="80" width="110" height="60" rx="8" fill="#0f1629" stroke="#7c5cfc" stroke-width="1.5"/>
      <text x="240" y="106" text-anchor="middle" fill="#edf2ff" font-weight="bold">ESP32</text>
      <text x="240" y="122" text-anchor="middle" font-size="10">Microcontroller</text>
      <rect x="360" y="80" width="110" height="60" rx="8" fill="#0f1629" stroke="#00e5b3" stroke-width="1.5"/>
      <text x="415" y="106" text-anchor="middle" fill="#edf2ff" font-weight="bold">Cloud</text>
      <text x="415" y="122" text-anchor="middle" font-size="10">Dashboard</text>
      <rect x="535" y="55" width="110" height="50" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1"/>
      <text x="590" y="76" text-anchor="middle" fill="#edf2ff">OLED</text>
      <text x="590" y="92" text-anchor="middle" font-size="10">Display</text>
      <rect x="535" y="115" width="110" height="50" rx="8" fill="#0f1629" stroke="#f78c6c" stroke-width="1"/>
      <text x="590" y="136" text-anchor="middle" fill="#edf2ff">Alert</text>
      <text x="590" y="152" text-anchor="middle" font-size="10">Email / SMS</text>
      <line x1="120" y1="110" x2="183" y2="110" stroke="#4da8ff" stroke-width="1.5" marker-end="url(#a)"/>
      <line x1="295" y1="110" x2="358" y2="110" stroke="#4da8ff" stroke-width="1.5" marker-end="url(#a)"/>
      <line x1="470" y1="95" x2="533" y2="84" stroke="#4da8ff" stroke-width="1" marker-end="url(#a)"/>
      <line x1="470" y1="120" x2="533" y2="135" stroke="#f78c6c" stroke-width="1" marker-end="url(#a)"/>
      <text x="65" y="170" text-anchor="middle" fill="#546e7a" font-size="10">Industrial</text>
      <text x="240" y="170" text-anchor="middle" fill="#546e7a" font-size="10">Processing</text>
      <text x="415" y="170" text-anchor="middle" fill="#546e7a" font-size="10">Wi-Fi</text>
    </svg>`,
    components: [
      ['ESP32 Dev Board','1','Main Microcontroller','₹350'],
      ['DHT22 Sensor','2','Temperature & Humidity','₹120'],
      ['MQ-2 Gas Sensor','1','Gas/Smoke Detection','₹80'],
      ['ACS712 Current Sensor','1','Current Monitoring','₹90'],
      ['OLED 0.96" I2C','1','Local Display','₹150'],
      ['Buzzer 5V','1','Audible Alert','₹20'],
      ['Power Supply 5V 2A','1','Power','₹180'],
    ],
    connections: [
      ['DHT22 DATA','→','ESP32 GPIO 4'],
      ['MQ-2 AO','→','ESP32 GPIO 34 (ADC)'],
      ['ACS712 OUT','→','ESP32 GPIO 35 (ADC)'],
      ['OLED SDA','→','ESP32 GPIO 21'],
      ['OLED SCL','→','ESP32 GPIO 22'],
      ['Buzzer +','→','ESP32 GPIO 26'],
      ['All VCC','→','3.3V / 5V Rail'],
      ['All GND','→','Common GND'],
    ],
    code: `<span class="cm">// IoT Industrial Monitoring — ESP32</span>
<span class="kw">#include</span> &lt;WiFi.h&gt;
<span class="kw">#include</span> &lt;HTTPClient.h&gt;
<span class="kw">#include</span> &lt;DHT.h&gt;
<span class="kw">#include</span> &lt;Adafruit_SSD1306.h&gt;

<span class="kw">const char*</span> ssid     = <span class="str">"YOUR_WIFI"</span>;
<span class="kw">const char*</span> password = <span class="str">"YOUR_PASS"</span>;
<span class="kw">const char*</span> apiUrl   = <span class="str">"http://your-dashboard.com/api/data"</span>;

DHT dht(<span class="num">4</span>, DHT22);
<span class="kw">float</span> temp, hum, gas;

<span class="kw">void</span> <span class="fn">setup</span>() {
  Serial.<span class="fn">begin</span>(<span class="num">115200</span>);
  dht.<span class="fn">begin</span>();
  WiFi.<span class="fn">begin</span>(ssid, password);
  <span class="kw">while</span> (WiFi.status() != WL_CONNECTED) <span class="fn">delay</span>(<span class="num">500</span>);
  Serial.<span class="fn">println</span>(<span class="str">"WiFi Connected!"</span>);
}

<span class="kw">void</span> <span class="fn">loop</span>() {
  temp = dht.<span class="fn">readTemperature</span>();
  hum  = dht.<span class="fn">readHumidity</span>();
  gas  = <span class="fn">analogRead</span>(<span class="num">34</span>);

  <span class="kw">if</span> (temp &gt; <span class="num">50</span> || gas &gt; <span class="num">2000</span>) {
    <span class="fn">digitalWrite</span>(<span class="num">26</span>, HIGH); <span class="cm">// Trigger buzzer alert</span>
    <span class="fn">sendAlert</span>(temp, gas);
  }
  <span class="fn">sendToCloud</span>(temp, hum, gas);
  <span class="fn">delay</span>(<span class="num">5000</span>);
}`,
    steps: [
      ['Power On','ESP32 and all sensors are powered. Wi-Fi connection is established via the credentials in firmware.'],
      ['Sensor Reading','DHT22 reads temperature & humidity every 5 seconds. MQ-2 reads gas concentration via ADC pin.'],
      ['Threshold Check','Firmware compares readings against set thresholds (e.g., temp > 50°C, gas > 2000 ADC).'],
      ['Cloud Push','Data is sent as HTTP POST to the cloud dashboard which logs and displays live graphs.'],
      ['Alert Trigger','If threshold is exceeded, buzzer activates locally and an alert is sent to the cloud notification system.'],
    ]
  },

  'proj-firefighting': {
    icon: '🔥', title: 'Fire Fighting Robot',
    subtitle: 'Arduino UNO · Flame Sensor · L298N Motor Driver',
    tags: ['Arduino UNO','L298N','Flame Sensor','Servo','DC Motor','C++'],
    desc: 'An autonomous robot that detects fire using IR flame sensors and navigates toward the source to extinguish it using a servo-controlled water pump — without any human intervention.',
    features: [
      ['🔥','3 flame sensors for 360° fire detection coverage'],
      ['🤖','Autonomous navigation toward fire source'],
      ['💦','Servo-aimed water pump for targeted suppression'],
      ['📡','IR obstacle avoidance while navigating'],
    ],
    diagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="#a0aec0">
      <defs><marker id="b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4da8ff"/></marker></defs>
      <rect x="10" y="80" width="110" height="60" rx="8" fill="#0f1629" stroke="#f78c6c" stroke-width="1.5"/>
      <text x="65" y="106" text-anchor="middle" fill="#edf2ff" font-weight="bold">Flame</text>
      <text x="65" y="122" text-anchor="middle" font-size="10">Sensors ×3</text>
      <rect x="185" y="80" width="110" height="60" rx="8" fill="#0f1629" stroke="#7c5cfc" stroke-width="1.5"/>
      <text x="240" y="106" text-anchor="middle" fill="#edf2ff" font-weight="bold">Arduino</text>
      <text x="240" y="122" text-anchor="middle" font-size="10">UNO</text>
      <rect x="360" y="40" width="110" height="55" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1.5"/>
      <text x="415" y="65" text-anchor="middle" fill="#edf2ff" font-weight="bold">L298N</text>
      <text x="415" y="81" text-anchor="middle" font-size="10">Motor Driver</text>
      <rect x="360" y="125" width="110" height="55" rx="8" fill="#0f1629" stroke="#00e5b3" stroke-width="1.5"/>
      <text x="415" y="150" text-anchor="middle" fill="#edf2ff" font-weight="bold">Servo</text>
      <text x="415" y="166" text-anchor="middle" font-size="10">+ Water Pump</text>
      <rect x="535" y="40" width="110" height="55" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1"/>
      <text x="590" y="65" text-anchor="middle" fill="#edf2ff">DC Motors</text>
      <text x="590" y="81" text-anchor="middle" font-size="10">Wheels ×4</text>
      <line x1="120" y1="110" x2="183" y2="110" stroke="#f78c6c" stroke-width="1.5" marker-end="url(#b)"/>
      <line x1="295" y1="100" x2="358" y2="75" stroke="#4da8ff" stroke-width="1.5" marker-end="url(#b)"/>
      <line x1="295" y1="120" x2="358" y2="148" stroke="#00e5b3" stroke-width="1.5" marker-end="url(#b)"/>
      <line x1="470" y1="68" x2="533" y2="68" stroke="#4da8ff" stroke-width="1" marker-end="url(#b)"/>
    </svg>`,
    components: [
      ['Arduino UNO','1','Main Controller','₹400'],
      ['IR Flame Sensor','3','Fire Detection','₹60 each'],
      ['L298N Motor Driver','1','Motor Control','₹90'],
      ['DC Gear Motors','4','Robot Movement','₹120 each'],
      ['Servo Motor SG90','1','Pump Aiming','₹80'],
      ['Mini Water Pump','1','Fire Suppression','₹150'],
      ['9V Battery / Li-ion','1','Power Supply','₹200'],
    ],
    connections: [
      ['Flame Sensor L OUT','→','Arduino Pin 2'],
      ['Flame Sensor C OUT','→','Arduino Pin 3'],
      ['Flame Sensor R OUT','→','Arduino Pin 4'],
      ['L298N IN1-IN4','→','Arduino Pin 6,7,8,9'],
      ['L298N ENA/ENB','→','Arduino Pin 5, 10 (PWM)'],
      ['Servo Signal','→','Arduino Pin 11'],
      ['Pump Relay IN','→','Arduino Pin 12'],
      ['L298N 12V','→','Battery +'],
    ],
    code: `<span class="cm">// Fire Fighting Robot — Arduino</span>
<span class="kw">#include</span> &lt;Servo.h&gt;
Servo pumpServo;

<span class="kw">#define</span> FL <span class="num">2</span>  <span class="cm">// Flame Left</span>
<span class="kw">#define</span> FC <span class="num">3</span>  <span class="cm">// Flame Centre</span>
<span class="kw">#define</span> FR <span class="num">4</span>  <span class="cm">// Flame Right</span>
<span class="kw">#define</span> PUMP <span class="num">12</span>

<span class="kw">void</span> <span class="fn">setup</span>() {
  <span class="fn">pinMode</span>(FL, INPUT); <span class="fn">pinMode</span>(FC, INPUT); <span class="fn">pinMode</span>(FR, INPUT);
  <span class="fn">pinMode</span>(PUMP, OUTPUT);
  pumpServo.<span class="fn">attach</span>(<span class="num">11</span>);
  pumpServo.<span class="fn">write</span>(<span class="num">90</span>);
}

<span class="kw">void</span> <span class="fn">loop</span>() {
  <span class="kw">bool</span> l = !<span class="fn">digitalRead</span>(FL);
  <span class="kw">bool</span> c = !<span class="fn">digitalRead</span>(FC);
  <span class="kw">bool</span> r = !<span class="fn">digitalRead</span>(FR);

  <span class="kw">if</span> (c) { <span class="fn">stopMotors</span>(); <span class="fn">activatePump</span>(); }
  <span class="kw">else if</span> (l) <span class="fn">turnLeft</span>();
  <span class="kw">else if</span> (r) <span class="fn">turnRight</span>();
  <span class="kw">else</span> { <span class="fn">moveForward</span>(); <span class="fn">digitalWrite</span>(PUMP, LOW); }
}`,
    steps: [
      ['Boot','Arduino initialises pins. Robot starts in standby. Servo positions pump at 90°.'],
      ['Fire Scan','Three flame sensors continuously scan left, centre, and right for IR radiation from flames.'],
      ['Navigate','If fire is left/right, robot turns accordingly. If flame is detected centre, robot stops.'],
      ['Suppress','Pump activates, servo sweeps left to right to spray a wider area until flame sensor reads clear.'],
      ['Resume','Once all sensors read clear, pump deactivates and robot continues patrol.'],
    ]
  },

  'proj-solar': {
    icon: '☀️', title: 'Solar Panel Lighting System',
    subtitle: 'Solar Panel · Lead-Acid Battery · LDR · Relay',
    tags: ['Solar Panel','Arduino','LDR','Relay','Lead-Acid Battery'],
    desc: 'An off-grid solar-powered automatic lighting system. Solar energy charges a battery during daylight; an LDR sensor detects darkness and automatically switches LEDs on via a relay.',
    features: [
      ['☀️','Solar charging during daylight hours'],
      ['🌙','Automatic ON at dusk, OFF at dawn via LDR'],
      ['🔋','Overcharge and deep-discharge protection'],
      ['💡','Zero electricity bill operation'],
    ],
    diagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="#a0aec0">
      <defs><marker id="c" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4da8ff"/></marker></defs>
      <rect x="10" y="70" width="100" height="55" rx="8" fill="#0f1629" stroke="#febc2e" stroke-width="1.5"/>
      <text x="60" y="95" text-anchor="middle" fill="#febc2e" font-weight="bold">Solar</text>
      <text x="60" y="111" text-anchor="middle" font-size="10">Panel 10W</text>
      <rect x="170" y="70" width="100" height="55" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1.5"/>
      <text x="220" y="95" text-anchor="middle" fill="#edf2ff" font-weight="bold">Charge</text>
      <text x="220" y="111" text-anchor="middle" font-size="10">Controller</text>
      <rect x="330" y="70" width="100" height="55" rx="8" fill="#0f1629" stroke="#00e5b3" stroke-width="1.5"/>
      <text x="380" y="95" text-anchor="middle" fill="#edf2ff" font-weight="bold">Battery</text>
      <text x="380" y="111" text-anchor="middle" font-size="10">Lead-Acid 7Ah</text>
      <rect x="490" y="45" width="100" height="50" rx="8" fill="#0f1629" stroke="#7c5cfc" stroke-width="1.5"/>
      <text x="540" y="70" text-anchor="middle" fill="#edf2ff" font-weight="bold">Arduino</text>
      <text x="540" y="86" text-anchor="middle" font-size="10">+ LDR</text>
      <rect x="490" y="110" width="100" height="50" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1.5"/>
      <text x="540" y="135" text-anchor="middle" fill="#edf2ff" font-weight="bold">Relay</text>
      <text x="540" y="151" text-anchor="middle" font-size="10">→ LED Array</text>
      <line x1="110" y1="97" x2="168" y2="97" stroke="#febc2e" stroke-width="1.5" marker-end="url(#c)"/>
      <line x1="270" y1="97" x2="328" y2="97" stroke="#4da8ff" stroke-width="1.5" marker-end="url(#c)"/>
      <line x1="430" y1="80" x2="488" y2="65" stroke="#4da8ff" stroke-width="1" marker-end="url(#c)"/>
      <line x1="430" y1="115" x2="488" y2="133" stroke="#00e5b3" stroke-width="1" marker-end="url(#c)"/>
      <line x1="540" y1="95" x2="540" y2="108" stroke="#7c5cfc" stroke-width="1" marker-end="url(#c)"/>
    </svg>`,
    components: [
      ['Solar Panel 10W','1','Energy Source','₹700'],
      ['Lead-Acid Battery 7Ah','1','Energy Storage','₹600'],
      ['Charge Controller 10A','1','Battery Protection','₹350'],
      ['Arduino Nano','1','Control Logic','₹250'],
      ['LDR Sensor','1','Light Detection','₹10'],
      ['5V Relay Module','1','Switch Control','₹50'],
      ['LED Strip / Bulb','1','Lighting Load','₹200'],
    ],
    connections: [
      ['Solar Panel +/-','→','Charge Controller IN'],
      ['Charge Controller BAT','→','Battery +/-'],
      ['Battery +','→','Arduino VIN via 7805'],
      ['LDR + 10kΩ','→','Arduino A0'],
      ['Relay IN','→','Arduino Pin 7'],
      ['Relay COM+NO','→','Battery → LED Load'],
    ],
    code: `<span class="cm">// Solar Auto Lighting — Arduino Nano</span>
<span class="kw">#define</span> LDR_PIN   A0
<span class="kw">#define</span> RELAY_PIN  7
<span class="kw">#define</span> THRESHOLD 500  <span class="cm">// Adjust for your LDR</span>

<span class="kw">void</span> <span class="fn">setup</span>() {
  <span class="fn">pinMode</span>(RELAY_PIN, OUTPUT);
  <span class="fn">digitalWrite</span>(RELAY_PIN, LOW);
}

<span class="kw">void</span> <span class="fn">loop</span>() {
  <span class="kw">int</span> light = <span class="fn">analogRead</span>(LDR_PIN);

  <span class="kw">if</span> (light &lt; THRESHOLD) {
    <span class="cm">// Dark → turn LED ON</span>
    <span class="fn">digitalWrite</span>(RELAY_PIN, HIGH);
  } <span class="kw">else</span> {
    <span class="cm">// Bright → turn LED OFF</span>
    <span class="fn">digitalWrite</span>(RELAY_PIN, LOW);
  }
  <span class="fn">delay</span>(<span class="num">1000</span>);
}`,
    steps: [
      ['Solar Charging','During daylight, the solar panel charges the lead-acid battery via the charge controller safely.'],
      ['LDR Sensing','Arduino reads the LDR voltage divider output on A0 every second.'],
      ['Dusk Detection','When ambient light drops below threshold (≈500), the system determines it is dark.'],
      ['Relay Switch','Arduino sets Relay pin HIGH, completing the circuit between battery and LED load.'],
      ['Dawn OFF','At sunrise, light level rises above threshold; relay turns off, conserving battery charge.'],
    ]
  },

  'proj-homeauto': {
    icon: '🏠', title: 'Home Automation System',
    subtitle: 'ESP8266 · Blynk Cloud · Relay · DHT11',
    tags: ['ESP8266','Blynk','Relay Module','DHT11','Wi-Fi','IoT'],
    desc: 'A Wi-Fi based smart home control system using ESP8266 and the Blynk platform. Control home appliances from anywhere via smartphone and monitor real-time temperature and humidity.',
    features: [
      ['📱','Smartphone control from anywhere via internet'],
      ['🌡️','Real-time temperature and humidity monitoring'],
      ['⏰','Schedule automation and timer triggers'],
      ['🔌','Control up to 4 appliances via relay channels'],
    ],
    diagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="#a0aec0">
      <defs><marker id="d" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4da8ff"/></marker></defs>
      <rect x="10" y="75" width="100" height="50" rx="8" fill="#0f1629" stroke="#00e5b3" stroke-width="1.5"/>
      <text x="60" y="97" text-anchor="middle" fill="#00e5b3" font-weight="bold">Phone</text>
      <text x="60" y="113" text-anchor="middle" font-size="10">Blynk App</text>
      <rect x="175" y="75" width="110" height="50" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1.5"/>
      <text x="230" y="97" text-anchor="middle" fill="#4da8ff" font-weight="bold">Blynk</text>
      <text x="230" y="113" text-anchor="middle" font-size="10">Cloud Server</text>
      <rect x="350" y="75" width="110" height="50" rx="8" fill="#0f1629" stroke="#7c5cfc" stroke-width="1.5"/>
      <text x="405" y="97" text-anchor="middle" fill="#edf2ff" font-weight="bold">ESP8266</text>
      <text x="405" y="113" text-anchor="middle" font-size="10">NodeMCU</text>
      <rect x="525" y="45" width="110" height="50" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1"/>
      <text x="580" y="67" text-anchor="middle" fill="#edf2ff" font-weight="bold">4ch Relay</text>
      <text x="580" y="83" text-anchor="middle" font-size="10">Appliances</text>
      <rect x="525" y="110" width="110" height="50" rx="8" fill="#0f1629" stroke="#febc2e" stroke-width="1"/>
      <text x="580" y="132" text-anchor="middle" fill="#edf2ff" font-weight="bold">DHT11</text>
      <text x="580" y="148" text-anchor="middle" font-size="10">Temp/Humidity</text>
      <line x1="110" y1="100" x2="173" y2="100" stroke="#00e5b3" stroke-width="1.5" marker-end="url(#d)"/>
      <line x1="285" y1="100" x2="348" y2="100" stroke="#4da8ff" stroke-width="1.5" marker-end="url(#d)"/>
      <line x1="460" y1="90" x2="523" y2="72" stroke="#7c5cfc" stroke-width="1" marker-end="url(#d)"/>
      <line x1="460" y1="110" x2="523" y2="132" stroke="#febc2e" stroke-width="1" marker-end="url(#d)"/>
    </svg>`,
    components: [
      ['ESP8266 NodeMCU','1','Wi-Fi Microcontroller','₹280'],
      ['4-Channel Relay Module','1','Appliance Control','₹130'],
      ['DHT11 Sensor','1','Temp/Humidity','₹60'],
      ['5V Power Adapter','1','Power Supply','₹150'],
      ['Jumper Wires','20','Connections','₹50'],
      ['Blynk App (free)','1','Mobile Interface','Free'],
    ],
    connections: [
      ['DHT11 DATA','→','ESP8266 D4 (GPIO2)'],
      ['Relay IN1','→','ESP8266 D1 (GPIO5)'],
      ['Relay IN2','→','ESP8266 D2 (GPIO4)'],
      ['Relay IN3','→','ESP8266 D5 (GPIO14)'],
      ['Relay IN4','→','ESP8266 D6 (GPIO12)'],
      ['Relay VCC','→','5V from adapter'],
      ['ESP8266 VIN','→','5V Power'],
    ],
    code: `<span class="cm">// Home Automation — ESP8266 + Blynk</span>
<span class="kw">#define</span> BLYNK_TEMPLATE_ID <span class="str">"YourTemplateID"</span>
<span class="kw">#include</span> &lt;ESP8266WiFi.h&gt;
<span class="kw">#include</span> &lt;BlynkSimpleEsp8266.h&gt;
<span class="kw">#include</span> &lt;DHT.h&gt;

<span class="kw">char</span> auth[] = <span class="str">"YourAuthToken"</span>;
DHT dht(D4, DHT11);
BlynkTimer timer;

BLYNK_WRITE(V1) { <span class="cm">// Virtual pin 1 → Relay 1</span>
  <span class="fn">digitalWrite</span>(D1, <span class="fn">param.asInt</span>() ? LOW : HIGH);
}

<span class="kw">void</span> <span class="fn">sendSensor</span>() {
  Blynk.<span class="fn">virtualWrite</span>(V5, dht.<span class="fn">readTemperature</span>());
  Blynk.<span class="fn">virtualWrite</span>(V6, dht.<span class="fn">readHumidity</span>());
}

<span class="kw">void</span> <span class="fn">setup</span>() {
  Blynk.<span class="fn">begin</span>(auth, <span class="str">"WiFi_SSID"</span>, <span class="str">"WiFi_PASS"</span>);
  dht.<span class="fn">begin</span>();
  timer.<span class="fn">setInterval</span>(<span class="num">2000L</span>, sendSensor);
}
<span class="kw">void</span> <span class="fn">loop</span>() { Blynk.<span class="fn">run</span>(); timer.<span class="fn">run</span>(); }`,
    steps: [
      ['Connect','ESP8266 connects to home Wi-Fi and authenticates with Blynk Cloud server using auth token.'],
      ['App Control','User presses a button in the Blynk app → command sent to cloud → forwarded to ESP8266.'],
      ['Relay Trigger','ESP8266 sets relay pin LOW/HIGH to switch appliance circuit on or off.'],
      ['Sensor Report','Every 2 seconds, DHT11 readings are sent to Blynk virtual pins V5, V6 for display on app.'],
      ['Schedule','Blynk automation rules allow time-based triggers even without user interaction.'],
    ]
  },

  'proj-industrial': {
    icon: '🔧', title: 'Industrial Safety System',
    subtitle: 'Arduino · MQ-2 · GSM SIM800L · LCD',
    tags: ['Arduino','MQ-2 Gas Sensor','GSM Module','DHT11','LCD 16×2'],
    desc: 'A multi-sensor industrial safety system that continuously monitors gas leakage, temperature, and fire. On hazard detection, it triggers local alarms and sends SMS alerts via GSM module.',
    features: [
      ['🔍','Continuous multi-hazard monitoring (gas, heat, fire)'],
      ['📟','Real-time LCD status display panel'],
      ['📱','SMS alert to designated numbers via GSM'],
      ['🚨','Automatic emergency shutdown relay activation'],
    ],
    diagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="#a0aec0">
      <defs><marker id="e" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4da8ff"/></marker></defs>
      <rect x="10" y="80" width="100" height="50" rx="8" fill="#0f1629" stroke="#f78c6c" stroke-width="1.5"/>
      <text x="60" y="102" text-anchor="middle" fill="#edf2ff" font-weight="bold">Sensors</text>
      <text x="60" y="118" text-anchor="middle" font-size="10">MQ2·DHT11·IR</text>
      <rect x="175" y="80" width="100" height="50" rx="8" fill="#0f1629" stroke="#7c5cfc" stroke-width="1.5"/>
      <text x="225" y="102" text-anchor="middle" fill="#edf2ff" font-weight="bold">Arduino</text>
      <text x="225" y="118" text-anchor="middle" font-size="10">UNO / Mega</text>
      <rect x="340" y="40" width="100" height="50" rx="8" fill="#0f1629" stroke="#f78c6c" stroke-width="1"/>
      <text x="390" y="62" text-anchor="middle" fill="#edf2ff" font-weight="bold">Alarm</text>
      <text x="390" y="78" text-anchor="middle" font-size="10">Buzzer + LED</text>
      <rect x="340" y="105" width="100" height="50" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1"/>
      <text x="390" y="127" text-anchor="middle" fill="#edf2ff" font-weight="bold">LCD 16×2</text>
      <text x="390" y="143" text-anchor="middle" font-size="10">Status Display</text>
      <rect x="505" y="70" width="100" height="55" rx="8" fill="#0f1629" stroke="#00e5b3" stroke-width="1.5"/>
      <text x="555" y="93" text-anchor="middle" fill="#edf2ff" font-weight="bold">GSM</text>
      <text x="555" y="109" text-anchor="middle" font-size="10">SIM800L → SMS</text>
      <line x1="110" y1="105" x2="173" y2="105" stroke="#f78c6c" stroke-width="1.5" marker-end="url(#e)"/>
      <line x1="275" y1="95" x2="338" y2="68" stroke="#4da8ff" stroke-width="1" marker-end="url(#e)"/>
      <line x1="275" y1="115" x2="338" y2="128" stroke="#4da8ff" stroke-width="1" marker-end="url(#e)"/>
      <line x1="275" y1="105" x2="503" y2="97" stroke="#00e5b3" stroke-width="1" marker-end="url(#e)"/>
    </svg>`,
    components: [
      ['Arduino UNO','1','Main Controller','₹400'],
      ['MQ-2 Gas Sensor','1','Gas/Smoke','₹80'],
      ['DHT11 Sensor','1','Temp/Humidity','₹60'],
      ['IR Flame Sensor','1','Fire Detection','₹60'],
      ['SIM800L GSM Module','1','SMS Alerts','₹450'],
      ['LCD 16×2 + I2C','1','Status Display','₹120'],
      ['Buzzer','1','Audio Alert','₹20'],
      ['SIM Card (Active)','1','Network','₹10'],
    ],
    connections: [
      ['MQ-2 AO','→','Arduino A0'],
      ['DHT11 DATA','→','Arduino Pin 2'],
      ['IR Sensor OUT','→','Arduino Pin 3'],
      ['SIM800L TX','→','Arduino Pin 10'],
      ['SIM800L RX','→','Arduino Pin 11'],
      ['SIM800L VCC','→','4V (LiPo direct)'],
      ['LCD SDA/SCL','→','Arduino A4/A5'],
      ['Buzzer +','→','Arduino Pin 8'],
    ],
    code: `<span class="cm">// Industrial Safety System — Arduino</span>
<span class="kw">#include</span> &lt;SoftwareSerial.h&gt;
<span class="kw">#include</span> &lt;DHT.h&gt;
<span class="kw">#include</span> &lt;LiquidCrystal_I2C.h&gt;

SoftwareSerial gsm(<span class="num">10</span>, <span class="num">11</span>);
DHT dht(<span class="num">2</span>, DHT11);
LiquidCrystal_I2C lcd(<span class="num">0x27</span>, <span class="num">16</span>, <span class="num">2</span>);

<span class="kw">void</span> <span class="fn">setup</span>() {
  gsm.<span class="fn">begin</span>(<span class="num">9600</span>); dht.<span class="fn">begin</span>(); lcd.<span class="fn">init</span>();
  <span class="fn">pinMode</span>(<span class="num">8</span>, OUTPUT); <span class="cm">// Buzzer</span>
}

<span class="kw">void</span> <span class="fn">loop</span>() {
  <span class="kw">int</span> gas  = <span class="fn">analogRead</span>(A0);
  <span class="kw">float</span> t  = dht.<span class="fn">readTemperature</span>();
  <span class="kw">bool</span> fire = !<span class="fn">digitalRead</span>(<span class="num">3</span>);

  lcd.<span class="fn">setCursor</span>(<span class="num">0</span>,<span class="num">0</span>); lcd.<span class="fn">print</span>(<span class="str">"T:"</span> + String(t) + <span class="str">" G:"</span> + gas);

  <span class="kw">if</span> (gas &gt; <span class="num">400</span> || t &gt; <span class="num">55</span> || fire) {
    <span class="fn">digitalWrite</span>(<span class="num">8</span>, HIGH);
    <span class="fn">sendSMS</span>(<span class="str">"ALERT! Hazard detected!"</span>);
  } <span class="kw">else</span> <span class="fn">digitalWrite</span>(<span class="num">8</span>, LOW);
  <span class="fn">delay</span>(<span class="num">2000</span>);
}`,
    steps: [
      ['Boot','Arduino initialises GSM, LCD, DHT11. GSM registers to network with SIM card.'],
      ['Monitor','Sensors read every 2 seconds. Values displayed in real-time on LCD.'],
      ['Threshold Check','Gas > 400ppm, temp > 55°C, or fire sensor triggered = hazard detected.'],
      ['Local Alert','Buzzer activates. LCD shows "DANGER!" message. Red LED blinks.'],
      ['SMS Alert','Arduino sends AT commands to SIM800L: AT+CMGS to specified phone number with hazard details.'],
    ]
  },

  'proj-imgfire': {
    icon: '🎥', title: 'Image Processing Fire Fighting System',
    subtitle: 'Raspberry Pi · OpenCV · Python · Servo',
    tags: ['Raspberry Pi','OpenCV','Python','Pi Camera','Servo','Pump'],
    desc: 'An advanced fire detection and suppression system using Raspberry Pi and OpenCV. The Pi camera streams video; Python detects fire by HSV color thresholding and aims a servo-mounted pump.',
    features: [
      ['🎥','Real-time video-based fire detection using HSV color space'],
      ['🎯','Servo-controlled targeting based on fire centroid'],
      ['💦','Automatic pump activation on confirmed detection'],
      ['📡','SSH / web stream for remote monitoring'],
    ],
    diagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="#a0aec0">
      <defs><marker id="f" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4da8ff"/></marker></defs>
      <rect x="10" y="75" width="100" height="55" rx="8" fill="#0f1629" stroke="#f78c6c" stroke-width="1.5"/>
      <text x="60" y="98" text-anchor="middle" fill="#edf2ff" font-weight="bold">Pi Camera</text>
      <text x="60" y="114" text-anchor="middle" font-size="10">Video Stream</text>
      <rect x="175" y="60" width="140" height="80" rx="8" fill="#0f1629" stroke="#7c5cfc" stroke-width="1.5"/>
      <text x="245" y="90" text-anchor="middle" fill="#edf2ff" font-weight="bold">Raspberry Pi</text>
      <text x="245" y="106" text-anchor="middle" font-size="10">OpenCV Python</text>
      <text x="245" y="122" text-anchor="middle" font-size="10">HSV Detection</text>
      <rect x="380" y="50" width="110" height="50" rx="8" fill="#0f1629" stroke="#00e5b3" stroke-width="1.5"/>
      <text x="435" y="72" text-anchor="middle" fill="#edf2ff" font-weight="bold">Servo Pan</text>
      <text x="435" y="88" text-anchor="middle" font-size="10">X-axis aim</text>
      <rect x="380" y="120" width="110" height="50" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1.5"/>
      <text x="435" y="142" text-anchor="middle" fill="#edf2ff" font-weight="bold">Water Pump</text>
      <text x="435" y="158" text-anchor="middle" font-size="10">Relay activated</text>
      <rect x="560" y="85" width="110" height="50" rx="8" fill="#0f1629" stroke="#f78c6c" stroke-width="1"/>
      <text x="615" y="107" text-anchor="middle" fill="#edf2ff" font-weight="bold">🔥 Fire</text>
      <text x="615" y="123" text-anchor="middle" font-size="10">Target</text>
      <line x1="110" y1="102" x2="173" y2="102" stroke="#f78c6c" stroke-width="1.5" marker-end="url(#f)"/>
      <line x1="315" y1="85" x2="378" y2="75" stroke="#7c5cfc" stroke-width="1" marker-end="url(#f)"/>
      <line x1="315" y1="115" x2="378" y2="145" stroke="#7c5cfc" stroke-width="1" marker-end="url(#f)"/>
      <line x1="490" y1="75" x2="558" y2="100" stroke="#00e5b3" stroke-width="1" marker-end="url(#f)"/>
    </svg>`,
    components: [
      ['Raspberry Pi 3B+','1','Main Computer','₹3500'],
      ['Pi Camera Module v2','1','Video Input','₹1200'],
      ['Servo Motor SG90','2','Pan & Tilt','₹80 each'],
      ['Mini Water Pump 5V','1','Suppression','₹150'],
      ['5V Relay Module','1','Pump Control','₹50'],
      ['Pan-Tilt Bracket','1','Camera+Pump Mount','₹200'],
    ],
    connections: [
      ['Pi Camera Ribbon','→','Pi CSI Port'],
      ['Servo 1 Signal','→','Pi GPIO 17'],
      ['Servo 2 Signal','→','Pi GPIO 27'],
      ['Relay IN','→','Pi GPIO 22'],
      ['Relay COM-NO','→','Pump + Battery'],
      ['Servos VCC','→','5V (external 2A)'],
    ],
    code: `<span class="cm"># Fire Detection — Raspberry Pi + OpenCV</span>
<span class="kw">import</span> cv2, numpy as np
<span class="kw">import</span> RPi.GPIO as GPIO

SERVO_X = <span class="num">17</span>; PUMP = <span class="num">22</span>
GPIO.setmode(GPIO.BCM)
GPIO.setup(PUMP, GPIO.OUT)

lwr = np.array([<span class="num">0</span>, <span class="num">120</span>, <span class="num">100</span>])   <span class="cm"># HSV lower fire</span>
upr = np.array([<span class="num">35</span>, <span class="num">255</span>, <span class="num">255</span>])  <span class="cm"># HSV upper fire</span>

cap = cv2.VideoCapture(<span class="num">0</span>)
<span class="kw">while</span> True:
    ret, frame = cap.read()
    hsv  = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, lwr, upr)
    cnts = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)[<span class="num">0</span>]

    <span class="kw">if</span> cnts:
        c = max(cnts, key=cv2.contourArea)
        cx, _ = cv2.moments(c)[<span class="str">'m10'</span>], <span class="num">0</span>
        M = cv2.moments(c)
        cx = int(M[<span class="str">'m10'</span>] / M[<span class="str">'m00'</span>])
        GPIO.output(PUMP, GPIO.HIGH)  <span class="cm"># Pump ON</span>
    <span class="kw">else</span>:
        GPIO.output(PUMP, GPIO.LOW)`,
    steps: [
      ['Stream','Pi Camera captures live video at 30fps. Each frame is read by the Python OpenCV loop.'],
      ['HSV Convert','Each frame is converted from BGR to HSV colour space for robust fire colour detection.'],
      ['Mask','A binary mask isolates fire-coloured pixels (orange/red HSV range) using inRange().'],
      ['Centroid','Contours are found in the mask. The largest contour centroid gives fire X position.'],
      ['Aim & Suppress','Servo pan angle is adjusted to centre on fire. Relay activates pump. Loop continues until no contour.'],
    ]
  },

  'proj-numberplate': {
    icon: '🚗', title: 'Number Plate Detection System',
    subtitle: 'Python · OpenCV · Tesseract OCR · Camera',
    tags: ['Python','OpenCV','Tesseract OCR','Raspberry Pi','Camera'],
    desc: 'An automated vehicle number plate recognition system using image processing. OpenCV isolates the plate region via edge detection and contours; Tesseract OCR extracts the plate text.',
    features: [
      ['🔍','Automatic plate region extraction from camera frame'],
      ['🔡','OCR-based character recognition of plate text'],
      ['⚡','Real-time video stream processing'],
      ['🗄️','Database lookup for access control use cases'],
    ],
    diagram: `<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12" fill="#a0aec0">
      <defs><marker id="g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4da8ff"/></marker></defs>
      <rect x="10" y="65" width="100" height="50" rx="8" fill="#0f1629" stroke="#4da8ff" stroke-width="1.5"/>
      <text x="60" y="87" text-anchor="middle" fill="#edf2ff" font-weight="bold">Camera</text>
      <text x="60" y="103" text-anchor="middle" font-size="10">Video Feed</text>
      <rect x="170" y="65" width="110" height="50" rx="8" fill="#0f1629" stroke="#7c5cfc" stroke-width="1.5"/>
      <text x="225" y="87" text-anchor="middle" fill="#edf2ff" font-weight="bold">OpenCV</text>
      <text x="225" y="103" text-anchor="middle" font-size="10">Edge + Contour</text>
      <rect x="340" y="65" width="110" height="50" rx="8" fill="#0f1629" stroke="#00e5b3" stroke-width="1.5"/>
      <text x="395" y="87" text-anchor="middle" fill="#edf2ff" font-weight="bold">Tesseract</text>
      <text x="395" y="103" text-anchor="middle" font-size="10">OCR Engine</text>
      <rect x="510" y="65" width="110" height="50" rx="8" fill="#0f1629" stroke="#febc2e" stroke-width="1.5"/>
      <text x="565" y="87" text-anchor="middle" fill="#edf2ff" font-weight="bold">Database</text>
      <text x="565" y="103" text-anchor="middle" font-size="10">Access Log</text>
      <text x="140" y="90" text-anchor="middle" fill="#546e7a" font-size="10">Frame</text>
      <text x="310" y="90" text-anchor="middle" fill="#546e7a" font-size="10">Plate ROI</text>
      <text x="480" y="90" text-anchor="middle" fill="#546e7a" font-size="10">Text</text>
      <line x1="110" y1="90" x2="168" y2="90" stroke="#4da8ff" stroke-width="1.5" marker-end="url(#g)"/>
      <line x1="280" y1="90" x2="338" y2="90" stroke="#7c5cfc" stroke-width="1.5" marker-end="url(#g)"/>
      <line x1="450" y1="90" x2="508" y2="90" stroke="#00e5b3" stroke-width="1.5" marker-end="url(#g)"/>
    </svg>`,
    components: [
      ['Raspberry Pi / PC','1','Processing Unit','₹3500'],
      ['USB / Pi Camera','1','Video Capture','₹800'],
      ['Python 3.x','1','Language','Free'],
      ['OpenCV Library','1','Image Processing','Free'],
      ['Tesseract OCR','1','Text Extraction','Free'],
      ['SQLite / CSV','1','Data Logging','Free'],
    ],
    connections: [
      ['Camera','→','USB Port / CSI'],
      ['Python Script','→','cv2.VideoCapture(0)'],
      ['OpenCV','→','Frame Processing'],
      ['Plate ROI','→','pytesseract.image_to_string()'],
      ['Text Output','→','Database / Console'],
    ],
    code: `<span class="cm"># Number Plate Detection — Python + OpenCV</span>
<span class="kw">import</span> cv2
<span class="kw">import</span> pytesseract
<span class="kw">import</span> numpy as np

pytesseract.pytesseract.tesseract_cmd = <span class="str">r'C:\Program Files\Tesseract-OCR\tesseract.exe'</span>
cap = cv2.VideoCapture(<span class="num">0</span>)

<span class="kw">while</span> cap.isOpened():
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.bilateralFilter(gray, <span class="num">9</span>, <span class="num">75</span>, <span class="num">75</span>)
    edges = cv2.Canny(blur, <span class="num">100</span>, <span class="num">200</span>)
    cnts, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:<span class="num">10</span>]

    <span class="kw">for</span> c <span class="kw">in</span> cnts:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, <span class="num">0.018</span> * peri, True)
        <span class="kw">if</span> len(approx) == <span class="num">4</span>:
            x,y,w,h = cv2.boundingRect(approx)
            plate = img[y:y+h, x:x+w]
            text = pytesseract.image_to_string(plate)
            print(<span class="str">f"Plate: {text.strip()}"</span>)
            <span class="kw">break</span>`,
    steps: [
      ['Capture','Camera captures real-time video frames. Each frame is read into a NumPy array.'],
      ['Preprocess','Frame → Grayscale → Bilateral Filter (noise reduction while preserving edges) → Canny edge detection.'],
      ['Contour Find','Contours found in the edge image. Sorted by area. Top 10 candidates checked.'],
      ['Plate Isolate','4-sided polygon approx = likely number plate. Bounding rect extracts plate ROI.'],
      ['OCR','Tesseract runs image_to_string on the plate ROI. Output cleaned and logged to database.'],
    ]
  }
};

/* ─── Modal Open/Close ─── */
const overlay = document.getElementById('project-modal-overlay');
const panel   = overlay.querySelector('.pm-panel');

function openModal(projectId) {
  const p = PROJECTS[projectId];
  if (!p) return;
  renderModal(p);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  switchTab('overview');
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ─── Render ─── */
function renderModal(p) {
  document.getElementById('pm-icon').textContent   = p.icon;
  document.getElementById('pm-title').textContent  = p.title;
  document.getElementById('pm-sub').textContent    = p.subtitle;

  // Overview
  document.getElementById('pm-desc').innerHTML = p.desc;
  document.getElementById('pm-features').innerHTML = p.features
    .map(([ico,txt]) => `<div class="pm-feature-item"><span>${ico}</span><span>${txt}</span></div>`)
    .join('');
  document.getElementById('pm-tags').innerHTML = p.tags
    .map(t => `<span class="pm-tag">${t}</span>`).join('');

  // Diagram
  document.getElementById('pm-diagram').innerHTML = p.diagram;

  // Components
  document.getElementById('pm-components').innerHTML = `
    <table class="pm-table">
      <tr><th>Component</th><th>Qty</th><th>Purpose</th><th>Est. Cost</th></tr>
      ${p.components.map(([n,q,pu,c]) =>
        `<tr><td>${n}</td><td><span class="pm-qty">×${q}</span></td><td>${pu}</td><td>${c}</td></tr>`
      ).join('')}
    </table>`;

  // Connections
  document.getElementById('pm-connections').innerHTML = `<div class="pm-conn-grid">` +
    p.connections.map(([f,a,t]) =>
      `<div class="pm-conn-row"><span class="pm-conn-from">${f}</span><span class="pm-conn-arrow">${a}</span><span class="pm-conn-to">${t}</span></div>`
    ).join('') + `</div>`;

  // Code
  document.getElementById('pm-code').innerHTML = p.code;

  // Working
  document.getElementById('pm-working').innerHTML = `<div class="pm-steps">` +
    p.steps.map(([h,d], i) => `
      <div class="pm-step">
        <div class="pm-step-marker">
          <div class="pm-step-num">${i+1}</div>
          <div class="pm-step-line"></div>
        </div>
        <div class="pm-step-body"><h4>${h}</h4><p>${d}</p></div>
      </div>`
    ).join('') + `</div>`;
}

/* ─── Tabs ─── */
function switchTab(name) {
  const idMap = { diagram: 'diagram-section', code: 'code-section' };
  const sectionId = 'pm-' + (idMap[name] || name);
  document.querySelectorAll('.pm-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.pm-section').forEach(s => s.classList.toggle('active', s.id === sectionId));
  panel.scrollTop = 0;
}

document.querySelectorAll('.pm-tab').forEach(t => {
  t.addEventListener('click', () => switchTab(t.dataset.tab));
});

/* ─── Wire up project cards ─── */
document.querySelectorAll('.project-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', e => {
    // Don't open if clicking the existing toggle button
    if (e.target.closest('.project-toggle')) return;
    openModal(card.id);
  });
});
