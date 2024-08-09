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

# PII Data Types and Applicable Regulations

Tracking table here: [Drive_CSV](https://docs.google.com/spreadsheets/d/1Fn_9sUjVp-Uu89L6bKwGjG_iFMsdCaIVhrWKIZVeT5o/edit?usp=sharing)

| Field Name    | Description                                   |
|---------------|-----------------------------------------------|
| `TIME`        | Time of the record                            |
| `USERNAME`    | Username of the individual                    |
| `IDCARD`      | Identification card number                    |
| `SOCIALNUMBER`| Social security number                        |
| `EMAIL`       | Email address                                |
| `PASSPORT`    | Passport number                               |
| `DRIVERLICENSE`| Driver's license number                       |
| `DOB`         | Date of birth                                 |
| `LASTNAME1`   | Last name (first instance)                    |
| `IP`          | IP address                                    |
| `GIVENNAME1`  | Given name (first instance)                   |
| `SEX`         | Gender                                        |
| `TEL`         | Telephone number                              |
| `CITY`        | City                                          |
| `POSTCODE`    | Postal code                                   |
| `STREET`      | Street address                                |
| `STATE`       | State                                         |
| `BUILDING`    | Building number or name                       |
| `TITLE`       | Title (e.g., Mr., Ms., Dr.)                   |
| `COUNTRY`     | Country                                       |
| `DATE`        | Date                                          |
| `PASS`        | Password                                      |
| `SECADDRESS`  | Secondary address (if applicable)             |
| `LASTNAME2`   | Last name (second instance)                   |
| `GIVENNAME2`  | Given name (second instance)                  |
| `GEOCOORD2`   | Geographical coordinates (second instance)    |
| `LASTNAME3`   | Last name (third instance)                    |




