curl -s -c cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\": \"heramb\", \"password\": \"password123\"}"

Customer successfully logged in
