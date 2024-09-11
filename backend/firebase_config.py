import firebase_admin
from firebase_admin import credentials, firestore

# Use the downloaded service account key JSON file
cred = credentials.Certificate("./stockwise-6aef4-firebase-adminsdk-hbpo8-f3cfc11248.json")

# Initialize the Firebase app with your credentials
firebase_admin.initialize_app(cred)

# Access Firestore
db = firestore.client()

# 'C'
def create_stock_analysis(ticker, description, sentiment, action, positive, neutral, negative, date):
    # Extract data from the Gemini response
    
    # Create a Firestore document reference based on stock ticker
    doc_ref = db.collection('stocks').document(ticker)

    # Data structure that matches your Firestore scheme
    data = {
        'action': action,
        'date': date,
        'description': description,
        'negative': negative,
        'neutral': neutral,
        'positive': positive,
        'sentiment': sentiment
    }

    # Set document data in Firestore
    doc_ref.set(data)
    print(f'Stock data for {ticker} stored in Firestore')

# 'R'
def read_stock_analysis(ticker):
    doc = db.collection('stocks').document(ticker).get()
    if doc.exists:
        print(doc.to_dict())
    else:
        print('No such document!')

# 'U'
def update_stock_analysis(ticker, paramter, value):
    db.collection('stocks').document(ticker).update({
        paramter: value
    })

# 'D'
def delete_stock_analysis(ticker):
    db.collection('stocks').document(ticker).delete()