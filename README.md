# PII_detect_dev

Private repo

## Installation

How to install plugin?.

#### Install (Chrome/Edge)

1. Clone folder ```chrome-ext-dev```  

2. Open Extensions (chrome://extensions) from Chrome/Edge.

3. Choose `Load unpacked` (Open Develop Mode first)，Click folder(```chrome-ext-dev```) you just uncompressed, finish!


## Plugin

Background.js is the primary driver in extension

### What's supported?

- The plugin every 30s sends an heartbeat to mothership(API), this is used to track connectivity status.
- For every request with POST or PUT, the plugin sends request body(decoded) to mothership.


## Modal

The modal is trained on  [pii-masking-300k](https://huggingface.co/datasets/ai4privacy/pii-masking-300k/viewer/default/train?p=1776&row=177608)

#### How to run this modal?

Use [google colab](https://colab.research.google.com/)[Optional]
```python
from transformers import pipeline

pipe = pipeline("token-classification", model="yonigo/distilbert-base-cased-pii-en", aggregation_strategy="first")
pipe("My name is Yoni Go and I live in Israel. My phone number is 054-1234567 and aws id is 100023123123123123 and secrets is aadada")

```

