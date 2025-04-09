# ITERATION 4

## Added npm scripts to run the frontend and backend locally

```bash
npm run frontend
npm run backend
```

Make sure you `npm install` in frontend first.


# Frontend: /frontend

## Getting Started

First, install the packages on your local machine.

```bash
npm install
```

Before running the server, you will need to create some certificates.

```bash
./setup-dev-certs.sh
```

Next, run the development server on your local machine

```bash
npm run dev
```

Open [https://localhost:5173](https://localhost:5173) with your browser to see the result.

The page auto-updates as you edit the files. See the README in the frontend folder for more information on styling and the file/folder structure

## Notes

- We use `localhost+2` to avoid conflicts with other apps on the same machine.
- If you are using WSL, you need to install the root certificate in Windows too.
- If you are using WSL, you need to run `./setup-dev-certs.sh` in the WSL terminal.

# Backend:

## Running migrations

```bash
npm run database
```


# FOR JAKE 4/9/2025

i had to run these commmands to get docker to work:

```bash
docker system prune -a --volumes
docker-compose build --no-cache frontend
docker-compose up
```