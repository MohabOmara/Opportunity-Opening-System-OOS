# Opportunity Opening System (OOS)

This repository contains examples of the code used in **AIESEC in Egypt's Official Opportunity Opening System (OOS)**.

---

## 📌 What is OOS?

The **Opportunity Opening System** (OOS) is the controlling system for AIESEC in Egypt's published opportunities on [aiesec.org](https://aiesec.org).  
It determines which opportunities should be live and which should not.

The system contains many details, but here you’ll find examples of the **Apps Script** code used within it.

---

## 🛠 Tech Stack

- **Google Apps Script** – For automation logic
- **Google Spreadsheets** – For storing and managing data

---

## ⚙️ Triggers Overview

### 1. API Requests
- **Trigger Type:** Time-based  
- **Frequency:** Every 10 minutes  
- **Action:** Sends a request to the API.

### 2. Reallocation Validation
- **Trigger Type:** Form Submission  
- **Frequency:** Every time the form is filled and submitted  
- **Action:** Runs a validation script.

### 3. Reaudit Reflection
- **Trigger Type:** Time-based  
- **Frequency:** Every 60 minutes  
- **Action:** Runs the reaudit script.

