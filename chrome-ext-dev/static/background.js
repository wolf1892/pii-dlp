const TAB_DB = new Map();
const HEARTBEAT_INTERVAL = 30000; // 30 seconds
const HEARTBEAT_URL = "http://127.0.0.1:8080/heartbeat"; // Replace with your server URL

init();

function init() {
    const filter = { urls: ["<all_urls>"] };
    console.log("HELLO"); // Initial log
    startHeartbeat();
     // Start sending heartbeat
    chrome.tabs.onActivated.addListener(onTabSwitch);
    chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, filter, ["requestBody"]);
    chrome.webRequest.onCompleted.addListener(onRequestCompletedOrErrored, filter);
    chrome.webRequest.onErrorOccurred.addListener(onRequestCompletedOrErrored, filter);
    chrome.webNavigation.onCommitted.addListener(resetTabState, filter);
}

function startHeartbeat() {
    setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
}

function sendHeartbeat() {
    chrome.runtime.getPlatformInfo((info) => {
        const hostname = `${info.os}-${info.arch}`;
        const heartbeatData = {
            hostname: hostname,
            status: "alive"
        };

        fetch(HEARTBEAT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(heartbeatData)
        }).then(response => {
            if (response.ok) {
                console.log("Heartbeat sent successfully");
            } else {
                console.error("Error sending heartbeat:", response.statusText);
            }
        }).catch(error => {
            console.error("Error sending heartbeat:", error);
        });
    });
}

function onTabSwitch({ tabId }) {
    console.log("Tab switched:", tabId); // Log tab switch

    const tabData = getTabData(tabId);
    updateView(tabData);
}

function onBeforeRequest(details) {
    const { tabId, url, method, requestBody } = details;
    console.log("Request started:", url); // Log request URL

    const allowedUrls = [
        "https://chatgpt.com/backend-api/conversation", 
        "https://another-example.com/api"
        // Add more URLs or patterns as needed
    ];

    function isUrlAllowed(url) {
        return allowedUrls.some(allowedUrl => url.startsWith(allowedUrl));
    }

    // Only proceed if the URL is allowed
    if (!isUrlAllowed(url)) {
        return;
    }

    if (method === "POST" || method === "PUT") {
        let dataToSend = { url: url, method: method, requestBody: null };

        if (requestBody) {
            const formData = requestBody.formData;
            if (formData) {
                // Filter only text data
                let readableFormData = {};
                for (let key in formData) {
                    const value = formData[key][0]; // Assuming single value per key
                    if (typeof value === 'string' && value.trim()) {
                        readableFormData[key] = value;
                    }
                }
                dataToSend.requestBody = readableFormData;
            } else if (requestBody.raw) {
                const decoder = new TextDecoder("utf-8");
                const rawData = requestBody.raw[0].bytes;
                const decodedString = decoder.decode(new Uint8Array(rawData));
                
                // Check if the decoded string is readable
                if (isReadableText(decodedString)) {
                    dataToSend.requestBody = decodedString;
                }
            }
        }

        if (dataToSend.requestBody) {
            fetch("http://127.0.0.1:8080/heartbeat", { // Replace with your server URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }).then(response => {
                if (response.ok) {
                    console.log("Data sent successfully");
                } else {
                    console.error("Error sending data:", response.statusText);
                }
            }).catch(error => {
                console.error("Error sending data:", error);
            });
        }
    }

    incrementTabTimesCurrentlyDoing(tabId);
    incrementTabTimesAlreadyDone(tabId);
    conditionallyUpdateView(tabId);
}

// Helper function to check if the text is readable
function isReadableText(text) {
    // A simple heuristic: text is considered readable if it contains mostly printable characters
    return /^[\x20-\x7E\s]*$/.test(text);
}
function onRequestCompletedOrErrored(details) {
    const { tabId, url } = details;
    console.log("Request completed or errored:", url); // Log request URL
    decrementTabTimesCurrentlyDoing(tabId);
    conditionallyUpdateView(tabId);
}

function resetTabState(details) {
    const { tabId, url } = details;
    console.log("Navigation committed:", url); // Log navigation URL
    const newTabState = [0, 0];
    TAB_DB.set(tabId, newTabState);
    conditionallyUpdateView(tabId);
}

function conditionallyUpdateView(tabId) {
    getCurrentlyViewedTabId()
        .then(function (activeTabId) {
            if (activeTabId === tabId) {
                const tabData = getTabData(tabId);
                updateView(tabData);
            }
        });
}

function updateView([timesCurrentlyDoing, timesAlreadyDone]) {
    console.log("Updating view:", timesCurrentlyDoing, timesAlreadyDone); // Log view update
    chrome.browserAction.setBadgeText({ text: String(timesAlreadyDone) });
    if (timesCurrentlyDoing > 0) {
        chrome.browserAction.setIcon({ path: 'static/connected.gif' });
    } else {
        chrome.browserAction.setIcon({ path: 'static/offline.png' });
    }
}

function getCurrentlyViewedTabId() {
    return new Promise(function (resolve) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function ([{ id }]) {
            resolve(id);
        });
    });
}

function getTabData(tabId) {
    if (TAB_DB.has(tabId)) {
        return TAB_DB.get(tabId);
    }
    const tabData = [0, 0];
    TAB_DB.set(tabId, tabData);
    return tabData;
}

function incrementTabTimesCurrentlyDoing(tabId) {
    const tabData = getTabData(tabId);
    tabData[0] += 1;
}

function decrementTabTimesCurrentlyDoing(tabId) {
    const tabData = getTabData(tabId);
    tabData[0] -= 1;
}

function incrementTabTimesAlreadyDone(tabId) {
    const tabData = getTabData(tabId);
    tabData[1] += 1;
}
