# Choose base image based on your backend technology
FROM node:18-alpine
# For Python use: FROM python:3.9-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
# For Python use: 
# COPY requirements.txt .
# RUN pip install -r requirements.txt

# Copy source code
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
# For Python use: CMD ["python", "app.py"] 