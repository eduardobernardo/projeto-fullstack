# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /app

RUN pip install --upgrade pip
RUN pip install flask

COPY . .

CMD ["python", "main.py", "run", "-h", "0.0.0.0"]