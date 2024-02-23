from flask import Flask, render_template, request
import pyodbc

app = Flask(__name__)

# SQL Server connection details
server = 'mysql://127.0.0.1:3306/'
database = 'manas'
username = 'root'
password = 'root'
driver = '{ODBC Driver 18 for SQL Server}'

# Create a connection to SQL Server
conn_str = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'
try:
    conn = pyodbc.connect(conn_str)
    print("Connected to SQL Server")
except pyodbc.Error as e:
    print(f"Connection failed: {e}")
    print("SQL State:", e.args[0])
    print("Native Error:", e.args[1])

# Flask route to render the form
@app.route('/')
def index():
    return render_template('index.html')

# Flask route to handle form submission
@app.route('/submit', methods=['POST'])
def submit():
    # Retrieve form data
    name = request.form['name']
    email = request.form['email']

    # Insert data into SQL Server
    cursor = conn.cursor()
    cursor.execute("INSERT INTO data (name, email) VALUES (?, ?)", name, email)
    conn.commit()

    return "Record inserted successfully"

if __name__ == '_main_':
    app.run(debug=True)