from flask import Flask, request

app = Flask(__name__)

@app.route('/ussd', methods=['POST'])
def ussd_callback():
    session_id = request.form.get("sessionId")
    phone_number = request.form.get("phoneNumber")
    service_code = request.form.get("serviceCode")
    text = request.form.get("text", "")

    # USSD Menu Logic
    if text == "":
        response = "CON Welcome to My USSD Service\n1. Check Balance\n2. Buy Airtime"
    elif text == "1":
        response = "END Your balance is KES 500"
    elif text == "2":
        response = "END Airtime purchase successful!"
    else:
        response = "END Invalid choice"

    return response

if __name__ == '__main__':
    app.run(port=5000)
