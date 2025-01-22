# Frontend: /ncdpr-passport

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

## Certificates

We need to generate certificates for HTTPS to use geolocation in the browser.

```bash
./setup-dev-certs.sh
```

## Notes

- We use `localhost+2` to avoid conflicts with other apps on the same machine.
- If you are using WSL, you need to install the root certificate in Windows too.
- If you are using WSL, you need to run `./setup-dev-certs.sh` in the WSL terminal.

# Backend: TBD @V