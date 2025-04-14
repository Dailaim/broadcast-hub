from constants.whatsapp import WHATSAPP_API_KEY, PHONE_NUMBER_ID,DUMMY_MESSAGE
import requests


def send_whatsapp_message(to: str, message: str):
    url = f"https://graph.facebook.com/v22.0/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {
            "body": message
        }
    }
    if (DUMMY_MESSAGE):
        payload = {
            "messaging_product": "whatsapp",
            "to": "573162418549",
            "type": "template",
            "template": {
                "name": "hello_world",
                "language": {
                  "code": "en_US"
                }
            }
        }
        
    response = requests.post(url, headers=headers, json=payload)

    return response.ok