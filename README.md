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

| Data Type | Regulation |
|-----------|------------|
| Full Name | GDPR, CCPA |
| Date of Birth | GDPR, CCPA, HIPAA |
| Gender | GDPR, CCPA |
| Phone Numbers | GDPR, CCPA, HIPAA |
| Email Addresses | GDPR, CCPA, HIPAA |
| Physical Addresses | GDPR, CCPA |
| Social Security Number (SSN) | GDPR, CCPA, HIPAA, GLBA |
| Passport Number | GDPR, CCPA |
| Driver’s License Number | GDPR, CCPA, GLBA |
| National ID Number | GDPR, CCPA, HIPAA |
| Credit Card Numbers | GDPR, CCPA, PCI DSS |
| Bank Account Numbers | GDPR, CCPA, GLBA |
| Tax Identification Numbers | GDPR, CCPA, HIPAA, GLBA |
| Fingerprints | GDPR, CCPA, HIPAA |
| Retina Scans | GDPR, CCPA, HIPAA |
| Voice Patterns | GDPR, CCPA, HIPAA |
| Medical Records | GDPR, CCPA, HIPAA |
| Health Insurance Information | GDPR, CCPA, HIPAA |
| Genetic Information | GDPR, CCPA, HIPAA |
| Employee ID Numbers | GDPR, CCPA |
| Employment Records | GDPR, CCPA |
| Salary Information | GDPR, CCPA, HIPAA |
| IP Addresses | GDPR, CCPA |
| MAC Addresses | GDPR, CCPA |
| Usernames and Passwords | GDPR, CCPA |
| Cookies | GDPR, CCPA |
| GPS Coordinates | GDPR, CCPA |
| Location Histories | GDPR, CCPA |
| Device Identifiers (IMEI, MEID) | GDPR, CCPA |
| Browsing History | GDPR, CCPA |
| Purchase History | GDPR, CCPA |
| Biometric Data (Other) | GDPR, CCPA, HIPAA |
| Race or Ethnicity | GDPR, CCPA |
| Religious or Philosophical Beliefs | GDPR |
| Political Opinions | GDPR |
| Trade Union Membership | GDPR |
| Sexual Orientation | GDPR |
| Physical Health Information | GDPR, HIPAA |
| Mental Health Information | GDPR, HIPAA |
| Genetic Data | GDPR, HIPAA |
| Child Data (Information about minors) | GDPR, COPPA |
| Marital Status | GDPR, CCPA |
| Educational Records | FERPA, GDPR |
| Professional or Employment Information | GDPR, CCPA |
| Criminal Records | GDPR |
| National Origin | GDPR, CCPA |
| Photographs or Video Footage | GDPR, CCPA |
| Digital Signatures | GDPR, CCPA |
| Social Media Profiles | GDPR, CCPA |
| Behavioral Data (e.g., preferences, usage patterns) | GDPR, CCPA |
| Survey Responses (if they can identify individuals) | GDPR, CCPA |
| Health-Related Mobile App Data | GDPR, HIPAA |
| Telematics Data (e.g., vehicle tracking) | GDPR, CCPA |
| Voice Recordings | GDPR, CCPA, HIPAA |
| Subscription Data (e.g., magazine, service) | GDPR, CCPA |
| Vehicle Registration Numbers | GDPR, CCPA |
| Professional Licenses | GDPR, CCPA |
| Facial Recognition Data | GDPR, CCPA |
| Online Activity Data (e.g., clicks, session duration) | GDPR, CCPA |
| Sensitive Political or Military Data | GDPR |
| Geolocation Data (Specific movement history) | GDPR, CCPA |
| RFID Data (e.g., from ID badges) | GDPR, CCPA |
| Workplace Surveillance Data (CCTV footage) | GDPR, CCPA |
| Mobile Device Data (e.g., accelerometer data) | GDPR, CCPA |
| Medical Device Data (e.g., pacemaker info) | GDPR, HIPAA |
| Voice-to-Text Data | GDPR, CCPA |
| Smart Home Data (e.g., usage patterns) | GDPR, CCPA |
| Emergency Contact Information | GDPR, CCPA |
| Insurance Policy Numbers | GDPR, CCPA |
| Student Records (e.g., grades, test scores) | FERPA, GDPR |
| E-commerce Transaction Data | GDPR, CCPA |
| Customer Feedback Data (if identifiable) | GDPR, CCPA |
| Employee Performance Reviews | GDPR, CCPA |

## Explanation

- **GDPR**: General Data Protection Regulation
- **CCPA**: California Consumer Privacy Act
- **HIPAA**: Health Insurance Portability and Accountability Act
- **GLBA**: Gramm-Leach-Bliley Act
- **PCI DSS**: Payment Card Industry Data Security Standard
- **FERPA**: Family Educational Rights and Privacy Act
- **COPPA**: Children’s Online Privacy Protection Act


