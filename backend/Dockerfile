# Stage 1: Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY [".env", ".env"]

# restore
COPY ["backend/src/DigitalPassportBackend/DigitalPassportBackend.csproj", "DigitalPassportBackend/"]
RUN dotnet restore 'DigitalPassportBackend/DigitalPassportBackend.csproj'

# build
COPY ["backend/src/DigitalPassportBackend", "DigitalPassportBackend/"]
COPY [".env", "DigitalPassportBackend/"]
WORKDIR /src/DigitalPassportBackend
RUN dotnet build 'DigitalPassportBackend.csproj' -c Release -o /app/build

# Stage 2: Publish Stage
FROM build AS publish
RUN dotnet publish 'DigitalPassportBackend.csproj' -c Release -o /app/publish

# Stage 3: Run Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
ARG API_PORT
ENV ASPNETCORE_HTTP_PORTS=${API_PORT}
EXPOSE ${API_PORT}
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build /src/.env .
ENTRYPOINT [ "dotnet", "DigitalPassportBackend.dll" ]